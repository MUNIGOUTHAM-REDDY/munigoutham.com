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
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Redesign",
    description: "Complete redesign of an e-commerce platform focusing on conversion optimization and user experience improvements.",
    tags: ["UI/UX", "Figma", "User Research"],
    featured: true,
  },
  {
    id: "2",
    title: "Finance Dashboard",
    description: "A comprehensive financial analytics dashboard with real-time data visualization and portfolio tracking.",
    tags: ["Product Design", "Data Viz", "React"],
  },
  {
    id: "3",
    title: "Health & Wellness App",
    description: "Mobile-first health tracking application with personalized workout plans and nutrition logging.",
    tags: ["Mobile", "iOS", "Figma"],
  },
  {
    id: "4",
    title: "SaaS Landing Page",
    description: "High-converting landing page design for a B2B SaaS product with interactive demos and social proof.",
    tags: ["Web Design", "Framer", "Copywriting"],
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
  headline: "Crafting digital experiences that matter",
  bio: [
    "I'm a UI/UX and Product Designer based in India with a passion for creating intuitive, user-centered digital experiences. I believe great design lives at the intersection of aesthetics and functionality.",
    "With experience across web and mobile platforms, I focus on solving real problems through thoughtful design systems, clean interfaces, and seamless interactions.",
  ],
  skills: [
    { name: "UI Design", category: "design" },
    { name: "UX Research", category: "design" },
    { name: "Interaction Design", category: "design" },
    { name: "Design Systems", category: "design" },
    { name: "Wireframing", category: "design" },
    { name: "React", category: "development" },
    { name: "TypeScript", category: "development" },
    { name: "Tailwind CSS", category: "development" },
    { name: "HTML/CSS", category: "development" },
    { name: "Figma", category: "tools" },
    { name: "Framer", category: "tools" },
    { name: "Adobe Suite", category: "tools" },
    { name: "Notion", category: "tools" },
  ],
}

// --- Work Experience ---
export interface Experience {
  id: string
  role: string
  company: string
  startDate: string
  endDate: string | null
  description: string[]
  tags?: string[]
}

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Senior Product Designer",
    company: "Company Name",
    startDate: "Jan 2024",
    endDate: null,
    description: [
      "Led the redesign of the core product experience, improving user retention by 25%.",
      "Established and maintained a comprehensive design system used across 5 product teams.",
      "Conducted user research sessions and translated insights into actionable design improvements.",
    ],
    tags: ["Figma", "Design Systems", "User Research"],
  },
  {
    id: "2",
    role: "UI/UX Designer",
    company: "Previous Company",
    startDate: "Mar 2022",
    endDate: "Dec 2023",
    description: [
      "Designed end-to-end user flows for mobile and web applications serving 100K+ users.",
      "Collaborated with engineering teams to implement pixel-perfect designs with smooth animations.",
      "Created interactive prototypes for stakeholder presentations and usability testing.",
    ],
    tags: ["Mobile Design", "Prototyping", "Figma"],
  },
  {
    id: "3",
    role: "Junior Designer",
    company: "Startup Studio",
    startDate: "Jun 2021",
    endDate: "Feb 2022",
    description: [
      "Designed landing pages and marketing materials for early-stage startups.",
      "Assisted in building brand identities including logos, color systems, and typography.",
    ],
    tags: ["Branding", "Web Design", "Illustrator"],
  },
]

// --- Playground ---
export interface PlaygroundItem {
  id: string
  title: string
  description: string
  category: string
}

export const playgroundItems: PlaygroundItem[] = [
  {
    id: "1",
    title: "3D Card Hover Effect",
    description: "Interactive card with perspective transforms and lighting effects on hover.",
    category: "Animation",
  },
  {
    id: "2",
    title: "Glassmorphism Calculator",
    description: "A functional calculator with frosted glass aesthetic and smooth transitions.",
    category: "UI Experiment",
  },
  {
    id: "3",
    title: "Particle Background",
    description: "Canvas-based particle system that responds to mouse movement.",
    category: "Creative Code",
  },
  {
    id: "4",
    title: "Dark Theme Toggle",
    description: "Animated theme switcher with morphing sun/moon icon and smooth color transitions.",
    category: "Micro-interaction",
  },
  {
    id: "5",
    title: "Scroll-driven Gallery",
    description: "Image gallery where layout transforms based on scroll position.",
    category: "Animation",
  },
  {
    id: "6",
    title: "Neubrutalism Form",
    description: "Bold form design with chunky borders, bright accents, and playful validation.",
    category: "UI Experiment",
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
    question: "What services do you offer?",
    answer: "I offer UI/UX design, product design, design systems, prototyping, and front-end development. I can help with everything from initial research and wireframing to high-fidelity designs and implementation.",
  },
  {
    id: "2",
    question: "What is your design process?",
    answer: "My process typically involves discovery and research, wireframing, visual design, prototyping, and iteration based on feedback. I believe in close collaboration with stakeholders throughout every phase.",
  },
  {
    id: "3",
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A landing page might take 1-2 weeks, while a full product design can take 4-8 weeks. I'll provide a detailed timeline after understanding your requirements.",
  },
  {
    id: "4",
    question: "Do you work with startups?",
    answer: "Absolutely! I love working with startups and helping them build their product from the ground up. I understand the fast-paced environment and can adapt my process to match your speed.",
  },
  {
    id: "5",
    question: "Are you available for freelance work?",
    answer: "Yes, I'm currently open to freelance opportunities. Feel free to reach out through the contact form below or send me an email to discuss your project.",
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
  email: "hello@munigoutham.com",
  socials: [
    { platform: "GitHub", url: "https://github.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Dribbble", url: "https://dribbble.com" },
    { platform: "X", url: "https://x.com" },
  ],
  availability: "Open to freelance opportunities",
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
  { label: "Playground", sectionId: "playground" },
  { label: "Contact", sectionId: "contact" },
]
