import * as React from 'react'
import { useState, useEffect } from 'react'
import heroBg from '../assets/hero-bg.webp'
import heroBgMobile from '../assets/hero-bg-mobile.webp'
import iconHome from '../assets/icon-home.svg'
import iconGallery from '../assets/icon-gallery.svg'
import iconDesign from '../assets/icon-design.svg'
import iconProfile from '../assets/icon-profile.svg'
import iconGame from '../assets/icon-game.svg'
import starHeader from '../assets/star-header.svg'
import glow1 from '../assets/glow1.svg'
import glow2 from '../assets/glow2.svg'

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

type NavIconProps = { className?: string }

function HomeIcon({ className }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 29.04 29.04" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4.84013 2.41984V25.4098C4.84013 26.0753 5.38463 26.6198 6.05013 26.6198H22.9901C23.6556 26.6198 24.2001 26.0753 24.2001 25.4098V3.62984C24.2001 3.21844 23.9944 2.84334 23.6556 2.62554C23.4904 2.51287 23.2989 2.44475 23.0996 2.42779C22.9004 2.41083 22.7001 2.44561 22.5182 2.52874L7.26013 9.05064V2.41984H4.84013ZM12.1001 24.1998V18.1498H16.9401V24.1998H12.1001ZM21.7801 5.46904V24.1998H19.3601V18.1498C19.3601 16.8188 18.2711 15.7298 16.9401 15.7298H12.1001C10.7691 15.7298 9.68013 16.8188 9.68013 18.1498V24.1998H7.26013V11.6884L21.7801 5.46904Z" />
    </svg>
  )
}

function ProfileIcon({ className }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 23.7207 29.0399" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.8652 19.3306C16.969 20.4061 15.774 21.3621 14.2205 21.9297C13.4736 22.1986 12.667 22.3479 11.8604 22.3479C11.0537 22.3479 10.277 22.2284 9.53012 21.9596C7.97662 21.4218 6.75175 20.4658 5.8555 19.3604C4.57087 20.0476 2.33025 21.3023 0 23.0052C2.65887 26.6499 6.99075 29.0399 11.8604 29.0399C16.73 29.0399 21.0619 26.6499 23.7207 22.9753C21.3905 21.2724 19.1499 20.0177 17.8652 19.3306Z" />
      <path d="M4.24255 12.9973C4.4218 13.5948 4.72055 14.73 5.43755 15.3873C5.9753 17.359 7.5288 19.6594 10.0383 20.5557C10.6358 20.7648 11.2632 20.8843 11.9204 20.8843C12.5478 20.8843 13.1752 20.7648 13.7727 20.5557C16.2822 19.6594 17.8357 17.3889 18.3734 15.3873C19.0904 14.73 19.3892 13.5948 19.5684 12.9973C19.8373 12.0413 20.1062 10.6969 19.3892 9.74091C19.3593 9.71103 19.3294 9.68116 19.2995 9.62141C19.3593 9.29278 19.3892 8.96416 19.419 8.66541C20.2555 3.04891 17.1485 2.69041 16.79 2.69041C16.7602 2.69041 16.7602 2.66054 16.7303 2.66054C16.3718 1.19666 14.2805 -0.326961 12.3088 0.0614138C10.3669 0.479664 6.30392 0.00166377 6.30392 0.00166377C6.24417 0.868038 6.99105 1.46554 6.99105 1.46554C3.55542 3.55679 4.1828 8.03803 4.51142 9.62141C4.48155 9.65128 4.45167 9.68116 4.4218 9.74091C3.7048 10.6969 3.97367 12.0413 4.24255 12.9973ZM6.03505 10.3683C6.06492 10.3683 6.0948 10.3683 6.12467 10.3683V10.3384C6.03505 10.0397 5.6168 8.33678 7.08067 7.32103C8.27567 7.58991 10.0682 7.64966 12.5179 6.60404C17.2382 4.57254 17.6564 10.3683 17.6564 10.3683C17.6863 10.3683 17.7162 10.3683 17.746 10.3683C18.224 10.3683 18.7319 10.7567 18.1942 12.6089C17.7759 14.0728 17.3875 14.491 17.1187 14.491C16.8498 16.2238 15.5054 18.4345 13.2947 19.2113C12.8465 19.3607 12.3685 19.4503 11.8905 19.4503C11.4125 19.4503 10.9345 19.3607 10.4864 19.2113C8.30555 18.4345 6.9313 16.2238 6.66242 14.491C6.36367 14.4612 5.9753 14.0728 5.58692 12.6089C5.04917 10.7268 5.55705 10.3683 6.03505 10.3683Z" />
    </svg>
  )
}

