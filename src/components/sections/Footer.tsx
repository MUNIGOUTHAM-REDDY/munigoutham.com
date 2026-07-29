import { useEffect, useRef, useState } from 'react'
import { contactInfo, navItems, projects } from '../../data/portfolio'
import { socialIcons } from '../SocialIcons'
import footerFoliage from '../../assets/footer-foliage.webp'

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
        className="fixed bottom-0 left-0 right-0 z-0 overflow-hidden bg-night text-star"
      >
        {/* The page opens under the tree and closes back inside it. This is
            the hero painting with the sky knocked out — it was already in the
            repo at 3.2MB and had never been rendered. */}
        <img
          src={footerFoliage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom opacity-[0.42]"
          style={{
            WebkitMaskImage:
              'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 34%, #000 100%)',
            maskImage:
              'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 34%, #000 100%)',
          }}
        />
        {/* Foliage bounce, bottom right. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 85% 100%, rgba(135,194,59,0.16) 0%, rgba(135,194,59,0.05) 35%, rgba(8,7,15,0) 70%)',
          }}
        />
        {/* Lantern catching the top edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(242,217,153,0.32) 50%, transparent 100%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
            {/* Brand + tagline + socials */}
            <div className="col-span-2 md:col-span-5">
              <div className="mb-6">
                <span className="font-display text-3xl font-normal text-star md:text-4xl">
                  Muni Goutham
                </span>
              </div>
              <p className="max-w-md text-star/65 text-[15px] leading-relaxed font-sans mb-8">
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
                      <span className="text-sm font-sans text-star/40 hover:text-star transition-colors">
                        {social.platform}
                      </span>
                    )}
                  </a>
                ))}
              </div>
              <p className="mt-12 text-[10px] uppercase tracking-[0.22em] text-star/35 font-sans">
                DESIGN STUDIO OF ONE.
              </p>
            </div>

            {/* Spacer column on desktop only */}
            <div className="hidden md:block md:col-span-1" aria-hidden />

            {/* Browse */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-star text-[15px] font-medium font-sans mb-5 tracking-tight">
                Browse
              </h4>
              <ul className="space-y-3.5">
                {navItems.map((item) => (
                  <li key={item.sectionId}>
                    <button
                      onClick={() => scrollToSection(item.sectionId)}
                      className="text-star/55 hover:text-star text-sm font-sans transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-star text-[15px] font-medium font-sans mb-5 tracking-tight">
                Connect
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-star/55 hover:text-star text-sm font-sans transition-colors"
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
                      className="text-star/55 hover:text-star text-sm font-sans transition-colors"
                    >
                      {social.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Case Studies */}
            <div className="col-span-2 md:col-span-2">
              <h4 className="text-star text-[15px] font-medium font-sans mb-5 tracking-tight">
                Case Studies
              </h4>
              <ul className="space-y-3.5">
                {caseStudies.map((p) => (
                  <li key={p.id}>
                    <a
                      href={p.slug}
                      className="text-star/55 hover:text-star text-sm font-sans transition-colors"
                    >
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider + meta row */}
          <div className="mt-16 border-t border-star/10" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-6">
            <p className="text-star/45 text-xs font-sans">
              © {year} Muni Goutham. Designed &amp; built by hand.
            </p>
            <p className="text-star/30 text-[10px] font-sans">
              Icons by{' '}
              <a
                href="https://www.flaticon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-star/60 transition-colors underline underline-offset-2"
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
          {/* Tracking and weight retuned for Cormorant — the old -0.045em was
              drawn for Montserrat and collapses a serif into itself. */}
          <span
            className="absolute inset-x-6 bottom-0 -mb-[0.14em] block select-none whitespace-nowrap bg-clip-text text-center font-display font-light tracking-[-0.005em] text-transparent md:inset-x-12"
            style={{
              fontSize: 'min(13.5vw, 15rem)',
              lineHeight: 1,
              backgroundImage:
                'linear-gradient(180deg, rgba(230,237,246,0.10) 0%, rgba(230,237,246,0.26) 55%, rgba(242,217,153,0.44) 100%)',
            }}
          >
            Muni Goutham
          </span>
        </div>
      </footer>
    </>
  )
}
