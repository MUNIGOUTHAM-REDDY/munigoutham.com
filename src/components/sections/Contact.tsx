import { motion } from 'motion/react'
import { contactInfo } from '../../data/portfolio'
import SectionHeader from './SectionHeader'

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
      <SectionHeader title="Contact" subtitle="Let's work together" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Info side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-['Montserrat',sans-serif] font-bold text-2xl md:text-3xl text-white mb-4">
            Got a project in mind?
          </h3>
          <p className="text-white/50 leading-relaxed mb-2">
            I'm always excited to collaborate on interesting projects.
            Drop me a message and let's create something great together.
          </p>
          <p className="text-accent text-sm font-['Montserrat',sans-serif] font-medium mb-8">
            {contactInfo.availability}
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-white/70 hover:text-accent transition-colors text-sm block"
            >
              {contactInfo.email}
            </a>

            <div className="flex gap-4">
              {contactInfo.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/30 transition-colors text-xs font-['Montserrat',sans-serif] font-bold"
                >
                  {social.platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form side */}
        <motion.form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div>
            <label htmlFor="name" className="block text-white/40 text-xs font-['Montserrat',sans-serif] uppercase tracking-wider mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-accent/50 focus:outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white/40 text-xs font-['Montserrat',sans-serif] uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-accent/50 focus:outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white/40 text-xs font-['Montserrat',sans-serif] uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-accent/50 focus:outline-none transition-colors text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-accent text-black font-['Montserrat',sans-serif] font-bold rounded-lg px-8 py-3 text-sm hover:bg-accent/90 transition-colors"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  )
}
