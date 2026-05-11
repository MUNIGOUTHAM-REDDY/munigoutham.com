import { useEffect, useRef, useState } from 'react'
import { contactInfo, navItems, projects } from '../../data/portfolio'
import { socialIcons } from '../SocialIcons'

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const node = footerRef.current
    if (!node) return
    const update = () => setHeight(node.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(node)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const caseStudies = projects.filter((p) => p.slug)
  const year = new Date().getFullYear()

  return (
    <>
      <div aria-hidden style={{ height }} />
      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-0 overflow-hidden bg-[#06040d] text-white"
      >
        {/* Accent radial glow at bottom right */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 85% 100%, rgba(135,194,59,0.22) 0%, rgba(135,194,59,0.06) 35%, rgba(6,4,13,0) 70%)',
          }}
        />
        {/* Subtle top hairline gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
            {/* Brand + tagline + socials */}
            <div className="col-span-2 md:col-span-5">
              <div className="mb-6">
                <span className="font-['Montserrat',sans-serif] font-semibold text-[#87C23B] text-2xl md:text-3xl tracking-tight uppercase">
                  MUNI GOUTHAM
                </span>
              </div>
              <p className="max-w-md text-white/65 text-[15px] leading-relaxed font-['Montserrat',sans-serif] mb-8">
                Product Designer working end-to-end across SaaS, fintech, and consumer apps. Open to full-time opportunities. Let&apos;s build something worth shipping.
              </p>
              <div className="flex items-center gap-4">
                {contactInfo.socials.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="inline-flex items-center justify-center"
                  >
                    {socialIcons[social.platform] || (
                      <span className="text-sm font-['Montserrat',sans-serif] text-white/40 hover:text-white transition-colors">
                        {social.platform}
                      </span>
                    )}
                  </a>
                ))}
              </div>
              <p className="mt-12 text-[10px] uppercase tracking-[0.22em] text-white/35 font-['Montserrat',sans-serif]">
                DESIGN STUDIO OF ONE.
              </p>
            </div>

            {/* Spacer column on desktop only */}
            <div className="hidden md:block md:col-span-1" aria-hidden />

            {/* Browse */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-white text-[15px] font-medium font-['Montserrat',sans-serif] mb-5 tracking-tight">
                Browse
              </h4>
              <ul className="space-y-3.5">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      onClick={() => scrollToSection(item.sectionId)}
                      className="text-white/55 hover:text-white text-sm font-['Montserrat',sans-serif] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-white text-[15px] font-medium font-['Montserrat',sans-serif] mb-5 tracking-tight">
                Connect
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-white/55 hover:text-white text-sm font-['Montserrat',sans-serif] transition-colors"
                  >
                    Email
                  </a>
                </li>
                {contactInfo.socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/55 hover:text-white text-sm font-['Montserrat',sans-serif] transition-colors"
                    >
                      {social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Studies */}
            <div className="col-span-2 md:col-span-2">
              <h4 className="text-white text-[15px] font-medium font-['Montserrat',sans-serif] mb-5 tracking-tight">
                Case Studies
              </h4>
              <ul className="space-y-3.5">
                {caseStudies.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.slug}
                      className="text-white/55 hover:text-white text-sm font-['Montserrat',sans-serif] transition-colors"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider + meta row */}
          <div className="mt-16 border-t border-white/10" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-6">
            <p className="text-white/45 text-xs font-['Montserrat',sans-serif]">
              © {year} Muni Goutham. Designed &amp; built by hand.
            </p>
            <p className="text-white/30 text-[10px] font-['Montserrat',sans-serif]">
              Icons by{' '}
              <a
                href="https://www.flaticon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/60 transition-colors underline underline-offset-2"
              >
                Flaticon
              </a>
            </p>
          </div>
        </div>

        {/* Giant wordmark. Sized to fit horizontally with side padding; bottom of letterforms clips slightly at footer edge. */}
        <div
          aria-hidden
          className="relative w-full overflow-hidden px-6 md:px-12"
          style={{ height: 'clamp(2.8rem, 8vw, 9rem)' }}
        >
          <span
            className="absolute inset-x-6 md:inset-x-12 bottom-0 -mb-[0.18em] block whitespace-nowrap font-['Montserrat',sans-serif] font-bold tracking-[-0.045em] text-transparent bg-clip-text select-none text-center"
            style={{
              fontSize: 'min(11.5vw, 13rem)',
              lineHeight: 1,
              backgroundImage:
                'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.34) 55%, rgba(255,255,255,0.6) 100%)',
            }}
          >
            MUNI GOUTHAM
          </span>
        </div>
      </footer>
    </>
  )
}
