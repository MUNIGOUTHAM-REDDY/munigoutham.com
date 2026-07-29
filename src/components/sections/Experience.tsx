import { motion } from 'motion/react'
import { experiences } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

/**
 * The timeline as a lit path.
 *
 * Roles hang off a single wire like the lantern hangs off the branch in the
 * hero. The role you're in now is still burning — warm, haloed, with a slow
 * pulse. Everything behind you has gone cool and dim. That's the whole
 * hierarchy, and it's carried by light rather than by a colour swap on a
 * 2.5px dot.
 */

function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3.5 1.5H10.5V8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 1.5L1.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative">
      <div
        aria-hidden
        className="bloom"
        style={{ top: '10%', left: '2%', width: 460, height: 460 }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-24 md:px-12 md:py-32">
        <SectionHeader
          title="Where I've Worked"
          eyebrow="Experience"
        />

        <div className="relative">
          {/* The wire. Fades in at the top and out at the bottom so it reads
              as strung between two points rather than cropped. */}
          <div
            aria-hidden
            className="absolute bottom-2 left-0 top-2 w-px"
            style={{
              background:
                'linear-gradient(180deg, rgba(230,237,246,0) 0%, rgba(230,237,246,0.16) 14%, rgba(230,237,246,0.16) 82%, rgba(230,237,246,0) 100%)',
            }}
          />

          <div className="space-y-14 md:space-y-16">
            {experiences.map((exp, i) => {
              const isCurrent = exp.endDate === null
              return (
                <motion.div
                  key={exp.id}
                  className="relative pl-9 md:pl-14"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* The lantern on the wire. */}
                  <span
                    aria-hidden
                    className={`absolute left-0 top-[0.55rem] block -translate-x-1/2 rounded-full ${
                      isCurrent ? 'h-2 w-2' : 'h-1.5 w-1.5'
                    }`}
                    style={
                      isCurrent
                        ? {
                            background: 'var(--color-lantern-core)',
                            boxShadow:
                              '0 0 0 1px rgba(242,217,153,0.4), 0 0 14px 3px rgba(242,217,153,0.5), 0 0 36px 8px rgba(242,217,153,0.18)',
                            animation: 'sky-breathe 4.5s ease-in-out infinite',
                          }
                        : {
                            background: 'rgba(230,237,246,0.35)',
                            boxShadow: '0 0 0 1px rgba(5,4,10,1)',
                          }
                    }
                  />

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-normal leading-tight text-star md:text-3xl">
                      {exp.role}
                    </h3>
                    {isCurrent && (
                      <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-lantern">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[13px]">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-star/65 transition-colors duration-400 hover:text-leaf"
                      >
                        {exp.company}
                        <ExternalArrow className="h-2.5 w-2.5 opacity-60" />
                      </a>
                    ) : (
                      <span className="text-star/65">{exp.company}</span>
                    )}
                    <span className="text-star/20">·</span>
                    <span className="tabular-nums text-star/40">
                      {exp.startDate} — {exp.endDate ?? 'Present'}
                    </span>
                  </div>

                  {exp.description.length > 0 && (
                    <p className="mt-4 max-w-2xl font-sans text-[15px] leading-relaxed text-star/55">
                      {exp.description[0]}
                    </p>
                  )}

                  {exp.apps && exp.apps.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {exp.apps.map(app => (
                        <a
                          key={app.name}
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="lit lit-hover group inline-flex items-center gap-2.5 rounded-xl py-1.5 pl-1.5 pr-3.5 no-underline"
                        >
                          <img
                            src={app.icon}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="h-8 w-8 rounded-[9px] ring-1 ring-star/10"
                          />
                          <span className="font-sans text-xs text-star/70 transition-colors duration-400 group-hover:text-star">
                            {app.name}
                          </span>
                          <ExternalArrow className="h-2.5 w-2.5 text-star/30 transition-colors duration-400 group-hover:text-lantern" />
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
