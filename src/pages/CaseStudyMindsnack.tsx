import { useEffect } from 'react'
import { Fade, PhoneMockup, Label, AccentDivider, SectionH, Body, Section, StatCard, InfoCard, MetaRow, CaseStudyFooter, CaseStudyShell } from '../components/case-study/CaseStudyComponents'
import ScrollHeader from '../components/ScrollHeader'
import SEO from '../components/SEO'
import { CASE_STUDY_SEO } from '../data/seo'

const I = {
  hero1: "/images/cs1/v2-home.png",
  hero2: "/images/cs1/v2-lesson-article.png",
  hook: "/images/cs1/v1-hook.png",
  concept: "/images/cs1/v1-concept.png",
  wisdom: "/images/cs1/v1-wisdom.png",
  playbook: "/images/cs1/v1-playbook.png",
  quiz: "/images/cs1/v1-quiz.png",
  quickwin: "/images/cs1/v1-quickwin.png",
  onb1: "/images/cs1/onboard-welcome.png",
  onb2: "/images/cs1/onboard-topics.png",
  onb3: "/images/cs1/onboard-goals.png",
  onb4: "/images/cs1/onboard-paywall.png",
  v1Home: "/images/cs1/v1-home.png",
  topics: "/images/cs1/topics.png",
  binge: "/images/cs1/binge.png",
  profile: "/images/cs1/profile.png",
  v2Home: "/images/cs1/v2-home.png",
  art1: "/images/cs1/v2-article-1.png",
  art2: "/images/cs1/v2-article-2.png",
  art3: "/images/cs1/v2-article-3.png",
}

