import { useSyncExternalStore } from 'react'

// The page theme lives on <html data-theme>. index.html sets it before first paint; this
// module reads it, flips it, and remembers the visitor's choice on their device.
const root = document.documentElement
const THEME_COLORS = { light: '#FBF9F5', dark: '#11141D' }

const getTheme = () => (root.dataset.theme === 'dark' ? 'dark' : 'light')

const subscribe = (onChange) => {
  const observer = new MutationObserver(onChange)
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function setTheme(theme) {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Private mode or blocked storage: the switch still works, it just isn't remembered
  }
  const apply = () => {
    root.dataset.theme = theme
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute('content', THEME_COLORS[theme]))
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (document.startViewTransition && !reduceMotion) document.startViewTransition(apply)
  else apply()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme)
  return [theme, () => setTheme(theme === 'dark' ? 'light' : 'dark')]
}
