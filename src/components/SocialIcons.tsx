import type { ReactNode } from 'react'

const iconMap: Record<string, string> = {
  LinkedIn: '/icons/social/linkedin.png',
  GitHub: '/icons/social/github.png',
  Behance: '/icons/social/behance.png',
  Instagram: '/icons/social/instagram.png',
  X: '/icons/social/twitter.png',
  Twitter: '/icons/social/twitter.png',
  Pinterest: '/icons/social/pinterest.png',
  Dribbble: '/icons/social/dribbble.png',
}

const INVERT_PLATFORMS = new Set(['GitHub', 'X', 'Twitter'])

function SocialIcon({ src, alt, invert }: { src: string; alt: string; invert?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      width={44}
      height={44}
      loading="lazy"
      style={invert ? { filter: 'invert(1)' } : undefined}
      className="w-[44px] h-[44px] object-contain opacity-70 hover:opacity-100 transition-opacity"
    />
  )
}

export const socialIcons: Record<string, ReactNode> = Object.fromEntries(
  Object.entries(iconMap).map(([platform, src]) => [
    platform,
    <SocialIcon
      key={platform}
      src={src}
      alt={`${platform} icon`}
      invert={INVERT_PLATFORMS.has(platform)}
    />,
  ]),
)
