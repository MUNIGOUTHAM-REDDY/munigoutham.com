import { type FC, useEffect, useRef, useState } from "react"
import { motion, useSpring } from "motion/react"

interface Position {
  x: number
  y: number
}

export type CursorVariant = "default" | "pointer" | "text" | "grab" | "grabbing"

export interface SmoothCursorProps {
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)"

const POINTER_SELECTOR =
  'a[href], button:not([disabled]), [role="button"], [role="link"], summary, label[for], select, [data-cursor="pointer"], .cursor-pointer'
const TEXT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="color"]):not([type="file"]), textarea, [contenteditable="true"], [data-cursor="text"]'
const GRAB_SELECTOR = '[data-cursor="grab"], .cursor-grab'
const GRABBING_SELECTOR = '[data-cursor="grabbing"], .cursor-grabbing'

function isTrackablePointer(pointerType: string) {
  return pointerType !== "touch"
}

function detectVariant(el: Element | null): CursorVariant {
  if (!el) return "default"
  if (el.closest(GRABBING_SELECTOR)) return "grabbing"
  if (el.closest(GRAB_SELECTOR)) return "grab"
  if (el.closest(TEXT_SELECTOR)) return "text"
  if (el.closest(POINTER_SELECTOR)) return "pointer"
  return "default"
}

const ArrowCursorSVG: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={54}
    viewBox="0 0 50 54"
    fill="none"
    style={{ scale: 0.5 }}
  >
    <g filter="url(#smooth_cursor_shadow)">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="black"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="white"
        strokeWidth={2.25825}
      />
    </g>
    <defs>
      <filter
        id="smooth_cursor_shadow"
        x={0.602397}
        y={0.952444}
        width={49.0584}
        height={52.428}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2.25825} />
        <feGaussianBlur stdDeviation={2.25825} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
)

const PointerCursorSVG: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
    <circle cx={14} cy={14} r={6} fill="#87C23B" />
    <circle cx={14} cy={14} r={12} stroke="#ffffff" strokeOpacity={0.85} strokeWidth={1.5} />
  </svg>
)

const TextCursorSVG: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={36} viewBox="0 0 16 36" fill="none">
    <path
      d="M3 2c1.5 0 3 .8 5 0M3 34c1.5 0 3-.8 5 0M8 3v30"
      stroke="#ffffff"
      strokeOpacity={0.95}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 2c1.5 0 3 .8 5 0M3 34c1.5 0 3-.8 5 0M8 3v30"
      stroke="#000000"
      strokeOpacity={0.35}
      strokeWidth={3.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      transform="translate(0.5 0.5)"
    />
  </svg>
)

const GrabCursorSVG: FC<{ grabbing?: boolean }> = ({ grabbing = false }) => {
  const gap = grabbing ? 4 : 6
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
      {[0, 1].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={14 + (col - 1) * gap}
            cy={14 + (row === 0 ? -gap / 2 : gap / 2)}
            r={1.8}
            fill="#ffffff"
            stroke="#000000"
            strokeOpacity={0.4}
            strokeWidth={0.8}
          />
        )),
      )}
    </svg>
  )
}

const VARIANT_ROTATES: Record<CursorVariant, boolean> = {
  default: true,
  pointer: false,
  text: false,
  grab: false,
  grabbing: false,
}

export function SmoothCursor({
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(Date.now())
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [variant, setVariant] = useState<CursorVariant>("default")

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  })
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches
      setIsEnabled(nextIsEnabled)

      if (!nextIsEnabled) {
        setIsVisible(false)
      }
    }

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    let timeout: ReturnType<typeof setTimeout> | null = null
    let pressedGrab = false

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastUpdateTime.current

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        }
      }

      lastUpdateTime.current = currentTime
      lastMousePos.current = currentPos
    }

    const smoothPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }

      setIsVisible(true)

      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      const detected = detectVariant(e.target as Element | null)
      const nextVariant: CursorVariant =
        pressedGrab && (detected === "grab" || detected === "grabbing") ? "grabbing" : detected
      setVariant((prev) => (prev === nextVariant ? prev : nextVariant))

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2),
      )

      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      if (VARIANT_ROTATES[nextVariant] && speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90

        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle

        scale.set(0.95)

        if (timeout !== null) {
          clearTimeout(timeout)
        }

        timeout = setTimeout(() => {
          scale.set(1)
        }, 150)
      } else if (!VARIANT_ROTATES[nextVariant]) {
        rotation.set(0)
        accumulatedRotation.current = 0
        previousAngle.current = 0
      }
    }

    let rafId = 0
    let lastEvent: PointerEvent | null = null
    const throttledPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) {
        return
      }
      lastEvent = e
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        if (lastEvent) smoothPointerMove(lastEvent)
        rafId = 0
      })
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) return
      const target = e.target as Element | null
      if (target && (target.closest(GRAB_SELECTOR) || target.closest(GRABBING_SELECTOR))) {
        pressedGrab = true
        setVariant("grabbing")
      }
    }
    const onPointerUp = () => {
      if (!pressedGrab) return
      pressedGrab = false
      const el = document.elementFromPoint(lastMousePos.current.x, lastMousePos.current.y)
      setVariant(detectVariant(el))
    }

    document.documentElement.classList.add("smooth-cursor-active")
    window.addEventListener("pointermove", throttledPointerMove, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    window.addEventListener("pointerup", onPointerUp, { passive: true })
    window.addEventListener("pointercancel", onPointerUp, { passive: true })

    return () => {
      window.removeEventListener("pointermove", throttledPointerMove)
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("pointercancel", onPointerUp)
      document.documentElement.classList.remove("smooth-cursor-active")
      if (rafId) cancelAnimationFrame(rafId)
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }, [cursorX, cursorY, rotation, scale, isEnabled])

  if (!isEnabled) {
    return null
  }

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{
        duration: 0.15,
      }}
    >
      <motion.div
        key={variant}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {variant === "pointer" && <PointerCursorSVG />}
        {variant === "text" && <TextCursorSVG />}
        {variant === "grab" && <GrabCursorSVG />}
        {variant === "grabbing" && <GrabCursorSVG grabbing />}
        {variant === "default" && <ArrowCursorSVG />}
      </motion.div>
    </motion.div>
  )
}
