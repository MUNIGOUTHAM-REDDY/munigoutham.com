import { motion } from 'motion/react'
import { experiences } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
      <SectionHeader title="Work Experience" />

      <div className="relative ml-4 md:ml-6">
        <div className="space-y-12">
          {experiences.map((exp, i) => {
            const isCurrent = exp.endDate === null
            const isLast = i === experiences.length - 1
            return (
              <motion.div
                key={exp.id}
                className="relative pl-8 md:pl-10"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-2 w-2.5 h-2.5 rounded-full -translate-x-1/2 border-2 ${
                    isCurrent
                      ? 'bg-accent border-accent shadow-[0_0_8px_rgba(135,194,59,0.4)]'
                      : 'bg-surface border-white/30'
                  }`}
                />
                {/* Connector line to next dot */}
                {!isLast && (
                  <div className="absolute left-0 top-4 bottom-[-3rem] w-px -translate-x-1/2 bg-white/10" />
                )}

                <h3 className="font-['Montserrat',sans-serif] font-bold text-xl md:text-2xl text-white mb-2">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-x-2.5 text-base md:text-lg mb-3">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/55 underline decoration-white/20 underline-offset-2 hover:text-accent hover:decoration-accent/40 transition-colors inline-flex items-center gap-1.5"
                    >
                      {exp.company}
                      <svg width="13" height="13" viewBox="0 0 12 12" fill="none" className="opacity-60">
                        <path d="M3.5 1.5H10.5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-white/55">{exp.company}</span>
                  )}
                  <span className="text-white/20">·</span>
                  <span className="text-white/40">{exp.startDate} - {exp.endDate ?? 'Present'}</span>
                </div>

                {exp.description.length > 0 && (
                  <p className="text-white/60 text-base md:text-lg leading-relaxed md:max-w-3xl">
                    {exp.description[0]}
                  </p>
                )}

                {exp.apps && exp.apps.length > 0 && (
                  <div className="flex items-center gap-5 mt-3">
                    {exp.apps.map((app) => (
                      <a
                        key={app.name}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-12 h-12 rounded-2xl ring-1 ring-white/15 group-hover:scale-110 group-hover:ring-white/30 transition-all duration-200"
                        />
                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs font-['Montserrat',sans-serif] font-medium whitespace-nowrap group-hover:text-white transition-colors">
                          {app.name}
                        </span>
                      </a>
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
