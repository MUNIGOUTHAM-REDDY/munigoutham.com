import { motion } from 'motion/react'
import { playgroundItems } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

export default function Playground() {
  return (
    <section id="playground" className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
      <SectionHeader title="Playground" subtitle="Experiments and side projects" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {playgroundItems.map((item, i) => (
          <motion.article
            key={item.id}
            className="group bg-card rounded-3xl border border-white/[0.06] overflow-hidden transition-all hover:border-accent/20 hover:rotate-1 hover:scale-[1.02]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            {/* Image placeholder with gradient */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-accent/10 via-transparent to-white/[0.02] flex items-center justify-center">
              <span className="text-white/15 text-sm font-['Montserrat',sans-serif]">
                Preview
              </span>
              <span className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm text-white/70 rounded-full px-2.5 py-0.5 text-[10px] font-['Montserrat',sans-serif] font-medium">
                {item.category}
              </span>
            </div>

            <div className="p-5">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-base text-white mb-1.5">
                {item.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
