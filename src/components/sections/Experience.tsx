import { motion } from 'motion/react'
import { experiences } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
      <SectionHeader title="Experience" subtitle="Where I've worked" />

      <div className="relative ml-4 md:ml-6">
        {/* Timeline line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-white/10" />

        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const isCurrent = exp.endDate === null
            return (
              <motion.div
                key={exp.id}
                className="relative pl-8 md:pl-10"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-2 w-2.5 h-2.5 rounded-full -translate-x-1/2 border-2 ${
                    isCurrent
                      ? 'bg-accent border-accent shadow-[0_0_8px_rgba(135,194,59,0.4)]'
                      : 'bg-surface border-white/30'
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2">
                  <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-white">
                    {exp.role}
                  </h3>
                  <span className="text-white/40 text-sm">
                    {exp.company}
                  </span>
                </div>

                <p className="text-accent/70 text-xs font-['Montserrat',sans-serif] font-medium uppercase tracking-wider mb-3">
                  {exp.startDate} — {exp.endDate ?? 'Present'}
                </p>

                <ul className="space-y-2 mb-4">
                  {exp.description.map((desc, j) => (
                    <li
                      key={j}
                      className="text-white/50 text-sm leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-white/20"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>

                {exp.tags && (
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/5 text-white/60 rounded-full px-3 py-1 text-xs font-['Montserrat',sans-serif]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
