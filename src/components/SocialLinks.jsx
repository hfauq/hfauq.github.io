import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from 'react-icons/fa6'

/**
 * SocialLinks Component
 * Row of icon buttons linking to each profile (hfauq everywhere)
 */
const links = [
  { name: 'Twitter (X)', url: 'https://x.com/hfauq', Icon: FaXTwitter },
  { name: 'GitHub', url: 'https://github.com/hfauq', Icon: FaGithub },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/hfauq', Icon: FaLinkedin },
  { name: 'Instagram', url: 'https://instagram.com/hfauq', Icon: FaInstagram },
  { name: 'YouTube', url: 'https://youtube.com/@hfauq', Icon: FaYoutube },
]

function SocialLinks() {
  return (
    // Negative margin lines the first glyph up with the text above
    <nav aria-label="Social profiles" className="flex flex-wrap items-center gap-1 -ml-2.5">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          title={link.name}
          className="inline-flex size-10 items-center justify-center rounded-full text-[#74747B] dark:text-[#9B9BA0] hover:text-[#050505] dark:hover:text-[#EDEDED] hover:bg-black/5 dark:hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4700] transition-colors"
        >
          <link.Icon className="size-5" aria-hidden="true" />
        </a>
      ))}
    </nav>
  )
}

export default SocialLinks
