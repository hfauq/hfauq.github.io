/**
 * Footer Component
 * Footer with name and location, matching original design
 */
function Footer() {
  return (
    <footer className="pt-[30px] border-t border-[rgb(226,228,233)] dark:border-[rgb(51,51,51)]">
      <div className="flex items-center justify-between max-w-[1000px] min-[1200px]:w-[800px] mx-auto">
        <p 
          className="text-[#666666] dark:text-[#9B9BA0]"
          style={{ 
            fontSize: '14px',
            lineHeight: '1.5em'
          }}
        >
          Hugo Fauquenoi
        </p>
        <p 
          className="text-[#666666] dark:text-[#9B9BA0]"
          style={{ 
            fontSize: '14px',
            lineHeight: '1.5em'
          }}
        >
          Biarritz
        </p>
      </div>
    </footer>
  )
}

export default Footer

