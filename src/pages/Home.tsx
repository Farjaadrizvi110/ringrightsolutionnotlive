import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import { AnimatePresence, animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  CalendarCheck2,
  CheckCircle2,
  Headset,
  PhoneCall,
  PhoneIncoming,
  Workflow,
  Zap,
} from 'lucide-react'
import Header from '../components/site/Header'
import Footer from '../components/site/Footer'
import { FinalCta, SectionIntro } from '../components/site/shared'
import { Magnetic } from '../components/site/effects'
import { ease, fadeUp, stagger } from '../components/site/presets'
import { industries, integrations, services } from '../data/site'
import type { Service } from '../data/site'
import heroImageImport from '../assets/hero-call-answering.jpg'
import answeringTeamImport from '../assets/answering-team.jpg'
import growthAnalyticsImport from '../assets/growth-analytics.jpg'
const fallbackImg = '/favicon.png'
const heroImage = (heroImageImport ?? fallbackImg) as string
const answeringTeam = (answeringTeamImport ?? fallbackImg) as string
const growthAnalytics = (growthAnalyticsImport ?? fallbackImg) as string

type SchemaGraphNode = {
  '@type': string
  name: string
  description: string
  areaServed?: string
  knowsAbout?: string[]
  serviceType?: string[]
}

type SchemaOrg = {
  '@context': string
  '@graph': SchemaGraphNode[]
}

const schema: SchemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'RingRight Solution',
      description:
        'Integrated growth partner unifying 24/7 live human answering, digital marketing, software engineering, commercial printing, and brand strategy.',
      areaServed: 'Nationwide',
      knowsAbout: [
        '24/7 virtual receptionist services',
        'MERN stack web development',
        'Email marketing automation',
        'Social media marketing',
        'Commercial printing',
        'Brand strategy',
      ],
    },
    {
      '@type': 'ProfessionalService',
      name: 'RingRight Solution',
      description:
        '24/7 live answering, omnichannel call management, digital marketing, custom software, commercial print, and branding services for modern businesses.',
      areaServed: 'Nationwide',
      serviceType: [
        'Virtual receptionist',
        'Web chat support',
        'Web application development',
        'Email marketing automation',
        'Paid acquisition',
        'Commercial printing',
        'Brand strategy',
      ],
    },
  ],
}

