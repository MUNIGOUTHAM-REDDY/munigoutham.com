import type { ComponentType } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { projects, type Project } from '../../data/portfolio'
import SectionHeader from './SectionHeader'
import { MindsnackHero, TrialFixHero, CardsToArticlesHero } from '../ProjectHeroArt'

const heroArtById: Record<string, ComponentType> = {
  '1': MindsnackHero,
  '2': TrialFixHero,
  '3': CardsToArticlesHero,
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function ProjectPlate({ project, index }: { project: Project; index: number }) {
  const HeroArt = heroArtById[project.id]
  const flipped = index % 2 === 1

  const body = (
    <motion.article
      className="lit lit-hover group relative overflow-hidden rounded-3xl"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* The lantern turning toward the plate on hover. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: flipped
            ? 'radial-gradient(70% 90% at 88% 10%, rgba(242,217,153,0.10) 0%, rgba(242,217,153,0) 65%)'
            : 'radial-gradient(70% 90% at 12% 10%, rgba(242,217,153,0.10) 0%, rgba(242,217,153,0) 65%)',
        }}
      />

      <div
        className={`relative flex flex-col gap-8 p-6 md:items-center md:gap-12 md:p-10 lg:gap-16 ${
          flipped ? 'md:flex-row-reverse' : 'md:flex-row'
        }`}
      >
        {HeroArt && (
          <div className="relative w-full shrink-0 md:w-[46%]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-void/60 ring-1 ring-star/[0.06]">
              <div className="cover absolute inset-0 group-hover:scale-[1.035]">
                <HeroArt />
              </div>
              {/* Light falls from the top edge, as it does on every leaf
                  in the hero painting. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(242,217,153,0.07) 0%, rgba(5,4,10,0) 22%, rgba(5,4,10,0.35) 100%)',
                }}
              />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center gap-3">
            {/* Geist, not Cormorant — Cormorant ships oldstyle figures, so
                "01" set in the display serif reads as the letters "O I". */}
            <span className="font-sans text-[11px] font-medium tracking-[0.2em] text-star/30 tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="hairline flex-1" />
          </div>

          <h3 className="font-display text-[clamp(2rem,3.4vw,3rem)] font-normal leading-[1.04] text-star transition-colors duration-500 group-hover:text-lantern-core">
            {project.title}
          </h3>

          {/* whitespace-pre-line so the authored line break in the trial
              cancellation copy is actually honoured. */}
          <p className="mt-5 max-w-xl whitespace-pre-line font-sans text-[15px] leading-relaxed text-star/55">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map(tag => (
              <span key={tag} className="font-sans text-[10px] uppercase tracking-[0.18em] text-star/35">
                {tag}
              </span>
            ))}
          </div>

          {project.slug && (
            <span className="mt-8 inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.22em] text-star/70 transition-colors duration-500 group-hover:text-lantern">
              View Case Study
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )

  return project.slug ? (
    <Link to={project.slug} className="block no-underline">
      {body}
    </Link>
  ) : (
    body
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div
        aria-hidden
        className="bloom"
        style={{ top: '4%', left: '-10%', width: 700, height: 700 }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-12 md:py-32 xl:max-w-7xl">
        <SectionHeader
          title="Selected Work"
          eyebrow="Case Studies"
          subtitle="Three problems, what I changed, and what it moved."
        />

        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectPlate key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
