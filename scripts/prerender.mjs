import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const SITE = 'https://munigoutham.com'

const routes = [
  {
    path: '/case-study/mindsnack',
    title: 'Mindsnack — Solo-designed iOS learning app | Muni Goutham',
    description: 'Solo-designed Mindsnack end-to-end: onboarding, lessons, and App Store presence. 31.9% conversion rate, 10% fewer cancellations.',
    image: '/og/mindsnack.png',
    type: 'article',
  },
  {
    path: '/case-study/trial-cancellation-fix',
    title: 'Trial Cancellation Fix — UX research case study | Muni Goutham',
    description: 'One screen cut trial cancellations by 10%. Users were not unhappy, they were scared of surprise charges. I removed the fear.',
    image: '/og/trial-fix.png',
    type: 'article',
  },
  {
    path: '/case-study/cards-to-articles',
    title: 'Cards to Articles — Format pivot case study | Muni Goutham',
    description: 'Killed the card-based lesson format and rebuilt it as articles. Stopped competing with TikTok, started competing on depth.',
    image: '/og/cards-to-articles.png',
    type: 'article',
  },
]

const indexPath = path.join(dist, 'index.html')
if (!fs.existsSync(indexPath)) {
  console.error('[prerender] dist/index.html missing — run `vite build` first.')
  process.exit(1)
}
const baseHtml = fs.readFileSync(indexPath, 'utf-8')

function setTag(html, regex, replacement) {
  if (regex.test(html)) return html.replace(regex, replacement)
  console.warn(`[prerender] tag not found, skipping: ${regex}`)
  return html
}

for (const r of routes) {
  const url = `${SITE}${r.path}`
  const ogImage = `${SITE}${r.image}`
  let html = baseHtml

  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${r.title}</title>`)
  html = setTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${r.description}$2`)
  html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = setTag(html, /(<meta property="og:type" content=")[^"]*(")/, `$1${r.type}$2`)
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${r.title}$2`)
  html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${r.description}$2`)
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
  html = setTag(html, /(<meta property="og:image" content=")[^"]*(")/, `$1${ogImage}$2`)
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${r.title}$2`)
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${r.description}$2`)
  html = setTag(html, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${ogImage}$2`)

  const outDir = path.join(dist, r.path)
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
  console.log(`[prerender] ${r.path} -> ${path.relative(root, path.join(outDir, 'index.html'))}`)
}
