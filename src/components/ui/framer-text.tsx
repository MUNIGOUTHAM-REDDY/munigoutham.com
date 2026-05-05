import { motion, type Variants } from 'motion/react'

interface FramerTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  as?: 'span' | 'h3' | 'h4' | 'p'
  once?: boolean
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function FramerText({
  text,
  className = '',
  delay = 0,
  stagger = 0.025,
  as = 'span',
  once = true,
}: FramerTextProps) {
  const Tag = motion[as]
  const words = text.split(' ')

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split('').map((char, ci) => (
            <motion.span key={`${wi}-${ci}`} variants={charVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <motion.span variants={charVariants} className="inline-block">
              &nbsp;
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  )
}
