import { build } from 'vite'
import { readFileSync, mkdirSync, writeFileSync, rmSync } from 'fs'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Build SSR bundle
console.log('Building SSR bundle...')
await build({
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist/server',
    rollupOptions: { output: { format: 'esm' } },
  },
  logLevel: 'warn',
})

// Load server entry
const { render, getAllRoutes } = await import(
  resolve(__dirname, 'dist/server/entry-server.js')
)

const template = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8')
const routes = getAllRoutes()

console.log(`Prerendering ${routes.length} routes...`)

let ok = 0
let fail = 0

for (const url of routes) {
  try {
    const { appHtml, meta } = render(url)

    const html = template
      .replace(
        '<title>Free Financial Calculators — finance-fast.com</title>',
        `<title>${escapeHtml(meta.title)}</title>`
      )
      .replace(
        'content="Free financial calculators for salary, mortgage, loans, and more."',
        `content="${escapeHtml(meta.description)}"`
      )
      .replace('<!--app-html-->', appHtml)

    const dir = url === '/'
      ? resolve(__dirname, 'dist')
      : resolve(__dirname, 'dist', url.slice(1))

    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
    ok++
  } catch (e) {
    console.warn(`  ⚠ skipped ${url}: ${e.message}`)
    fail++
  }
}

// Clean up SSR bundle
rmSync(resolve(__dirname, 'dist/server'), { recursive: true, force: true })

console.log(`Done: ${ok} prerendered, ${fail} skipped.`)

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
