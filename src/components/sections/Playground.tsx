import { motion } from 'motion/react'
import { playgroundItems, type PlaygroundItem } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

/**
 * Things built outside client work.
 *
 * Previously this section carried two entirely separate implementations — a
 * GSAP masonry for desktop and a draggable card stack behind a "fun mode"
 * toggle for mobile — plus per-character text animation on every title. The
 * masonry was doing no masonry at all: all three tiles were pinned to the
 * same height, so 262 lines of GSAP produced a three-column grid. It is a
 * three-column grid now.
 */

function screenshotSrc(url: string, width = 1600, height = 1000) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}&h=${height}`
}

const COVER_OVERRIDES: Record<string, string> = {
  'tessellate-resources': '/images/tessellate-cover.png',
}

function tileImageSrc(item: PlaygroundItem) {
  return COVER_OVERRIDES[item.id] ?? screenshotSrc(item.externalUrl!)
}

function ArrowOut({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3.5 1.5H10.5V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlaygroundTile({ item, index }: { item: PlaygroundItem; index: number }) {
  const oneLiner = item.description.split('.')[0].trim()

  return (
    <motion.a
      href={item.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="lit lit-hover group flex h-full flex-col overflow-hidden rounded-2xl no-underline"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={tileImageSrc(item)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="cover absolute inset-0 h-full w-full object-cover object-top group-hover:scale-[1.04]"
        />
        {/* Night settles over the screenshot so it belongs to the scene
            instead of sitting on top of it like a pasted rectangle. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(5,4,10,0.15) 0%, rgba(5,4,10,0.05) 45%, rgba(8,7,15,0.92) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(85% 60% at 50% 0%, rgba(242,217,153,0.12) 0%, rgba(242,217,153,0) 70%)',
          }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-normal leading-tight text-star">
            {item.title}
          </h3>
          <ArrowOut className="mt-2 h-3 w-3 shrink-0 text-star/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lantern" />
        </div>

        <p className="mt-2 flex-1 font-sans text-[13px] leading-relaxed text-star/50">
          {oneLiner}.
        </p>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
          {item.tags.map(tag => (
            <span
              key={tag}
              className="font-sans text-[10px] uppercase tracking-[0.16em] text-star/35"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export default function Playground() {
  return (
    <section id="playground" className="relative">
      {/* Foliage bounce sitting behind the grid. */}
      <div
        aria-hidden
        className="bloom bloom--leaf"
        style={{ top: '18%', right: '-8%', width: 620, height: 620 }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-12 md:py-32 xl:max-w-7xl">
        <SectionHeader
          title="Playground"
          eyebrow="Side Projects"
          subtitle="Products I built end to end because I wanted them to exist."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {playgroundItems.map((item, i) => (
            <PlaygroundTile key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
