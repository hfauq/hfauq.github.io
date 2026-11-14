import { useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import { FaInstagram } from 'react-icons/fa6'
import { photos } from '../photos'
import { altText, avifSrcSet, dateStamp, jpegSrc } from '../photoFormat'
import Lightbox from './Lightbox'

/**
 * PhotoGallery Component
 * Full-width gallery. Wide screens get justified rows: every row fills the width at an even
 * height and each photo keeps its own shape. Phones get two balanced columns. Tapping or
 * clicking a photo opens it full screen; on hover devices the tile also shows its details.
 */

const PHONE_QUERY = '(max-width: 639px)'

function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    // Pre-rendered at build time with the wide layout; phones switch to columns once the page
    // is live, well before anyone scrolls down to the gallery
    () => false,
  )
}

// How wide a tile renders, so the browser picks the smallest file that stays sharp.
// Mirrors the gallery CSS: two columns on phones, ~220px rows on tablets, ~300px rows above,
// with rows stretching up to ~30% to fill the width.
function tileSizes(ratio) {
  return [
    `${PHONE_QUERY} 50vw`,
    `(max-width: 1023px) ${Math.round(ratio * 220 * 1.3)}px`,
    `${Math.round(ratio * 300 * 1.3)}px`,
  ].join(', ')
}

// Deal photos into two columns, always topping up the shorter one, so they end level
// and still read newest-first from left to right
function splitColumns(list) {
  const columns = [[], []]
  const heights = [0, 0]
  list.forEach((photo, index) => {
    const column = heights[0] <= heights[1] ? 0 : 1
    columns[column].push({ photo, index })
    heights[column] += photo.height / photo.width
  })
  return { columns, shorter: heights[0] <= heights[1] ? 0 : 1 }
}

const CARD_BASIS = 260 // matches .gallery-justified > .insta-card

// Would the card still fit after the photos in the last justified row? Replays how flex-wrap
// breaks lines from each item's base width, so the answer doesn't depend on the current render.
function cardFitsLastRow(rowEl) {
  const width = rowEl.clientWidth
  const style = getComputedStyle(rowEl)
  const row = parseFloat(style.getPropertyValue('--row'))
  const gap = parseFloat(style.columnGap) || 0
  let line = 0
  for (const photo of photos) {
    const basis = (photo.width / photo.height) * row
    line = line > 0 && line + gap + basis > width ? basis : line + (line > 0 ? gap : 0) + basis
  }
  return width - line - gap >= CARD_BASIS
}

// The end of a colour negative: orange film base and sprocket holes. In the justified layout
// it fills whatever the last row leaves; when that row is already full it becomes a photo-sized
// frame of its own instead of a full-width banner.
function InstagramCard() {
  const ref = useRef(null)
  const [alone, setAlone] = useState(false)

  useLayoutEffect(() => {
    const rowEl = ref.current.parentElement
    if (!rowEl.classList.contains('gallery-justified')) return
    const update = () => setAlone(!cardFitsLastRow(rowEl))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(rowEl)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href="https://instagram.com/hfauq"
      target="_blank"
      rel="noopener noreferrer"
      className={`insta-card group${alone ? ' is-alone' : ''}`}
    >
      <FaInstagram className="insta-icon" aria-hidden="true" />
      <span className="insta-title">Find me on Instagram</span>
      <span className="insta-handle">
        @hfauq <span className="insta-arrow" aria-hidden="true">→</span>
      </span>
    </a>
  )
}

function Tile({ photo, index, onOpen }) {
  const ratio = photo.width / photo.height
  return (
    <figure
      className="gallery-item group"
      // Average color fills the tile until the photo arrives
      style={{ '--ratio': ratio, backgroundColor: photo.color }}
    >
      <button type="button" className="gallery-open" onClick={() => onOpen(index)} aria-label={`View photo: ${altText(photo)}`}>
        <picture>
          <source type="image/avif" srcSet={avifSrcSet(photo)} sizes={tileSizes(ratio)} />
          <img
            src={jpegSrc(photo)}
            alt=""
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
          />
        </picture>
      </button>
      <figcaption className="gallery-caption" aria-hidden="true">
        <span className="min-w-0">
          {photo.location && <span className="block">{photo.location}</span>}
          {photo.camera && (
            <span className="gallery-meta">
              {photo.camera}
              {photo.settings && <span className="gallery-settings"> · {photo.settings}</span>}
            </span>
          )}
        </span>
        {photo.date && <span className="gallery-stamp">{dateStamp(photo.date)}</span>}
      </figcaption>
    </figure>
  )
}

function PhotoGallery() {
  const isPhone = useMediaQuery(PHONE_QUERY)
  const [openIndex, setOpenIndex] = useState(null)
  const { columns, shorter } = splitColumns(photos)

  return (
    // Break out of the centered column to use the full window width
    <div className="w-screen ml-[calc(50%-50vw)] px-5">
      <div className="max-w-[1800px] mx-auto">
        {isPhone ? (
          <div className="gallery-columns">
            {columns.map((column, c) => (
              <div key={c} className="gallery-column">
                {column.map(({ photo, index }) => (
                  <Tile key={photo.base} photo={photo} index={index} onOpen={setOpenIndex} />
                ))}
                {c === shorter && <InstagramCard />}
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery-justified">
            {photos.map((photo, index) => (
              <Tile key={photo.base} photo={photo} index={index} onOpen={setOpenIndex} />
            ))}
            <InstagramCard />
          </div>
        )}
      </div>

      <Lightbox photos={photos} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </div>
  )
}

export default PhotoGallery
