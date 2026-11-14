import { photos } from '../photos'

/**
 * PhotoGallery Component
 * Full-width justified gallery: every row fills the width at an even height and each
 * photo keeps its own aspect ratio, so vertical and horizontal shots mix without cropping.
 * On hover, shows the place, camera and settings, plus a film-style date stamp.
 */

// "2026-10-09" -> "'26 10 09", like the date imprint on a film point-and-shoot
function dateStamp(date) {
  const [year, month, day] = date.split('-')
  return `'${year.slice(2)} ${month} ${day}`
}

function PhotoGallery() {
  return (
    // Break out of the centered column to use the full window width
    <div className="w-screen ml-[calc(50%-50vw)] px-5">
      <div className="gallery max-w-[1800px] mx-auto">
        {photos.map((photo, index) => (
          <figure
            key={photo.src}
            className="gallery-item group"
            style={{ '--ratio': photo.width / photo.height }}
          >
            <img
              src={photo.src}
              alt={[photo.location, photo.camera && `shot on ${photo.camera}`].filter(Boolean).join(', ') || 'Photo'}
              width={photo.width}
              height={photo.height}
              loading={index < 6 ? 'eager' : 'lazy'}
              decoding="async"
              className="block w-full h-auto motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-[1.03]"
            />
            <figcaption className="gallery-caption">
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
        ))}
      </div>
    </div>
  )
}

export default PhotoGallery