function DesignIcon({ className }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 31.4943 31.46" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1.75296 19.9907L9.22866 22.2332L11.4711 29.7075C11.787 30.7599 12.7005 31.448 13.7988 31.4598C14.8932 31.4729 15.8277 30.8058 16.1645 29.7613L21.002 14.8595C21.7373 15.0876 22.5341 14.8975 23.1029 14.3366L24.0453 13.3929C26.1554 17.9697 25.2248 23.33 21.6167 26.9382C21.2825 27.2488 21.5393 27.849 21.9876 27.8333C22.1213 27.8333 22.2563 27.7822 22.3585 27.68C25.8422 24.1963 27.0242 19.2108 25.6416 14.6538L27.601 16.6132C26.369 18.7233 29.1462 20.8649 30.8841 19.1558C32.2065 17.8976 31.2275 15.5305 29.4018 15.5764C29.0217 15.5764 28.6613 15.6839 28.3428 15.8726L24.9547 12.4846L26.0648 11.3719C26.8814 10.554 26.8814 9.22507 26.0648 8.40724L23.1015 5.43736C22.2798 4.62346 20.9482 4.62346 20.133 5.43998L19.0229 6.55269L15.6335 3.16328C16.8654 1.05317 14.0882 -1.08842 12.3503 0.620682C10.64 2.35988 12.7828 5.13576 14.8929 3.9038L16.8654 5.87629C12.3282 4.52767 7.25078 5.71901 3.82479 9.14629C3.34379 9.63253 4.07774 10.3704 4.56659 9.88809C8.11839 6.33763 13.5927 5.39012 18.1172 7.46081L17.1749 8.40577C16.6257 8.94968 16.4383 9.73603 16.6362 10.4504L1.70021 15.2969C0.655643 15.6364 -0.0114698 16.5643 0.000340441 17.6626C0.012136 18.7609 0.7002 19.6744 1.75266 19.9903L1.75296 19.9907ZM28.6613 16.9304C29.6521 15.9723 31.1029 17.4232 30.1436 18.4127C29.1344 19.3432 27.7071 17.9382 28.6613 16.9304ZM14.5748 2.84394C13.5656 3.77577 12.1384 2.36948 13.0925 1.36161C14.082 0.402228 15.5342 1.85442 14.5748 2.84394ZM17.913 9.14666L20.875 6.1794C21.2826 5.77047 21.951 5.77181 22.3612 6.1794L25.3232 9.14666C25.7321 9.55559 25.7321 10.2201 25.3232 10.6277L23.8448 12.1087C23.8383 12.1152 22.3625 13.5936 22.3625 13.5936C22.086 13.8676 21.6836 13.9606 21.3258 13.8597L21.6273 12.9292C21.9143 12.0458 21.6849 11.089 21.0283 10.4311C20.3717 9.7732 19.4136 9.54384 18.5303 9.83085L17.6299 10.1231C17.5499 9.77843 17.6482 9.40621 17.9117 9.14538L17.913 9.14666ZM2.02446 16.2949L18.8554 10.8296C19.8948 10.4443 21.0232 11.5544 20.6313 12.6068L20.1792 13.9974C20.1765 14.004 15.1662 29.438 15.1662 29.438C14.7048 30.7643 12.904 30.7447 12.4742 29.4078L10.1504 21.6621C10.0993 21.493 9.96826 21.3619 9.79918 21.3108L2.05338 18.9871C0.711305 18.5545 0.696878 16.7564 2.02324 16.2951L2.02446 16.2949Z" />
    </svg>
  )
}

function GameIcon({ className }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 32.6699 23.967" fill="none" stroke="currentColor" strokeWidth="1.815" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M23.437 0.907773C24.2586 0.907773 25.1327 1.03725 25.8365 1.33941C26.4992 1.62401 27.313 2.21251 27.313 3.24859V4.06891C28.0001 4.60106 28.6025 5.35893 29.1167 6.21051C29.7231 7.21474 30.2456 8.41238 30.6617 9.68121C31.49 12.2074 31.9311 15.1256 31.7027 17.5298C31.4257 20.4478 29.9619 22.3799 27.8521 22.9136C25.8031 23.4318 23.505 22.5308 21.7212 20.6011C20.1749 18.9288 18.555 18.0806 16.3345 18.0562C14.2526 18.0804 12.6981 18.8272 11.2398 20.2974L10.9488 20.6011C9.16497 22.5309 6.86695 23.432 4.81791 22.9136C2.70797 22.3798 1.24442 20.4473 0.967319 17.5289C0.739511 15.1253 1.18013 12.2067 2.00833 9.68023C2.4243 8.41136 2.947 7.21385 3.55326 6.20953C4.06698 5.35856 4.66862 4.60104 5.35501 4.06891V3.24859C5.35503 2.21253 6.16888 1.62401 6.83158 1.33941C7.53538 1.03725 8.40944 0.907773 9.23099 0.907773C10.0524 0.907809 10.9257 1.03729 11.6294 1.33941C12.2922 1.62397 13.106 2.21239 13.106 3.24859V4.07379C15.0337 4.96304 17.6339 4.96358 19.562 4.07477V3.24859C19.5621 2.2124 20.3759 1.62397 21.0386 1.33941C21.7423 1.0373 22.6156 0.907813 23.437 0.907773Z" />
    </svg>
  )
}

