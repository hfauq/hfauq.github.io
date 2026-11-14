// Web copies for the photo gallery, using macOS ImageIO (no dependencies, macOS only).
// Run by build.mjs, not directly.
//
// Reads one JSON request per line on stdin: {"file", "base", "force"}, where file is a name in
// <originalsDir> and base is the output name prefix, or null to derive "<date>-<slug>".
// For each photo:
//   - writes <base>-<width>.avif at each width in WIDTHS (capped at the original's width, and so
//     the long edge stays under 2400px) plus one <base>-800.jpg fallback, with EXIF orientation
//     applied and all metadata (GPS included) dropped. Existing files are kept unless force is set.
//   - prints one JSON line: base, widths, size of the largest copy, average color, capture date,
//     camera make/model and exposure settings, for build.mjs to turn into src/photos.js.
//
// Usage: swift export.swift <originalsDir> <outDir> < requests.jsonl
import CoreGraphics
import Foundation
import ImageIO

let WIDTHS = [400, 800, 1400, 2000]
let MAX_LONG_EDGE = 2400.0
let FALLBACK_WIDTH = 800

struct Request: Decodable {
  let file: String
  let base: String?
  let force: Bool?
}

let srcDir = URL(fileURLWithPath: CommandLine.arguments[1])
let outDir = URL(fileURLWithPath: CommandLine.arguments[2])
try FileManager.default.createDirectory(at: outDir, withIntermediateDirectories: true)

func fail(_ message: String) {
  FileHandle.standardError.write("\(message)\n".data(using: .utf8)!)
}

func write(_ image: CGImage, to url: URL, type: String, quality: Double) -> Bool {
  guard let dest = CGImageDestinationCreateWithURL(url as CFURL, type as CFString, 1, nil) else { return false }
  // Only the compression quality goes in: no EXIF, TIFF or GPS blocks are copied over
  CGImageDestinationAddImage(dest, image, [kCGImageDestinationLossyCompressionQuality: quality] as CFDictionary)
  return CGImageDestinationFinalize(dest)
}

func thumbnail(_ src: CGImageSource, longEdge: Int) -> CGImage? {
  let options: [CFString: Any] = [
    kCGImageSourceCreateThumbnailFromImageAlways: true,
    kCGImageSourceCreateThumbnailWithTransform: true,
    kCGImageSourceThumbnailMaxPixelSize: longEdge,
  ]
  return CGImageSourceCreateThumbnailAtIndex(src, 0, options as CFDictionary)
}

