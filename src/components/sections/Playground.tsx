import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { playgroundItems, type PlaygroundItem } from '../../data/portfolio'
import SectionHeader from './SectionHeader'
import Stack from '../ui/stack'
import Masonry, { type MasonryItem } from '../ui/masonry'
import FramerText from '../ui/framer-text'
import CoolThemeSwitch from '../ui/cool-theme-switch'

const COVER_ID = 'tessellate-resources'

function screenshotSrc(url: string, width = 1600, height = 1000) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`
}

const COVER_OVERRIDES: Record<string, string> = {
  'tessellate-resources': '/images/tessellate-cover.png',
}

const COVER_OVERRIDES_MOBILE: Record<string, string> = {
  'tessellate-resources': '/images/tessellate-cover-mobile.png',
}

function tileImageSrc(item: PlaygroundItem, viewport: 'desktop' | 'mobile' = 'desktop') {
  if (viewport === 'mobile' && COVER_OVERRIDES_MOBILE[item.id]) {
    return COVER_OVERRIDES_MOBILE[item.id]
  }
  return COVER_OVERRIDES[item.id] ?? screenshotSrc(item.externalUrl!)
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

function ScreenshotTileBare({ item }: { item: PlaygroundItem }) {
  const containMode = item.id in COVER_OVERRIDES
  return (
    <a
      href={item.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      aria-label={item.title}
    >
      <TileFrame>
        <img
          src={tileImageSrc(item, 'mobile')}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute inset-0 h-full w-full ${
            containMode ? 'object-cover object-center' : 'object-cover object-top'
          } transition-transform duration-700 group-hover:scale-[1.03]`}
        />
      </TileFrame>
    </a>
  )
}

function PlaygroundTileBare({ item }: { item: PlaygroundItem }) {
  if (item.externalUrl) return <ScreenshotTileBare item={item} />
  return null
}

function TileLabel({ item, delayIndex = 0 }: { item: PlaygroundItem; delayIndex?: number }) {
  return (
    <div className="px-1 pt-4">
      <FramerText
        as="h3"
        text={item.title}
        delay={delayIndex * 0.05}
        stagger={0.022}
        className="font-['Montserrat',sans-serif] text-2xl font-bold tracking-tight text-white"
      />
    </div>
  )
}

const TILE_HEIGHTS: Record<string, number> = {
  'tessellate-resources': 960,
  'bezier-lab': 960,
  'tessellate-admin': 960,
  'influencerhawa': 960,
}

function BezierArt() {
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="masonryBezierStroke" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#87C23B" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#87C23B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="masonryBezierGlow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#87C23B" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#87C23B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#masonryBezierGlow)" />
      <g stroke="white" strokeOpacity="0.06" strokeWidth="0.5">
        {[40, 80, 120, 160].map(v => (
          <line key={`h${v}`} x1="20" y1={v} x2="180" y2={v} />
        ))}
        {[40, 80, 120, 160].map(v => (
          <line key={`v${v}`} x1={v} y1="20" x2={v} y2="180" />
        ))}
      </g>
      <line x1="20" y1="180" x2="30" y2="40" stroke="#87C23B" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="180" y1="20" x2="160" y2="170" stroke="#87C23B" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 20 180 C 30 40, 160 170, 180 20" fill="none" stroke="url(#masonryBezierStroke)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="180" r="3" fill="#87C23B" />
      <circle cx="180" cy="20" r="3" fill="#87C23B" />
      <circle cx="30" cy="40" r="5" fill="#06040d" stroke="#87C23B" strokeWidth="1.5" />
      <circle cx="160" cy="170" r="5" fill="#06040d" stroke="#87C23B" strokeWidth="1.5" />
      <circle r="2.5" fill="#ffffff">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 20 180 C 30 40, 160 170, 180 20" />
      </circle>
    </svg>
  )
}

