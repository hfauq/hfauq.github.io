import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production builds ship the page pre-rendered into index.html (scripts/prerender.mjs), so React
// attaches to that markup; the dev server serves an empty root and renders from scratch.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
