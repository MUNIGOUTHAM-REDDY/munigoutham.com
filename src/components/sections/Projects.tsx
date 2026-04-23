import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../../data/portfolio'
import SectionHeader from './SectionHeader'
import { MindsnackHero, TrialFixHero, CardsToArticlesHero } from '../ProjectHeroArt'

const heroArtById: Record<string, ComponentType> = {
  '1': MindsnackHero,
  '2': TrialFixHero,
  '3': CardsToArticlesHero,
}

export default function Projects() {
  const headerElement = <SectionHeader title="Selected Work" />

  const renderedProjects = projects.map((project) => {
    const HeroArt = heroArtById[project.id]
    
    const cardContent = (
      <article
        className={`group relative flex flex-col md:flex-row items-start md:items-center py-12 md:py-16 border-b border-white/[0.06] transition-colors ${project.slug ? 'cursor-pointer' : ''}`}
      >
        <div className="flex-1 pr-8 md:pr-16 order-2 md:order-1 mt-8 md:mt-0">
          <div className="flex flex-wrap gap-4 mb-5">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-['Montserrat',sans-serif] font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 group-hover:text-[#87C23B] transition-colors tracking-tight">
            {project.title}
          </h3>
          <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-2xl font-light">
            {project.description}
          </p>
          
          {project.slug && (
            <div className="mt-8 flex items-center">
              <span className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.15em] uppercase text-white/70 group-hover:text-[#87C23B] transition-colors duration-300">
                View Project
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          )}
        </div>
        
        {HeroArt && (
          <div className="w-full md:w-[320px] lg:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden bg-[#06040d]/40 shrink-0 border border-white/[0.04] relative group-hover:border-white/[0.12] transition-colors order-1 md:order-2">
            <div className="absolute inset-0 flex items-center justify-center p-4 transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]">
              <HeroArt />
            </div>
          </div>
        )}
      </article>
    )

    return project.slug ? (
      <Link key={project.id} to={project.slug} className="block no-underline outline-none">
        {cardContent}
      </Link>
    ) : (
      <div key={project.id}>{cardContent}</div>
    )
  })

  return (
    <section id="projects">
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        {headerElement}
        <div className="flex flex-col gap-0">
          {renderedProjects}
        </div>
      </div>
    </section>
  )
}