// Average color, shown as the tile's placeholder while the photo loads
func averageHex(_ image: CGImage) -> String {
  var pixel = [UInt8](repeating: 0, count: 4)
  let ctx = CGContext(data: &pixel, width: 1, height: 1, bitsPerComponent: 8, bytesPerRow: 4,
                      space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  ctx.interpolationQuality = .medium
  ctx.draw(image, in: CGRect(x: 0, y: 0, width: 1, height: 1))
  return String(format: "#%02x%02x%02x", pixel[0], pixel[1], pixel[2])
}

func slug(_ s: String) -> String {
  s.lowercased().map { $0.isLetter || $0.isNumber ? String($0) : "-" }.joined()
    .replacingOccurrences(of: "--+", with: "-", options: .regularExpression)
    .trimmingCharacters(in: CharacterSet(charactersIn: "-"))
}

func pixelSize(of url: URL) -> (Int, Int)? {
  guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
        let p = CGImageSourceCopyPropertiesAtIndex(src, 0, nil) as? [String: Any],
        let w = p[kCGImagePropertyPixelWidth as String] as? Int,
        let h = p[kCGImagePropertyPixelHeight as String] as? Int else { return nil }
  return (w, h)
}

// Widths already exported for a base, read from the file names
func existingWidths(_ base: String) -> [Int] {
  let files = (try? FileManager.default.contentsOfDirectory(atPath: outDir.path)) ?? []
  return files.compactMap { name -> Int? in
    guard name.hasPrefix("\(base)-"), name.hasSuffix(".avif") else { return nil }
    return Int(name.dropFirst(base.count + 1).dropLast(5))
  }.sorted()
}

while let line = readLine() {
  guard let request = try? JSONDecoder().decode(Request.self, from: Data(line.utf8)) else {
    fail("bad request: \(line)"); continue
  }
  let url = srcDir.appendingPathComponent(request.file)
  guard let src = CGImageSourceCreateWithURL(url as CFURL, nil),
        let props = CGImageSourceCopyPropertiesAtIndex(src, 0, nil) as? [String: Any],
        let probe = thumbnail(src, longEdge: 400) else {
    fail("can't read \(request.file)"); continue
  }
  let exif = props[kCGImagePropertyExifDictionary as String] as? [String: Any] ?? [:]
  let tiff = props[kCGImagePropertyTIFFDictionary as String] as? [String: Any] ?? [:]

  var ow = props[kCGImagePropertyPixelWidth as String] as? Int ?? 0
  var oh = props[kCGImagePropertyPixelHeight as String] as? Int ?? 0
  if (props[kCGImagePropertyOrientation as String] as? Int ?? 1) >= 5 { swap(&ow, &oh) }

  let rawDate = exif[kCGImagePropertyExifDateTimeOriginal as String] as? String
    ?? tiff[kCGImagePropertyTIFFDateTime as String] as? String
  let date = rawDate.map { String($0.prefix(10)).replacingOccurrences(of: ":", with: "-") }
  let base = request.base ?? "\(date ?? "undated")-\(slug((request.file as NSString).deletingPathExtension))"

  var widths = request.force == true ? [] : existingWidths(base)
  if widths.isEmpty {
    for target in WIDTHS {
      let w = min(target, ow, Int(MAX_LONG_EDGE * Double(ow) / Double(max(ow, oh))))
      if widths.contains(w) { continue }
      let longEdge = Int((Double(w) * Double(max(ow, oh)) / Double(ow)).rounded())
      guard let scaled = thumbnail(src, longEdge: longEdge) else { continue }
      // ImageIO tiles larger AVIFs, and Chrome draws tiled AVIFs with an odd side as blank: trim to even sides
      guard let img = scaled.cropping(to: CGRect(x: 0, y: 0, width: scaled.width & ~1, height: scaled.height & ~1)),
            !widths.contains(img.width) else { continue }
      guard write(img, to: outDir.appendingPathComponent("\(base)-\(img.width).avif"), type: "public.avif", quality: 0.65) else {
        fail("couldn't write \(base)-\(img.width).avif"); continue
      }
      if img.width == FALLBACK_WIDTH || (target == FALLBACK_WIDTH && img.width < FALLBACK_WIDTH) {
        _ = write(img, to: outDir.appendingPathComponent("\(base)-\(FALLBACK_WIDTH).jpg"), type: "public.jpeg", quality: 0.76)
      }
      widths.append(img.width)
      if w == ow { break }
    }
  }
  guard let largest = widths.last,
        let (width, height) = pixelSize(of: outDir.appendingPathComponent("\(base)-\(largest).avif")) else {
    fail("no web copies for \(request.file)"); continue
  }

  var out: [String: Any] = [
    "file": request.file, "base": base, "widths": widths, "width": width, "height": height,
    "color": averageHex(probe),
    "make": (tiff[kCGImagePropertyTIFFMake as String] as? String)?.trimmingCharacters(in: .whitespaces) ?? NSNull(),
    "model": (tiff[kCGImagePropertyTIFFModel as String] as? String)?.trimmingCharacters(in: .whitespaces) ?? NSNull(),
    "date": date ?? NSNull(),
  ]
  out["focal"] = exif[kCGImagePropertyExifFocalLength as String] as? Double ?? NSNull()
  out["fnumber"] = exif[kCGImagePropertyExifFNumber as String] as? Double ?? NSNull()
  out["exposure"] = exif[kCGImagePropertyExifExposureTime as String] as? Double ?? NSNull()
  out["iso"] = (exif[kCGImagePropertyExifISOSpeedRatings as String] as? [Int])?.first ?? NSNull()
  let json = try JSONSerialization.data(withJSONObject: out, options: [.sortedKeys])
  print(String(data: json, encoding: .utf8)!)
}
