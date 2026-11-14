/**
 * Section Component
 * Creates a stacked layout with header above content
 */
function Section({ label, children }) {
  return (
    <section className="w-full max-w-[800px] mx-auto">
      <div className="flex flex-col gap-4">
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

