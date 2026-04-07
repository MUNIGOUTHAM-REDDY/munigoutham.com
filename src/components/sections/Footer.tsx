import { contactInfo, navItems } from '../../data/portfolio'

function scrollToSection(sectionId: string) {
  const el = document.getElementById(sectionId)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Footer() {
  return (
    <footer className="bg-black/20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
          {/* Brand */}
          <div>
            <p className="font-['Montserrat',sans-serif] font-bold text-white text-lg mb-2">
              Muni Goutham
            </p>
            <p className="text-white/40 text-sm">
              UI/UX Designer & Product Designer
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col sm:flex-row md:justify-center gap-3 sm:gap-6">
            {navItems.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-white/40 hover:text-accent transition-colors text-sm font-['Montserrat',sans-serif] text-left"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-4 md:justify-end">
            {contactInfo.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-accent transition-colors text-sm font-['Montserrat',sans-serif]"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/5 pt-6">
          <p className="text-white/20 text-xs text-center font-['Montserrat',sans-serif]">
            &copy; {new Date().getFullYear()} Muni Goutham. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
