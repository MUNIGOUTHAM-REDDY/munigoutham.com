import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import type { ReactNode, CSSProperties } from 'react'

// --- Back Button ---
export function BackButton() {
  return (
    <Link
      to="/"
      className="fixed top-6 left-6 z-50 font-['Montserrat',sans-serif] text-xs text-white/60 hover:text-white bg-card/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 transition-colors"
    >
      &larr;
    </Link>
  )
}

// --- Fade-in on scroll ---
export function Fade({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// --- Phone Mockup ---
export function PhoneMockup({ src, caption, width = 220, glow, radius = 32 }: { src: string; caption?: string; width?: number; glow?: boolean; radius?: number }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div
        className={`overflow-hidden bg-[#111] ${glow ? 'border-2 border-accent shadow-[0_16px_48px_rgba(135,194,59,0.2)]' : 'border-2 border-white/10'}`}
        style={{ width, aspectRatio: '9/19.5', borderRadius: radius }}
      >
        <img
          src={src}
          alt={caption || ''}
          className="w-full h-full object-cover object-top"
          onError={e => {
            const el = e.target as HTMLImageElement
            el.style.display = 'none'
            el.parentElement!.innerHTML = `<div class="text-white/20 text-[10px] font-mono text-center p-4">${caption || 'Add screen'}</div>`
          }}
        />
      </div>
      {caption && <p className="text-[10px] text-white/30 font-['Montserrat',sans-serif]">{caption}</p>}
    </div>
  )
}

// --- Section Label ---
export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="font-['Montserrat',sans-serif] text-[11px] tracking-[0.2em] uppercase text-accent mb-3">
      {children}
    </p>
  )
}

// --- Accent Divider ---
export function AccentDivider() {
  return <div className="w-12 h-0.5 bg-accent mb-7" />
}

// --- Section Heading ---
export function SectionH({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <h2 className={`font-['Montserrat',sans-serif] font-bold text-[clamp(24px,4vw,44px)] leading-[1.15] max-w-[680px] mb-5 ${light ? 'text-white' : 'text-white'}`}>
      {children}
    </h2>
  )
}

// --- Body Paragraph ---
export function Body({ children, light, style }: { children: ReactNode; light?: boolean; style?: CSSProperties }) {
  return (
    <p className={`text-base leading-[1.75] max-w-[580px] ${light ? 'text-white/50' : 'text-white/60'}`} style={style}>
      {children}
    </p>
  )
}

// --- Section Wrapper ---
export function Section({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`px-6 md:px-[8vw] py-20 md:py-24 ${className}`}>
      {children}
    </section>
  )
}

// --- Stat Card ---
export function StatCard({ value, label, sub, color = '#87C23B' }: { value: string; label: string; sub: string; color?: string }) {
  return (
    <div className="bg-card border border-white/[0.06] rounded-2xl p-6 md:p-7 text-center" style={{ borderTopColor: color, borderTopWidth: 3 }}>
      <div className="font-['Montserrat',sans-serif] font-bold text-4xl md:text-5xl mb-1" style={{ color }}>{value}</div>
      <div className="font-['Montserrat',sans-serif] text-[10px] tracking-wider uppercase mb-1.5" style={{ color }}>{sub}</div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  )
}

// --- Info Card ---
export function InfoCard({ title, description, icon }: { title: string; description: string; icon?: string }) {
  return (
    <div className="bg-card border border-white/[0.06] rounded-2xl p-5 md:p-6">
      {icon && <div className="text-xl mb-2">{icon}</div>}
      <div className="font-['Montserrat',sans-serif] font-bold text-sm text-white mb-1.5">{title}</div>
      <div className="text-xs leading-relaxed text-white/55">{description}</div>
    </div>
  )
}

// --- Meta Row (Role, Company, etc.) ---
export function MetaRow({ items }: { items: [string, string][] }) {
  return (
    <div className="flex flex-wrap gap-6 md:gap-8">
      {items.map(([label, value]) => (
        <div key={label}>
          <span className="font-['Montserrat',sans-serif] text-[10px] tracking-[0.15em] uppercase text-white/50 block mb-0.5">{label}</span>
          <span className="text-sm font-semibold text-white">{value}</span>
        </div>
      ))}
    </div>
  )
}

// --- Case Study Footer ---
export function CaseStudyFooter({ links }: { links: { label: string; to: string }[] }) {
  return (
    <section className="px-6 md:px-[8vw] py-16 text-center">
      <Fade>
        <p className="font-['Cormorant_Garamond',serif] text-xl md:text-2xl text-white/60 mb-5">Read my other case studies</p>
        <div className="flex gap-3 justify-center flex-wrap">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="px-5 py-2.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 font-['Montserrat',sans-serif] text-[11px] tracking-wider uppercase transition-colors"
            >
              {link.label} &rarr;
            </Link>
          ))}
        </div>
      </Fade>
      <div className="mt-9 font-['Montserrat',sans-serif] text-[10px] text-white/20">Designed by Muni Goutham &middot; 2026</div>
    </section>
  )
}
