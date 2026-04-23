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
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#010101] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#010101] to-transparent z-10 pointer-events-none" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-center">
        {/* Text content */}
        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Photo */}
        <motion.div
          className="relative aspect-square flex items-center justify-center max-w-sm mx-auto lg:max-w-none w-full order-1 md:order-2 overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img 
            src="/images/profile-photo.png" 
            alt="Profile" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Simple, soft edge blend using inset shadows that match the background */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_10px_#010101] pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_40px_20px_#010101] pointer-events-none" />
        </motion.div>
      </div>

      <ToolMarquee />
    </section>
  )
}
