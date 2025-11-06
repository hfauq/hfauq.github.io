/**
 * Location Section Component
 * Displays location header, photo, and text in a stacked layout
 */
function Location() {
  return (
    <section className="w-[800px] max-[1199px]:w-full mx-auto">
      <div className="flex flex-col gap-2">
        {/* Header */}
        <h3 
          className="text-[18px] font-semibold text-[#74747B] dark:text-[#9B9BA0]"
          style={{ letterSpacing: '-0.06px', lineHeight: '1.5em' }}
        >
          Location
        </h3>

        {/* Photo and Location Text */}
        <div className="flex flex-col items-start min-[1200px]:items-end gap-2">
          {/* Photo */}
          <div className="w-full rounded-[10px] overflow-hidden" style={{ aspectRatio: '640/356' }}>
            <img 
              src="/images/location.jpeg"
              alt="Biarritz, France"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Location Text */}
          <p 
            className="text-[15px] text-[#74747B] dark:text-[#9B9BA0] text-left min-[1200px]:text-right"
            style={{ 
              letterSpacing: '-0.06px', 
              lineHeight: '1.4em'
            }}
          >
            Biarritz, France
          </p>
        </div>
      </div>
    </section>
  )
}

export default Location

