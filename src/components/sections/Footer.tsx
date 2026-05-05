import { useEffect, useRef, useState } from 'react'
import { contactInfo, navItems } from '../../data/portfolio'
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

  return (
    <>
      <div aria-hidden style={{ height }} />
      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 z-0 bg-[#111] border-t border-white/10"
      >
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Logo + Brand */}
        <div className="flex items-center justify-center mb-10">
          <span className="font-['Montserrat',sans-serif] font-semibold text-white text-4xl md:text-5xl tracking-tight uppercase">
            Muni Goutham
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-14">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-white/50 hover:text-white transition-colors text-sm font-['Montserrat',sans-serif]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Dotted divider */}
        <div className="border-t border-dashed border-white/10 mb-8" />

        {/* Copyright + Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="text-white/30 text-sm font-['Montserrat',sans-serif]">
              &copy; {new Date().getFullYear()} Muni Goutham
            </p>
            <p className="text-white/20 text-[10px] font-['Montserrat',sans-serif]">
              Icons by{' '}
              <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white/40 transition-colors underline underline-offset-2">
                Flaticon
              </a>
            </p>
          </div>

          <div className="flex items-center gap-5">
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
        </div>
      </div>
      </footer>
    </>
  )
}
