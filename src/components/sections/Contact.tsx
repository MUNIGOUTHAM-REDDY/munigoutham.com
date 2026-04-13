import { useState, type FormEvent } from 'react'
import { motion } from 'motion/react'

function GridDecoration() {
  return (
    <div className="absolute top-0 right-0 w-48 h-32 overflow-hidden rounded-tr-2xl opacity-[0.04] pointer-events-none">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="contactGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contactGrid)" />
      </svg>
    </div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="px-6 md:px-12 py-20 md:py-28 max-w-6xl mx-auto">
      <motion.div
        className="mb-12 md:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-['Montserrat',sans-serif] font-bold text-3xl md:text-4xl lg:text-5xl text-white">
          Looking for a Product Designer?
        </h2>
      </motion.div>

      <motion.div
        className="relative bg-card border border-white/[0.06] rounded-2xl p-6 md:p-8 overflow-hidden max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
          <GridDecoration />

          {status === 'sent' ? (
            <div className="relative py-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-['Montserrat',sans-serif] font-bold text-lg text-white mb-2">Message sent</h3>
              <p className="text-white/40 text-sm mb-6">I'll get back to you soon. Check your inbox for a confirmation.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-accent text-sm font-['Montserrat',sans-serif] font-medium hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative space-y-5">
              <div>
                <label htmlFor="name" className="block text-white/40 text-xs font-['Montserrat',sans-serif] uppercase tracking-wider mb-2">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-accent/50 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white/40 text-xs font-['Montserrat',sans-serif] uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="your@email.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-accent/50 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white/40 text-xs font-['Montserrat',sans-serif] uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="Role or opportunity"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-accent/50 focus:outline-none transition-colors text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/40 text-xs font-['Montserrat',sans-serif] uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell me about the role or team..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-accent/50 focus:outline-none transition-colors text-sm resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-accent text-black font-['Montserrat',sans-serif] font-bold rounded-lg px-8 py-3 text-sm hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
      </motion.div>
    </section>
  )
}
