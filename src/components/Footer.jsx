/**
 * Footer Component
 * Name and credit, aligned to the same column as the page content
 */
function Footer() {
  return (
    <footer className="w-full max-w-[800px] mx-auto pt-[30px] border-t border-[rgb(226,228,233)] dark:border-[rgb(51,51,51)]">
      <div
        className="flex items-center justify-between gap-4 text-[#666666] dark:text-[#9B9BA0]"
        style={{
          fontSize: '14px',
          lineHeight: '1.5em'
        }}
      >
        <p>Hugo Fauquenoi</p>
        <p>Built with Claude Opus 5.5</p>
      </div>
    </footer>
  )
}

export default Footer
