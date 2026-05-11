import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue
  const [value, setValue] = useState<number>(get)
  useEffect(() => {
    const handler = () => setValue(get)
    queries.forEach(q => matchMedia(q).addEventListener('change', handler))
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries.join('|')])
  return value
}

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image()
          img.src = src
          img.onload = img.onerror = () => resolve()
        }),
    ),
  )
}

export interface MasonryItem {
  id: string
  height: number
  img?: string
  node?: ReactNode
  label?: ReactNode
  onClick?: () => void
}

interface GridItem extends MasonryItem {
  x: number
  y: number
  w: number
  h: number
}

interface MasonryProps {
  items: MasonryItem[]
  ease?: string
  duration?: number
  stagger?: number
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random'
  scaleOnHover?: boolean
  hoverScale?: number
  blurToFocus?: boolean
  colorShiftOnHover?: boolean
  columnsOverride?: number
  labelHeight?: number
}

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.97,
  blurToFocus = true,
  colorShiftOnHover = false,
  columnsOverride,
  labelHeight = 56,
}: MasonryProps) {
  const responsiveCols = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [4, 3, 2, 2],
    1,
  )
  const columns = columnsOverride ?? responsiveCols

  const [containerRef, { width }] = useMeasure<HTMLDivElement>()
  const [imagesReady, setImagesReady] = useState(false)

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return { x: item.x, y: item.y }
    let direction = animateFrom
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right']
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom
    }
    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 }
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 }
      case 'left':
        return { x: -200, y: item.y }
      case 'right':
        return { x: window.innerWidth + 200, y: item.y }
      case 'center':
        return { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 }
      default:
        return { x: item.x, y: item.y + 100 }
    }
  }

  useEffect(() => {
    const urls = items.map(i => i.img).filter((s): s is string => Boolean(s))
    if (urls.length === 0) {
      setImagesReady(true)
      return
    }
    preloadImages(urls).then(() => setImagesReady(true))
  }, [items])

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return []
    const colHeights = new Array(columns).fill(0)
    const gap = 20
    const totalGaps = (columns - 1) * gap
    const columnWidth = (width - totalGaps) / columns

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights))
      const x = col * (columnWidth + gap)
      const height = child.height / 2
      const y = colHeights[col]
      colHeights[col] += height + labelHeight + gap
      return { ...child, x, y, w: columnWidth, h: height }
    })
  }, [columns, items, width, labelHeight])

  const containerHeight = useMemo(() => {
    if (!grid.length) return 0
    return Math.max(...grid.map(g => g.y + g.h + labelHeight))
  }, [grid, labelHeight])

  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    if (!imagesReady) return
    grid.forEach((item, index) => {
      const selector = `[data-masonry-key="${item.id}"]`
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h + labelHeight }
      if (!hasMounted.current) {
        const start = getInitialPosition(item)
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h + labelHeight,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          },
        )
      } else {
        gsap.to(selector, { ...animProps, duration, ease, overwrite: 'auto' })
      }
    })
    hasMounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, labelHeight])

  const handleMouseEnter = (_id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      const inner = element.querySelector('.masonry-card') as HTMLElement | null
      if (inner) gsap.to(inner, { scale: hoverScale, duration: 0.3, ease: 'power2.out' })
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement | null
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 })
    }
  }

  const handleMouseLeave = (_id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      const inner = element.querySelector('.masonry-card') as HTMLElement | null
      if (inner) gsap.to(inner, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement | null
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight ? `${containerHeight}px` : undefined }}
    >
      {grid.map(item => (
        <div
          key={item.id}
          data-masonry-key={item.id}
          role={item.onClick ? 'button' : undefined}
          tabIndex={item.onClick ? 0 : undefined}
          className={`absolute box-content${item.onClick ? ' cursor-pointer' : ''}`}
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={item.onClick}
          onKeyDown={item.onClick ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              item.onClick?.()
            }
          } : undefined}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="masonry-card relative w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-[#06040d]/40 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] transition-colors duration-500"
            style={{ height: `${item.h}px` }}
          >
            {item.node ? (
              item.node
            ) : item.img ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
              />
            ) : null}
            {colorShiftOnHover && (
              <div className="color-overlay pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#87C23B]/40 to-sky-500/40 opacity-0" />
            )}
          </div>
          {item.label && (
            <div
              className="flex items-center"
              style={{ height: `${labelHeight}px` }}
            >
              {item.label}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
