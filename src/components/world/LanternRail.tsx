import { useEffect, useRef, useState } from 'react'
import { navItems } from '../../data/portfolio'

/**
 * In the painting, the lantern hangs from a wire strung off the tree branch.
 *
 * Here that wire runs down the left margin and the lantern rides it as you
 * scroll. So the scroll indicator isn't a widget bolted onto the design —
 * it's the same object from the hero, still doing the same job: showing you
 * where you are in the dark.
 *
 * Ticks mark each section at its true document position. The one you're in
 * lights up. Desktop only — on small screens the margin doesn't exist and
 * the hero's own bottom nav covers this.
 */

type Tick = { id: string; label: string; pct: number }

export default function LanternRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const lanternRef = useRef<HTMLDivElement>(null)
  const spillRef = useRef<HTMLDivElement>(null)
  // Rail height in px, kept in a ref so the scroll loop never reads layout.
  const railH = useRef(0)
  const [ticks, setTicks] = useState<Tick[]>([])
  const [active, setActive] = useState<string | null>(null)
  const [shown, setShown] = useState(false)

  // Measure where each section actually sits in the document. Re-measured on
  // resize and whenever images finish loading and shift the layout.
  useEffect(() => {
    const measure = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const next: Tick[] = []
      for (const item of navItems) {
        const el = document.getElementById(item.sectionId)
        if (!el) continue
        const top = el.getBoundingClientRect().top + window.scrollY
        next.push({
          id: item.sectionId,
          label: item.label,
          pct: Math.min(1, Math.max(0, top / docHeight)),
        })
      }
      setTicks(next)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('load', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('load', measure)
    }
  }, [])

  // Drive the lantern straight through the DOM. Writing transform on a ref
  // instead of through state keeps this off React's render path entirely —
  // one composited transform per frame, no reconciliation.
  useEffect(() => {
    let raf = 0
    let queued = false

    const measureRail = () => {
      railH.current = railRef.current?.getBoundingClientRect().height ?? 0
    }

    const apply = () => {
      queued = false
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0
      // Must be px, not a percentage: translateY(%) resolves against the
      // element's own 7px box, so the lantern would never leave the top.
      const y = `${progress * railH.current}px`
      if (lanternRef.current) lanternRef.current.style.transform = `translateY(${y})`
      if (spillRef.current) spillRef.current.style.transform = `translateY(${y})`
      setShown(window.scrollY > window.innerHeight * 0.6)
    }

    const onScroll = () => {
      if (queued) return
      queued = true
      raf = requestAnimationFrame(apply)
    }

    const onResize = () => {
      measureRail()
      onScroll()
    }

    measureRail()
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Which section is under the light right now.
  useEffect(() => {
    const els = navItems
      .map(n => document.getElementById(n.sectionId))
      .filter((e): e is HTMLElement => Boolean(e))
    if (!els.length) return

    const ratios = new Map<string, number>()
    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0)
        }
        let topId: string | null = null
        let topRatio = 0
        for (const [id, r] of ratios) {
          if (r > topRatio) {
            topRatio = r
            topId = id
          }
        }
        setActive(topRatio > 0 ? topId : null)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-8 top-24 bottom-24 z-30 hidden w-px lg:block ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transition: 'opacity 0.8s var(--ease-lantern)' }}
    >
      <div className="rail__wire" />

      {ticks.map(t => {
        const isActive = active === t.id
        return (
          <div
            key={t.id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${t.pct * 100}%` }}
          >
            <span
              className="block h-px w-2 -translate-x-1/2 rounded-full"
              style={{
                background: isActive
                  ? 'rgba(242,217,153,0.85)'
                  : 'rgba(230,237,246,0.28)',
                transition: 'background 0.5s var(--ease-lantern)',
              }}
            />
            <span
              className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.24em]"
              style={{
                color: isActive ? 'var(--color-lantern)' : 'rgba(230,237,246,0.3)',
                opacity: isActive ? 1 : 0,
                transform: `translateY(-50%) translateX(${isActive ? '0' : '-4px'})`,
                transition: 'opacity 0.5s var(--ease-lantern), transform 0.5s var(--ease-lantern), color 0.5s var(--ease-lantern)',
              }}
            >
              {t.label}
            </span>
          </div>
        )
      })}

      {/* The light it casts, and the lantern itself. */}
      <div ref={spillRef} className="rail__spill" />
      <div ref={lanternRef} className="rail__lantern" />
    </div>
  )
}
