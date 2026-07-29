import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BackButton, Fade, PhoneMockup, Label, AccentDivider, SectionH, Body, Section, StatCard, MetaRow, CaseStudyFooter, CaseStudyShell } from '../components/case-study/CaseStudyComponents'
import SEO from '../components/SEO'
import { CASE_STUDY_SEO } from '../data/seo'

const I = {
  paywall: "/images/cs2/paywall.png",
  trialReminder: "/images/cs2/trial-reminder.png",
  continues: "/images/cs2/continues.png",
  appHome: "/images/cs2/app-home.png",
}

export default function CaseStudyTrialFix() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <CaseStudyShell>
      <SEO {...CASE_STUDY_SEO['trial-cancellation-fix']} />
      <BackButton />

      {/* HERO */}
      <section className="min-h-screen flex flex-col lg:flex-row items-center gap-8 lg:gap-[5vw] px-6 md:px-[6vw] pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="flex-1">
                    <Fade delay={0.08}>
            <h1 className="font-display font-normal text-[clamp(32px,5vw,64px)] leading-[1.08] max-w-[650px] mb-6">
              How <span className="text-accent font-display font-normal italic">one screen</span> cut trial cancellations by 10%
            </h1>
          </Fade>
          <Fade delay={0.15}>
            <Body style={{ marginBottom: 32 }}>Users were not leaving because they disliked the product. They were leaving because they feared being charged. One screen. Clear copy. An exact date. That was the fix.</Body>
          </Fade>
          <Fade delay={0.22}>
            <MetaRow items={[["App","Mindsnack"],["Role","Solo Designer"],["Timeline","2 weeks"],["Result","-10% cancellations"]]} />
          </Fade>
        </div>
        <Fade delay={0.1}>
          <PhoneMockup src={I.trialReminder} width={240} glow />
        </Fade>
      </section>

      {/* PROJECT CONTEXT */}
      <Section className="bg-card border-b border-star/[0.06]">
        <Fade>
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start max-w-[720px]">
            <PhoneMockup src={I.appHome} width={90} radius={12} />
            <div>
              <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-star/30 mb-1.5">About the project</p>
              <p className="text-sm leading-relaxed text-star/50 mb-3">
                Mindsnack is an iOS learning app that teaches life skills like relationships, confidence, mental health, and finance through research backed micro lessons. I was the solo UI/UX designer, responsible for the entire product from onboarding to the App Store presence. This case study focuses on one specific UX problem I solved during my time on the project.
              </p>
              <Link to="/case-study/mindsnack" className="font-sans text-[11px] text-accent hover:text-accent/80 transition-colors">Read the full Mindsnack case study &rarr;</Link>
            </div>
          </div>
        </Fade>
      </Section>

      {/* THE SIGNAL */}
      <Section>
        <Fade><Label>The signal</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Users started the trial and cancelled it within seconds.</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 16 }}>We were testing with 15 to 20 users at a time. Small batches. But the pattern was loud: people completed the full onboarding, picked their topics, set their goals, started the free trial, and then cancelled. Immediately.</Body></Fade>
        <Fade delay={0.16}><Body>My first thought was that the product was not convincing enough. But that did not make sense. They went through everything. They clearly wanted it. So what was going on?</Body></Fade>
      </Section>

      {/* THE INSIGHT */}
      <Section className="bg-card">
        <Fade><Label>The insight</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>They were not unhappy. They were <span className="text-accent italic">scared.</span></SectionH></Fade>
        <Fade delay={0.12}><Body light style={{ marginBottom: 24 }}>Think about the last free trial you started. Did you set a calendar reminder? Probably not. Everyone has been burned. You sign up, you forget, you get charged for something you stopped using two weeks ago. The reflex is to cancel immediately just to protect yourself.</Body></Fade>
        <Fade delay={0.16}>
          <div className="bg-accent rounded-2xl p-6 md:p-8 max-w-[520px]">
            <p className="text-base leading-relaxed text-black font-[500]">The problem was not the product. It was not the price. It was trust. Users did not believe they would remember to cancel before being charged.</p>
          </div>
        </Fade>
      </Section>

      {/* THE SOLUTION */}
      <Section>
        <Fade><Label>The solution</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>One screen that says: we have got your back.</SectionH></Fade>
        <Fade delay={0.12}><Body style={{ marginBottom: 36 }}>Right after the user starts their trial, this screen appears. It shows the exact date we will remind them. December 18. Not "before your trial ends." The actual date. Below that: "No surprise charges ever." Two buttons: "Remind Me" and "Maybe Later." Both are safe. No pressure.</Body></Fade>
        <Fade delay={0.18}>
          <div className="flex gap-4 md:gap-6 justify-start overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:justify-center md:flex-wrap items-center">
            <PhoneMockup src={I.paywall} caption="Paywall" width={160} />
            <span className="text-xl text-star/20 font-sans shrink-0">&rarr;</span>
            <PhoneMockup src={I.trialReminder} caption="The fix" width={200} glow />
            <span className="text-xl text-star/20 font-sans shrink-0">&rarr;</span>
            <PhoneMockup src={I.continues} caption="Continues" width={160} />
          </div>
        </Fade>
      </Section>

      {/* WHY IT WORKS */}
      <Section className="bg-card">
        <Fade><Label>Design decisions</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>Three choices that made it work</SectionH></Fade>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            ["Exact date, not vague words","December 18. Not 'before your trial ends.' Specific dates feel trustworthy. Vague language does not calm anxiety."],
            ["Timed to the anxiety peak","This screen appears the moment they commit. Not in an email they will miss. Not in settings. Right when they need it."],
            ["Both buttons are safe","'Remind Me' and 'Maybe Later' both feel okay. No guilt. No pressure. The user stays in control."],
          ].map(([t,d],i) => (
            <Fade key={i} delay={0.06*i}>
              <div className="bg-star/[0.03] border border-star/[0.06] rounded-xl p-5 md:p-6">
                <h4 className="font-display text-lg text-star mb-2">{t}</h4>
                <p className="text-xs leading-relaxed text-star/35">{d}</p>
              </div>
            </Fade>
          ))}
        </div>
      </Section>

      {/* RESULTS */}
      <Section>
        <Fade><Label>Results</Label><AccentDivider /></Fade>
        <div className="grid grid-cols-2 gap-4 max-w-[520px]">
          <Fade delay={0.06}><StatCard value="10%" label="Fewer trial cancellations" sub="Reduction" color="#10b981" /></Fade>
          <Fade delay={0.12}><StatCard value="19%" label="Activated the trial" sub="Of onboarded users" color="var(--color-leaf)" /></Fade>
        </div>
      </Section>

      {/* TAKEAWAY */}
      <Section className="bg-card">
        <Fade><Label>Takeaway</Label><AccentDivider /></Fade>
        <Fade delay={0.08}><SectionH>I did not add a feature. I removed a fear.</SectionH></Fade>
        <Fade delay={0.12}><Body light style={{ marginBottom: 16 }}>No redesign. No pricing change. One screen, clear copy, an exact date. That was it. The lesson: good UX is not always about adding more. Sometimes it is about noticing the one thing causing friction and removing it with precision.</Body></Fade>
        <Fade delay={0.16}><Body light>And the bigger lesson: watch what users do, not what you assume they feel. If I had assumed they disliked the product, I would have fixed the wrong thing.</Body></Fade>
      </Section>

      <CaseStudyFooter links={[
        { label: "Mindsnack: Full Story", to: "/case-study/mindsnack" },
        { label: "Cards to Articles Pivot", to: "/case-study/cards-to-articles" },
      ]} />
    </CaseStudyShell>
  )
}