function BriefcaseIcon({ className }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9.4 2.6c-.97 0-1.76.79-1.76 1.76V6H4.2A2.2 2.2 0 0 0 2 8.2v9.6A2.2 2.2 0 0 0 4.2 20h15.6a2.2 2.2 0 0 0 2.2-2.2V8.2A2.2 2.2 0 0 0 19.8 6h-3.44V4.36c0-.97-.79-1.76-1.76-1.76H9.4Zm0 1.6h5.2c.09 0 .16.07.16.16V6H9.24V4.36c0-.09.07-.16.16-.16ZM4.2 7.6h15.6c.33 0 .6.27.6.6v3.12h-7v-.92a.8.8 0 0 0-1.6 0v.92h-8.2V8.2c0-.33.27-.6.6-.6Zm-.6 5.32h8.2v.96a.8.8 0 0 0 1.6 0v-.96h7v4.88c0 .33-.27.6-.6.6H4.2a.6.6 0 0 1-.6-.6v-4.88Z" />
    </svg>
  )
}

function MailIcon({ className }: NavIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3.6 5.2A2.4 2.4 0 0 0 1.2 7.6v8.8a2.4 2.4 0 0 0 2.4 2.4h16.8a2.4 2.4 0 0 0 2.4-2.4V7.6a2.4 2.4 0 0 0-2.4-2.4H3.6Zm0 1.6h16.8c.16 0 .31.04.44.11L12 13.42 3.16 6.91c.13-.07.28-.11.44-.11ZM2.8 8.5l8.71 6.41a.8.8 0 0 0 .98 0L21.2 8.5v7.9c0 .44-.36.8-.8.8H3.6a.8.8 0 0 1-.8-.8V8.5Z" />
    </svg>
  )
}

const DESKTOP_NAV: ReadonlyArray<{ id: string; label: string; Icon: (p: NavIconProps) => React.JSX.Element }> = [
  { id: 'hero', label: 'Home', Icon: HomeIcon },
  { id: 'projects', label: 'Projects', Icon: DesignIcon },
  { id: 'about', label: 'About', Icon: ProfileIcon },
  { id: 'experience', label: 'Experience', Icon: BriefcaseIcon },
  { id: 'playground', label: 'Playground', Icon: GameIcon },
  { id: 'contact', label: 'Contact', Icon: MailIcon },
]

function DesktopNav() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = DESKTOP_NAV
      .map(n => document.getElementById(n.id))
      .filter((e): e is HTMLElement => Boolean(e))
    if (!els.length) return
    const ratios = new Map<string, number>()
    const obs = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0)
        }
        let topId: string | null = null
        let topRatio = 0
        for (const [id, r] of ratios) {
          if (r > topRatio) {
            topRatio = r
            topId = id
          }
        }
        setActive(topRatio > 0 ? topId : null)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <nav className="hero__desknav">
      <div className="hero__desknav-blur" />
      <div className="hero__desknav-inner">
        {DESKTOP_NAV.map(item => {
          const isActive = active === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`hero__desknav-link${isActive ? ' hero__desknav-link--active' : ''}`}
            >
              {isActive && <item.Icon className="hero__desknav-icon" />}
              <span>{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
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
      <DesktopNav />

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

      {/* Bottom nav with StarBorder (mobile + tablet) */}
      <div className="hero__bottomnav">
        <StarBorder
          as="div"
          className="hero__bottomnav-starborder"
          color="#87C23B"
          speed="5s"
        >
          <div className="hero__bottomnav-inner">
            <button className="hero__bottomnav-item hero__bottomnav-item--active" onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>
              <img src={iconHome} alt="Home" />
            </button>
            <button className="hero__bottomnav-item" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              <img src={iconDesign} alt="Projects" />
            </button>
            <button className="hero__bottomnav-item" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              <img src={iconProfile} alt="About" />
            </button>
            <button className="hero__bottomnav-item" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
              <img src={iconGallery} alt="Experience" />
            </button>
            <button className="hero__bottomnav-item" onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}>
              <img src={iconGame} alt="Playground" />
            </button>
          </div>
        </StarBorder>
      </div>
    </section>
  )
}
