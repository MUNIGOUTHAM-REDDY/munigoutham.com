import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { faqItems } from '../../data/portfolio'

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0 text-white/60"
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

function FAQAccordionItem({
  item,
  defaultOpen = false,
}: {
  item: (typeof faqItems)[number]
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-6 py-7 md:py-8 text-left group"
      >
        <span className="font-['Montserrat',sans-serif] font-medium text-xl md:text-2xl text-white tracking-tight">
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
      <motion.div
        className="relative isolate text-center mb-16 md:mb-24 py-16 md:py-24"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_30%,transparent_75%)]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <h2 className="font-['Montserrat',sans-serif] font-bold text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05]">
          Before You Ask
          <br />
          Here&rsquo;s Everything.
        </h2>
        <p className="font-['Montserrat',sans-serif] mt-5 md:mt-6 text-lg md:text-xl text-white/45">
          Quick, honest, to the point.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {faqItems.map((item, index) => (
          <FAQAccordionItem key={item.id} item={item} defaultOpen={index === 0} />
        ))}
      </motion.div>
    </section>
  )
}
