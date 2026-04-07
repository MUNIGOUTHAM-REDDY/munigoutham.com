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

function App() {
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

export default App
