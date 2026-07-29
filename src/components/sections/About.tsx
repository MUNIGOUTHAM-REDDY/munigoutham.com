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
    <div className="relative mt-16 overflow-hidden">
      {/* Edge fades match the night base, not the old flat black. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
      <div className="flex w-max animate-marquee">
        {doubled.map((tool, i) => (
          <div key={i} className="flex shrink-0 flex-col items-center gap-3 px-9 md:px-12">
            <img
              src={`https://cdn.simpleicons.org/${tool.slug}/e6edf6`}
              alt=""
              aria-hidden="true"
              className="h-6 w-6 opacity-35"
              loading="lazy"
            />
            <span className="whitespace-nowrap font-sans text-[10px] uppercase tracking-[0.16em] text-star/30">
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
    <section id="about" className="relative">
      <div
        aria-hidden
        className="bloom"
        style={{ top: '12%', right: '-4%', width: 560, height: 560 }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-12 md:py-32">
        <SectionHeader title="About Me" eyebrow="Who You'd Be Hiring" />

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="max-w-lg font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-light leading-[1.1] text-star">
              {profile.headline}
            </h3>

            <div className="mt-8 max-w-lg space-y-4">
              {profile.bio.map((paragraph, i) => (
                <p key={i} className="font-sans text-[15px] leading-relaxed text-star/55">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative order-1 mx-auto w-full max-w-sm md:order-2 lg:max-w-none"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Light behind the figure, so the portrait sits in the scene
                rather than on it. */}
            <div
              aria-hidden
              className="bloom"
              style={{ inset: '-14%', width: 'auto', height: 'auto' }}
            />
            <div className="relative aspect-square">
              <img
                src="/images/profile-photo.webp"
                alt="Muni Goutham"
                loading="lazy"
                className="h-full w-full object-cover"
                style={{
                  /* A real radial mask dissolves the photo into the night.
                     The old version stacked two inset box-shadows keyed to
                     flat black, which would leave a visible dark ring now
                     that the page base is violet. */
                  WebkitMaskImage:
                    'radial-gradient(ellipse 68% 68% at 50% 45%, #000 42%, transparent 78%)',
                  maskImage:
                    'radial-gradient(ellipse 68% 68% at 50% 45%, #000 42%, transparent 78%)',
                }}
              />
            </div>
          </motion.div>
        </div>

        <ToolMarquee />
      </div>
    </section>
  )
}
