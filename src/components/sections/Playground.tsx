import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { playgroundItems, type PlaygroundItem } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

function screenshotSrc(url: string, width = 1600, height = 1000) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`
}

function TileFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#06040d]/40 transition-colors duration-500 hover:border-white/[0.14] ${className}`}
    >
      {children}
    </div>
  )
}

function TileMeta({ item, showArrow = true }: { item: PlaygroundItem; showArrow?: boolean }) {
  return (
    <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7">
      <div className="mb-3 flex flex-wrap gap-3">
        {item.tags.map(tag => (
          <span key={tag} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-['Montserrat',sans-serif] text-xl font-bold tracking-tight text-white transition-colors group-hover:text-[#87C23B] md:text-2xl">
            {item.title}
          </h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-white/55">
            {item.description}
          </p>
        </div>
        {showArrow && (
          <svg
            className="mb-1 h-5 w-5 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#87C23B]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7V16" />
          </svg>
        )}
      </div>
    </div>
  )
}

function ScreenshotTile({ item }: { item: PlaygroundItem }) {
  return (
    <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
      <TileFrame>
        <img
          src={screenshotSrc(item.externalUrl!)}
          alt={`${item.title} screenshot`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top opacity-70 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06040d] via-[#06040d]/70 to-transparent" />
        <TileMeta item={item} />
      </TileFrame>
    </a>
  )
}

function BezierTileArt() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="bezierStroke" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#87C23B" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#87C23B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="bezierGlow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#87C23B" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#87C23B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="200" height="200" fill="url(#bezierGlow)" />

      <g stroke="white" strokeOpacity="0.06" strokeWidth="0.5">
        {[40, 80, 120, 160].map(v => (
          <line key={`h${v}`} x1="20" y1={v} x2="180" y2={v} />
        ))}
        {[40, 80, 120, 160].map(v => (
          <line key={`v${v}`} x1={v} y1="20" x2={v} y2="180" />
        ))}
      </g>

      <line x1="20" y1="180" x2="180" y2="20" stroke="white" strokeOpacity="0.08" strokeDasharray="3 3" />

      {/* Handles: P0(20,180) → P1(30, 40), P3(180,20) → P2(160, 170) */}
      <line x1="20" y1="180" x2="30" y2="40" stroke="#87C23B" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="180" y1="20" x2="160" y2="170" stroke="#87C23B" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />

      <path d="M 20 180 C 30 40, 160 170, 180 20" fill="none" stroke="url(#bezierStroke)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Endpoints */}
      <circle cx="20" cy="180" r="3" fill="#87C23B" />
      <circle cx="180" cy="20" r="3" fill="#87C23B" />

      {/* Draggable control points (visual only) */}
      <circle cx="30" cy="40" r="5" fill="#06040d" stroke="#87C23B" strokeWidth="1.5" />
      <circle cx="160" cy="170" r="5" fill="#06040d" stroke="#87C23B" strokeWidth="1.5" />

      {/* Traveling dot */}
      <circle r="2.5" fill="#ffffff">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 20 180 C 30 40, 160 170, 180 20" />
      </circle>
    </svg>
  )
}

function BezierTile({ item }: { item: PlaygroundItem }) {
  return (
    <Link to={item.internalRoute!} className="block h-full">
      <TileFrame className="bg-gradient-to-br from-[#0b0818] via-[#06040d] to-[#06040d]">
        <BezierTileArt />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06040d] via-[#06040d]/40 to-transparent" />
        <div className="absolute left-6 top-6 z-10 flex items-center gap-2 md:left-7 md:top-7">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#87C23B] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#87C23B]" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#87C23B]">Interactive</span>
        </div>
        <TileMeta item={item} />
      </TileFrame>
    </Link>
  )
}

function PlaygroundTile({ item }: { item: PlaygroundItem }) {
  if (item.internalRoute) return <BezierTile item={item} />
  if (item.externalUrl) return <ScreenshotTile item={item} />
  return null
}

const TILE_SPAN: Record<string, string> = {
  'tessellate-resources': 'md:col-span-2',
  'bezier-lab': 'md:row-span-2',
  'tessellate-admin': 'md:col-span-1',
  'influencerhawa': 'md:col-span-1',
}

export default function Playground() {
  return (
    <section id="playground">
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <SectionHeader title="Playground" subtitle="Shipped side-projects and interactive tools" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[280px] md:gap-5"
        >
          {playgroundItems.map(item => (
            <div key={item.id} className={`h-[320px] md:h-auto ${TILE_SPAN[item.id] ?? ''}`}>
              <PlaygroundTile item={item} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
