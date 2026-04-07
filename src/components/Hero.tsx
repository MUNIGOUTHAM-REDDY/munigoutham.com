import { useState, useEffect } from 'react'
import heroBg from '../assets/hero-bg.png'
import heroBgMobile from '../assets/hero-bg-mobile.png'
import iconHome from '../assets/icon-home.svg'
import iconGallery from '../assets/icon-gallery.svg'
import iconDesign from '../assets/icon-design.svg'
import iconProfile from '../assets/icon-profile.svg'
import iconGame from '../assets/icon-game.svg'
import starHeader from '../assets/star-header.svg'
import glow1 from '../assets/glow1.svg'
import glow2 from '../assets/glow2.svg'
import { Meteors } from '@/components/ui/meteors'
import StarBorder from './StarBorder'
import './Hero.css'

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9445 11.9449V11.884L20.903 19.8064L12.7977 10.9698L20.7201 2.01139L11.9445 10.0557L11.8226 9.99477L20.5983 0.122197L10.8476 9.0197L1.03593 0.244081L9.93344 9.99477L9.8725 10.0557L1.09687 2.19422L9.08025 10.9089L1.09687 19.9892L9.93344 11.823L9.99438 11.9449L1.15782 21.8784L10.9694 12.859L20.9639 21.7565L11.9445 11.9449Z"
        fill="#87C23B"
      />
    </svg>
  )
}

function IndiaTime() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false })
  )
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false }))
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return <span>{time}</span>
}

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__background">
        <img
          className="hero__bg-img hero__bg-img--mobile"
          src={heroBgMobile}
          alt="Nighttime illustration with a tree and lantern"
        />
        <div className="hero__bg-rotator">
          <img
            className="hero__bg-img hero__bg-img--desktop"
            src={heroBg}
            alt="Nighttime illustration with a tree and lantern"
          />
        </div>
        <div className="hero__overlay" />
      </div>

      {/* Glow effects near lantern */}
      <img className="hero__glow hero__glow--1" src={glow1} alt="" aria-hidden="true" />
      <img className="hero__glow hero__glow--2" src={glow2} alt="" aria-hidden="true" />

      {/* Meteors */}
      <div className="hero__meteors">
        <Meteors number={10} />
      </div>

      {/* Top bar: INDIA ✦ 14:34 (mobile + tablet) */}
      <div className="hero__topbar">
        <div className="hero__topbar-blur" />
        <div className="hero__topbar-inner">
          <span>INDIA</span>
          <img className="hero__topbar-star" src={starHeader} alt="" />
          <IndiaTime />
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hero__desknav">
        <div className="hero__desknav-blur" />
        <div className="hero__desknav-inner">
          <a href="#hero" className="hero__desknav-link">Home</a>
          <a href="#about" className="hero__desknav-link">About</a>
          <a href="#projects" className="hero__desknav-link">Projects</a>
          <a href="#playground" className="hero__desknav-link">Playground</a>
          <a href="#contact" className="hero__desknav-link">Contact</a>
        </div>
      </nav>

      <div className="hero__content">
        <h1 className="hero__name">
          <span>MUNI</span>
          <span>GOUTHAM</span>
        </h1>
        <div className="hero__subtitle">
          <span>UI/UX Designer</span>
          <StarIcon className="hero__star" />
          <span>Product Designer</span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="hero__bottom-fade" />

      {/* Bottom nav with StarBorder (mobile + tablet) */}
      <div className="hero__bottomnav">
        <StarBorder
          as="div"
          className="hero__bottomnav-starborder"
          color="#87C23B"
          speed="5s"
        >
          <div className="hero__bottomnav-inner">
            <div className="hero__bottomnav-item hero__bottomnav-item--active">
              <img src={iconHome} alt="Home" />
            </div>
            <div className="hero__bottomnav-item">
              <img src={iconGallery} alt="Gallery" />
            </div>
            <div className="hero__bottomnav-item">
              <img src={iconDesign} alt="Design" />
            </div>
            <div className="hero__bottomnav-item">
              <img src={iconProfile} alt="Profile" />
            </div>
            <div className="hero__bottomnav-item">
              <img src={iconGame} alt="Game" />
            </div>
          </div>
        </StarBorder>
      </div>
    </section>
  )
}
