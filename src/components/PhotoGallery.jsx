/**
 * PhotoGallery Component
 * Displays a vertical stack of photos with location captions
 */
function PhotoGallery() {
  const photos = [
    { 
      location: "Biarritz, France", 
      image: "/images/surf.jpeg"
    },
    { 
      location: "Isle of Skye, Scotland", 
      image: "/images/scotland.jpeg"
    },  
    { 
      location: "Fuerteventura, Spain", 
      image: "/images/fuerteventura.jpeg"
    },
    { 
      location: "Tenerife, Spain", 
      image: "/images/tenerife-laura.jpeg"
    },
    { 
      location: "Lanzarote, Spain", 
      image: "/images/lanzarote.jpeg"
    },
    { 
      location: "Tenerife, Spain", 
      image: "/images/tenerife.jpeg"
    },
  ]

  return (
    <div className="space-y-2">
      {/* Photo Stack - Vertical */}
      <div className="flex flex-col gap-2">
        {photos.map((photo, index) => (
          <div key={index} className="flex flex-col items-start min-[1200px]:items-end gap-2">
            {/* Photo */}
            <div className="w-full rounded-[10px] overflow-hidden" style={{ aspectRatio: '640/428' }}>
              <img 
                src={photo.image}
                alt={photo.location}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
            
            {/* Location Caption */}
            <p 
              className="text-[#74747B] dark:text-[#9B9BA0] text-left min-[1200px]:text-right"
              style={{ 
                fontSize: '15px',
                letterSpacing: '-0.06px',
                lineHeight: '1.4em'
              }}
            >
              {photo.location}
            </p>
          </div>
        ))}
      </div>

      {/* More Photos Link */}
      <div className="pt-6">
        <a 
          href="https://instagram.com/hfauq"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#0099ff] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED]"
          style={{ 
            fontSize: '18px',
            letterSpacing: '-0.06px',
            lineHeight: '1.5em'
          }}
        >
          More photos →
        </a>
      </div>
    </div>
  )
}

export default PhotoGallery

