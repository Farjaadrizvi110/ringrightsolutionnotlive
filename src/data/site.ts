import {
  ArrowLeftRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  CloudCog,
  Code2,
  Cpu,
  Crosshair,
  FileText,
  Filter,
  HeartPulse,
  Landmark,
  Layers,
  MailCheck,
  Megaphone,
  MessageSquareText,
  MousePointerClick,
  Palette,
  PenTool,
  PhoneCall,
  Printer,
  Repeat2,
  Scale,
  Search,
  ShieldCheck,
  ShoppingCart,
  Store,
  Target,
  TrendingUp,
  Truck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

import emailImage from '../assets/services/email.jpg'
import socialImage from '../assets/services/social.jpg'
import softwareImage from '../assets/services/software.jpg'
import printImage from '../assets/services/print.jpg'
import brandingImage from '../assets/services/branding.jpg'
import emailDetail from '../assets/email-detail.jpg'
import socialDetail from '../assets/social-detail.jpg'
import softwareDetail from '../assets/software-detail.jpg'
import printDetail from '../assets/print-detail.jpg'
import brandDetail from '../assets/brand-detail.jpg'
import answeringTeam from '../assets/answering-team.jpg'

export type ServicePillar = {
  title: string
  copy: string
  icon: LucideIcon
}

export type Service = {
  id: string
  eyebrow: string
  title: string
  lead: string
  image: string
  detailImage: string
  alt: string
  detailAlt: string
  icon: LucideIcon
  tone: 'blue' | 'violet' | 'emerald' | 'amber' | 'indigo' | 'teal'
  highlights: string[]
  pillars: ServicePillar[]
  outcomes: string[]
}

export const services: Service[] = [
  {
    id: 'email-marketing',
    eyebrow: 'Lifecycle Revenue',
    title: 'Email Marketing & Automation Systems',
    lead: 'End-to-end email programs engineered to increase customer lifetime value, recover lost intent, and attribute revenue to every send — not a collection of disconnected newsletters.',
    image: emailImage,
    detailImage: emailDetail,
    alt: 'Email marketing campaign dashboard on a laptop',
    detailAlt: 'Marketing team reviewing automated email campaign performance',
    icon: MailCheck,
    tone: 'blue',
    highlights: ['Lifecycle campaign architecture', 'Behavioral segmentation', 'A/B testing & revenue attribution'],
    pillars: [
      {
        title: 'Lifecycle Campaign Architecture',
        copy: 'Welcome sequences, nurture tracks, post-purchase flows, replenishment reminders, and win-back campaigns — each mapped to a specific funnel stage with a measurable revenue goal.',
        icon: Layers,
      },
      {
        title: 'Behavioral Automation & Segmentation',
        copy: 'Trigger-based journeys that respond to opens, clicks, browsing, cart abandonment, and purchase history, so every subscriber receives the message most likely to move them forward.',
        icon: MousePointerClick,
      },
      {
        title: 'Creative & Copywriting',
        copy: 'On-brand, mobile-first templates paired with persuasive subject lines and body copy written to convert — designed, coded, and QA-tested across every major inbox.',
        icon: PenTool,
      },
      {
        title: 'Performance Analytics & Testing',
        copy: 'Structured A/B testing across subject lines, offers, and send windows, with dashboards that connect campaigns directly to pipeline and attributed revenue.',
        icon: BarChart3,
      },
    ],
    outcomes: ['Higher repeat-purchase rate', 'Recovered abandoned-cart revenue', 'Clear send-to-sale attribution'],
  },
  {
    id: 'social-media',
    eyebrow: 'Demand Capture',
    title: 'Social Media Marketing & Paid Acquisition',
    lead: 'Structured organic and paid programs that turn attention into booked appointments — planned, produced, launched, and optimized as one continuous system.',
    image: socialImage,
    detailImage: socialDetail,
    alt: 'Social media campaign creative on a smartphone',
    detailAlt: 'Marketer managing social media advertising campaigns on a phone',
    icon: Megaphone,
    tone: 'violet',
    highlights: ['Meta, LinkedIn, X & TikTok', 'Full-funnel ad campaigns', 'Native lead generation'],
    pillars: [
      {
        title: 'Platform Strategy',
        copy: 'Channel-specific playbooks for Meta, LinkedIn, X, and TikTok — audience definitions, content pillars, posting cadences, and budget splits aligned to where your buyers actually decide.',
        icon: Crosshair,
      },
      {
        title: 'Full-Funnel Ad Campaigns',
        copy: 'Campaign structures that move prospects from cold awareness through consideration, retargeting, and conversion, with creative refreshed before fatigue erodes returns.',
        icon: Filter,
      },
      {
        title: 'In-Feed Lead Generation',
        copy: 'Native lead forms and instant experiences that capture intent without a landing-page detour, syncing every submission straight into your CRM and live-answering queue.',
        icon: ArrowLeftRight,
      },
      {
        title: 'Creative Asset Production',
        copy: 'Reels, carousels, static sets, motion graphics, and ad copy produced in-house — built for each platform’s native format instead of resized afterthoughts.',
        icon: Layers,
      },
    ],
    outcomes: ['Lower cost per qualified lead', 'Consistent pipeline from paid channels', 'Creative that compounds brand recall'],
  },
  {
    id: 'web-engineering',
    eyebrow: 'Product Engineering',
    title: 'Custom Web Application & Software Engineering',
    lead: 'Resilient digital products, portals, and commerce experiences built around how your operation actually runs — engineered, designed, secured, and maintained by one accountable team.',
    image: softwareImage,
    detailImage: softwareDetail,
    alt: 'Software code on a development screen',
    detailAlt: 'Engineer building a custom web application on a laptop',
    icon: Code2,
    tone: 'emerald',
    highlights: ['MERN + REST/GraphQL', 'E-commerce & portals', 'Cloud maintenance & security'],
    pillars: [
      {
        title: 'Full-Stack Custom Development',
        copy: 'Modern MERN-stack applications backed by clean REST or GraphQL APIs — booking engines, internal tools, dashboards, and workflow systems shaped to your exact process.',
        icon: Cpu,
      },
      {
        title: 'E-Commerce & Digital Portals',
        copy: 'Storefronts, client portals, and self-service experiences with secure payments, account management, and integrations into the systems your team already uses.',
        icon: ShoppingCart,
      },
      {
        title: 'UI/UX Design & Optimization',
        copy: 'Research-informed wireframes, prototypes, and conversion-focused interfaces, iterated against real user behavior rather than launch-day assumptions.',
        icon: PenTool,
      },
      {
        title: 'Maintenance & Security',
        copy: 'Managed hosting across AWS, Google Cloud, and Vercel with uptime monitoring, dependency patching, automated backups, and hardening as a standing discipline.',
        icon: CloudCog,
      },
    ],
    outcomes: ['Software that fits the workflow', 'Faster, conversion-ready experiences', 'Secure, monitored, always-on infrastructure'],
  },
  {
    id: 'commercial-print',
    eyebrow: 'Physical Touchpoints',
    title: 'Commercial Printing & Physical Collateral',
    lead: 'Premium printed materials that carry your brand into the physical world with the same precision as your digital presence — produced, proofed, and delivered nationwide.',
    image: printImage,
    detailImage: printDetail,
    alt: 'Commercial printing press producing vivid materials',
    detailAlt: 'Color-accurate commercial print production in progress',
    icon: Printer,
    tone: 'amber',
    highlights: ['Business essentials', 'Marketing & event print', 'Pre-press & nationwide delivery'],
    pillars: [
      {
        title: 'Business Essentials',
        copy: 'Business cards, letterheads, envelopes, folders, and branded stationery produced to a premium standard — the everyday pieces clients physically hold and judge you by.',
        icon: BriefcaseBusiness,
      },
      {
        title: 'Marketing & Event Print',
        copy: 'Brochures, flyers, postcards, large-format banners, signage, and trade-show collateral that translate campaign creative into high-impact physical presence.',
        icon: FileText,
      },
      {
        title: 'Pre-Press & Delivery Infrastructure',
        copy: 'Color-managed proofing and rigorous preflight verification on every job, backed by production partnerships that deliver finished materials direct to your door, nationwide.',
        icon: Truck,
      },
    ],
    outcomes: ['Brand consistency across every surface', 'Trade-show ready in one order', 'Zero reprint surprises'],
  },
  {
    id: 'branding',
    eyebrow: 'Market Authority',
    title: 'Branding, Strategy & Reputation Goodwill',
    lead: 'The strategic layer that makes every other channel work harder — a cohesive identity, a consistent voice, and a reputation that compounds trust before the first conversation.',
    image: brandingImage,
    detailImage: brandDetail,
    alt: 'Brand identity sketches and design materials',
    detailAlt: 'Designer refining a brand identity system at a workstation',
    icon: Palette,
    tone: 'indigo',
    highlights: ['Visual identity systems', 'Brand voice frameworks', 'Reputation & goodwill building'],
    pillars: [
      {
        title: 'Visual Identity Development',
        copy: 'Logos, color systems, typography, and design languages built as complete, documented systems — so every asset, from a proposal to a billboard, looks unmistakably like you.',
        icon: PenTool,
      },
      {
        title: 'Brand Voice & Messaging Frameworks',
        copy: 'Positioning statements, taglines, and messaging hierarchies that give every campaign, call script, and sales conversation one clear, repeatable story.',
        icon: MessageSquareText,
      },
      {
        title: 'Reputation & Goodwill Building',
        copy: 'Proactive review-generation strategies, response frameworks, and community presence programs that turn satisfied customers into visible, searchable proof.',
        icon: ShieldCheck,
      },
    ],
    outcomes: ['Instant recognition in-market', 'A voice every channel can reuse', 'Reviews that sell before you do'],
  },
  {
    id: 'live-answering',
    eyebrow: 'Always-On Operations',
    title: 'Live Answering & Omnichannel Call Management',
    lead: '100% human answering, 24 hours a day, 365 days a year — no bots, no phone trees, no voicemail dead ends. Every call and chat becomes a qualified outcome in your systems.',
    image: answeringTeam,
    detailImage: answeringTeam,
    alt: 'Live answering team supporting customers around the clock',
    detailAlt: 'Professional live agents managing calls and chats',
    icon: PhoneCall,
    tone: 'teal',
    highlights: ['Human answer within 3 rings', 'Real-time web chat', 'Unified client portal'],
    pillars: [
      {
        title: '24/7/365 Human Answering',
        copy: 'Trained live agents answer within three rings — days, nights, weekends, and holidays — following your scripts, your tone, and your escalation rules.',
        icon: PhoneCall,
      },
      {
        title: 'Real-Time Web Chat',
        copy: 'Live chat operators pre-qualify website visitors in the moment, capturing intent and booking next steps before prospects leave for a competitor.',
        icon: MessageSquareText,
      },
      {
        title: 'Deep Workflow Integrations',
        copy: 'Bi-directional connections into your CRM, help desk, scheduling, and workflow tools — Salesforce, HubSpot, Zoho, Zendesk, Calendly, Slack, and more.',
        icon: ArrowLeftRight,
      },
      {
        title: 'Unified Client Portal',
        copy: 'One portal for call recordings, transcriptions, lead details, and message tagging — with qualified leads booked to calendar and emergencies escalated instantly.',
        icon: CalendarCheck2,
      },
    ],
    outcomes: ['Zero missed opportunities', 'Every lead logged and routed', 'Emergencies escalated in seconds'],
  },
]

export type Industry = {
  id: string
  label: string
  copy: string
  detail: string
  icon: LucideIcon
}

export const industries: Industry[] = [
  {
    id: 'ecommerce',
    label: 'E-commerce',
    copy: 'Excellent 24/7/365 customer care and order management services.',
    detail: 'Live agents and chat operators handle order status, returns, and product questions around the clock — while lifecycle email and paid campaigns recover carts and grow repeat purchases.',
    icon: ShoppingCart,
  },
  {
    id: 'finance',
    label: 'Finance',
    copy: 'Accounting, lender and financial firms supported out of hours.',
    detail: 'After-hours and overflow answering keeps client inquiries, document requests, and appointment scheduling moving — with every interaction logged securely into your systems.',
    icon: Landmark,
  },
  {
    id: 'franchise',
    label: 'Franchise',
    copy: 'Offer excellent customer service and maintain brand consistency.',
    detail: 'Centralized scripts, brand voice frameworks, and unified reporting give every location the same professional front door — from the phone call to the printed collateral.',
    icon: Store,
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    copy: '24-hr call answering for medical, dental, and clinics.',
    detail: 'Compassionate, script-perfect call handling for medical, dental, and clinic practices — appointment booking, urgent escalation, and patient intake managed day and night.',
    icon: HeartPulse,
  },
  {
    id: 'legal',
    label: 'Legal',
    copy: 'Lead conversion, call-routing, legal intake, your practice is covered 24/7.',
    detail: 'Structured legal intake screens every caller against your case criteria, routes urgency correctly, and books consultations directly — so no potential client ever hits voicemail.',
    icon: Scale,
  },
  {
    id: 'marketing-media',
    label: 'Marketing & Media',
    copy: 'Lead capture and conversion to boost your ROI.',
    detail: 'Overflow call coverage, white-label friendly communication, and in-feed lead capture that makes your clients’ campaigns measurably stronger — and your retention stronger with them.',
    icon: Megaphone,
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    copy: 'Helping real estate agents qualify leads and book more appointments.',
    detail: 'Instant response to buyer and seller inquiries, viewing scheduling, and qualification — paired with listing brochures, signage, and geo-targeted campaigns that fill the pipeline.',
    icon: Building2,
  },
  {
    id: 'service-providers',
    label: 'Service Providers',
    copy: 'Commercial, residential home service providers.',
    detail: 'Every service call answered, every job booked, every emergency dispatched — for commercial and residential trades where a missed call is a missed job.',
    icon: Wrench,
  },
  {
    id: 'msp-it',
    label: 'MSP & IT',
    copy: 'Capture every call and chat, qualify leads and schedule appointments.',
    detail: 'Front-line triage, ticket creation, and priority escalation aligned to your SLAs — plus custom software engineering when your stack needs to do more.',
    icon: Cpu,
  },
]

export type GrowthStage = {
  step: string
  title: string
  copy: string
  services: string[]
  icon: LucideIcon
}

export const growthStages: GrowthStage[] = [
  {
    step: '01',
    title: 'Diagnose the growth leaks',
    copy: 'We audit where revenue quietly escapes — missed calls, slow lead response, inconsistent follow-up, weak conversion paths, and fragmented brand presence. You get a prioritized map of what to fix first and why.',
    services: ['Brand & channel audit', 'Call-flow analysis', 'Funnel review'],
    icon: Search,
  },
  {
    step: '02',
    title: 'Capture every inbound opportunity',
    copy: '24/7/365 live human answering and real-time web chat make sure every prospect reaches a trained person within three rings — qualified, logged, and routed before intent cools.',
    services: ['Live answering', 'Web chat', 'Lead qualification'],
    icon: PhoneCall,
  },
  {
    step: '03',
    title: 'Convert demand into revenue',
    copy: 'Full-funnel paid acquisition and conversion-focused web experiences turn captured attention into booked appointments, signed clients, and completed orders.',
    services: ['Paid acquisition', 'Web engineering', 'UI/UX optimization'],
    icon: Target,
  },
  {
    step: '04',
    title: 'Automate follow-up & retention',
    copy: 'Lifecycle email and behavioral automation keep every lead and customer moving — nurturing, reminding, recovering, and upselling without adding headcount.',
    services: ['Email automation', 'CRM sync', 'Segmentation'],
    icon: Repeat2,
  },
  {
    step: '05',
    title: 'Build authority that compounds',
    copy: 'A cohesive identity, consistent messaging, physical collateral, and proactive reputation building make every future campaign cheaper and every sales conversation easier.',
    services: ['Branding', 'Commercial print', 'Reputation goodwill'],
    icon: TrendingUp,
  },
  {
    step: '06',
    title: 'Measure, report & optimize',
    copy: 'Unified reporting across calls, campaigns, and pipelines shows exactly what each channel returns — so budgets shift toward what works, every month, on evidence.',
    services: ['Attribution dashboards', 'A/B testing', 'Quarterly strategy'],
    icon: BarChart3,
  },
]

export const integrations: string[] = [
  'Salesforce',
  'Zoho',
  'HubSpot',
  'PipeDrive',
  'Zendesk',
  'Freshdesk',
  'Slack',
  'Zapier',
  'Calendly',
]

export type NavLink = {
  label: string
  to: string
}

export const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Growth Strategy', to: '/growth-strategy' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export type HomeSection = {
  label: string
  hash: string
}

export const homeSections: HomeSection[] = [
  { label: 'Services', hash: '#services' },
  { label: 'Live Answering', hash: '#answering' },
  { label: 'Industries', hash: '#industries' },
]
