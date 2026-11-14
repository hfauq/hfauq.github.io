import { useSyncExternalStore } from 'react'

// The page theme lives on <html data-theme>. index.html sets it before first paint; this
// module reads it, flips it, and remembers the visitor's choice on their device.
// Everything touches `document` lazily so the page can also be pre-rendered at build time.
const THEME_COLORS = { light: '#FBF9F5', dark: '#11141D' }

const getTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

// The build can't know a visitor's theme. It renders the light label; colors come from CSS
// and are right from the first paint, and the label corrects itself once the page is live.
const getServerTheme = () => 'light'

const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function setTheme(theme) {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Private mode or blocked storage: the switch still works, it just isn't remembered
  }
  const apply = () => {
    document.documentElement.dataset.theme = theme
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', THEME_COLORS[theme]))
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (document.startViewTransition && !reduceMotion) document.startViewTransition(apply)
  else apply()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}
