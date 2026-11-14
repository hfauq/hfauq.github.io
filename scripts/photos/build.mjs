#!/usr/bin/env node
// Rebuilds the photo gallery from photo-originals/: `npm run photos` (macOS only, needs Xcode's swift).
//
//   1. Lists the originals and adds any new photo to manifest.json (exact duplicates are skipped).
//   2. Runs export.swift, which writes the web copies to public/images/gallery and reads each
//      photo's date, camera and settings. Existing copies are reused; pass --force to redo them all.
//   3. Writes src/photos.js, newest first, and deletes gallery files no photo uses any more.
//
// manifest.json is the hand-edited part: a location for each photo, plus optional date / camera /
// settings overrides for photos whose metadata is missing or wrong. See README.md next to this file.
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const originalsDir = join(root, 'photo-originals')
const galleryDir = join(root, 'public', 'images', 'gallery')
const manifestPath = join(root, 'scripts', 'photos', 'manifest.json')
const outputPath = join(root, 'src', 'photos.js')
const force = process.argv.includes('--force')

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const ignored = new Set(manifest.ignore)
const hash = (file) => createHash('sha1').update(readFileSync(join(originalsDir, file))).digest('hex')

// 1. New originals go into the manifest, unless they're byte-for-byte copies of a known photo
const originals = readdirSync(originalsDir).filter((f) => /\.(jpe?g|heic|png|tiff?)$/i.test(f)).sort()
const knownHashes = new Map(Object.keys(manifest.photos).filter((f) => originals.includes(f)).map((f) => [hash(f), f]))
const added = []
for (const file of originals) {
  if (manifest.photos[file] || ignored.has(file)) continue
  const copyOf = knownHashes.get(hash(file))
  if (copyOf) {
    console.warn(`Skipping ${file}: same file as ${copyOf}`)
    continue
  }
  manifest.photos[file] = { location: null }
  added.push(file)
}
const missing = Object.keys(manifest.photos).filter((f) => !originals.includes(f))
if (missing.length) console.warn(`In manifest.json but not in photo-originals/ (left out): ${missing.join(', ')}`)

// 2. Export web copies and read metadata
const files = Object.keys(manifest.photos).filter((f) => originals.includes(f))
const requests = files.map((file) => JSON.stringify({ file, base: manifest.photos[file].base ?? null, force })).join('\n')
const swift = spawnSync('swift', [join(root, 'scripts', 'photos', 'export.swift'), originalsDir, galleryDir], {
  input: requests + '\n',
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
  stdio: ['pipe', 'pipe', 'inherit'],
})
if (swift.status !== 0) {
  console.error('export.swift failed')
  process.exit(1)
}
const exported = swift.stdout.trim().split('\n').filter(Boolean).map((line) => JSON.parse(line))

// "f/1.78" -> "f/1.8", "1/0.0062s" -> "1/160s", like the camera displays them
const settingsFrom = (m, { focal = true } = {}) =>
  [
    focal && m.focal != null && `${Math.round(m.focal)}mm`,
    m.fnumber != null && `f/${+m.fnumber.toFixed(1)}`,
    m.exposure != null && (m.exposure >= 1 ? `${+m.exposure.toPrecision(6)}s` : `1/${Math.round(1 / m.exposure)}s`),
    m.iso != null && `ISO ${m.iso}`,
  ].filter(Boolean).join(' ') || null

// Lab scanners write their own name, not the camera's: those are film shots on the Minolta
function cameraFrom(m) {
  const name = [m.make, m.model].filter(Boolean).join(' ')
  if (/SP500|NORITSU|FRONTIER/i.test(name)) return { camera: 'Minolta AF-S', settings: '35mm film' }
  if (m.model === 'X100VI') return { camera: 'Fujifilm X100VI', settings: settingsFrom(m) }
  if (m.make === 'Apple') return { camera: m.model, settings: settingsFrom(m, { focal: false }) }
  if (m.model === 'ILCE-1') return { camera: 'Sony α1', settings: settingsFrom(m) }
  return { camera: name || null, settings: settingsFrom(m) }
}

const photos = exported.map((m) => {
  const entry = manifest.photos[m.file]
  entry.base = m.base
  const derived = cameraFrom(m)
  return {
    file: m.file,
    base: `/images/gallery/${m.base}`,
    widths: m.widths,
    width: m.width,
    height: m.height,
    color: m.color,
    date: 'date' in entry ? entry.date : m.date,
    camera: 'camera' in entry ? entry.camera : derived.camera,
    settings: 'settings' in entry ? entry.settings : derived.settings,
    location: entry.location,
  }
})

// Newest first; same-day photos in file-name order
photos.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || (a.file < b.file ? -1 : a.file > b.file ? 1 : 0))

// 3. Write src/photos.js and the updated manifest, then prune unused gallery files
const js = (v) => (v === null ? 'null' : Array.isArray(v) ? `[${v.join(', ')}]` : typeof v === 'number' ? String(v) : `'${String(v).replace(/'/g, "\\'")}'`)
const fields = ['base', 'widths', 'width', 'height', 'color', 'date', 'camera', 'settings', 'location']
const lines = [
  '// Gallery photos, newest first. Film scans are dated by their lab scan date.',
  '// Generated by `npm run photos` from photo-originals/ and scripts/photos/manifest.json: edit those, not this file.',
  '// Each photo has AVIF copies at every width in `widths` plus an 800px JPEG fallback, all in',
  '// public/images/gallery with metadata stripped. `color` is its average color, shown while it loads.',
  'export const photos = [',
  ...photos.map((p) => `  { ${fields.map((f) => `${f}: ${js(p[f])}`).join(', ')} },`),
  ']',
]
writeFileSync(outputPath, lines.join('\n') + '\n')
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')

// Only prune when every photo exported, so a one-off read error never deletes good copies
const bases = new Set(photos.map((p) => p.base.split('/').pop()))
const stale = exported.length === files.length
  ? readdirSync(galleryDir).filter((f) => !bases.has(f.replace(/-\d+\.(avif|jpg)$/, '')))
  : []
if (exported.length !== files.length) console.warn(`Only ${exported.length} of ${files.length} photos exported; kept all existing gallery files`)
for (const f of stale) rmSync(join(galleryDir, f))

console.log(`${photos.length} photos written to src/photos.js${stale.length ? `, ${stale.length} unused gallery files removed` : ''}`)
if (added.length) console.log(`New: ${added.join(', ')}`)
const noLocation = photos.filter((p) => !p.location).map((p) => p.file)
if (noLocation.length) console.log(`Add a location in scripts/photos/manifest.json for: ${noLocation.join(', ')}`)
