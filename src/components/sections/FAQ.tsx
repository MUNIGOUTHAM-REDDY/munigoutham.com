import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { faqItems } from '../../data/portfolio'

/**
 * The heading block used to sit on a 64px technical grid with a radial mask —
 * a dashboard texture imported wholesale from a different design language.
 * It's night here, so the heading sits in haze instead.
 */

function Marker({ open }: { open: boolean }) {
  return (
    <span className="relative mt-2 flex h-3 w-3 shrink-0 items-center justify-center">
      <motion.span
        className="absolute h-px w-3 rounded-full"
        animate={{
          backgroundColor: open ? 'rgb(242 217 153)' : 'rgba(230,237,246,0.4)',
        }}
        transition={{ duration: 0.4 }}
      />
      <motion.span
        className="absolute h-3 w-px rounded-full"
        animate={{
          rotate: open ? 90 : 0,
          opacity: open ? 0 : 1,
          backgroundColor: open ? 'rgb(242 217 153)' : 'rgba(230,237,246,0.4)',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
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
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group flex w-full items-start gap-5 py-7 text-left md:py-8"
      >
        <Marker open={open} />
        <span
          className={`flex-1 font-display text-xl leading-snug transition-colors duration-500 md:text-2xl ${
            open ? 'text-lantern-core' : 'text-star group-hover:text-star/80'
          }`}
        >
          {item.question}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-8 pl-8 font-sans text-[15px] leading-relaxed text-star/55">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hairline" />
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative">
      <div
        aria-hidden
        className="bloom"
        style={{ top: '2%', left: '50%', width: 760, height: 620, transform: 'translateX(-50%)' }}
      />

      <div className="relative mx-auto w-full max-w-4xl px-6 py-24 md:px-12 md:py-32">
        <motion.div
          className="mb-16 text-center md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-display font-light leading-[1.02] text-star">
            Before You Ask
            <br />
            <span className="italic text-star/70">Here&rsquo;s Everything.</span>
          </h2>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.28em] text-star/40">
            Quick, honest, to the point
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {faqItems.map((item, index) => (
            <FAQAccordionItem key={item.id} item={item} defaultOpen={index === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
