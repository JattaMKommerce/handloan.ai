/**
 * Static-site generation step (runs after `vite build` + `vite build --ssr`).
 * Renders every route in src/routes.js to plain HTML so search engines, Meta's
 * ad-review crawler and link previews see the full page without JavaScript.
 *
 * Output: dist/index.html, dist/<page>/index.html, dist/404.html, dist/sitemap.xml
 * Also prints every "[TODO: …]" placeholder still visible on the site.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, routes, site, configWarnings } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.brand,
  legalName: site.company.legalName,
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  email: site.contact.email,
  telephone: site.contact.phoneHref,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1st Floor, Shop No. 220, Building No. 3, Citi Mall, Link Road, Andheri (West)',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400053',
    addressCountry: 'IN',
  },
  sameAs: Object.values(site.social).filter(Boolean),
}

function head(route) {
  const url = route.page === 'notFound' ? site.url : `${site.url}${route.path}`
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    route.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.brand)}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${site.url}/images/og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
  if (route.page === 'home') {
    tags.push(`<script type="application/ld+json">${JSON.stringify(orgJsonLd)}</script>`)
  }
  return tags.join('\n    ')
}

const todos = new Map()
for (const route of routes) {
  const appHtml = render(route)
  const html = template.replace('<!--app-head-->', head(route)).replace('<!--app-html-->', appHtml)

  const out =
    route.path === '/'
      ? path.join(dist, 'index.html')
      : route.path.endsWith('.html')
        ? path.join(dist, route.path)
        : path.join(dist, route.path, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, html)

  for (const m of appHtml.matchAll(/\[TODO: ([^\]]+)\]/g)) {
    const label = m[1].replace(/&amp;/g, '&').replace(/&#x27;/g, "'")
    if (!todos.has(label)) todos.set(label, new Set())
    todos.get(label).add(route.path)
  }
  console.log(`  ✓ ${route.path.padEnd(24)} → ${path.relative(root, out)}`)
}

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => !r.noindex)
  .map((r) => `  <url><loc>${site.url}${r.path}</loc><lastmod>${lastmod}</lastmod></url>`)
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.rmSync(ssrDir, { recursive: true, force: true })

console.log(`\n  ${routes.length} pages pre-rendered + sitemap.xml\n`)

const warnings = configWarnings()
if (todos.size || warnings.length) {
  console.log('  ⚠  NOT READY FOR META ADS — fill these in src/config/site.js:\n')
  for (const [label, pages] of todos) console.log(`   • [TODO] ${label}\n       on: ${[...pages].join(', ')}`)
  for (const w of warnings) console.log(`   • ${w}`)
  console.log('')
} else {
  console.log('  ✅ No TODO placeholders found — content is complete.\n')
}
