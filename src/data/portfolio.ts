// ==========================================
// Portfolio Model Data
// Replace placeholder values with your own
// ==========================================

// --- Projects ---
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  slug?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Mindsnack",
    description: "Designed the entire iOS learning app as solo designer. Onboarding, lessons, App Store presence. 31.9% conversion rate, 10% fewer cancellations.",
    tags: ["Product Design", "iOS", "Solo Designer"],
    slug: "/case-study/mindsnack",
    featured: true,
  },
  {
    id: "2",
    title: "Trial Cancellation Fix",
    description: "One screen cut trial cancellations by 10%.\nUsers weren't unhappy, they were scared of surprise charges. I removed the fear.",
    tags: ["UX Research", "Conversion", "Behavioral Design"],
    slug: "/case-study/trial-cancellation-fix",
  },
  {
    id: "3",
    title: "Cards to Articles Pivot",
    description: "Killed the card-based lesson format and rebuilt it as articles. Stopped competing with TikTok, started competing on depth.",
    tags: ["Strategy", "Content Design", "Format Design"],
    slug: "/case-study/cards-to-articles",
  },
]

// --- Profile / About ---
export interface Skill {
  name: string
  category: "design" | "development" | "tools"
}

export interface Profile {
  headline: string
  bio: string[]
  skills: Skill[]
}

export const profile: Profile = {
  headline: "Making complex products feel simple",
  bio: [
    "Product Designer who works end-to-end across SaaS, fintech, and consumer apps.",
    "I simplify complex workflows, build design systems, and use analytics to inform decisions.",
    "Comfortable in fast-paced startups with high ownership.",
  ],
  skills: [
    { name: "UI Design", category: "design" },
    { name: "UX Research", category: "design" },
    { name: "Interaction Design", category: "design" },
    { name: "Design Systems", category: "design" },
    { name: "Wireframing & Prototyping", category: "design" },
    { name: "Usability Testing", category: "design" },
    { name: "Information Architecture", category: "design" },
    { name: "React", category: "development" },
    { name: "TypeScript", category: "development" },
    { name: "Tailwind CSS", category: "development" },
    { name: "HTML/CSS", category: "development" },
    { name: "Figma", category: "tools" },
    { name: "Claude", category: "tools" },
    { name: "Notion", category: "tools" },
    { name: "Mixpanel", category: "tools" },
    { name: "PostHog", category: "tools" },
    { name: "Supabase", category: "tools" },
  ],
}

// --- Work Experience ---
export interface AppLink {
  name: string
  icon: string
  url: string
}

export interface Experience {
  id: string
  role: string
  company: string
  companyUrl?: string
  startDate: string
  endDate: string | null
  description: string[]
  apps?: AppLink[]
}

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Founding Designer",
    company: "Scaleswift Digital Services LLP",
    companyUrl: "https://www.linkedin.com/company/scaleswift/posts/?feedView=all",
    startDate: "Sep 2025",
    endDate: null,
    description: [],
    apps: [
      {
        name: "Mindsnack",
        icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/30/a4/4b/30a44bf1-ee98-2453-7e87-5e8a59806310/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/120x120bb.jpg",
        url: "https://apps.apple.com/us/app/mindsnack-self-improvement/id6752513248",
      },
      {
        name: "Kael",
        icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/83/92/d7/8392d706-8a2c-4a21-47c0-f9cab879204f/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/120x120bb.jpg",
        url: "https://apps.apple.com/us/app/kael-ai-life-coach/id6761193620",
      },
    ],
  },
  {
    id: "2",
    role: "UI/UX Design Intern",
    company: "Digital Nexus AI",
    companyUrl: "https://digitalnexusai.com/",
    startDate: "Jun 2025",
    endDate: "Sep 2025",
    description: ["Designed ZSP, a stock market strategy builder and backtester for the Indian market."],
  },
  {
    id: "3",
    role: "UI/UX Design Intern",
    company: "Zummit InfoLabs",
    companyUrl: "https://zummitlabs.com/",
    startDate: "Oct 2024",
    endDate: "Feb 2025",
    description: ["Designed Paw Print Network, a pet platform across web and mobile from scratch."],
  },
]

