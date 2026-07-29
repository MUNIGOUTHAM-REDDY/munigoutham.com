import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { navItems, contactInfo } from '../data/portfolio'
import { socialIcons } from './SocialIcons'

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <motion.span
        className="block h-0.5 w-6 bg-white rounded-full origin-left"
        animate={open ? { rotate: 45, y: -1 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-white rounded-full"
        animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-6 bg-white rounded-full origin-left"
        animate={open ? { rotate: -45, y: 1 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function ScrollHeader({ alwaysVisible = false, showBackArrow = false }: { alwaysVisible?: boolean; showBackArrow?: boolean }) {
  const [visible, setVisible] = useState(alwaysVisible)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    if (alwaysVisible) return
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [alwaysVisible])

  useEffect(() => {
    if (showBackArrow) return
    const sections = navItems
      .map((item) => ({ label: item.label, el: document.getElementById(item.sectionId) }))
      .filter((s): s is { label: string; el: HTMLElement } => Boolean(s.el))
    if (sections.length === 0) return

    const ratios = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
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
        if (topRatio > 0 && topId) {
          const match = navItems.find((n) => n.sectionId === topId)
          setActiveSection(match ? match.label : null)
        } else {
          setActiveSection(null)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    sections.forEach((s) => observer.observe(s.el))
    return () => observer.disconnect()
  }, [showBackArrow])

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false)
    if (window.location.pathname === '/') {
      setTimeout(() => scrollToSection(sectionId), 100)
    } else {
      window.location.href = `/#${sectionId}`
    }
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-void/90 backdrop-blur-sm border-b border-star/5 lg:hidden"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              {showBackArrow ? (
                <Link to="/" className="text-star/60 hover:text-star transition-colors text-xl">
                  &larr;
                </Link>
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  {activeSection && (
                    <motion.span
                      key={activeSection}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="font-sans text-[11px] uppercase tracking-[0.24em] text-star/70"
                    >
                      {activeSection}
                    </motion.span>
                  )}
                </AnimatePresence>
              )}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative z-50 p-2 -mr-2"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && visible && (
          <motion.div
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.sectionId}
                  onClick={() => handleNavClick(item.sectionId)}
                  className="font-display text-4xl font-light text-star/80 transition-colors duration-400 hover:text-lantern md:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-12 left-0 right-0 px-6 flex flex-wrap items-center justify-center gap-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
