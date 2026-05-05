import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { faqItems } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0 text-white/70"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  )
}

function FAQAccordionItem({ item }: { item: (typeof faqItems)[number] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-7 md:py-8 text-left"
      >
        <span className="font-['Montserrat',sans-serif] font-medium text-lg md:text-xl text-white">
          {item.question}
        </span>
        <ChevronIcon open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
            animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
            exit={{ height: 0, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/55 text-base md:text-lg leading-relaxed pb-7 md:pb-8 md:max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="px-6 md:px-12 py-20 md:py-28 max-w-5xl mx-auto">
      <SectionHeader title="FAQ" />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {faqItems.map((item) => (
          <FAQAccordionItem key={item.id} item={item} />
        ))}
      </motion.div>
    </section>
  )
}
