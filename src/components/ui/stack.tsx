import { motion, useMotionValue, useTransform, type PanInfo } from 'motion/react'
import { useState, useEffect } from 'react'

interface CardRotateProps {
  children: React.ReactNode
  onSendToBack: () => void
  sensitivity: number
  disableDrag?: boolean
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [60, -60])
  const rotateY = useTransform(x, [-100, 100], [-60, 60])

  function handleDragEnd(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack()
    }
    x.set(0)
    y.set(0)
  }

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0 cursor-pointer" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  )
}

interface StackProps {
  randomRotation?: boolean
  sensitivity?: number
  sendToBackOnClick?: boolean
  cards?: React.ReactNode[]
  animationConfig?: { stiffness: number; damping: number }
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  mobileClickOnly?: boolean
  mobileBreakpoint?: number
  onTopChange?: (topIndex: number) => void
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  onTopChange,
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [mobileBreakpoint])

  const shouldDisableDrag = mobileClickOnly && isMobile
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag

  const [order, setOrder] = useState<number[]>(() =>
    cards.map((_, index) => index + 1),
  )

  // Only reset the order when the *count* of cards changes — not on every
  // parent re-render that produces a new array reference.
  useEffect(() => {
    setOrder(cards.map((_, index) => index + 1))
  }, [cards.length])

  const sendToBack = (id: number) => {
    setOrder(prev => {
      const next = [...prev]
      const idx = next.indexOf(id)
      if (idx === -1) return prev
      const [card] = next.splice(idx, 1)
      next.unshift(card)
      return next
    })
  }

  useEffect(() => {
    if (!onTopChange || order.length === 0) return
    const topId = order[order.length - 1]
    onTopChange(topId - 1)
  }, [order, onTopChange])

  useEffect(() => {
    if (autoplay && order.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = order[order.length - 1]
        sendToBack(topCardId)
      }, autoplayDelay)
      return () => clearInterval(interval)
    }
  }, [autoplay, autoplayDelay, order, isPaused])

  return (
    <div
      className="relative w-full h-full"
      style={{ perspective: 600 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {order.map((id, index) => {
        const content = cards[id - 1]
        if (!content) return null
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0
        return (
          <CardRotate
            key={id}
            onSendToBack={() => sendToBack(id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="rounded-2xl overflow-hidden w-full h-full"
              onClick={() => shouldEnableClick && sendToBack(id)}
              animate={{
                rotateZ: (order.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - order.length * 0.06,
                transformOrigin: '90% 90%',
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {content}
            </motion.div>
          </CardRotate>
        )
      })}
    </div>
  )
}
