import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { navItems } from '../data/portfolio'

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

export default function ScrollHeader() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false)
    setTimeout(() => scrollToSection(sectionId), 100)
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-[#06040d]/90 backdrop-blur-md border-b border-white/5"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
              <button
                onClick={() => handleNavClick('hero')}
                className="font-['Montserrat',sans-serif] font-bold text-white text-lg tracking-tight"
              >
                Muni Goutham
              </button>
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
            className="fixed inset-0 z-40 bg-[#06040d]/95 backdrop-blur-lg flex items-center justify-center"
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
                  className="font-['Montserrat',sans-serif] font-bold text-3xl md:text-4xl text-white/80 hover:text-[#87C23B] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
