#!/usr/bin/env node
// Runs after `vite build` (see the build script in package.json): renders the app to HTML with the
// server bundle and writes it into dist/index.html, so the page shows before any JavaScript runs.
// Also preloads the main Inter font file so text doesn't flash in a fallback font.
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')
const indexPath = join(dist, 'index.html')

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href)
const appHtml = render()

let html = readFileSync(indexPath, 'utf8')
if (!html.includes('<!--app-html-->')) throw new Error('dist/index.html has no <!--app-html--> placeholder')
html = html.replace('<!--app-html-->', appHtml)

const interLatin = readdirSync(join(dist, 'assets')).find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f))
if (interLatin) {
  html = html.replace(
    '</title>',
    `</title>\n    <link rel="preload" href="/assets/${interLatin}" as="font" type="font/woff2" crossorigin>`,
  )
}

writeFileSync(indexPath, html)
rmSync(ssrDir, { recursive: true, force: true })
console.log(`Pre-rendered index.html (${Math.round(appHtml.length / 1024)} KB of markup${interLatin ? ', Inter preloaded' : ''})`)
