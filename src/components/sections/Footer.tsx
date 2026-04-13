import { contactInfo, navItems } from '../../data/portfolio'
import { socialIcons } from '../SocialIcons'

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Logo + Brand */}
        <div className="flex items-center justify-center mb-10">
          <span className="font-['Montserrat',sans-serif] font-semibold text-white text-xl tracking-tight">
            Muni Goutham
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-14">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-white/50 hover:text-white transition-colors text-sm font-['Montserrat',sans-serif]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Dotted divider */}
        <div className="border-t border-dashed border-white/10 mb-8" />

        {/* Copyright + Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-sm font-['Montserrat',sans-serif]">
            &copy; {new Date().getFullYear()} Muni Goutham
          </p>

          <div className="flex items-center gap-5">
            {contactInfo.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
              >
                {socialIcons[social.platform] || (
                  <span className="text-sm font-['Montserrat',sans-serif]">
                    {social.platform}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
