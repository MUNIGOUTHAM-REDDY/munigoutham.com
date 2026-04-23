import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import ScrollHeader from '../components/ScrollHeader'

type Point = [number, number]
type Curve = [number, number, number, number]

interface Preset {
  name: string
  value: Curve
  hint?: string
}

const PRESETS: { group: string; items: Preset[] }[] = [
  {
    group: 'CSS defaults',
    items: [
      { name: 'linear', value: [0, 0, 1, 1], hint: 'No easing' },
      { name: 'ease', value: [0.25, 0.1, 0.25, 1], hint: 'Browser default' },
      { name: 'ease-in', value: [0.42, 0, 1, 1], hint: 'Starts slow' },
      { name: 'ease-out', value: [0, 0, 0.58, 1], hint: 'Ends slow' },
      { name: 'ease-in-out', value: [0.42, 0, 0.58, 1], hint: 'Both ends slow' },
    ],
  },
  {
    group: 'Material 3',
    items: [
      { name: 'Standard', value: [0.2, 0, 0, 1], hint: 'General motion' },
      { name: 'Emphasized decelerate', value: [0.05, 0.7, 0.1, 1], hint: 'Entering screen' },
      { name: 'Emphasized accelerate', value: [0.3, 0, 0.8, 0.15], hint: 'Exiting screen' },
    ],
  },
  {
    group: 'Classics',
    items: [
      { name: 'easeOutExpo', value: [0.16, 1, 0.3, 1], hint: 'Buttery, slows hard' },
      { name: 'easeInOutExpo', value: [0.87, 0, 0.13, 1], hint: 'Strong both ways' },
      { name: 'easeOutBack', value: [0.34, 1.56, 0.64, 1], hint: 'Overshoots at end' },
      { name: 'easeInOutBack', value: [0.68, -0.55, 0.32, 1.55], hint: 'Anticipation + overshoot' },
      { name: 'easeOutCirc', value: [0, 0.55, 0.45, 1], hint: 'Arc deceleration' },
    ],
  },
]

const INITIAL: Curve = [0.34, 1.56, 0.64, 1]

const VB_X = 0
const VB_Y = -200
const VB_W = 400
const VB_H = 800
const UNIT = 400

function cssToSvg([cx, cy]: Point): Point {
  return [cx * UNIT, (1 - cy) * UNIT]
}

function clampCurve([a, b, c, d]: Curve): Curve {
  return [
    Math.min(1, Math.max(0, a)),
    Math.min(2, Math.max(-1, b)),
    Math.min(1, Math.max(0, c)),
    Math.min(2, Math.max(-1, d)),
  ]
}

function fmt(n: number) {
  return Math.round(n * 1000) / 1000
}

function curveString(c: Curve) {
  return `cubic-bezier(${fmt(c[0])}, ${fmt(c[1])}, ${fmt(c[2])}, ${fmt(c[3])})`
}

