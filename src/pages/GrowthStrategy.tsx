import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Gauge, Layers3, LineChart } from 'lucide-react'
import Header from '../components/site/Header'
import Footer from '../components/site/Footer'
import { FinalCta, PageHero, SectionIntro } from '../components/site/shared'
import { ease, fadeUp, stagger } from '../components/site/presets'
import { growthStages, services } from '../data/site'
import growthImageImport from '../assets/growth-analytics.jpg'
import strategyImageImport from '../assets/strategy-team.jpg'
const fallbackImg = '/favicon.png'
const growthImage = (growthImageImport ?? fallbackImg) as string
const strategyImage = (strategyImageImport ?? fallbackImg) as string

const principles = [
  {
    title: 'Every channel feeds one pipeline',
    copy: 'Calls, chats, ads, emails, and web experiences all report into the same systems — so nothing is measured in isolation and no lead falls between tools.',
    icon: Layers3,
  },
  {
    title: 'Speed is the strategy',
    copy: 'The fastest response usually wins the customer. Live answering within three rings and instant lead routing are treated as revenue levers, not conveniences.',
    icon: Gauge,
  },
  {
    title: 'Decisions run on evidence',
    copy: 'Attribution dashboards connect spend, conversations, and closed revenue — replacing guesswork with a monthly optimization rhythm.',
    icon: LineChart,
  },
]

export default function GrowthStrategy() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f8fafc] text-slate-950 selection:bg-blue-100 selection:text-blue-950">
      <Helmet>
        <title>Growth Strategy | RingRight Solution</title>
        <meta
          name="description"
          content="How RingRight Solution grows client businesses: diagnose leaks, capture every opportunity, convert demand, automate retention, build authority, and optimize on evidence."
        />
        <link rel="canonical" href="https://ringrightsolution.com/growth-strategy" />
        <meta property="og:title" content="RingRight Solution — Growth Strategy" />
        <meta
          property="og:description"
          content="A six-stage growth framework that turns missed calls and scattered marketing into one accountable revenue system."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ringrightsolution.com/growth-strategy" />
        <meta name="theme-color" content="#f8fafc" />
      </Helmet>

      <Header />

      <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
        <PageHero
          eyebrow="Growth strategy"
          title="Growth is a system,"
          accent="not a lucky quarter."
          copy="Most businesses don't have a demand problem — they have a leakage problem. RingRight's six-stage framework finds where revenue escapes, plugs the gaps with always-on operations, and compounds the wins with marketing, software, and brand authority."
          image={growthImage}
          alt="Growth analytics dashboard tracking marketing performance"
        >
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#framework" className="primary-cta">
              Walk the six stages
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link to="/contact" className="secondary-cta">
              Get a growth audit
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </PageHero>

        <section className="section-wrap pt-4">
          <SectionIntro
            eyebrow="Operating principles"
            title="Three beliefs behind every engagement."
            copy="Before tactics come principles. These three convictions shape how we design, staff, and measure every client growth system."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-12 grid gap-5 lg:grid-cols-3"
          >
            {principles.map((principle) => {
              const Icon = principle.icon
              return (
                <motion.div key={principle.title} variants={fadeUp} className="principle-card" whileHover={{ y: -6 }}>
                  <span className="principle-icon">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold tracking-tight text-slate-950">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{principle.copy}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        <section id="framework" className="section-wrap scroll-mt-24">
          <div className="framework-hero">
            <img src={strategyImage} alt="Strategy team planning a client growth roadmap" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/45 to-transparent" />
            <div className="absolute inset-0 flex items-center p-8 sm:p-12">
              <div className="max-w-xl">
                <p className="section-eyebrow section-eyebrow-dark">The RingRight growth framework</p>
                <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl">
                  Six stages from leaky funnel to compounding growth.
                </h2>
                <p className="mt-4 text-base leading-8 text-blue-100/90">
                  Each stage deploys specific RingRight services in a deliberate sequence — capture first, then conversion, then compounding.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 space-y-6">
            {growthStages.map((stage, index) => {
              const Icon = stage.icon
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: 0.05 * index, ease }}
                  className="growth-stage"
                >
                  <div className="growth-stage-step">
                    <span className="growth-stage-number">{stage.step}</span>
                    <span className="growth-stage-line" aria-hidden="true" />
                  </div>
                  <div className="grid flex-1 gap-6 lg:grid-cols-12 lg:items-center">
                    <div className="flex items-start gap-4 lg:col-span-7">
                      <span className="principle-icon mt-1 shrink-0">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">{stage.title}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{stage.copy}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:col-span-5 lg:justify-end">
                      {stage.services.map((service) => (
                        <span key={service} className="growth-tag">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        <section className="section-wrap pt-6">
          <SectionIntro
            eyebrow="The engine behind the framework"
            title="Six disciplines, one accountable team."
            copy="Every stage of the framework is executed by the same partner — no hand-offs between agencies, no gaps between marketing and operations."
            align="center"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => {
              const Icon = service.icon
              return (
                <motion.div key={service.id} variants={fadeUp} className="engine-card">
                  <div className="engine-card-media">
                    <img src={service.image} alt={service.alt} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2.5">
                      <span className={`pillar-icon pillar-icon-${service.tone}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <h3 className="text-base font-extrabold tracking-tight text-slate-950">{service.title}</h3>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {service.highlights.slice(0, 2).map((highlight) => (
                        <span key={highlight} className="engine-tag">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        <FinalCta
          title="Want to see where your growth is leaking?"
          copy="Start with a conversation. We'll map your capture, conversion, and retention gaps — and show you exactly which stage to fix first."
          primaryLabel="Request a growth audit"
          secondaryLabel="Meet the team"
          secondaryTo="/about"
        />
      </main>

      <Footer />
    </div>
  )
}
