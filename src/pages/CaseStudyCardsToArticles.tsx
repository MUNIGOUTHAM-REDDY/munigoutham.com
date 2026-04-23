import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BackButton, Fade, PhoneMockup, Label, AccentDivider, SectionH, Body, Section, InfoCard, MetaRow, CaseStudyFooter } from '../components/case-study/CaseStudyComponents'

const I = {
  v1_card1: "/images/cs3/v1-concept-1.png",
  v1_card2: "/images/cs3/v1-concept-2.png",
  v1_wisdom: "/images/cs3/v1-wisdom.png",
  v1_quiz: "/images/cs3/v1-quiz.png",
  v2_art1: "/images/cs3/v2-article-1.png",
  v2_art2: "/images/cs3/v2-article-2.png",
  v2_art3: "/images/cs3/v2-article-3.png",
  v2_art4: "/images/cs3/v2-article-4.png",
  v1Home: "/images/cs3/v1-home.png",
  v2Home: "/images/cs3/v2-home.png",
  appHome: "/images/cs3/app-home.png",
}

export default function CaseStudyCardsToArticles() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-surface text-white">
      <BackButton />

      {/* HERO */}
      <section className="min-h-screen px-6 md:px-[6vw] pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-[600px] mb-12">
                    <Fade delay={0.08}>
            <h1 className="font-['Montserrat',sans-serif] font-bold text-[clamp(32px,5vw,64px)] leading-[1.08] mb-6">
              We were losing to TikTok.
              <span className="block text-white/70 font-['Cormorant_Garamond',serif] font-medium italic">So we killed our entire lesson format.</span>
            </h1>
          </Fade>
          <Fade delay={0.15}>
            <Body style={{ marginBottom: 28 }}>The card format was engaging. Users liked it. But they were not retaining anything. This is how I convinced the team to throw away what was working and rebuild the lesson experience from scratch.</Body>
          </Fade>
          <Fade delay={0.2}>
            <MetaRow items={[["App","Mindsnack"],["Role","Solo Designer"],["Shift","Cards \u2192 Articles"],["Goal","Depth + Retention"]]} />
          </Fade>
        </div>
        <Fade delay={0.12}>
          <div className="flex gap-6 md:gap-12 justify-center items-start">
            <div className="text-center">
              <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[0.15em] text-white/20 uppercase mb-3">Before</p>
              <PhoneMockup src={I.v1_card1} width={150} />
            </div>
            <div className="text-center">
              <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[0.15em] text-white/20 uppercase mb-3">After</p>
              <PhoneMockup src={I.v2_art1} width={150} />
            </div>
          </div>
        </Fade>
      </section>

      {/* PROJECT CONTEXT */}
      <Section className="bg-card border-b border-white/[0.06]">
        <Fade>
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start max-w-[720px]">
            <PhoneMockup src={I.appHome} width={90} radius={16} />
            <div>
              <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[0.15em] uppercase text-white/30 mb-1.5">About the project</p>
              <p className="text-sm leading-relaxed text-white/50 mb-3">
                Mindsnack is an iOS app that teaches life skills like relationships, confidence, and mental health through research backed micro lessons. I was the solo UI/UX designer for 6+ months, owning every screen from onboarding to the lesson experience to the App Store screenshots. This case study focuses on the biggest strategic design decision I made: killing the card format and rebuilding lessons as articles.
              </p>
              <Link to="/case-study/mindsnack" className="font-['Montserrat',sans-serif] text-[11px] text-accent hover:text-accent/80 transition-colors">Read the full Mindsnack case study &rarr;</Link>
            </div>
          </div>
        </Fade>
      </Section>

      {/* WHAT WE HAD */}
      <Section>
        <Fade><Label>What we had</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Cards. Clean, fast, and forgettable.</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 16 }}>V1 used swipeable cards for everything. Concept cards, wisdom cards, playbook cards, quizzes. The format felt modern. Users swiped through quickly. Engagement looked fine on the surface.</Body></Fade>
        <Fade delay={0.16}><Body style={{ marginBottom: 36 }}>But here is what the data did not show in the dashboard: users were not remembering what they learned. They swiped, they moved on, they forgot. The cards were optimized for consumption, not for transformation.</Body></Fade>
        <Fade delay={0.2}>
          <div className="flex gap-4 justify-start overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
            <PhoneMockup src={I.v1_card1} caption="Concept card" width={160} />
            <PhoneMockup src={I.v1_card2} caption="Concept card" width={160} />
            <PhoneMockup src={I.v1_wisdom} caption="Wisdom card" width={160} />
            <PhoneMockup src={I.v1_quiz} caption="Quiz card" width={160} />
          </div>
        </Fade>
      </Section>

      {/* THE PROBLEM */}
      <Section className="bg-card">
        <Fade><Label>The real problem</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>We were fighting TikTok with a butter knife.</SectionH></Fade>
        <Fade delay={0.12}><Body light style={{ marginBottom: 16 }}>We looked at our users and saw three types: readers, watchers, and listeners. Our card format was built for watchers. Quick, visual, swipeable. The same behavior pattern as Instagram and TikTok.</Body></Fade>
        <Fade delay={0.16}><Body light style={{ marginBottom: 24 }}>A startup with a tiny budget competing for the same dopamine loop as billion dollar social apps. That was never going to work.</Body></Fade>
        <Fade delay={0.2}>
          <div className="bg-accent rounded-2xl p-6 md:p-8 max-w-[520px]">
            <p className="text-base leading-relaxed text-black font-medium">We needed to stop competing for speed and start competing for depth. That meant abandoning watchers and building for readers and listeners.</p>
          </div>
        </Fade>
      </Section>

      {/* USER TYPES */}
      <Section>
        <Fade><Label>User segmentation</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Three types of learners. We picked the underserved ones.</SectionH></Fade>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <Fade delay={0}><InfoCard icon={"\u{1F440}"} title="Watchers" description="Visual, swipeable content. Short attention. Directly fighting social media. We dropped this." /></Fade>
          <Fade delay={0.06}>
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 md:p-6">
              <div className="text-xl mb-2">{"\u{1F4D6}"}</div>
              <div className="font-['Montserrat',sans-serif] font-bold text-sm text-white mb-1.5">Readers</div>
              <div className="text-xs leading-relaxed text-white/40">Want depth. Willing to invest time. Underserved by almost every learning app. We chose this.</div>
            </div>
          </Fade>
          <Fade delay={0.12}>
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 md:p-6">
              <div className="text-xl mb-2">{"\u{1F3A7}"}</div>
              <div className="font-['Montserrat',sans-serif] font-bold text-sm text-white mb-1.5">Listeners</div>
              <div className="text-xs leading-relaxed text-white/40">Story driven. Retain through narrative. Also underserved. We designed for this too.</div>
            </div>
          </Fade>
        </div>
      </Section>

      {/* THE NEW FORMAT */}
      <Section className="bg-card">
        <Fade><Label>The new format</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Articles built from distinct blocks. Each one has a job.</SectionH></Fade>
        <Fade delay={0.12}><Body light style={{ marginBottom: 28 }}>Not a wall of text. Each article is assembled from content blocks, and each block type serves a specific purpose. Story blocks for relatability. Stat blocks for credibility. Comparison blocks for clarity. Scenario blocks for testing.</Body></Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {[
            ["Story Block","A character in a real scenario. Brains remember stories better than facts. This is the hook."],
            ["Stat Block","Hard numbers from research. Credibility that makes concepts feel grounded."],
            ["Comparison Block","Side by side contrasts. What works vs what does not. Instant clarity."],
            ["Scenario Block","Real situations that test understanding. Learning feels continuous."],
          ].map(([t,d],i) => (
            <Fade key={i} delay={0.04*i}>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <div className="font-['Montserrat',sans-serif] font-bold text-sm text-white mb-1.5">{t}</div>
                <div className="text-xs leading-relaxed text-white/35">{d}</div>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.24}>
          <div className="flex gap-4 justify-start overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
            <PhoneMockup src={I.v2_art1} caption="Article header" width={160} />
            <PhoneMockup src={I.v2_art2} caption="Content" width={160} />
            <PhoneMockup src={I.v2_art3} caption="Stat block" width={160} />
            <PhoneMockup src={I.v2_art4} caption="Deep dive" width={160} />
          </div>
        </Fade>
      </Section>

      {/* BEFORE/AFTER */}
      <Section>
        <Fade><Label>The transformation</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Same lesson. Completely different experience.</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 36 }}>The card format delivered facts quickly. The article format delivers the same concepts through stories, data, real scenarios, and actionable advice. It is not an incremental improvement. It is a different category of value.</Body></Fade>
        <Fade delay={0.18}>
          <div className="flex gap-10 md:gap-16 justify-center flex-wrap">
            <div className="text-center">
              <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[0.15em] text-accent uppercase mb-4">V1 / Cards</p>
              <div className="flex gap-3"><PhoneMockup src={I.v1_card1} width={150} /><PhoneMockup src={I.v1_card2} width={150} /></div>
            </div>
            <div className="text-center">
              <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[0.15em] text-accent uppercase mb-4">V2 / Articles</p>
              <div className="flex gap-3"><PhoneMockup src={I.v2_art2} width={150} /><PhoneMockup src={I.v2_art3} width={150} /></div>
            </div>
          </div>
        </Fade>
      </Section>

      {/* TWO PRINCIPLES */}
      <Section className="bg-card">
        <Fade><Label>Design principles</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Two words that guided every decision.</SectionH></Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[700px] mt-7">
          <Fade delay={0.08}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
              <h4 className="font-['Cormorant_Garamond',serif] text-xl text-white mb-2">Relatability</h4>
              <p className="text-sm leading-relaxed text-white/40">Story blocks put you in someone else's shoes. "Imagine you are on a first date and the conversation dies." Now it is personal. Now the concept sticks.</p>
            </div>
          </Fade>
          <Fade delay={0.14}>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
              <h4 className="font-['Cormorant_Garamond',serif] text-xl text-white mb-2">Remembrance</h4>
              <p className="text-sm leading-relaxed text-white/40">Brains remember stories better than facts. A week later, in a real situation, users recall the story. And with the story comes the concept and what to do about it.</p>
            </div>
          </Fade>
        </div>
      </Section>

      {/* HOME EVOLUTION */}
      <Section>
        <Fade><Label>Home screen</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>The homepage had to evolve too.</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 36 }}>With richer lessons, course cards needed to show more. Titles got bigger. Descriptions got clearer. Users could understand what they were getting into before they tapped.</Body></Fade>
        <Fade delay={0.18}>
          <div className="flex gap-6 md:gap-14 justify-center">
            <div className="text-center">
              <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[0.15em] text-white/20 uppercase mb-3">Before</p>
              <PhoneMockup src={I.v1Home} width={170} />
            </div>
            <div className="text-center">
              <p className="font-['Montserrat',sans-serif] text-[10px] tracking-[0.15em] text-white/20 uppercase mb-3">After</p>
              <PhoneMockup src={I.v2Home} width={170} />
            </div>
          </div>
        </Fade>
      </Section>

      {/* REFLECTION */}
      <Section className="bg-card">
        <Fade><Label>Reflection</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Format is not decoration. Format is the product.</SectionH></Fade>
        <Fade delay={0.12}><Body light style={{ marginBottom: 16 }}>This pivot taught me the most important design lesson I have learned so far. How you present information matters as much as the information itself. Same research. Same concepts. Same advice. But the article format delivered far more value because it gave the content room to breathe and connect and stick.</Body></Fade>
        <Fade delay={0.16}><Body light>The pull is always toward shorter, faster, snappier. Sometimes the right call is the opposite. Give users more. Not more noise. More depth. Let the format serve the content instead of squeezing it.</Body></Fade>
      </Section>

      <CaseStudyFooter links={[
        { label: "Mindsnack: Full Story", to: "/case-study/mindsnack" },
        { label: "Trial Cancellation Fix", to: "/case-study/trial-cancellation-fix" },
      ]} />
    </div>
  )
}
