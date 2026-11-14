/**
 * ProjectItem Component
 * Displays a project in horizontal layout: Name | Divider | Date
 */
function ProjectItem({ name, url, date }) {
  const textStyle = {
    letterSpacing: '-0.06px',
    lineHeight: '1.5em'
  }

  return (
    <div className="flex flex-row items-center gap-2">
      {/* Project Name, linked when there's a public page */}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF4700] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED] text-[15px] sm:text-[18px]"
          style={textStyle}
        >
          {name}
        </a>
      ) : (
        <p
          className="text-[#050505] dark:text-[#EDEDED] text-[15px] sm:text-[18px]"
          style={textStyle}
        >
          {name}
        </p>
      )}

      {/* Divider Line */}
      <div className="flex-1 h-px bg-[#CAC5D3] dark:bg-[#515151] min-w-[24px]"></div>

      {/* Date */}
      <p
        className="text-[#74747B] dark:text-[#9B9BA0] whitespace-nowrap text-[15px] sm:text-[18px]"
        style={textStyle}
      >
        {date}
      </p>
    </div>
  )
}

export default ProjectItem
