export const SITE_URL = 'https://munigoutham.com'
export const SITE_NAME = 'Muni Goutham'
export const DEFAULT_OG = '/og/default.png'

export interface RouteSEO {
  path: string
  title: string
  description: string
  image: string
  type: 'website' | 'article'
}

export const HOME_SEO: RouteSEO = {
  path: '/',
  title: 'Muni Goutham — Product & UX Designer',
  description:
    'Product & UX designer building thoughtful digital experiences end-to-end. Case studies on Mindsnack, trial cancellation flows, and content format strategy.',
  image: DEFAULT_OG,
  type: 'website',
}

export const CASE_STUDY_SEO: Record<string, RouteSEO> = {
  mindsnack: {
    path: '/case-study/mindsnack',
    title: 'Mindsnack — Solo-designed iOS learning app | Muni Goutham',
    description:
      'Solo-designed Mindsnack end-to-end: onboarding, lessons, and App Store presence. 31.9% conversion rate, 10% fewer cancellations.',
    image: '/og/mindsnack.png',
    type: 'article',
  },
  'trial-cancellation-fix': {
    path: '/case-study/trial-cancellation-fix',
    title: 'Trial Cancellation Fix — UX research case study | Muni Goutham',
    description:
      'One screen cut trial cancellations by 10%. Users were not unhappy, they were scared of surprise charges. I removed the fear.',
    image: '/og/trial-fix.png',
    type: 'article',
  },
  'cards-to-articles': {
    path: '/case-study/cards-to-articles',
    title: 'Cards to Articles — Format pivot case study | Muni Goutham',
    description:
      'Killed the card-based lesson format and rebuilt it as articles. Stopped competing with TikTok, started competing on depth.',
    image: '/og/cards-to-articles.png',
    type: 'article',
  },
}

export const ALL_ROUTES: RouteSEO[] = [HOME_SEO, ...Object.values(CASE_STUDY_SEO)]
