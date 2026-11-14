import { useCallback, useEffect, useRef } from 'react'
import { FaArrowLeft, FaArrowRight, FaXmark } from 'react-icons/fa6'
import { altText, avifSrcSet, dateStamp, jpegSrc } from '../photoFormat'

/**
 * Lightbox Component
 * Minimal full-screen photo viewer on a native <dialog>: arrows or swipe to move,
 * Esc, the close button, a click outside the photo or the browser's back button to leave.
 */
function Lightbox({ photos, index, onChange, onClose }) {
  const dialogRef = useRef(null)
  const pointer = useRef(null)
  const swiped = useRef(false)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const open = index !== null
  const count = photos.length
  const photo = open ? photos[index] : null

  const go = useCallback((step) => onChange((i) => (i + step + count) % count), [onChange, count])

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // While open: lock page scroll, use arrow keys, and let the back button close the viewer
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }
    const onPop = () => onCloseRef.current()
    window.history.pushState({ lightbox: true }, '')
    window.addEventListener('keydown', onKey)
    window.addEventListener('popstate', onPop)

    return () => {
      root.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('popstate', onPop)
      if (window.history.state?.lightbox) window.history.back()
    }
  }, [open, go])

  const onPointerDown = (event) => {
    pointer.current = { x: event.clientX, y: event.clientY }
    swiped.current = false
  }

  const onPointerUp = (event) => {
    if (!pointer.current) return
    const dx = event.clientX - pointer.current.x
    const dy = event.clientY - pointer.current.y
    pointer.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true
      go(dx < 0 ? 1 : -1)
    }
  }

  // Clicking the dark area around the photo closes the viewer; a swipe never does
  const onClick = (event) => {
    if (swiped.current) {
      swiped.current = false
      return
    }
    if (event.target === event.currentTarget || event.target.classList.contains('lightbox-stage')) onClose()
  }

  const neighbours = open ? [photos[(index - 1 + count) % count], photos[(index + 1) % count]] : []

  return (
    <dialog ref={dialogRef} className="lightbox" aria-label="Photo viewer" onClose={onClose} onClick={onClick}>
      {photo && (
        <>
          <div className="lightbox-stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <picture key={photo.base} className="contents">
              <source type="image/avif" srcSet={avifSrcSet(photo)} sizes="100vw" />
              <img src={jpegSrc(photo)} alt={altText(photo)} width={photo.width} height={photo.height} className="lightbox-image" />
            </picture>
          </div>

          <button type="button" className="lightbox-button lightbox-close" onClick={onClose} aria-label="Close">
            <FaXmark aria-hidden="true" />
          </button>
          <button type="button" className="lightbox-button lightbox-prev" onClick={() => go(-1)} aria-label="Previous photo">
            <FaArrowLeft aria-hidden="true" />
          </button>
          <button type="button" className="lightbox-button lightbox-next" onClick={() => go(1)} aria-label="Next photo">
            <FaArrowRight aria-hidden="true" />
          </button>

          <div className="lightbox-caption">
            <div className="min-w-0">
              {photo.location && <div>{photo.location}</div>}
              {photo.camera && (
                <div className="gallery-meta">
                  {photo.camera}
                  {photo.settings && ` · ${photo.settings}`}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 shrink-0">
              {photo.date && <span className="gallery-stamp">{dateStamp(photo.date)}</span>}
              <span className="lightbox-count">{index + 1} / {count}</span>
            </div>
          </div>

          {/* Fetch the previous and next photos so moving between them feels instant */}
          <div hidden>
            {neighbours.map((p) => (
              <picture key={p.base}>
                <source type="image/avif" srcSet={avifSrcSet(p)} sizes="100vw" />
                <img src={jpegSrc(p)} alt="" />
              </picture>
            ))}
          </div>
        </>
      )}
    </dialog>
  )
}

export default Lightbox