function RevealWords({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="word-mask">
            <motion.span
              className="word-inner"
              initial={{ y: '118%', rotate: 5 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ delay: delay + i * 0.055, duration: 0.78, ease }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

function StatCell({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.7,
      ease: [0.16, 1, 0.32, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <div ref={ref}>
      <strong>
        {display}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

const marqueeItems = [
  '24/7 Live Answering',
  'Email Automation',
  'MERN Web Development',
  'Commercial Printing',
  'Brand Strategy',
  'Paid Acquisition',
  'Real-Time Web Chat',
  'CRM Synchronization',
]

function Marquee() {
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const leadFlow = [
  { type: 'in' as const, label: 'Call rings in', meta: 'after-hours inquiry' },
  { type: 'out' as const, label: 'Answered in 3 rings', meta: 'trained live agent' },
  { type: 'in' as const, label: 'Web chat opens', meta: 'website visitor' },
  { type: 'out' as const, label: 'Lead qualified', meta: 'synced to your CRM' },
  { type: 'in' as const, label: 'Quote request', meta: 'from a paid campaign' },
  { type: 'out' as const, label: 'Appointment booked', meta: 'straight to calendar' },
]

function HeroSection() {
  const [flowIndex, setFlowIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setFlowIndex((i) => (i + 1) % leadFlow.length), 2600)
    return () => window.clearInterval(timer)
  }, [])

  const current = leadFlow[flowIndex]

  return (
    <section className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-36">
      <div className="lg:col-span-7">
        <motion.div variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} className="hero-kicker">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
            Integrated growth partner · 24/7/365
          </motion.div>
          <h1 className="hero-title">
            <RevealWords text="Capture every lead." delay={0.2} />{' '}
            <RevealWords text="Build every touchpoint." className="font-serif-accent" delay={0.48} />{' '}
            <RevealWords text="Own every market." className="hero-title-gradient" delay={0.82} />
          </h1>
          <motion.p variants={fadeUp} className="hero-copy">
            RingRight Solution unifies <strong>24/7 virtual receptionist coverage</strong>, high-performance digital
            marketing, <strong>MERN stack web development</strong>, and <strong>nationwide commercial printing</strong>{' '}
            into one operational backbone for modern businesses.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <motion.a whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.985 }} href="#services" className="primary-cta">
                Explore the growth system
                <ArrowDownRight className="h-5 w-5" />
              </motion.a>
            </Magnetic>
            <Magnetic>
              <motion.div whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                <Link to="/growth-strategy" className="secondary-cta">
                  See the growth strategy
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </Magnetic>
          </motion.div>

          <motion.div variants={fadeUp} className="lead-flow">
            <div className="flex items-center justify-between gap-3">
              <p className="panel-label">LIVE LEAD FLOW</p>
              <span className="live-pulse !py-1 !text-[0.68rem]">
                <span />
                Streaming
              </span>
            </div>
            <div className="lead-flow-track">
              <AnimatePresence mode="wait">
                {current.type === 'in' ? (
                  <motion.div
                    key={`in-${flowIndex}`}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60 }}
                    transition={{ duration: 0.55, ease }}
                    className="lead-flow-item"
                  >
                    <span className="lead-flow-icon lead-flow-icon-in">
                      <PhoneIncoming className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="lead-flow-title">{current.label}</p>
                      <p className="lead-flow-meta">{current.meta}</p>
                    </div>
                    <span className="lead-flow-tag lead-flow-tag-in">IN</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`out-${flowIndex}`}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.55, ease }}
                    className="lead-flow-item"
                  >
                    <span className="lead-flow-icon lead-flow-icon-out">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="lead-flow-title">{current.label}</p>
                      <p className="lead-flow-meta">{current.meta}</p>
                    </div>
                    <span className="lead-flow-tag lead-flow-tag-out">OUT</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="lead-flow-dots" aria-hidden="true">
              {leadFlow.map((_, i) => (
                <span key={i} className={i === flowIndex ? 'is-active' : ''} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative lg:col-span-5">
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.28, ease }}
          className="hero-media"
        >
          <img
            src={heroImage}
            alt="RingRight live answering specialist supporting a customer on a headset"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-200">Live operations</p>
              <p className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Human answer within 3 rings
              </p>
            </div>
            <div className="live-pulse" aria-label="Live now">
              <span />
              Live
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease }}
          className="floating-badge floating-badge-left"
        >
          <Zap className="h-4 w-4" /> Real-time CRM sync
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease }}
          className="floating-badge floating-badge-right"
        >
          <Workflow className="h-4 w-4" /> Zero missed opportunities
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.85, ease }}
        className="hero-stats lg:col-span-12"
      >
        <StatCell value={100} suffix="%" label="human answering" />
        <StatCell value={3} suffix=" rings" label="response standard" />
        <StatCell value={6} suffix="" label="growth disciplines" />
        <StatCell value={24} suffix="/7/365" label="operational coverage" />
      </motion.div>
    </section>
  )
}

function EditorialIntro() {
  return (
    <section className="section-wrap !pt-10">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="editorial-grid"
      >
        <motion.p variants={fadeUp} className="editorial-lead">
          Behind every RingRight engagement is one simple promise —{' '}
          <em>no customer ever waits, and no opportunity ever slips away.</em>
        </motion.p>
        <motion.div variants={fadeUp} className="editorial-body">
          <p>
            Most growing businesses run their phones, their marketing, their website, and their brand as four separate
            efforts — with four separate vendors and four separate invoices. Results blur together, and accountability
            disappears between them.
          </p>
          <p>
            We built RingRight to work the way your customers actually experience you: as one continuous journey. The
            person who answers the call works from the same playbook as the team running your campaigns, the engineers
            building your platform, and the strategists protecting your reputation.
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-14 grid gap-6 md:grid-cols-2"
      >
        <motion.figure variants={fadeUp} className="editorial-figure">
          <img src={answeringTeam} alt="Live answering team collaborating on customer conversations" loading="lazy" />
          <figcaption>
            <span>01 — Always-on operations</span>
            Trained live agents answering calls and chats around the clock
          </figcaption>
        </motion.figure>
        <motion.figure variants={fadeUp} className="editorial-figure">
          <img src={growthAnalytics} alt="Analytics dashboard showing campaign and revenue performance" loading="lazy" />
          <figcaption>
            <span>02 — Evidence-led growth</span>
            Every call, click, and campaign measured against real revenue
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  )
}

