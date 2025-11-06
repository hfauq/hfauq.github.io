/**
 * PodcastItem Component
 * Displays a podcast appearance in horizontal layout: Title | Divider | Date
 */
function PodcastItem({ title, url, date }) {
  return (
    <div className="flex flex-row items-center gap-2">
      {/* Podcast Title as Link */}
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#0099ff] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED] whitespace-nowrap text-[15px] min-[1200px]:text-[18px]"
        style={{ 
          letterSpacing: '-0.06px',
          lineHeight: '1.5em'
        }}
      >
        {title}
      </a>

      {/* Divider Line */}
      <div className="flex-1 h-px bg-[#CAC5D3] dark:bg-[#515151] min-w-[1px]"></div>

      {/* Date */}
      <p 
        className="text-[#74747B] dark:text-[#9B9BA0] whitespace-nowrap text-[15px] min-[1200px]:text-[18px]"
        style={{ 
          letterSpacing: '-0.06px',
          lineHeight: '1.5em'
        }}
      >
        {date}
      </p>
    </div>
  )
}

export default PodcastItem

