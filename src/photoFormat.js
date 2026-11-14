// Shared helpers for showing a photo from src/photos.js

// "2026-10-09" -> "'26 10 09", like the date imprint on a film point-and-shoot
export function dateStamp(date) {
  const [year, month, day] = date.split('-')
  return `'${year.slice(2)} ${month} ${day}`
}

export const avifSrcSet = (photo) => photo.widths.map((w) => `${photo.base}-${w}.avif ${w}w`).join(', ')

// Browsers without AVIF get a single 800px JPEG
export const jpegSrc = (photo) => `${photo.base}-800.jpg`

export const altText = (photo) =>
  [photo.location, photo.camera && `shot on ${photo.camera}`].filter(Boolean).join(', ') || 'Photo'
