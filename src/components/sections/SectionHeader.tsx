import { motion } from 'motion/react'

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.9445 11.9449V11.884L20.903 19.8064L12.7977 10.9698L20.7201 2.01139L11.9445 10.0557L11.8226 9.99477L20.5983 0.122197L10.8476 9.0197L1.03593 0.244081L9.93344 9.99477L9.8725 10.0557L1.09687 2.19422L9.08025 10.9089L1.09687 19.9892L9.93344 11.823L9.99438 11.9449L1.15782 21.8784L10.9694 12.859L20.9639 21.7565L11.9445 11.9449Z"
        fill="#87C23B"
      />
    </svg>
  )
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
}

export default function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <motion.div
      className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <div className="flex items-center gap-3 mb-3">
          <StarIcon className="w-5 h-5 shrink-0" />
          <h2 className="font-['Montserrat',sans-serif] font-bold text-3xl md:text-4xl lg:text-5xl text-white">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="font-['Cormorant_Garamond',serif] text-lg md:text-xl text-white/50 ml-8">
            {subtitle}
          </p>
        )}
      </div>
      
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </motion.div>
  )
}
