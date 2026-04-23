import { useEffect, useRef, Children, type ReactNode } from 'react'

interface CardStackProps {
  children: ReactNode
  header?: ReactNode
  startScale?: number
  holdVh?: number
  className?: string
}

export default function CardStack({ children, header, startScale = 0.9, holdVh = 10, className = '' }: CardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const rafRef = useRef<number>(0)

  const items = Children.toArray(children)
  const count = items.length
  const animatingCount = count - 1

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const update = () => {
      const rect = container.getBoundingClientRect()
      const scrolled = -rect.top
      const vh = window.innerHeight

      cardRefs.current.forEach((card, i) => {
        if (!card) return

        if (i === 0) {
          card.style.transform = 'scale(1)'
          card.style.opacity = '1'
          return
        }

        const start = (i - 1) * vh
        const end = i * vh
        const progress = Math.max(0, Math.min(1, (scrolled - start) / (end - start)))

        const scale = startScale + progress * (1 - startScale)
        const translateY = (1 - progress) * 100
        const opacity = Math.min(1, progress * 4)

        card.style.transform = `translateY(${translateY}%) scale(${scale})`
        card.style.opacity = `${opacity}`
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [count, animatingCount, startScale, holdVh])

  const containerHeightVh = animatingCount * 100 + 100 + holdVh

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', height: `${containerHeightVh}vh` }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '40px 0',
        }}
      >
        <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 md:px-12">
          {header}
          <div style={{ position: 'relative' }}>
            {items.map((child, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el }}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  top: i === 0 ? undefined : 0,
                  left: i === 0 ? undefined : 0,
                  width: i === 0 ? undefined : '100%',
                  height: i === 0 ? undefined : '100%',
                  zIndex: i + 1,
                  willChange: 'transform, opacity',
                  transformOrigin: 'center center',
                  opacity: i === 0 ? 1 : 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {child}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
