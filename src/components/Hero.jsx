import SocialLinks from './SocialLinks'
import { useTheme } from '../theme'

/**
 * Hero Section Component
 * Displays the name, main heading, intro paragraph, and social links
 */
function Hero() {
  const yearsAtTodoist = new Date().getFullYear() - 2015
  const [theme, toggleTheme] = useTheme()
  const switchLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <section className="w-full max-w-[800px] mx-auto">
      <div>
        {/* Sun (light mode) or moon (dark mode), with its sky painted behind the page content.
            Tapping it switches the theme. */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={switchLabel}
            title={switchLabel}
            className="theme-toggle relative inline-flex text-[40px] leading-none select-none"
          >
            <span aria-hidden="true" className="sun-rays -z-10" />
            <span aria-hidden="true" className="moon-glow -z-10" />
            <span aria-hidden="true" className="sun">🌞</span>
            <span aria-hidden="true" className="moon">🌚</span>
          </button>
        </div>

        {/* First Paragraph - Name, with a handwritten "in Biarritz" note pointing at it */}
        <div className="flex items-center gap-1.5 mb-[24px]">
          <div className="flex items-center gap-2 shrink-0">
            {/* Decorative: the name sits right next to it. 96px source covers 3x screens */}
            <picture className="shrink-0">
              <source type="image/avif" srcSet="/images/avatar-96.avif" />
              <img src="/images/avatar-96.jpg" alt="" width="28" height="28" className="block size-7 rounded-full" />
            </picture>
            <h3
              className="text-[18px] font-semibold text-[#74747B] dark:text-[#9B9BA0]"
              style={{
                letterSpacing: '-0.06px',
                lineHeight: '1.5em',
                marginTop: 0,
                marginBottom: 0
              }}
            >
              Hugo Fauquenoi
            </h3>
          </div>

          <span className="note inline-flex items-center text-[#FF4700] dark:text-[#7B92ED]">
            <svg className="note-arrow" width="44" height="26" viewBox="0 0 44 26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path className="shaft" pathLength="1" d="M41 20C30 2 16 1 4 16" />
              <path className="head" pathLength="1" d="M10.7 14 4 16 4.5 9" />
            </svg>
            <span className="note-text">in Biarritz</span>
          </span>
        </div>

        {/* Intro - the main text, two paragraphs. The year count is pre-rendered at build time
            and recomputed in the browser, so it can differ right after New Year. */}
        <p
          className="text-[24px] font-medium text-[#050505] dark:text-[#EDEDED]"
          style={{
            letterSpacing: '-0.01em',
            lineHeight: '1.45em',
            marginTop: 0,
            marginBottom: '16px'
          }}
          suppressHydrationWarning
        >
          I've been building products at{' '}
          <a
            href="https://todoist.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF4700] dark:text-[#7B92ED] hover:underline dark:hover:text-[#8CA0ED]"
          >
            Todoist
          </a>
          {' '}for {yearsAtTodoist} years. We empower people with simple yet powerful productivity tools.
        </p>

        <p
          className="text-[24px] font-medium text-[#050505] dark:text-[#EDEDED]"
          style={{
            letterSpacing: '-0.01em',
            lineHeight: '1.45em',
            marginTop: 0,
            marginBottom: '24px'
          }}
        >
          I love surfing, photography, Kaytranada, and okonomiyaki.
        </p>

        <SocialLinks />
      </div>
    </section>
  )
}

export default Hero
