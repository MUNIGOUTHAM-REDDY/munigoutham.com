import { Link } from 'react-router-dom'
import { projects } from '../../data/portfolio'
import SectionHeader from './SectionHeader'
import CardStack from '../CardStack'

const cardColors = [
  { bg: 'bg-pink-950', border: 'border-pink-400/20', tagBg: 'bg-pink-400/15', tagText: 'text-pink-300' },
  { bg: 'bg-sky-950', border: 'border-sky-400/20', tagBg: 'bg-sky-400/15', tagText: 'text-sky-300' },
  { bg: 'bg-emerald-950', border: 'border-emerald-400/20', tagBg: 'bg-emerald-400/15', tagText: 'text-emerald-300' },
  { bg: 'bg-amber-950', border: 'border-amber-400/20', tagBg: 'bg-amber-400/15', tagText: 'text-amber-300' },
]

export default function Projects() {
  return (
    <section id="projects">
      <CardStack
        header={
          <SectionHeader title="Projects" />
        }
      >
        {projects.map((project, i) => {
          const color = cardColors[i % cardColors.length]
          const card = (
            <article
              key={project.id}
              className={`group rounded-2xl border overflow-hidden flex flex-col h-full ${color.bg} ${color.border} ${project.slug ? 'cursor-pointer' : ''}`}
            >
              <div className="aspect-video bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center">
                <span className="text-white/20 text-sm font-['Montserrat',sans-serif]">
                  Project Image
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-['Montserrat',sans-serif] font-bold text-xl text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full px-3 py-1 text-xs font-['Montserrat',sans-serif] ${color.tagBg} ${color.tagText}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )

          return project.slug ? (
            <Link key={project.id} to={project.slug} className="block h-full no-underline">
              {card}
            </Link>
          ) : (
            card
          )
        })}
      </CardStack>
    </section>
  )
}
