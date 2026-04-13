import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
      <div style={{ width: w, aspectRatio: "9/19.5", borderRadius: 24, overflow: "hidden", boxShadow: "0 14px 44px rgba(0,0,0,0.13)", border: "4px solid #1a1a1a", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={src} alt="" style={{ width: "100%", display: "block" }} onError={e => { const el = e.target as HTMLImageElement; el.style.display = "none"; el.parentElement!.innerHTML = `<div style="color:#555;font-size:10px;font-family:monospace;text-align:center;padding:16px">${cap||"Add screen"}</div>`; }} />
      </div>
      {cap && <p style={{ fontSize: 10, color: "#999", fontFamily: "var(--cs-mono)" }}>{cap}</p>}
    </div>
  );
}

const Label = ({children}: {children: React.ReactNode}) => <p style={{ fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6d3be8", marginBottom: 12 }}>{children}</p>;
const Divider = () => <div style={{ width: 48, height: 2, background: "#6d3be8", marginBottom: 28 }} />;
const H = ({children, style={}}: {children: React.ReactNode; style?: React.CSSProperties}) => <h2 style={{ fontFamily: "var(--cs-serif)", fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.18, fontWeight: 400, maxWidth: 680, marginBottom: 20, ...style }}>{children}</h2>;
const P = ({children, style={}}: {children: React.ReactNode; style?: React.CSSProperties}) => <p style={{ fontSize: 16, lineHeight: 1.75, color: "#666", maxWidth: 580, ...style }}>{children}</p>;

export default function CaseStudyCardsToArticles() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Manrope:wght@400;500;600;700;800&display=swap');
        :root{--cs-mono:'JetBrains Mono',monospace;--cs-serif:'Newsreader',serif;--cs-sans:'Manrope',sans-serif;--cs-purple:#6d3be8;--cs-bg:#fafaf8;--cs-dark:#0f0f14}
      `}</style>
      <div style={{ overflowX: "hidden", fontFamily: "var(--cs-sans)", background: "var(--cs-bg)", color: "#1a1a1a", WebkitFontSmoothing: "antialiased" }}>

        <Link to="/" style={{ position: "fixed", top: 24, left: 24, zIndex: 50, fontFamily: "var(--cs-mono)", fontSize: 12, color: "#999", textDecoration: "none", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", padding: "8px 16px", borderRadius: 8, border: "1px solid #eee" }}>&larr; Back</Link>

        {/* HERO */}
        <section style={{ minHeight: "100vh", padding: "100px 6vw 80px", background: "linear-gradient(160deg, #fafaf8 0%, #f0eaff 45%, #fafaf8 100%)" }}>
          <div style={{ maxWidth: 600, marginBottom: 48 }}>
            <Fade><Label>Design Case Study / 2025</Label></Fade>
            <Fade delay={0.08}>
              <h1 style={{ fontFamily: "var(--cs-serif)", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.08, fontWeight: 400, marginBottom: 24 }}>
                We were losing to TikTok.
                <span style={{ display: "block", color: "var(--cs-purple)", fontStyle: "italic" }}>So we killed our entire lesson format.</span>
              </h1>
            </Fade>
            <Fade delay={0.15}>
              <P style={{ marginBottom: 32 }}>The card format was engaging. Users liked it. But they were not retaining anything. This is how I convinced the team to throw away what was working and rebuild the lesson experience from scratch.</P>
            </Fade>
            <Fade delay={0.2}>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[["App","Mindsnack"],["Role","Solo Designer"],["Shift","Cards \u2192 Articles"],["Goal","Depth + Retention"]].map(([l,v])=>(<div key={l}><span style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 2 }}>{l}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span></div>))}
              </div>
            </Fade>
          </div>
          <Fade delay={0.12}>
            <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#bbb", textTransform: "uppercase", marginBottom: 10 }}>Before</p>
                <Ph src={I.v1_card1} w={200} />
              </div>
              <div style={{ display: "flex", alignItems: "center", paddingTop: 80, fontSize: 24, color: "#ccc", fontFamily: "var(--cs-mono)" }}>&rarr;</div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#bbb", textTransform: "uppercase", marginBottom: 10 }}>After</p>
                <Ph src={I.v2_art1} w={200} />
              </div>
            </div>
          </Fade>
        </section>

        {/* PROJECT CONTEXT */}
        <section style={{ padding: "56px 8vw", background: "#fff", borderBottom: "1px solid #eee" }}>
          <Fade>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center", maxWidth: 720 }}>
              <Ph src={I.appHome} w={100} />
              <div>
                <p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>About the project</p>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "#555" }}>
                  Mindsnack is an iOS app that teaches life skills like relationships, confidence, and mental health through research backed micro lessons. I was the solo UI/UX designer for 6+ months, owning every screen from onboarding to the lesson experience to the App Store screenshots. This case study focuses on the biggest strategic design decision I made: killing the card format and rebuilding lessons as articles.
                </p>
                <Link to="/case-study/mindsnack" style={{ fontFamily: "var(--cs-mono)", fontSize: 11, color: "var(--cs-purple)", textDecoration: "none", marginTop: 8, display: "inline-block" }}>Read the full Mindsnack case study &rarr;</Link>
              </div>
            </div>
          </Fade>
        </section>

        {/* WHAT WE HAD */}
        <section style={{ padding: "100px 8vw", background: "#fff" }}>
          <Fade><Label>What we had</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Cards. Clean, fast, and forgettable.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 20 }}>V1 used swipeable cards for everything. Concept cards, wisdom cards, playbook cards, quizzes. The format felt modern. Users swiped through quickly. Engagement looked fine on the surface.</P></Fade>
          <Fade delay={0.16}><P style={{ marginBottom: 40 }}>But here is what the data did not show in the dashboard: users were not remembering what they learned. They swiped, they moved on, they forgot. The cards were optimized for consumption, not for transformation. And transformation was the whole point of the app.</P></Fade>
          <Fade delay={0.2}>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <Ph src={I.v1_card1} cap="Concept card" /><Ph src={I.v1_card2} cap="Concept card" /><Ph src={I.v1_wisdom} cap="Wisdom card" /><Ph src={I.v1_quiz} cap="Quiz card" />
            </div>
          </Fade>
        </section>

        {/* THE PROBLEM */}
        <section style={{ padding: "100px 8vw", background: "linear-gradient(180deg, #f8f5ff 0%, #fafaf8 100%)" }}>
          <Fade><Label>The real problem</Label><Divider/></Fade>
          <Fade delay={0.08}><H>We were fighting TikTok with a butter knife.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 20 }}>We looked at our users and saw three types: readers, watchers, and listeners. Our card format was built for watchers. Quick, visual, swipeable. The same behavior pattern as Instagram and TikTok.</P></Fade>
          <Fade delay={0.16}><P style={{ marginBottom: 28 }}>A startup with a tiny budget competing for the same dopamine loop as billion dollar social apps. That was never going to work. We were playing a game we could not win.</P></Fade>
          <Fade delay={0.2}>
            <div style={{ background: "var(--cs-purple)", borderRadius: 14, padding: "28px 32px", maxWidth: 520 }}>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#fff", fontWeight: 500 }}>We needed to stop competing for speed and start competing for depth. That meant abandoning watchers and building for readers and listeners.</p>
            </div>
          </Fade>
        </section>

        {/* USER TYPES */}
        <section style={{ padding: "100px 8vw", background: "#fff" }}>
          <Fade><Label>User segmentation</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Three types of learners. We picked the underserved ones.</H></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              ["\u{1F440}","Watchers","Visual, swipeable content. Short attention. Directly fighting social media. We dropped this.","#f5f5f5"],
              ["\u{1F4D6}","Readers","Want depth. Willing to invest time. Underserved by almost every learning app. We chose this.","#f0ecff"],
              ["\u{1F3A7}","Listeners","Story driven. Retain through narrative. Also underserved. We designed for this too.","#f0ecff"],
            ].map(([e,t,d,bg],i)=>(
              <Fade key={i} delay={0.06*i}><div style={{ background: bg, border: "1px solid #eee", borderRadius: 14, padding: "26px 22px" }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{e}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{t}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: "#777" }}>{d}</div>
              </div></Fade>
            ))}
          </div>
        </section>

        {/* THE NEW FORMAT */}
        <section style={{ padding: "100px 8vw", background: "#fafaf8" }}>
          <Fade><Label>The new format</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Articles built from distinct blocks. Each one has a job.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 32 }}>Not a wall of text. Each article is assembled from content blocks, and each block type serves a specific purpose. Story blocks for relatability. Stat blocks for credibility. Comparison blocks for clarity. Scenario blocks for testing. The variety keeps readers engaged while the depth delivers real value.</P></Fade>
          <Fade delay={0.16}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 44 }}>
              {[
                ["Story Block","A character in a real scenario. Brains remember stories better than facts. This is the hook."],
                ["Stat Block","Hard numbers from research. Credibility that makes concepts feel grounded."],
                ["Comparison Block","Side by side contrasts. What works vs what does not. Instant clarity."],
                ["Scenario Block","Real situations that test understanding. Learning feels continuous."],
              ].map(([t,d],i)=>(
                <Fade key={i} delay={0.04*i}><div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 12, padding: "24px 20px" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{t}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.6, color: "#777" }}>{d}</div>
                </div></Fade>
              ))}
            </div>
          </Fade>
          <Fade delay={0.24}>
            <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
              <Ph src={I.v2_art1} cap="Article header" /><Ph src={I.v2_art2} cap="Content" /><Ph src={I.v2_art3} cap="Stat block" /><Ph src={I.v2_art4} cap="Deep dive" />
            </div>
          </Fade>
        </section>

        {/* BEFORE/AFTER */}
        <section style={{ padding: "100px 8vw", background: "var(--cs-dark)", color: "#f0f0f0" }}>
          <Fade><Label>The transformation</Label><Divider/></Fade>
          <Fade delay={0.08}><H style={{ color: "#fff" }}>Same lesson. Completely different experience.</H></Fade>
          <Fade delay={0.12}><P style={{ color: "rgba(255,255,255,0.45)", marginBottom: 44 }}>The card format delivered facts quickly. The article format delivers the same concepts through stories, data, real scenarios, and actionable advice. It is not an incremental improvement. It is a different category of value.</P></Fade>
          <Fade delay={0.18}>
            <div style={{ display: "flex", gap: 56, justifyContent: "center", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--cs-purple)", textTransform: "uppercase", marginBottom: 14 }}>V1 / Cards</p>
                <div style={{ display: "flex", gap: 14 }}><Ph src={I.v1_card1} w={200} /><Ph src={I.v1_card2} w={200} /></div>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--cs-purple)", textTransform: "uppercase", marginBottom: 14 }}>V2 / Articles</p>
                <div style={{ display: "flex", gap: 14 }}><Ph src={I.v2_art2} w={200} /><Ph src={I.v2_art3} w={200} /></div>
              </div>
            </div>
          </Fade>
        </section>

        {/* TWO PRINCIPLES */}
        <section style={{ padding: "100px 8vw", background: "#fafaf8" }}>
          <Fade><Label>Design principles</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Two words that guided every decision.</H></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, maxWidth: 700, marginTop: 28 }}>
            <Fade delay={0.08}><div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "32px 24px" }}>
              <h4 style={{ fontFamily: "var(--cs-serif)", fontSize: 20, fontWeight: 400, marginBottom: 10 }}>Relatability</h4>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#777" }}>Story blocks put you in someone else's shoes. "Imagine you are on a first date and the conversation dies." Now it is personal. Now the concept sticks.</p>
            </div></Fade>
            <Fade delay={0.14}><div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "32px 24px" }}>
              <h4 style={{ fontFamily: "var(--cs-serif)", fontSize: 20, fontWeight: 400, marginBottom: 10 }}>Remembrance</h4>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#777" }}>Brains remember stories better than facts. A week later, in a real situation, users recall the story. And with the story comes the concept and what to do about it.</p>
            </div></Fade>
          </div>
        </section>

        {/* HOME EVOLUTION */}
        <section style={{ padding: "100px 8vw", background: "#fff" }}>
          <Fade><Label>Home screen</Label><Divider/></Fade>
          <Fade delay={0.08}><H>The homepage had to evolve too.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 40 }}>With richer lessons, course cards needed to show more. Titles got bigger. Descriptions got clearer. Users could understand what they were getting into before they tapped.</P></Fade>
          <Fade delay={0.18}>
            <div style={{ display: "flex", gap: 56, justifyContent: "center", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}><p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#bbb", textTransform: "uppercase", marginBottom: 12 }}>Before</p><Ph src={I.v1Home} w={240} /></div>
              <div style={{ textAlign: "center" }}><p style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#bbb", textTransform: "uppercase", marginBottom: 12 }}>After</p><Ph src={I.v2Home} w={240} /></div>
            </div>
          </Fade>
        </section>

        {/* REFLECTION */}
        <section style={{ padding: "100px 8vw", background: "var(--cs-dark)", color: "#f0f0f0" }}>
          <Fade><Label>Reflection</Label><Divider/></Fade>
          <Fade delay={0.08}><H style={{ color: "#fff" }}>Format is not decoration. Format is the product.</H></Fade>
          <Fade delay={0.12}><P style={{ color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>This pivot taught me the most important design lesson I have learned so far. How you present information matters as much as the information itself. Same research. Same concepts. Same advice. But the article format delivered far more value because it gave the content room to breathe and connect and stick.</P></Fade>
          <Fade delay={0.16}><P style={{ color: "rgba(255,255,255,0.45)" }}>The pull is always toward shorter, faster, snappier. Sometimes the right call is the opposite. Give users more. Not more noise. More depth. Let the format serve the content instead of squeezing it.</P></Fade>
        </section>

        {/* FOOTER */}
        <section style={{ padding: "64px 8vw", textAlign: "center", background: "var(--cs-bg)" }}>
          <Fade>
            <p style={{ fontFamily: "var(--cs-serif)", fontSize: "clamp(20px, 2.5vw, 30px)", marginBottom: 16 }}>Read my other case studies</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/case-study/mindsnack" style={{ padding: "10px 22px", borderRadius: 8, border: "1px solid #ddd", textDecoration: "none", color: "#1a1a1a", fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Mindsnack: Full Story &rarr;</Link>
              <Link to="/case-study/trial-cancellation-fix" style={{ padding: "10px 22px", borderRadius: 8, border: "1px solid #ddd", textDecoration: "none", color: "#1a1a1a", fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Trial Cancellation Fix &rarr;</Link>
            </div>
          </Fade>
          <div style={{ marginTop: 36, fontFamily: "var(--cs-mono)", fontSize: 10, color: "#bbb" }}>Designed by Muni Goutham &middot; 2025</div>
        </section>
      </div>
    </>
  );
}