function MasonryCardContent({ item, idx }: { item: PlaygroundItem; idx: number }) {
  const isBezier = !!item.internalRoute
  const isCover = item.id in COVER_OVERRIDES
  const oneLiner = item.description.split('.')[0].trim()
  return (
    <>
      {isBezier ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0818] via-[#06040d] to-[#06040d]">
          <BezierArt />
        </div>
      ) : (
        <div
          className={`absolute inset-0 ${isCover ? 'bg-contain' : 'bg-cover'} bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${tileImageSrc(item)})` }}
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#06040d] via-[#06040d]/70 to-transparent" />
      {isBezier && (
        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#87C23B] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#87C23B]" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#87C23B]">Interactive</span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <FramerText
          as="h3"
          text={item.title}
          delay={idx * 0.05}
          stagger={0.022}
          className="font-['Montserrat',sans-serif] text-xl font-bold tracking-tight text-white"
        />
        <p className="mt-1.5 line-clamp-2 text-[13px] font-light leading-relaxed text-white/65">
          {oneLiner}.
        </p>
      </div>
    </>
  )
}

function FunModeToggle({ on, onChange }: { on: boolean; onChange: (next: boolean) => void }) {
  return (
    <div className="md:hidden">
      <CoolThemeSwitch
        checked={on}
        onChange={onChange}
        toggleSize={14}
        ariaLabel={on ? 'Fun mode on' : 'Fun mode off'}
      />
    </div>
  )
}

export default function Playground() {
  const navigate = useNavigate()
  const [funMode, setFunMode] = useState(false)
  const [topIndex, setTopIndex] = useState(0)
  const cover = playgroundItems.find(i => i.id === COVER_ID)
  const rest = playgroundItems.filter(i => i.id !== COVER_ID)
  const topItem = playgroundItems[topIndex] ?? playgroundItems[0]

  const stackCards = useMemo(
    () =>
      playgroundItems.map(item => (
        <div key={item.id} className="h-full w-full">
          <PlaygroundTileBare item={item} />
        </div>
      )),
    [],
  )

  const masonryItems: MasonryItem[] = playgroundItems.map((item, idx) => ({
    id: item.id,
    height: TILE_HEIGHTS[item.id] ?? 600,
    img: item.externalUrl ? tileImageSrc(item) : undefined,
    node: <MasonryCardContent item={item} idx={idx} />,
    onClick: () => {
      if (item.internalRoute) {
        navigate(item.internalRoute)
      } else if (item.externalUrl) {
        window.open(item.externalUrl, '_blank', 'noopener')
      }
    },
  }))

  return (
    <section id="playground">
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <SectionHeader
          title="Playground"
          action={<FunModeToggle on={funMode} onChange={setFunMode} />}
        />

        {/* Desktop — Masonry */}
        <div className="hidden md:block">
          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.06}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.97}
            blurToFocus
            labelHeight={0}
          />
        </div>

        {/* Mobile — Cover-led (default) */}
        {!funMode && cover && (
          <div className="grid grid-cols-1 gap-6 md:hidden">
            <div>
              <div className="h-[420px]">
                <PlaygroundTileBare item={cover} />
              </div>
              <TileLabel item={cover} delayIndex={0} />
            </div>
            {rest.map((item, i) => (
              <div key={item.id}>
                <div className="h-[260px]">
                  <PlaygroundTileBare item={item} />
                </div>
                <TileLabel item={item} delayIndex={i + 1} />
              </div>
            ))}
          </div>
        )}

        {/* Mobile — Fun mode: Draggable card stack */}
        {funMode && (
          <div className="md:hidden">
            <div className="mx-auto mb-5 min-h-[40px] w-full max-w-[320px] px-1">
              <FramerText
                key={topItem.id}
                as="h3"
                text={topItem.title}
                stagger={0.022}
                className="font-['Montserrat',sans-serif] text-2xl font-bold tracking-tight text-white"
              />
            </div>
            <div className="mx-auto h-[460px] w-full max-w-[320px]">
              <Stack
                randomRotation
                sensitivity={140}
                sendToBackOnClick={false}
                animationConfig={{ stiffness: 260, damping: 20 }}
                onTopChange={setTopIndex}
                cards={stackCards}
              />
            </div>
            <p className="mt-5 text-center text-sm font-light text-white/55">
              Drag a card to send it back. Tap to open.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
