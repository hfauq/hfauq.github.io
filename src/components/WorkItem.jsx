/**
 * WorkItem Component
 * Displays a single work experience entry in horizontal layout: Company | Divider | Role | Date
 */
function WorkItem({ company, companyUrl, role, period }) {
  return (
    <div className="flex flex-row items-center gap-2">
      {/* Company Name as Link */}
      <a 
        href={companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0099ff] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED] whitespace-nowrap text-[15px] min-[1200px]:text-[18px]"
        style={{ 
          letterSpacing: '-0.06px',
          lineHeight: '1.5em'
        }}
      >
        {company}
      </a>

      {/* Divider Line */}
      <div className="flex-1 h-px bg-[#CAC5D3] dark:bg-[#515151] min-w-[1px]"></div>

      {/* Role */}
      <p 
        className="text-[#74747B] dark:text-[#9B9BA0] whitespace-nowrap text-[15px] min-[1200px]:text-[18px]"
        style={{ 
          letterSpacing: '-0.06px',
          lineHeight: '1.5em'
        }}
      >
        {role}
      </p>

      {/* Time Period */}
      <p 
        className="text-[#74747B] dark:text-[#9B9BA0] whitespace-nowrap text-[15px] min-[1200px]:text-[18px]"
        style={{ 
          letterSpacing: '-0.06px',
          lineHeight: '1.5em'
        }}
      >
        {period}
      </p>
    </div>
  )
}

export default WorkItem

