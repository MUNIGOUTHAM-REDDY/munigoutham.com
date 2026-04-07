import { motion } from 'motion/react'
import { projects } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
      <SectionHeader title="Projects" subtitle="Selected work I'm proud of" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            className="group bg-card rounded-2xl border border-white/[0.06] overflow-hidden transition-colors hover:border-accent/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            {/* Image placeholder */}
            <div className="aspect-video bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center">
              <span className="text-white/20 text-sm font-['Montserrat',sans-serif]">
                Project Image
              </span>
            </div>

            <div className="p-6">
              <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-white mb-2">
                {project.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/5 text-white/60 rounded-full px-3 py-1 text-xs font-['Montserrat',sans-serif]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
