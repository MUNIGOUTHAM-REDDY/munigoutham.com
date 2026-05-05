import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { contactInfo } from '../../data/portfolio'

type Status = 'idle' | 'sending' | 'sent' | 'error'

type InquiryKey = 'fulltime' | 'contract' | 'collab' | 'hi'

const INQUIRIES: { key: InquiryKey; label: string; subject: string }[] = [
  { key: 'fulltime', label: 'Full-time', subject: 'Full-time opportunity' },
  { key: 'contract', label: 'Contract', subject: 'Contract opportunity' },
  { key: 'collab', label: 'Collab', subject: 'Collaboration' },
  { key: 'hi', label: 'Just hi', subject: 'Hello' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FieldProps {
  id: string
  label: string
  type?: 'text' | 'email'
  value: string
  onChange: (v: string) => void
  onBlur?: () => void
  error?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
}

function Field({ id, label, type = 'text', value, onChange, onBlur, error, required, autoComplete, placeholder }: FieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm md:text-base font-medium text-white/80">
          {label}
          {required && <span className="ml-0.5 text-white/30">*</span>}
        </label>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[12px] text-red-400/85"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        className={`mt-3 w-full bg-transparent border-b py-3 text-base md:text-lg text-white placeholder-white/25 focus:outline-none transition-colors duration-200 ${
          error ? 'border-red-400/70 focus:border-red-400' : 'border-white/12 focus:border-white/55'
        }`}
      />
    </div>
  )
}

interface TextareaProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  placeholder?: string
}

function Textarea({ id, label, value, onChange, required, placeholder }: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 280)}px`
  }, [value])

  return (
    <div>
      <label htmlFor={id} className="text-sm md:text-base font-medium text-white/80">
        {label}
        {required && <span className="ml-0.5 text-white/30">*</span>}
      </label>
      <textarea
        id={id}
        ref={ref}
        required={required}
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full resize-none overflow-hidden bg-transparent border-b border-white/12 py-3 text-base md:text-lg text-white placeholder-white/25 focus:border-white/55 focus:outline-none transition-colors duration-200"
      />
    </div>
  )
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" fill="none" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1600)
        } catch {
          /* ignore */
        }
      }}
      className="text-[12px] text-white/40 hover:text-white/80 transition-colors underline-offset-4 hover:underline"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [inquiry, setInquiry] = useState<InquiryKey>('fulltime')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')
  const [touchedEmail, setTouchedEmail] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formId = useId()
  const successRef = useRef<HTMLButtonElement | null>(null)

  const emailError =
    (touchedEmail || submitted) && form.email.length > 0 && !EMAIL_RE.test(form.email)
      ? "That doesn't look right"
      : (submitted && form.email.length === 0)
        ? 'Required'
        : undefined

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (!form.name || !form.message || !EMAIL_RE.test(form.email)) return
    if (honeypot) {
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      const subject = INQUIRIES.find(i => i.key === inquiry)?.subject ?? 'Hello'
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setSubmitted(false)
      setTouchedEmail(false)
    } catch {
      setStatus('error')
    }
  }

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
  }, [status])

  return (
    <section id="contact" className="px-6 md:px-12 py-20 md:py-24 max-w-6xl mx-auto min-h-screen flex flex-col justify-center scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-[105px] gap-y-14">
        {/* Left rail: headline + side channels */}
        <motion.div
          className="lg:col-span-5 lg:sticky lg:top-24 self-start"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-[12px] text-white/55">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            {contactInfo.availability}
          </div>

          <h2 className="mt-6 font-['Montserrat',sans-serif] font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight text-white">
            Let's talk.
          </h2>
          <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-white/55">
            Tell me about the role, the team, or what you're trying to build. I usually reply within 12 hours.
          </p>

          <div className="mt-8 flex items-center gap-3 text-sm">
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-white/85 hover:text-white transition-colors"
            >
              {contactInfo.email}
            </a>
            <span className="text-white/15">·</span>
            <CopyButton text={contactInfo.email} />
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="py-12"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/30"
                >
                  <motion.svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <motion.polyline
                      points="20 6 9 17 4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </motion.svg>
                </motion.div>
                <h3 className="font-['Montserrat',sans-serif] font-bold text-2xl text-white tracking-tight">Message on its way.</h3>
                <p className="mt-2 text-white/55 text-[15px]">Check your inbox for a confirmation. I usually reply within 12 hours.</p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    ref={successRef}
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Send another
                  </button>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-[13px] text-white/55 hover:text-white transition-colors"
                  >
                    Email directly
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-9"
                noValidate
              >
                <div>
                  <span id={`${formId}-inquiry`} className="block text-sm md:text-base font-medium text-white/80 mb-4">
                    What's this about?
                  </span>
                  <div role="radiogroup" aria-labelledby={`${formId}-inquiry`} className="flex flex-wrap gap-2.5">
                    {INQUIRIES.map(opt => {
                      const active = inquiry === opt.key
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => setInquiry(opt.key)}
                          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                            active
                              ? 'bg-white text-black'
                              : 'border border-white/12 text-white/65 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                  <Field
                    id={`${formId}-name`}
                    label="Name"
                    placeholder="Jane Doe"
                    value={form.name}
                    required
                    autoComplete="name"
                    onChange={v => setForm(f => ({ ...f, name: v }))}
                    error={submitted && !form.name ? 'Required' : undefined}
                  />
                  <Field
                    id={`${formId}-email`}
                    label="Email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    required
                    autoComplete="email"
                    onChange={v => setForm(f => ({ ...f, email: v }))}
                    onBlur={() => setTouchedEmail(true)}
                    error={emailError}
                  />
                </div>

                <Textarea
                  id={`${formId}-message`}
                  label="Message"
                  placeholder="Tell me a little about what you're working on…"
                  value={form.message}
                  required
                  onChange={v => setForm(f => ({ ...f, message: v }))}
                />

                <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px]">
                  <label htmlFor={`${formId}-company`}>Company (leave blank)</label>
                  <input
                    id={`${formId}-company`}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={e => setHoneypot(e.target.value)}
                  />
                </div>

                <div aria-live="polite" className="min-h-[18px]">
                  {status === 'error' && (
                    <p className="text-red-400/85 text-[13px]">Something went wrong. Try again, or email me directly.</p>
                  )}
                </div>

                <div className="flex items-center justify-end pt-2">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {status === 'sending' ? (
                      <>
                        <Spinner />
                        Sending
                      </>
                    ) : (
                      'Send message'
                    )}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