function CurveEditor({ curve, onChange }: { curve: Curve; onChange: (c: Curve) => void }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = useState<null | 0 | 1>(null)

  const p1: Point = [curve[0], curve[1]]
  const p2: Point = [curve[2], curve[3]]
  const p1s = cssToSvg(p1)
  const p2s = cssToSvg(p2)
  const startS = cssToSvg([0, 0])
  const endS = cssToSvg([1, 1])

  useEffect(() => {
    if (dragging === null) return

    const handleMove = (e: PointerEvent) => {
      if (!svgRef.current) return
      const rect = svgRef.current.getBoundingClientRect()
      const svgX = ((e.clientX - rect.left) / rect.width) * VB_W + VB_X
      const svgY = ((e.clientY - rect.top) / rect.height) * VB_H + VB_Y
      const cx = svgX / UNIT
      const cy = 1 - svgY / UNIT
      if (dragging === 0) {
        onChange(clampCurve([cx, cy, curve[2], curve[3]]))
      } else {
        onChange(clampCurve([curve[0], curve[1], cx, cy]))
      }
    }

    const handleUp = () => setDragging(null)

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleUp)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
    }
  }, [dragging, curve, onChange])

  const path = `M ${startS[0]} ${startS[1]} C ${p1s[0]} ${p1s[1]}, ${p2s[0]} ${p2s[1]}, ${endS[0]} ${endS[1]}`

  return (
    <svg
      ref={svgRef}
      viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
      className="h-full w-full touch-none select-none"
    >
      {/* Unit box shading */}
      <rect x="0" y="0" width={UNIT} height={UNIT} fill="#87C23B" fillOpacity="0.025" />

      {/* Grid */}
      <g stroke="white" strokeOpacity="0.05" strokeWidth="1">
        {[0.25, 0.5, 0.75].map(t => (
          <line key={`v${t}`} x1={t * UNIT} y1={0} x2={t * UNIT} y2={UNIT} />
        ))}
        {[0.25, 0.5, 0.75].map(t => (
          <line key={`h${t}`} x1={0} y1={t * UNIT} x2={UNIT} y2={t * UNIT} />
        ))}
      </g>

      {/* Unit box outline */}
      <rect x="0" y="0" width={UNIT} height={UNIT} fill="none" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

      {/* Linear reference */}
      <line x1={startS[0]} y1={startS[1]} x2={endS[0]} y2={endS[1]} stroke="white" strokeOpacity="0.08" strokeDasharray="4 4" />

      {/* Handle guidelines */}
      <line x1={startS[0]} y1={startS[1]} x2={p1s[0]} y2={p1s[1]} stroke="#87C23B" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1={endS[0]} y1={endS[1]} x2={p2s[0]} y2={p2s[1]} stroke="#87C23B" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Curve */}
      <path d={path} fill="none" stroke="#87C23B" strokeWidth="3" strokeLinecap="round" />

      {/* Endpoints */}
      <circle cx={startS[0]} cy={startS[1]} r="6" fill="#87C23B" />
      <circle cx={endS[0]} cy={endS[1]} r="6" fill="#87C23B" />

      {/* Control handles */}
      {[p1s, p2s].map((pt, i) => (
        <g key={i} style={{ cursor: 'grab' }} onPointerDown={(e) => { e.preventDefault(); setDragging(i as 0 | 1) }}>
          <circle cx={pt[0]} cy={pt[1]} r="20" fill="transparent" />
          <circle
            cx={pt[0]}
            cy={pt[1]}
            r={dragging === i ? 11 : 9}
            fill="#06040d"
            stroke="#87C23B"
            strokeWidth="2.5"
            style={{ transition: 'r 0.15s' }}
          />
          <circle cx={pt[0]} cy={pt[1]} r="3" fill="#87C23B" />
        </g>
      ))}
    </svg>
  )
}

