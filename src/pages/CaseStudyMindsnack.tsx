import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const I = {
  hero1: "/images/cs1/v2-home.png",
  hero2: "/images/cs1/v2-lesson-article.png",
  hero3: "/images/cs1/v1-quiz.png",
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
  appstore: "/images/cs1/appstore-connect.png",
};

function useInView(t = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [t]);
  return [ref, v] as const;
}

function Fade({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, v] = useInView();
  return <div ref={ref} style={{ opacity: v?1:0, transform: v?"translateY(0)":"translateY(28px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` }}>{children}</div>;
}

function Ph({ src, cap, w = 220 }: { src: string; cap?: string; w?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flexShrink: 0 }}>
      <div style={{ width: w, aspectRatio: "9/19.5", borderRadius: 24, overflow: "hidden", boxShadow: "0 14px 44px rgba(0,0,0,0.13)", border: "4px solid #1a1a1a", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={src} alt="" style={{ width: "100%", display: "block" }} onError={e => { const el = e.target as HTMLImageElement; el.style.display = "none"; el.parentElement!.innerHTML = `<div style="color:#555;font-size:10px;font-family:monospace;text-align:center;padding:16px">${cap||"Add screen"}</div>`; }} />
      </div>
      {cap && <p style={{ fontSize: "10px", color: "#999", fontFamily: "var(--cs-mono)" }}>{cap}</p>}
    </div>
  );
}

const Label = ({children}: {children: React.ReactNode}) => <p style={{ fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6d3be8", marginBottom: 12 }}>{children}</p>;
const Divider = () => <div style={{ width: 48, height: 2, background: "#6d3be8", marginBottom: 28 }} />;
const H = ({children, style={}}: {children: React.ReactNode; style?: React.CSSProperties}) => <h2 style={{ fontFamily: "var(--cs-serif)", fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.18, fontWeight: 400, maxWidth: 680, marginBottom: 20, ...style }}>{children}</h2>;
const P = ({children, style={}}: {children: React.ReactNode; style?: React.CSSProperties}) => <p style={{ fontSize: 16, lineHeight: 1.75, color: "#666", maxWidth: 580, ...style }}>{children}</p>;

export default function CaseStudyMindsnack() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Manrope:wght@400;500;600;700;800&display=swap');
        :root{--cs-mono:'JetBrains Mono',monospace;--cs-serif:'Newsreader',serif;--cs-sans:'Manrope',sans-serif;--cs-purple:#6d3be8;--cs-bg:#fafaf8;--cs-dark:#0f0f14}
      `}</style>
      <div style={{ overflowX: "hidden", fontFamily: "var(--cs-sans)", background: "var(--cs-bg)", color: "#1a1a1a", WebkitFontSmoothing: "antialiased" }}>

        {/* Back button */}
        <Link to="/" style={{ position: "fixed", top: 24, left: 24, zIndex: 50, fontFamily: "var(--cs-mono)", fontSize: 12, color: "#999", textDecoration: "none", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", padding: "8px 16px", borderRadius: 8, border: "1px solid #eee" }}>&larr; Back</Link>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "4vw", padding: "100px 6vw 80px", background: "linear-gradient(160deg, #fafaf8 0%, #f0eaff 45%, #fafaf8 100%)" }}>
          <div>
            <Fade><Label>Case Study / 2025</Label></Fade>
            <Fade delay={0.08}>
              <h1 style={{ fontFamily: "var(--cs-serif)", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.08, fontWeight: 400, maxWidth: 700, marginBottom: 24 }}>
                Mindsnack
                <span style={{ display: "block", color: "var(--cs-purple)", fontStyle: "italic" }}>Life skills for the low attention span generation</span>
              </h1>
            </Fade>
            <Fade delay={0.15}>
              <P style={{ marginBottom: 36 }}>31.9% App Store conversion rate. 10% fewer trial cancellations. Designed the entire product as the solo designer, from onboarding to lessons to the App Store presence. iOS.</P>
            </Fade>
            <Fade delay={0.22}>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[["Role","Solo UI/UX Designer"],["Company","Scaleswift Digital"],["Duration","6+ months"],["Platform","iOS"]].map(([l,v])=>(<div key={l}><span style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 2 }}>{l}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span></div>))}
              </div>
            </Fade>
          </div>
          <Fade delay={0.1}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
              <Ph src={I.hero1} cap="Home" w={200} />
              <Ph src={I.hero2} cap="Lesson" w={200} />
            </div>
          </Fade>
        </section>

        {/* PROBLEM */}
        <section style={{ padding: "100px 8vw", background: "#fff" }}>
          <Fade><Label>The problem</Label><Divider/></Fade>
          <Fade delay={0.08}><H>People want to get better at life. But where do they go?</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 24 }}>Books are great but nobody finishes them. Short videos are everywhere but you forget what you watched five minutes later. Book summary apps compress so much that the value disappears.</P></Fade>
          <Fade delay={0.16}><P style={{ marginBottom: 40 }}>There was nothing that delivered credible, research backed life skills in a format that respected modern attention spans. That was the gap Mindsnack was built to fill.</P></Fade>
          <Fade delay={0.2}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                ["\u{1F4DA}","Books","High quality. Too long. Most never get finished."],
                ["\u{1F4F1}","Short videos","Engaging format. Shallow content. Competing with TikTok is a losing game."],
                ["\u{1F4D6}","Book summaries","Blinkist compresses books but the depth that actually changes behavior is gone."]
              ].map(([e,t,d],i)=>(
                <div key={i} style={{ background: "#fafaf8", border: "1px solid #eee", borderRadius: 14, padding: "26px 22px" }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{e}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{t}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "#777" }}>{d}</div>
                </div>
              ))}
            </div>
          </Fade>
        </section>

        {/* SOLUTION */}
        <section style={{ padding: "100px 8vw", background: "linear-gradient(180deg, #f8f5ff 0%, #fafaf8 100%)" }}>
          <Fade><Label>The solution</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Research backed 2 minute lessons that push you to act.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 40 }}>Mindsnack takes research from behavioral science, neuroscience, and great books and structures it into micro courses. Not summaries. Original content built around a learning sequence that teaches, tests, and creates real action.</P></Fade>
          <Fade delay={0.18}>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <Ph src={I.art1} cap="Article format" /><Ph src={I.art2} cap="Deep dive" /><Ph src={I.art3} cap="Scenario" />
            </div>
          </Fade>
        </section>

        {/* LESSON SEQUENCE */}
        <section style={{ padding: "100px 8vw", background: "var(--cs-dark)", color: "#f0f0f0" }}>
          <Fade><Label>Core design</Label><Divider/></Fade>
          <Fade delay={0.08}><H style={{ color: "#fff" }}>Six steps. Each one has a job.</H></Fade>
          <Fade delay={0.12}><P style={{ color: "rgba(255,255,255,0.45)", marginBottom: 40 }}>The sequence mirrors how people naturally learn: grab attention, explain, land it with something memorable, show what to do, test understanding, then push them to act right now. The Quick Win at the end is the part I am most proud of. It turns passive learning into a real world action the user completes in 2 to 3 minutes.</P></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginBottom: 48 }}>
            {[
              ["\u{1FAA8}","Hook","Pulls you in"],
              ["\u{1F4A1}","Concept","Explains the idea"],
              ["\u2726","Wisdom","Lands it with a quote"],
              ["\u{1F4D0}","Playbook","Do's and don'ts"],
              ["\u{1F9E0}","Quiz","Tests you with scenarios"],
              ["\u26A1","Quick Win","You act right now"]
            ].map(([ic,nm,ds],i)=>(
              <Fade key={i} delay={0.04*i}><div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "20px 16px" }}>
                <div style={{ fontFamily: "var(--cs-mono)", fontSize: 9, color: "rgba(255,255,255,0.2)", marginBottom: 5 }}>{String(i+1).padStart(2,"0")}</div>
                <div style={{ fontSize: 20, marginBottom: 5 }}>{ic}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{nm}</div>
                <div style={{ fontSize: 11, lineHeight: 1.5, color: "rgba(255,255,255,0.35)" }}>{ds}</div>
              </div></Fade>
            ))}
          </div>
          <Fade delay={0.25}>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", padding: "20px 0" }}>
              <Ph src={I.hook} cap="Hook" /><Ph src={I.concept} cap="Concept" /><Ph src={I.wisdom} cap="Wisdom" /><Ph src={I.playbook} cap="Playbook" /><Ph src={I.quiz} cap="Quiz" /><Ph src={I.quickwin} cap="Quick Win" />
            </div>
          </Fade>
        </section>

        {/* ONBOARDING */}
        <section style={{ padding: "100px 8vw", background: "#fff" }}>
          <Fade><Label>Onboarding</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Personalized from the first tap</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 40 }}>The flow asks what topics matter to you, what your goals are within each, and feeds that into a recommendation algorithm. No two users see the same homepage. I designed it to feel like a conversation, not a form.</P></Fade>
          <Fade delay={0.18}>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <Ph src={I.onb1} cap="Welcome" /><Ph src={I.onb2} cap="Topics" /><Ph src={I.onb3} cap="Goals" /><Ph src={I.onb4} cap="Paywall" />
            </div>
          </Fade>
        </section>

        {/* KEY SCREENS */}
        <section style={{ padding: "100px 8vw", background: "#fafaf8" }}>
          <Fade><Label>The full product</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Every screen in the app. All me.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 40 }}>Homepage with personalized course recommendations. Topics for exploring all categories. Binge Mode for casual learners who want to browse without committing to a full lesson. Profile for tracking progress.</P></Fade>
          <Fade delay={0.18}>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <Ph src={I.v1Home} cap="Home" /><Ph src={I.topics} cap="Topics" /><Ph src={I.binge} cap="Binge" /><Ph src={I.profile} cap="Profile" />
            </div>
          </Fade>
        </section>

        {/* EVOLUTION */}
        <section style={{ padding: "100px 8vw", background: "var(--cs-dark)", color: "#f0f0f0" }}>
          <Fade><Label>Design evolution</Label><Divider/></Fade>
          <Fade delay={0.08}><H style={{ color: "#fff" }}>Four versions. None of them were guesses.</H></Fade>
          <Fade delay={0.12}><P style={{ color: "rgba(255,255,255,0.45)", marginBottom: 48 }}>Every major version was a direct response to something we saw in the data. Not a redesign for the sake of redesigning.</P></Fade>
          {[
            ["V 1.0.0","The Foundation","Card based lessons, onboarding, learning sequence. Got the basics right."],
            ["V 1.2.0","Home Screen Fix","Users could not read course titles in small tiles. Made cards full width. Discoverability jumped."],
            ["V 1.5.0","Trial Cancellation Fix","Users cancelled trials out of fear of charges. One reminder screen dropped cancellations by 10%."],
            ["V 2.0.0","The Format Pivot","Cards were too shallow. Shifted to article format. Moved from watchers to readers and listeners."],
          ].map(([tag,t,d],i)=>(
            <Fade key={i} delay={0.06*i}><div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 32, padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontFamily: "var(--cs-mono)", fontSize: 12, color: "var(--cs-purple)" }}>{tag}</div>
              <div>
                <div style={{ fontFamily: "var(--cs-serif)", fontSize: 20, marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.4)", maxWidth: 480 }}>{d}</div>
              </div>
            </div></Fade>
          ))}
        </section>

        {/* BEFORE/AFTER */}
        <section style={{ padding: "100px 8vw", background: "#fff" }}>
          <Fade><Label>Before / After</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Home screen: tiny tiles to full width</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 40 }}>Users scrolled past courses because they could not read what they were about. This was one of the first things I pushed to change.</P></Fade>
          <Fade delay={0.18}>
            <div style={{ display: "flex", gap: 56, justifyContent: "center", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}><p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#bbb", textTransform: "uppercase", marginBottom: 12 }}>Before</p><Ph src={I.v1Home} w={240} /></div>
              <div style={{ textAlign: "center" }}><p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#bbb", textTransform: "uppercase", marginBottom: 12 }}>After</p><Ph src={I.v2Home} w={240} /></div>
            </div>
          </Fade>
        </section>

        {/* METRICS */}
        <section style={{ padding: "80px 8vw 100px", background: "#fafaf8" }}>
          <Fade><Label>Impact</Label><Divider/></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16 }}>
            {[["31.9%","App Store conversion","+320% lift","#6d3be8"],["10%","Cancellation drop","One screen","#10b981"],["19%","Trial activation","From onboarding","#e67e23"],["3.14","Sessions/device","Repeat usage","#2d7ff9"]].map(([v,l,s,c],i)=>(
              <Fade key={i} delay={0.06*i}><div style={{ background: "#fff", border: "1px solid #eee", borderTop: `3px solid ${c}`, borderRadius: 14, padding: "28px 18px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--cs-serif)", fontSize: 40, color: c }}>{v}</div>
                <div style={{ fontFamily: "var(--cs-mono)", fontSize: 10, color: c, marginBottom: 6 }}>{s}</div>
                <div style={{ fontSize: 12, color: "#777" }}>{l}</div>
              </div></Fade>
            ))}
          </div>
        </section>

        {/* REFLECTIONS */}
        <section style={{ padding: "100px 8vw", background: "var(--cs-dark)", color: "#f0f0f0" }}>
          <Fade><Label>What I learned</Label><Divider/></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            {[["Watch behavior, not opinions","Users were not unhappy with the trial. They were anxious about charges. If I had assumed dissatisfaction I would have redesigned the wrong thing."],
              ["Format is function","Cards to articles was not a visual change. It changed how much value users could extract. The medium shapes the message."],
              ["Action beats information","The Quick Win feature matters most. A 2 minute real world task beats 20 minutes of passive reading."],
              ["AI accelerates, not replaces","Used AI to ship faster. But strategic decisions and complex interactions are still mine."]
            ].map(([t,d],i)=>(
              <Fade key={i} delay={0.06*i}><div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "26px 20px" }}>
                <h4 style={{ fontFamily: "var(--cs-serif)", fontSize: 17, fontWeight: 400, marginBottom: 8 }}>{t}</h4>
                <p style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.38)" }}>{d}</p>
              </div></Fade>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <section style={{ padding: "64px 8vw", textAlign: "center", background: "var(--cs-bg)" }}>
          <Fade>
            <p style={{ fontFamily: "var(--cs-serif)", fontSize: "clamp(20px, 2.5vw, 30px)", marginBottom: 20 }}>Want to work together?</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <a href="mailto:muni.uiux@gmail.com" style={{ padding: "10px 22px", borderRadius: 8, border: "1px solid #ddd", textDecoration: "none", color: "#1a1a1a", fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Email &rarr;</a>
              <a href="https://linkedin.com/in/munigoutham" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 22px", borderRadius: 8, border: "1px solid #ddd", textDecoration: "none", color: "#1a1a1a", fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>LinkedIn &rarr;</a>
              <Link to="/" style={{ padding: "10px 22px", borderRadius: 8, border: "1px solid #ddd", textDecoration: "none", color: "#1a1a1a", fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Portfolio &rarr;</Link>
            </div>
          </Fade>
          <div style={{ marginTop: 36, fontFamily: "var(--cs-mono)", fontSize: 10, color: "#bbb" }}>Designed by Muni Goutham &middot; 2025</div>
        </section>
      </div>
    </>
  );
}
