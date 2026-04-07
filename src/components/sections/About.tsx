import { motion } from 'motion/react'
import { profile } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

const categoryLabels: Record<string, string> = {
  design: 'Design',
  development: 'Development',
  tools: 'Tools',
}

export default function About() {
  const categories = ['design', 'development', 'tools'] as const

  return (
    <section id="about" className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
      <SectionHeader title="About" subtitle="A little bit about me" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16">
        {/* Photo placeholder */}
        <motion.div
          className="aspect-square rounded-2xl bg-card border border-white/[0.06] flex items-center justify-center max-w-sm mx-auto lg:max-w-none w-full"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-white/20 text-sm font-['Montserrat',sans-serif]">
            Photo
          </span>
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="font-['Montserrat',sans-serif] font-bold text-2xl md:text-3xl text-white mb-6">
            {profile.headline}
          </h3>

          {profile.bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-white/50 leading-relaxed mb-4 last:mb-8"
            >
              {paragraph}
            </p>
          ))}

          {/* Skills */}
          <div className="space-y-5">
            {categories.map((cat) => {
              const skills = profile.skills.filter((s) => s.category === cat)
              if (skills.length === 0) return null
              return (
                <div key={cat}>
                  <p className="text-accent text-xs font-['Montserrat',sans-serif] font-bold uppercase tracking-widest mb-2">
                    {categoryLabels[cat]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="bg-white/5 text-white/60 rounded-full px-3 py-1 text-xs font-['Montserrat',sans-serif]"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
