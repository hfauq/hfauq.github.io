/**
 * Section Component
 * Creates a stacked layout with header above content
 */
function Section({ label, children }) {
  return (
    <section className="w-[800px] max-[1199px]:w-full mx-auto">
      <div className="flex flex-col gap-2">
        {/* Header */}
        <h3 
          className="text-[18px] font-semibold text-[#74747B] dark:text-[#9B9BA0]"
          style={{ letterSpacing: '-0.06px', lineHeight: '1.5em' }}
        >
          {label}
        </h3>

        {/* Content */}
        <div>
          {children}
        </div>
      </div>
    </section>
  )
}

export default Section

