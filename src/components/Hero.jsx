/**
 * Hero Section Component
 * Displays the name, main heading, and intro paragraphs with links
 */
function Hero() {
  return (
    <section className="w-[800px] max-[1199px]:w-full mx-auto">
      <div>
        {/* First Paragraph - Name */}
        <h3 
          className="text-[18px] font-semibold text-[#74747B] dark:text-[#9B9BA0]"
          style={{ 
            letterSpacing: '-0.06px', 
            lineHeight: '1.5em',
            marginTop: 0,
            marginBottom: '24px'
          }}
        >
          Hugo Fauquenoi
        </h3>

        {/* Second Paragraph - Main Heading */}
        <p 
          className="text-[30px] font-medium text-[#EDEDED] mb-[24px]"
          style={{ 
            letterSpacing: '-0.01em', 
            lineHeight: '1.32em',
            fontWeight: 500,
            marginTop: 0,
            marginBottom: '24px'
          }}
        >
          I'm a product person with a passion for well-crafted tools, surf, and film photography.
        </p>

        {/* Third Paragraph - First Body Text */}
        <p 
          className="text-[18px] text-[#9D9DA4] mb-[24px]"
          style={{ 
            letterSpacing: '-0.06px', 
            lineHeight: '1.5em',
            marginTop: 0,
            marginBottom: '24px'
          }}
        >
          I'm currently shaping products at{' '}
          <a
            href="https://todoist.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0099ff] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED]"
          >
            Todoist
          </a>
          {' '}where we empower people with simple yet powerful productivity tools.
        </p>

        {/* Fourth Paragraph - Second Body Text */}
        <p 
          className="text-[18px] text-[#9D9DA4]"
          style={{ 
            letterSpacing: '-0.06px', 
            lineHeight: '1.5em',
            marginTop: 0,
            marginBottom: 0
          }}
        >
          Find me on{' '}
          <a
            href="https://x.com/hfauq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0099ff] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED]"
          >
            X
          </a>
          {' '}and{' '}
          <a
            href="https://linkedin.com/in/hfauq"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0099ff] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED]"
          >
            LinkedIn
          </a>
          {' '}where I (sometimes) talk about product, and{' '}
          <a 
            href="https://instagram.com/hfauq" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#0099ff] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED]"
          >
            Instagram
          </a>
          {' '}where I share what I see behind the camera.
        </p>
      </div>
    </section>
  )
}

export default Hero