function ServiceIndex() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {services.map((service, index) => {
        const Icon = service.icon
        return (
          <motion.a
            key={service.id}
            variants={fadeUp}
            href={`#${service.id}`}
            className="service-index-card group"
            whileHover={{ y: -6 }}
          >
            <div className="flex items-center justify-between">
              <span className={`service-index-icon service-index-icon-${service.tone}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-black tracking-[0.18em] text-slate-400">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-extrabold tracking-tight text-slate-950 transition group-hover:text-blue-700">
              {service.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{service.eyebrow}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-blue-700">
              View full detail
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </span>
          </motion.a>
        )
      })}
    </motion.div>
  )
}

function ServiceDetail({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  const reversed = index % 2 === 1
  const mediaRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])
  return (
    <article id={service.id} className="service-detail scroll-mt-32">
      <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease }}
          className={`relative lg:col-span-5 ${reversed ? 'lg:order-2' : ''}`}
        >
          <div ref={mediaRef} className="service-detail-media">
            <motion.img
              src={service.detailImage}
              alt={service.detailAlt}
              className="service-detail-img"
              style={{ y: imgY, scale: 1.16 }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            <div className={`absolute left-5 top-5 service-index-icon service-index-icon-${service.tone} !h-12 !w-12 shadow-xl`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
          <div className="service-outcomes">
            {service.outcomes.map((outcome) => (
              <span key={outcome} className="service-outcome">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                {outcome}
              </span>
            ))}
          </div>
        </motion.div>

        <div className={`lg:col-span-7 ${reversed ? 'lg:order-1' : ''}`}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p variants={fadeUp} className="section-eyebrow">
              {service.eyebrow}
            </motion.p>
            <motion.h3 variants={fadeUp} className="service-detail-title">
              {service.title}
            </motion.h3>
            <motion.p variants={fadeUp} className="section-copy">
              {service.lead}
            </motion.p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {service.pillars.map((pillar) => {
                const PillarIcon = pillar.icon
                return (
                  <motion.div key={pillar.title} variants={fadeUp} className="pillar-card">
                    <div className="flex items-center gap-3">
                      <span className={`pillar-icon pillar-icon-${service.tone}`}>
                        <PillarIcon className="h-4 w-4" />
                      </span>
                      <h4 className="text-base font-extrabold tracking-tight text-slate-950">{pillar.title}</h4>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.copy}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  )
}

function WorkflowDiagram() {
  return (
    <div className="workflow-shell">
      <svg className="workflow-lines" viewBox="0 0 900 560" fill="none" aria-hidden="true">
        <path className="flow-path" d="M188 102 C300 102 300 258 414 258" />
        <path className="flow-path flow-path-delay" d="M486 258 C600 258 600 104 712 104" />
        <path className="flow-path flow-path-delay-2" d="M486 258 C600 258 600 414 712 414" />
        <circle className="flow-dot" r="5">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M188 102 C300 102 300 258 414 258" />
        </circle>
        <circle className="flow-dot flow-dot-violet" r="5">
          <animateMotion dur="3.6s" repeatCount="indefinite" path="M486 258 C600 258 600 104 712 104" />
        </circle>
        <circle className="flow-dot flow-dot-emerald" r="5">
          <animateMotion dur="3.8s" repeatCount="indefinite" path="M486 258 C600 258 600 414 712 414" />
        </circle>
      </svg>

      <div className="workflow-grid">
        <motion.div variants={fadeUp} className="workflow-node workflow-node-start">
          <span className="workflow-icon bg-blue-600"><Headset className="h-6 w-6" /></span>
          <p>Incoming customer touchpoint</p>
          <strong>Call / Web Chat</strong>
        </motion.div>
        <motion.div variants={fadeUp} className="workflow-node workflow-node-agent">
          <span className="workflow-icon bg-slate-950"><PhoneCall className="h-6 w-6" /></span>
          <p>RingRight 24/7 live agent</p>
          <strong>Human answer within 3 rings</strong>
        </motion.div>
        <motion.div variants={fadeUp} className="workflow-node workflow-node-lead">
          <span className="workflow-icon bg-violet-600"><CalendarCheck2 className="h-6 w-6" /></span>
          <p>Qualified lead / booking</p>
          <strong>Direct sync to Salesforce, Zoho, HubSpot</strong>
        </motion.div>
        <motion.div variants={fadeUp} className="workflow-node workflow-node-emergency">
          <span className="workflow-icon bg-emerald-600"><BellRing className="h-6 w-6" /></span>
          <p>Emergency / support ticket</p>
          <strong>Instant SMS, mobile app, Slack escalation</strong>
        </motion.div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-[#f8fafc] text-slate-950 selection:bg-blue-100 selection:text-blue-950">
      <Helmet>
        <title>RingRight Solution | 24/7 Virtual Receptionist, MERN Web Development & Commercial Printing</title>
        <meta
          name="description"
          content="RingRight Solution unifies 24/7/365 live human answering, email automation, social media marketing, MERN stack development, commercial printing, and brand strategy."
        />
        <link rel="canonical" href="https://ringrightsolution.com/" />
        <meta property="og:title" content="RingRight Solution — Integrated Growth Partner & Operational Backbone" />
        <meta
          property="og:description"
          content="Capture every lead with 24/7 human answering, omnichannel call management, digital marketing, custom software, commercial print, and brand strategy."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ringrightsolution.com/" />
        <meta name="theme-color" content="#f8fafc" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <Header />

      <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
        <HeroSection />

        <Marquee />

        <EditorialIntro />

        <section id="services" className="section-wrap scroll-mt-24">
          <SectionIntro
            eyebrow="Core services, in full detail"
            title="One partner for the complete customer journey."
            copy="Six deeply integrated disciplines — each explained below with exactly what we build, run, and optimize for you. Start anywhere; every service connects to the same growth system."
          />
          <ServiceIndex />
          <div className="mt-20 space-y-24 lg:space-y-32">
            {services.map((service, index) => (
              <ServiceDetail key={service.id} service={service} index={index} />
            ))}
          </div>
        </section>

        <section id="answering" className="section-wrap scroll-mt-24 pt-10">
          <div className="answering-band">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionIntro
                  eyebrow="Live answering & omnichannel management"
                  title="Every caller reaches a trained human—day, night, weekends, and holidays."
                  copy="RingRight eliminates missed opportunities with zero automated bots, pre-recorded trees, or robocall friction. Calls and chats are qualified, routed, and synchronized directly into your operating stack."
                />
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="mt-8 grid gap-3"
                >
                  {[
                    'Real-time web chat operators pre-qualify visitors before they leave',
                    'Bi-directional CRM, help desk, scheduling, and workflow integrations',
                    'Unified client portal with recordings, transcriptions, lead details, and call tagging',
                  ].map((item) => (
                    <motion.div key={item} variants={fadeUp} className="check-row">
                      <BadgeCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="lg:col-span-7"
                id="workflow"
              >
                <WorkflowDiagram />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="industries" className="section-wrap scroll-mt-24">
          <SectionIntro
            eyebrow="Dedicated industry coverage"
            title="Nine industries. One always-on operational standard."
            copy="From e-commerce order care to 24-hour healthcare answering and legal intake, RingRight adapts its live coverage, marketing, software, and print systems to how your market actually buys."
            align="center"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industries.map((industry) => {
              const Icon = industry.icon
              return (
                <motion.div key={industry.id} variants={fadeUp} className="industry-card group" whileHover={{ y: -7 }}>
                  <div className="flex items-center gap-4">
                    <span className="industry-icon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-950">{industry.label}</h3>
                  </div>
                  <p className="mt-4 text-sm font-bold leading-6 text-blue-800">{industry.copy}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{industry.detail}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        <section className="section-wrap pt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease }}
            className="integration-band"
          >
            <p className="panel-label">CONNECTED TO YOUR STACK</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {integrations.map((item) => (
                <span key={item} className="integration-pill">
                  <BadgeCheck className="h-3.5 w-3.5" /> {item}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        <FinalCta
          title="Ready to stop leaking leads across calls, clicks, and customer touchpoints?"
          copy="Align live answering, conversion-focused digital systems, custom software, print, and reputation strategy under one accountable partner."
        />
      </main>

      <Footer />
    </div>
  )
}
