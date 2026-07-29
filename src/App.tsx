import { Analytics } from '@vercel/analytics/react'
import { createBrowserRouter, RouterProvider, ScrollRestoration, Outlet } from 'react-router-dom'
import Hero from './components/Hero'
import ScrollHeader from './components/ScrollHeader'
import Projects from './components/sections/Projects'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Playground from './components/sections/Playground'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'
import Sky from './components/world/Sky'
import LanternRail from './components/world/LanternRail'
import SEO from './components/SEO'
import { HOME_SEO } from './data/seo'
import CaseStudyMindsnack from './pages/CaseStudyMindsnack'
import CaseStudyTrialFix from './pages/CaseStudyTrialFix'
import CaseStudyCardsToArticles from './pages/CaseStudyCardsToArticles'
import NotFound from './pages/NotFound'

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Analytics />
      <Outlet />
    </>
  )
}

function HomePage() {
  return (
    <>
      <SEO {...HOME_SEO} />
      <ScrollHeader />
      <LanternRail />
      {/* main stays opaque and above the footer so the footer's
          scroll-reveal still works; Sky supplies that opacity now. */}
      <main className="relative z-10">
        <Sky />
        <div className="relative z-10">
          <Hero />
          <Projects />
          <About />
          <Experience />
          <Playground />
          <FAQ />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/case-study/mindsnack', element: <CaseStudyMindsnack /> },
      { path: '/case-study/trial-cancellation-fix', element: <CaseStudyTrialFix /> },
      { path: '/case-study/cards-to-articles', element: <CaseStudyCardsToArticles /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
