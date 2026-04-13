import { motion } from 'motion/react'
import { profile } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

const tools = [
  { name: 'Figma', slug: 'figma' },
  { name: 'Claude Code', slug: 'claude' },
  { name: 'Notion', slug: 'notion' },
  { name: 'Mixpanel', slug: 'mixpanel' },
  { name: 'PostHog', slug: 'posthog' },
  { name: 'Supabase', slug: 'supabase' },
]

function ToolMarquee() {
  const doubled = [...tools, ...tools]
  return (
    <div className="relative overflow-hidden mt-12">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#06040d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#06040d] to-transparent z-10 pointer-events-none" />
      <div className="flex animate-marquee w-max">
        {doubled.map((tool, i) => (
          <div key={i} className="flex flex-col items-center gap-3 px-8 md:px-10 shrink-0">
            <img
              src={`https://cdn.simpleicons.org/${tool.slug}/ffffff`}
              alt={tool.name}
              className="w-7 h-7 md:w-8 md:h-8 opacity-40"
              loading="lazy"
            />
            <span className="text-white/30 text-[10px] md:text-xs font-['Montserrat',sans-serif] whitespace-nowrap">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
      <SectionHeader title="About Me" />

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
              className="text-white/50 leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      </div>

      <ToolMarquee />
    </section>
  )
}