function AnimationPreview({ curve }: { curve: Curve }) {
  const [pos, setPos] = useState(0)
  const [duration, setDuration] = useState(1500)

  useEffect(() => {
    const id = window.setInterval(() => {
      setPos(p => (p === 0 ? 1 : 0))
    }, duration + 400)
    return () => window.clearInterval(id)
  }, [duration])

  const timing = `cubic-bezier(${curve[0]}, ${curve[1]}, ${curve[2]}, ${curve[3]})`

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#06040d]/40 p-6 md:p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Preview</span>
        <label className="flex items-center gap-3 text-xs text-white/50">
          Duration
          <input
            type="range"
            min={400}
            max={3000}
            step={100}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="accent-[#87C23B]"
          />
          <span className="tabular-nums text-white/70">{(duration / 1000).toFixed(1)}s</span>
        </label>
      </div>

      <div className="relative h-20 w-full overflow-hidden rounded-xl bg-white/[0.02]">
        <div className="absolute inset-y-0 left-6 right-6">
          <div
            className="absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-xl bg-gradient-to-br from-[#87C23B] to-[#5a8d1f] shadow-lg shadow-[#87C23B]/30"
            style={{
              left: `calc(${pos * 100}% - ${pos * 48}px)`,
              transition: `left ${duration}ms ${timing}`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-white/[0.02] p-3">
          <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-white/40">Translate</div>
          <div className="relative h-10 overflow-hidden">
            <div
              className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#87C23B]"
              style={{ left: `calc(${pos * 100}% - ${pos * 24}px)`, transition: `left ${duration}ms ${timing}` }}
            />
          </div>
        </div>
        <div className="rounded-lg bg-white/[0.02] p-3">
          <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-white/40">Scale</div>
          <div className="flex h-10 items-center justify-center">
            <div
              className="h-8 w-8 rounded-lg bg-[#87C23B]"
              style={{ transform: `scale(${pos === 1 ? 1.6 : 0.4})`, transition: `transform ${duration}ms ${timing}` }}
            />
          </div>
        </div>
        <div className="rounded-lg bg-white/[0.02] p-3">
          <div className="mb-2 text-[10px] uppercase tracking-[0.15em] text-white/40">Opacity</div>
          <div className="flex h-10 items-center justify-center">
            <div
              className="h-8 w-8 rounded-lg bg-[#87C23B]"
              style={{ opacity: pos === 1 ? 1 : 0.1, transition: `opacity ${duration}ms ${timing}` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function PresetButton({ preset, active, onClick }: { preset: Preset; active: boolean; onClick: () => void }) {
  const [a, b, c, d] = preset.value
  const path = `M 0 40 C ${a * 40} ${(1 - b) * 40}, ${c * 40} ${(1 - d) * 40}, 40 0`
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all ${
        active
          ? 'border-[#87C23B]/50 bg-[#87C23B]/[0.06]'
          : 'border-white/[0.06] bg-white/[0.01] hover:border-white/[0.14] hover:bg-white/[0.03]'
      }`}
    >
      <svg viewBox="-8 -8 56 56" className="h-8 w-8 shrink-0">
        <rect x="0" y="0" width="40" height="40" fill="none" stroke="white" strokeOpacity="0.06" />
        <path d={path} fill="none" stroke={active ? '#87C23B' : 'rgba(255,255,255,0.5)'} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="min-w-0 flex-1">
        <div className={`text-sm font-medium ${active ? 'text-[#87C23B]' : 'text-white/90'}`}>{preset.name}</div>
        {preset.hint && <div className="truncate text-[11px] text-white/40">{preset.hint}</div>}
      </div>
    </button>
  )
}

export default function BezierLab() {
  const [curve, setCurve] = useState<Curve>(INITIAL)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const cssString = useMemo(() => curveString(curve), [curve])

  const activePresetName = useMemo(() => {
    for (const group of PRESETS) {
      for (const p of group.items) {
        if (p.value.every((v, i) => Math.abs(v - curve[i]) < 0.001)) return p.name
      }
    }
    return null
  }, [curve])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssString)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      // noop
    }
  }

  return (
    <div className="min-h-screen bg-surface text-white">
      <ScrollHeader alwaysVisible showBackArrow />

      <section className="px-6 md:px-12 pt-28 md:pt-32 pb-16 max-w-6xl xl:max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to="/#playground" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-[#87C23B]">
            Playground / Bezier Lab
          </Link>
          <h1 className="mt-4 font-['Montserrat',sans-serif] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Bezier Lab
          </h1>
          <p className="mt-4 max-w-2xl font-['Cormorant_Garamond',serif] text-lg text-white/60 md:text-xl">
            A small playground for motion curves. Drag the handles to shape the easing, or study the presets to learn what great UI motion feels like.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-5"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-[#06040d]/40 p-5 md:p-6 lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Editor</span>
              <span className="text-[11px] text-white/40">Drag the circles</span>
            </div>
            <div className="aspect-[1/2] w-full">
              <CurveEditor curve={curve} onChange={setCurve} />
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="rounded-2xl border border-white/[0.06] bg-[#06040d]/40 p-5 md:p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Output</span>
                {activePresetName && (
                  <span className="text-[11px] font-medium text-[#87C23B]">{activePresetName}</span>
                )}
              </div>
              <div className="rounded-lg bg-black/40 p-4 font-mono text-sm text-white/90 break-all">
                {cssString}
              </div>
              <button
                onClick={handleCopy}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-[#87C23B]/40 hover:text-[#87C23B]"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </>
                )}
              </button>

              <div className="mt-5 grid grid-cols-4 gap-2">
                {(['x1', 'y1', 'x2', 'y2'] as const).map((label, i) => (
                  <div key={label} className="rounded-lg bg-white/[0.02] px-2 py-2 text-center">
                    <div className="text-[10px] uppercase tracking-[0.15em] text-white/40">{label}</div>
                    <div className="mt-1 font-mono text-sm tabular-nums text-white/80">{fmt(curve[i])}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.06] bg-[#06040d]/40 p-5 md:p-6">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Presets</div>
              <div className="flex flex-col gap-5">
                {PRESETS.map(group => (
                  <div key={group.group}>
                    <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">{group.group}</div>
                    <div className="flex flex-col gap-1.5">
                      {group.items.map(preset => (
                        <PresetButton
                          key={preset.name}
                          preset={preset}
                          active={preset.value.every((v, i) => Math.abs(v - curve[i]) < 0.001)}
                          onClick={() => setCurve(preset.value)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-5"
        >
          <AnimationPreview curve={curve} />
        </motion.div>
      </section>
    </div>
  )
}
