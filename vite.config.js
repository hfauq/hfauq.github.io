import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is important for GitHub Pages deployment
  // It ensures assets are loaded correctly from the root domain
  base: '/',
})
