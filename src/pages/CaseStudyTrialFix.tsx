import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const I = {
  paywall: "/images/cs2/paywall.png",
  trialReminder: "/images/cs2/trial-reminder.png",
  continues: "/images/cs2/continues.png",
  appHome: "/images/cs2/app-home.png",
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

function Ph({ src, cap, w = 220, glow }: { src: string; cap?: string; w?: number; glow?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flexShrink: 0 }}>
      <div style={{ width: w, aspectRatio: "9/19.5", borderRadius: 24, overflow: "hidden", boxShadow: glow ? "0 16px 48px rgba(109,59,232,0.25), 0 0 80px rgba(109,59,232,0.1)" : "0 14px 44px rgba(0,0,0,0.13)", border: glow ? "4px solid #6d3be8" : "4px solid #1a1a1a", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
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

export default function CaseStudyTrialFix() {
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
        <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "5vw", padding: "100px 6vw 80px", background: "linear-gradient(160deg, #fafaf8 0%, #f0eaff 45%, #fafaf8 100%)" }}>
          <div>
            <Fade><Label>UX Case Study / 2025</Label></Fade>
            <Fade delay={0.08}>
              <h1 style={{ fontFamily: "var(--cs-serif)", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1.08, fontWeight: 400, maxWidth: 650, marginBottom: 24 }}>
                How <span style={{ color: "var(--cs-purple)", fontStyle: "italic" }}>one screen</span> cut trial cancellations by 10%
              </h1>
            </Fade>
            <Fade delay={0.15}>
              <P style={{ marginBottom: 36 }}>Users were not leaving because they disliked the product. They were leaving because they feared being charged. One screen. Clear copy. An exact date. That was the fix.</P>
            </Fade>
            <Fade delay={0.22}>
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {[["App","Mindsnack"],["Role","Solo Designer"],["Timeline","2 weeks"],["Result","-10% cancellations"]].map(([l,v])=>(<div key={l}><span style={{ fontFamily: "var(--cs-mono)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", display: "block", marginBottom: 2 }}>{l}</span><span style={{ fontSize: 13, fontWeight: 600 }}>{v}</span></div>))}
              </div>
            </Fade>
          </div>
          <Fade delay={0.1}>
            <Ph src={I.trialReminder} w={280} glow />
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
                  Mindsnack is an iOS learning app that teaches life skills like relationships, confidence, mental health, and finance through research backed micro lessons. I was the solo UI/UX designer, responsible for the entire product from onboarding to the App Store presence. This case study focuses on one specific UX problem I solved during my time on the project.
                </p>
                <Link to="/case-study/mindsnack" style={{ fontFamily: "var(--cs-mono)", fontSize: 11, color: "var(--cs-purple)", textDecoration: "none", marginTop: 8, display: "inline-block" }}>Read the full Mindsnack case study &rarr;</Link>
              </div>
            </div>
          </Fade>
        </section>

        {/* THE SIGNAL */}
        <section style={{ padding: "100px 8vw", background: "#fff" }}>
          <Fade><Label>The signal</Label><Divider/></Fade>
          <Fade delay={0.08}><H>Users started the trial and cancelled it within seconds.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 20 }}>We were testing with 15 to 20 users at a time. Small batches. But the pattern was loud: people completed the full onboarding, picked their topics, set their goals, started the free trial, and then cancelled. Immediately.</P></Fade>
          <Fade delay={0.16}><P>My first thought was that the product was not convincing enough. But that did not make sense. They went through everything. They clearly wanted it. So what was going on?</P></Fade>
        </section>

        {/* THE INSIGHT */}
        <section style={{ padding: "100px 8vw", background: "linear-gradient(180deg, #f8f5ff 0%, #fafaf8 100%)" }}>
          <Fade><Label>The insight</Label><Divider/></Fade>
          <Fade delay={0.08}><H>They were not unhappy. They were <span style={{ color: "var(--cs-purple)", fontStyle: "italic" }}>scared.</span></H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 28 }}>Think about the last free trial you started. Did you set a calendar reminder? Probably not. Everyone has been burned. You sign up, you forget, you get charged for something you stopped using two weeks ago. The reflex is to cancel immediately just to protect yourself.</P></Fade>
          <Fade delay={0.16}>
            <div style={{ background: "var(--cs-purple)", borderRadius: 14, padding: "28px 32px", maxWidth: 520 }}>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "#fff", fontWeight: 500 }}>The problem was not the product. It was not the price. It was trust. Users did not believe they would remember to cancel before being charged.</p>
            </div>
          </Fade>
        </section>

        {/* THE SOLUTION */}
        <section style={{ padding: "100px 8vw", background: "#fff" }}>
          <Fade><Label>The solution</Label><Divider/></Fade>
          <Fade delay={0.08}><H>One screen that says: we have got your back.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 44 }}>Right after the user starts their trial, this screen appears. It shows the exact date we will remind them. December 18. Not "before your trial ends." The actual date. Below that: "No surprise charges ever." Two buttons: "Remind Me" and "Maybe Later." Both are safe. No pressure.</P></Fade>
          <Fade delay={0.18}>
            <div style={{ display: "flex", gap: 28, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
              <Ph src={I.paywall} cap="Paywall" w={200} />
              <div style={{ fontSize: 22, color: "#ccc", fontFamily: "var(--cs-mono)" }}>&rarr;</div>
              <Ph src={I.trialReminder} cap="The fix" w={260} glow />
              <div style={{ fontSize: 22, color: "#ccc", fontFamily: "var(--cs-mono)" }}>&rarr;</div>
              <Ph src={I.continues} cap="Continues" w={200} />
            </div>
          </Fade>
        </section>

        {/* WHY IT WORKS */}
        <section style={{ padding: "100px 8vw", background: "var(--cs-dark)", color: "#f0f0f0" }}>
          <Fade><Label>Design decisions</Label><Divider/></Fade>
          <Fade delay={0.08}><H style={{ color: "#fff" }}>Three choices that made it work</H></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 32 }}>
            {[
              ["Exact date, not vague words","December 18. Not 'before your trial ends.' Specific dates feel trustworthy. Vague language does not calm anxiety."],
              ["Timed to the anxiety peak","This screen appears the moment they commit. Not in an email they will miss. Not in settings. Right when they need it."],
              ["Both buttons are safe","'Remind Me' and 'Maybe Later' both feel okay. No guilt. No pressure. The user stays in control."],
            ].map(([t,d],i)=>(
              <Fade key={i} delay={0.06*i}><div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "26px 20px" }}>
                <h4 style={{ fontFamily: "var(--cs-serif)", fontSize: 17, fontWeight: 400, marginBottom: 8 }}>{t}</h4>
                <p style={{ fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,0.4)" }}>{d}</p>
              </div></Fade>
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section style={{ padding: "80px 8vw 100px", background: "#fafaf8" }}>
          <Fade><Label>Results</Label><Divider/></Fade>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, maxWidth: 520 }}>
            <Fade delay={0.06}><div style={{ background: "#fff", border: "1px solid #eee", borderTop: "3px solid #10b981", borderRadius: 14, padding: "32px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--cs-serif)", fontSize: 52, color: "#10b981" }}>10%</div>
              <div style={{ fontFamily: "var(--cs-mono)", fontSize: 10, color: "#10b981", marginBottom: 6 }}>Reduction</div>
              <div style={{ fontSize: 13, color: "#777" }}>Fewer trial cancellations</div>
            </div></Fade>
            <Fade delay={0.12}><div style={{ background: "#fff", border: "1px solid #eee", borderTop: "3px solid var(--cs-purple)", borderRadius: 14, padding: "32px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--cs-serif)", fontSize: 52, color: "var(--cs-purple)" }}>19%</div>
              <div style={{ fontFamily: "var(--cs-mono)", fontSize: 10, color: "var(--cs-purple)", marginBottom: 6 }}>Of onboarded users</div>
              <div style={{ fontSize: 13, color: "#777" }}>Activated the trial</div>
            </div></Fade>
          </div>
        </section>

        {/* TAKEAWAY */}
        <section style={{ padding: "100px 8vw", background: "linear-gradient(180deg, #f8f5ff 0%, #fafaf8 100%)" }}>
          <Fade><Label>Takeaway</Label><Divider/></Fade>
          <Fade delay={0.08}><H>I did not add a feature. I removed a fear.</H></Fade>
          <Fade delay={0.12}><P style={{ marginBottom: 20 }}>No redesign. No pricing change. One screen, clear copy, an exact date. That was it. The lesson: good UX is not always about adding more. Sometimes it is about noticing the one thing causing friction and removing it with precision.</P></Fade>
          <Fade delay={0.16}><P>And the bigger lesson: watch what users do, not what you assume they feel. If I had assumed they disliked the product, I would have fixed the wrong thing.</P></Fade>
        </section>

        {/* FOOTER */}
        <section style={{ padding: "64px 8vw", textAlign: "center", background: "var(--cs-bg)" }}>
          <Fade>
            <p style={{ fontFamily: "var(--cs-serif)", fontSize: "clamp(20px, 2.5vw, 30px)", marginBottom: 16 }}>Read my other case studies</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/case-study/mindsnack" style={{ padding: "10px 22px", borderRadius: 8, border: "1px solid #ddd", textDecoration: "none", color: "#1a1a1a", fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Mindsnack: Full Story &rarr;</Link>
              <Link to="/case-study/cards-to-articles" style={{ padding: "10px 22px", borderRadius: 8, border: "1px solid #ddd", textDecoration: "none", color: "#1a1a1a", fontFamily: "var(--cs-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Cards to Articles Pivot &rarr;</Link>
            </div>
          </Fade>
          <div style={{ marginTop: 36, fontFamily: "var(--cs-mono)", fontSize: 10, color: "#bbb" }}>Designed by Muni Goutham &middot; 2025</div>
        </section>
      </div>
    </>
  );
}