// --- Playground ---
export interface PlaygroundItem {
  id: string
  title: string
  description: string
  tags: string[]
  externalUrl?: string
  internalRoute?: string
}

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "tessellate-resources",
    title: "Tessellate Resources",
    description: "A curated directory of design and development tools. Users discover, vote on, and stash resources into personal decks.",
    tags: ["Product", "React", "Supabase"],
    externalUrl: "https://tessellate-resources.vercel.app",
  },
  {
    id: "tessellate-admin",
    title: "Tessellate Admin",
    description: "Companion CMS for Tessellate. Manage decks, users, and curated recommendations.",
    tags: ["Dashboard", "Admin UX"],
    externalUrl: "https://tessellate-admin.vercel.app",
  },
  {
    id: "influencerhawa",
    title: "InfluencerHawa",
    description: "Enterprise influencer marketing platform. Brands × creators × agencies, with KPIs, escrow and merit scoring. Built on Salesforce Lightning.",
    tags: ["Enterprise UX", "Dashboards", "SLDS"],
    externalUrl: "https://influencerhawa.vercel.app",
  },
]

// --- FAQ ---
export interface FAQItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "What's your design process like?",
    answer: "I start with discovery: stakeholder interviews, competitive analysis, and user research. From there I move into wireframes, interaction design, high-fidelity UI, and prototyping. I iterate based on usability testing and analytics, and create clean handoff specs for engineering.",
  },
  {
    id: "2",
    question: "How do you collaborate with product and engineering teams?",
    answer: "I embed directly with cross-functional teams. I join sprint planning, participate in design reviews with engineers, and work closely with PMs to align on priorities. I've found the best products come from designers who understand technical constraints and business goals, not just pixels.",
  },
  {
    id: "3",
    question: "What types of products have you designed for?",
    answer: "I've worked across SaaS, fintech, e-commerce, and consumer mobile apps. I'm drawn to complex, workflow-heavy products where simplifying the user experience has real impact. Think dashboards, multi-step flows, and enterprise tools.",
  },
  {
    id: "4",
    question: "Do you have experience with design systems?",
    answer: "Yes. I've built design systems from scratch and contributed to scaling existing ones across product teams. I focus on reusable components, consistent interaction patterns, and clear documentation so the system actually gets adopted.",
  },
  {
    id: "5",
    question: "How do you use AI in your design workflow?",
    answer: "I use AI tools like Claude and Cursor to accelerate ideation, explore design variations faster, generate copy drafts, and prototype front-end interactions. It lets me spend more time on the hard design decisions and less on repetitive execution.",
  },
]

// --- Contact ---
export interface SocialLink {
  platform: string
  url: string
}

export interface ContactInfo {
  email: string
  socials: SocialLink[]
  availability: string
}

export const contactInfo: ContactInfo = {
  email: "muni.uiux@gmail.com",
  socials: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/munigoutham" },
    { platform: "GitHub", url: "https://github.com/MUNIGOUTHAM-REDDY" },
    { platform: "Behance", url: "https://behance.net/munigoutham3" },
    // Hidden until URLs are wired up — re-enable when ready
    // { platform: "Instagram", url: "#" },
    // { platform: "X", url: "#" },
    // { platform: "Pinterest", url: "#" },
    // { platform: "Dribbble", url: "#" },
  ],
  availability: "Open to full-time opportunities",
}

// --- Navigation ---
export interface NavItem {
  label: string
  sectionId: string
}

export const navItems: NavItem[] = [
  { label: "Home", sectionId: "hero" },
  { label: "Projects", sectionId: "projects" },
  { label: "About", sectionId: "about" },
  { label: "Experience", sectionId: "experience" },
  { label: "Playground", sectionId: "playground" },
  { label: "Contact", sectionId: "contact" },
]
