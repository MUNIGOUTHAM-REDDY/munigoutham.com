import { motion } from 'motion/react'

interface SectionHeaderProps {
  title: string
  /** Small label above the title. Falls back to the title if omitted. */
  eyebrow?: string
  subtitle?: string
  action?: React.ReactNode
}

/**
 * The marker that says "a new part of the night starts here".
 *
 * The old version stamped a green star and a bold sans title six times with
 * an identical blur-in — which is exactly what made the page feel generated.
 * This one arrives as light does: the rule draws out from the left, the
 * label warms up, then the title lifts. Same curve as everything else, but
 * a choreography of its own so the eye registers a beat rather than a
 * repeat.
 */
export default function SectionHeader({ title, eyebrow, subtitle, action }: SectionHeaderProps) {
  return (
    <motion.header
      className="mb-14 md:mb-20"
      initial="rest"
      whileInView="lit"
      viewport={{ once: true, margin: '-90px' }}
      transition={{ staggerChildren: 0.09 }}
    >
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">
          {/* Eyebrow: a lit point on a line, then the label. */}
          <motion.div
            className="flex items-center gap-3"
            variants={{
              rest: { opacity: 0 },
              lit: { opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            <span
              className="h-1 w-1 shrink-0 rounded-full bg-lantern"
              style={{ boxShadow: '0 0 8px 1px rgba(242,217,153,0.7)' }}
            />
            <motion.span
              className="h-px w-8 origin-left shrink-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(242,217,153,0.6), rgba(230,237,246,0))',
              }}
              variants={{
                rest: { scaleX: 0 },
                lit: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
            />
            <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-star/45">
              {eyebrow ?? title}
            </span>
          </motion.div>

          <motion.h2
            className="mt-4 font-display text-display-sm font-light leading-[1.02] text-star"
            variants={{
              rest: { opacity: 0, y: 14 },
              lit: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {title}
          </motion.h2>

          {subtitle && (
            <motion.p
              className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-star/45"
              variants={{
                rest: { opacity: 0, y: 10 },
                lit: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {action && <div className="shrink-0 pb-1">{action}</div>}
      </div>
    </motion.header>
  )
}
