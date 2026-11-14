import { useState, useSyncExternalStore } from 'react'
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
  return columns
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

  return (
    // Break out of the centered column to use the full window width
    <div className="w-screen ml-[calc(50%-50vw)] px-5">
      <div className="max-w-[1800px] mx-auto">
        {isPhone ? (
          <div className="gallery-columns">
            {splitColumns(photos).map((column, c) => (
              <div key={c} className="gallery-column">
                {column.map(({ photo, index }) => (
                  <Tile key={photo.base} photo={photo} index={index} onOpen={setOpenIndex} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery-justified">
            {photos.map((photo, index) => (
              <Tile key={photo.base} photo={photo} index={index} onOpen={setOpenIndex} />
            ))}
          </div>
        )}
      </div>

      <Lightbox photos={photos} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
    </div>
  )
}

export default PhotoGallery
