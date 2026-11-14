# Photo gallery

The gallery is built from the full-size photos in `photo-originals/`. That folder is git-ignored and stays on your Mac, so keep your own backup of it.

## Add photos

1. Drop the photos into `photo-originals/`.
2. Run:

   ```bash
   npm run photos
   ```

3. It lists the new photos that need a location. Add one for each in `scripts/photos/manifest.json`:

   ```json
   "DSCF5012.JPG": { "location": "Biarritz, France", "base": "2026-11-20-dscf5012" }
   ```

4. Run `npm run photos` again, check `npm run dev`, then commit and `npm run deploy`.

Photos show newest first. Each one gets AVIF copies at 400, 800, 1400 and 2000px wide plus an 800px JPEG fallback in `public/images/gallery`, with all metadata (GPS included) removed. The script also writes `src/photos.js`; don't edit that file by hand.

## Fix a photo's details

The date, camera and settings come from the photo's own metadata:

- **Film scans** from the lab's Frontier or Noritsu scanner show as "Minolta AF-S · 35mm film", dated by the scan date.
- **Missing or wrong details:** add any of `date` (`"2026-08-18"`), `camera` or `settings` to the photo's manifest entry, and those win. `null` hides a value.

## Remove a photo

Delete its entry from the manifest, or add its file name to `ignore`, then run `npm run photos`. Copies no photo uses any more are deleted.

## Good to know

- **Mac only:** it uses macOS's built-in image tools through Swift, which ships with Xcode or its command line tools.
- **Duplicates:** an exact copy of a photo that's already in the gallery is skipped with a warning.
- **Re-exporting:** `npm run photos -- --force` re-exports every photo, for example after changing sizes or quality in `export.swift`. It takes about a minute.
- **The avatar** (`public/images/avatar-96.*`) isn't part of the gallery; its original is `photo-originals/avatar.jpg`.
