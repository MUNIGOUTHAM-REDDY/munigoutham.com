import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import ScrollHeader from './components/ScrollHeader'
import Projects from './components/sections/Projects'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Playground from './components/sections/Playground'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import { SmoothCursor } from './components/ui/smooth-cursor'
import CaseStudyMindsnack from './pages/CaseStudyMindsnack'
import CaseStudyTrialFix from './pages/CaseStudyTrialFix'
import CaseStudyCardsToArticles from './pages/CaseStudyCardsToArticles'

function HomePage() {
  return (
    <>
      <SmoothCursor />
      <ScrollHeader />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Playground />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study/mindsnack" element={<CaseStudyMindsnack />} />
        <Route path="/case-study/trial-cancellation-fix" element={<CaseStudyTrialFix />} />
        <Route path="/case-study/cards-to-articles" element={<CaseStudyCardsToArticles />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