export default function CaseStudyMindsnack() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <CaseStudyShell>
      <SEO {...CASE_STUDY_SEO.mindsnack} />
      <ScrollHeader alwaysVisible showBackArrow />

      {/* HERO */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-[4vw] px-6 md:px-[6vw] pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="flex-1">
          <Fade delay={0.08}>
            <img src="/images/cs1/mindsnack-logo.svg" alt="Mindsnack" className="h-12 md:h-14 rounded-xl mb-5" />
            <h1 className="font-display font-normal text-[clamp(28px,4.5vw,52px)] text-star leading-[1.3] max-w-[700px] mb-6">A self-improvement app built from scratch</h1>
          </Fade>
          <Fade delay={0.15}>
            <Body style={{ marginBottom: 32 }}>From onboarding to lessons to the App Store presence, I owned every screen and interaction as the solo designer. iOS.</Body>
          </Fade>
          <Fade delay={0.22}>
            <MetaRow items={[["Role","Solo UI/UX Designer"],["Company","Scaleswift Digital"],["Duration","6+ months"],["Platform","iOS"]]} />
          </Fade>
        </div>
        <Fade delay={0.1}>
          <div className="flex gap-4 items-end">
            <PhoneMockup src={I.hero1} caption="Home" width={180} />
            <PhoneMockup src={I.hero2} caption="Lesson" width={180} />
          </div>
        </Fade>
      </section>

      {/* PROBLEM */}
      <Section>
        <Fade><Label>The problem</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>People want to get better at life. But where do they go?</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 20 }}>Books are great but nobody finishes them. Short videos are everywhere but you forget what you watched five minutes later. Book summary apps compress so much that the value disappears.</Body></Fade>
        <Fade delay={0.16}><Body style={{ marginBottom: 36 }}>There was nothing that delivered credible, research backed life skills in a format that respected modern attention spans. That was the gap Mindsnack was built to fill.</Body></Fade>
        <Fade delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InfoCard icon={"\u{1F4DA}"} title="Books" description="High quality. Too long. Most never get finished." />
            <InfoCard icon={"\u{1F4F1}"} title="Short videos" description="Engaging format. Shallow content. Competing with TikTok is a losing game." />
            <InfoCard icon={"\u{1F4D6}"} title="Book summaries" description="Blinkist compresses books but the depth that actually changes behavior is gone." />
          </div>
        </Fade>
      </Section>

      {/* SOLUTION */}
      <Section>
        <Fade><Label>The solution</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Research backed 2 minute lessons that push you to act.</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 36 }}>Mindsnack takes research from behavioral science, neuroscience, and great books and structures it into micro courses. Not summaries. Original content built around a learning sequence that teaches, tests, and creates real action.</Body></Fade>
        <Fade delay={0.18}>
          <div className="flex gap-5 justify-center flex-wrap">
            <PhoneMockup src={I.art1} caption="Article format" width={180} />
            <PhoneMockup src={I.art2} caption="Deep dive" width={180} />
            <PhoneMockup src={I.art3} caption="Scenario" width={180} />
          </div>
        </Fade>
      </Section>

      {/* LESSON SEQUENCE */}
      <Section className="bg-card">
        <Fade><Label>Core design</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Six steps. Each one has a job.</SectionH></Fade>
        <Fade delay={0.12}><Body light style={{ marginBottom: 36 }}>The sequence mirrors how people naturally learn: grab attention, explain, land it with something memorable, show what to do, test understanding, then push them to act right now. The Quick Win at the end is the part I am most proud of.</Body></Fade>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-5 mb-10">
          {[
            ["Hook","Pulls you in"],
            ["Concept","Explains the idea"],
            ["Wisdom","Lands it with a quote"],
            ["Playbook","Do's and don'ts"],
            ["Quiz","Tests with scenarios"],
            ["Quick Win","You act right now"]
          ].map(([nm,ds],i) => (
            <Fade key={i} delay={0.04*i}>
              <div className="border-t border-star/10 pt-4">
                <div className="font-sans text-[10px] text-accent font-medium tracking-wider mb-2">{String(i+1).padStart(2,"0")}</div>
                <div className="font-sans font-semibold text-sm text-star mb-1">{nm}</div>
                <div className="text-[11px] leading-relaxed text-star/50">{ds}</div>
              </div>
            </Fade>
          ))}
        </div>
        <Fade delay={0.25}>
          <div className="flex gap-4 justify-start overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
            <PhoneMockup src={I.hook} caption="Hook" width={150} />
            <PhoneMockup src={I.concept} caption="Concept" width={150} />
            <PhoneMockup src={I.wisdom} caption="Wisdom" width={150} />
            <PhoneMockup src={I.playbook} caption="Playbook" width={150} />
            <PhoneMockup src={I.quiz} caption="Quiz" width={150} />
            <PhoneMockup src={I.quickwin} caption="Quick Win" width={150} />
          </div>
        </Fade>
      </Section>

      {/* ONBOARDING */}
      <Section>
        <Fade><Label>Onboarding</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Personalized from the first tap</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 36 }}>The flow asks what topics matter to you, what your goals are within each, and feeds that into a recommendation algorithm. No two users see the same homepage. I designed it to feel like a conversation, not a form.</Body></Fade>
        <Fade delay={0.18}>
          <div className="flex gap-5 justify-start overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
            <PhoneMockup src={I.onb1} caption="Welcome" width={170} />
            <PhoneMockup src={I.onb2} caption="Topics" width={170} />
            <PhoneMockup src={I.onb3} caption="Goals" width={170} />
            <PhoneMockup src={I.onb4} caption="Paywall" width={170} />
          </div>
        </Fade>
      </Section>

      {/* KEY SCREENS */}
      <Section className="bg-card">
        <Fade><Label>The full product</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Every screen in the app. All me.</SectionH></Fade>
        <Fade delay={0.12}><Body light style={{ marginBottom: 36 }}>Homepage with personalized course recommendations. Topics for exploring all categories. Binge Mode for casual learners who want to browse without committing to a full lesson. Profile for tracking progress.</Body></Fade>
        <Fade delay={0.18}>
          <div className="flex gap-5 justify-start overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:justify-center md:flex-wrap">
            <PhoneMockup src={I.v1Home} caption="Home" width={170} />
            <PhoneMockup src={I.topics} caption="Topics" width={170} />
            <PhoneMockup src={I.binge} caption="Binge" width={170} />
            <PhoneMockup src={I.profile} caption="Profile" width={170} />
          </div>
        </Fade>
      </Section>

      {/* EVOLUTION */}
      <Section>
        <Fade><Label>Design evolution</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Four versions. None of them were guesses.</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 40 }}>Every major version was a direct response to something we saw in the data. Not a redesign for the sake of redesigning.</Body></Fade>
        {[
          ["V 1.0.0","The Foundation","Card based lessons, onboarding, learning sequence. Got the basics right."],
          ["V 1.2.0","Home Screen Fix","Users could not read course titles in small tiles. Made cards full width. Discoverability jumped."],
          ["V 1.5.0","Trial Cancellation Fix","Users cancelled trials out of fear of charges. One reminder screen dropped cancellations by 10%."],
          ["V 2.0.0","The Format Pivot","Cards were too shallow. Shifted to article format. Moved from watchers to readers and listeners."],
        ].map(([tag,t,d],i) => (
          <Fade key={i} delay={0.06*i}>
            <div className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-4 md:gap-8 py-5 border-b border-star/[0.05]">
              <div className="font-sans text-xs text-accent">{tag}</div>
              <div>
                <div className="font-display text-lg md:text-xl text-star mb-1">{t}</div>
                <div className="text-sm leading-relaxed text-star/55 max-w-[480px]">{d}</div>
              </div>
            </div>
          </Fade>
        ))}
      </Section>

      {/* BEFORE/AFTER */}
      <Section className="bg-card">
        <Fade><Label>Before / After</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Home screen: tiny tiles to full width</SectionH></Fade>
        <Fade delay={0.12}><Body light style={{ marginBottom: 36 }}>Users scrolled past courses because they could not read what they were about. This was one of the first things I pushed to change.</Body></Fade>
        <Fade delay={0.18}>
          <div className="flex gap-10 md:gap-14 justify-center flex-wrap">
            <div className="text-center">
              <p className="font-sans text-[10px] tracking-[0.15em] text-star/20 uppercase mb-3">Before</p>
              <PhoneMockup src={I.v1Home} width={200} />
            </div>
            <div className="text-center">
              <p className="font-sans text-[10px] tracking-[0.15em] text-star/20 uppercase mb-3">After</p>
              <PhoneMockup src={I.v2Home} width={200} />
            </div>
          </div>
        </Fade>
      </Section>

      {/* METRICS */}
      <Section>
        <Fade><Label>Impact</Label><AccentDivider /></Fade>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Fade delay={0}><StatCard value="31.9%" label="App Store conversion" sub="+320% lift" color="var(--color-leaf)" /></Fade>
          <Fade delay={0.06}><StatCard value="10%" label="Cancellation drop" sub="One screen" color="#10b981" /></Fade>
          <Fade delay={0.12}><StatCard value="19%" label="Trial activation" sub="From onboarding" color="#e67e23" /></Fade>
          <Fade delay={0.18}><StatCard value="3.14" label="Sessions/device" sub="Repeat usage" color="#2d7ff9" /></Fade>
        </div>
      </Section>

      {/* REFLECTIONS */}
      <Section className="bg-card">
        <Fade><Label>What I learned</Label><AccentDivider /></Fade>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Watch behavior, not opinions","Users were not unhappy with the trial. They were anxious about charges. If I had assumed dissatisfaction I would have redesigned the wrong thing."],
            ["Format is function","Cards to articles was not a visual change. It changed how much value users could extract. The medium shapes the message."],
            ["Action beats information","The Quick Win feature matters most. A 2 minute real world task beats 20 minutes of passive reading."],
            ["AI accelerates, not replaces","Used AI to ship faster. But strategic decisions and complex interactions are still mine."],
          ].map(([t,d],i) => (
            <Fade key={i} delay={0.06*i}>
              <div className="bg-star/[0.03] border border-star/[0.06] rounded-xl p-5 md:p-6">
                <h4 className="font-display text-lg text-star mb-2">{t}</h4>
                <p className="text-xs leading-relaxed text-star/50">{d}</p>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      <CaseStudyFooter links={[
        { label: "Trial Cancellation Fix", to: "/case-study/trial-cancellation-fix" },
        { label: "Cards to Articles Pivot", to: "/case-study/cards-to-articles" },
      ]} />
    </CaseStudyShell>
  )
}
