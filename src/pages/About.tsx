import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { ArrowUpRight, HandHeart, Puzzle, Radio, ShieldCheck } from 'lucide-react'
import Header from '../components/site/Header'
import Footer from '../components/site/Footer'
import { FinalCta, PageHero, SectionIntro } from '../components/site/shared'
import { fadeUp, stagger } from '../components/site/presets'
import aboutImageImport from '../assets/about-team.jpg'
import answeringImageImport from '../assets/answering-team.jpg'
const fallbackImg = '/favicon.png'
const aboutImage = (aboutImageImport ?? fallbackImg) as string
const answeringImage = (answeringImageImport ?? fallbackImg) as string

const values = [
  {
    title: 'Humans first, always',
    copy: 'No bots, no phone trees, no scripts read at people. Every caller and every client talks to a trained person who is empowered to actually solve the problem.',
    icon: HandHeart,
  },
  {
    title: 'One accountable partner',
    copy: 'Marketing, operations, software, print, and brand under one roof means one team owns the outcome — and you never referee between vendors again.',
    icon: Puzzle,
  },
  {
    title: 'Always-on by default',
    copy: 'Customers don’t keep office hours, so neither do we. Coverage, monitoring, and response continue through nights, weekends, and holidays.',
    icon: Radio,
  },
  {
    title: 'Proof over promises',
    copy: 'Recordings, transcriptions, attribution dashboards, and monthly reporting make our work inspectable. We’d rather show you the numbers than describe them.',
    icon: ShieldCheck,
  },
]

const model = [
  {
    step: 'Capture',
    title: 'The operational backbone',
    copy: 'Live agents answer every call and chat around the clock — qualifying, booking, escalating, and logging everything into your systems.',
  },
  {
    step: 'Create',
    title: 'The growth engine',
    copy: 'Email automation, paid acquisition, and custom software turn captured demand into pipeline, orders, and repeat customers.',
  },
  {
    step: 'Compound',
    title: 'The authority layer',
    copy: 'Branding, print, and reputation goodwill make every campaign more efficient and every sales conversation start from trust.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f8fafc] text-slate-950 selection:bg-blue-100 selection:text-blue-950">
      <Helmet>
        <title>About Us | RingRight Solution</title>
        <meta
          name="description"
          content="RingRight Solution is an integrated growth partner: 24/7 human answering, digital marketing, software engineering, commercial print, and brand strategy under one accountable team."
        />
        <link rel="canonical" href="https://ringrightsolution.com/about" />
        <meta property="og:title" content="About RingRight Solution" />
        <meta
          property="og:description"
          content="One team owning the complete customer journey — from the first ring to repeat revenue."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ringrightsolution.com/about" />
        <meta name="theme-color" content="#f8fafc" />
      </Helmet>

      <Header />

      <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
        <PageHero
          eyebrow="About RingRight Solution"
          title="One team owning"
          accent="the entire customer journey."
          copy="RingRight was built on a simple observation: businesses lose more revenue to missed calls, slow follow-up, and fragmented vendors than to any competitor. We exist to close those gaps — with live humans, integrated systems, and a single standard of accountability."
          image={aboutImage}
          alt="The RingRight team collaborating in a bright modern workspace"
        >
          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link to="/growth-strategy" className="primary-cta">
              See how we grow clients
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <Link to="/contact" className="secondary-cta">
              Talk to the team
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </PageHero>

        <section className="section-wrap pt-4">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9 }}
              className="lg:col-span-5"
            >
              <div className="page-hero-media">
                <img
                  src={answeringImage}
                  alt="Live answering specialists working with headsets and laptops"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
              </div>
            </motion.div>
            <div className="lg:col-span-7">
              <SectionIntro
                eyebrow="Our mission"
                title="Make sure no opportunity ever goes unanswered."
                copy="Every missed call is a customer choosing someone else. Every slow follow-up is intent going cold. Every disconnected vendor is accountability slipping through the cracks. Our mission is to remove all three — giving growing businesses the always-on operations, integrated marketing, and trustworthy brand presence that used to require an enterprise budget and a dozen suppliers."
              />
            </div>
          </div>
        </section>

        <section className="section-wrap">
          <SectionIntro
            eyebrow="How we’re built"
            title="Three layers, one seamless experience."
            copy="Clients experience RingRight as a single team. Underneath, three tightly connected layers work in sequence — each one strengthening the others."
            align="center"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mt-12 grid gap-5 lg:grid-cols-3"
          >
            {model.map((layer) => (
              <motion.div key={layer.step} variants={fadeUp} className="principle-card" whileHover={{ y: -6 }}>
                <p className="panel-label">{layer.step.toUpperCase()}</p>
                <h3 className="mt-4 text-xl font-extrabold tracking-tight text-slate-950">{layer.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{layer.copy}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="section-wrap pt-4">
          <div className="values-band">
            <SectionIntro
              eyebrow="What we hold ourselves to"
              title="Values you can verify."
              copy="These aren’t wall decorations — they show up in how calls are answered, how campaigns are reported, and how mistakes are owned."
              dark
            />
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mt-12 grid gap-5 sm:grid-cols-2"
            >
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <motion.div key={value.title} variants={fadeUp} className="value-card">
                    <span className="value-icon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold tracking-tight text-white">{value.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-blue-100/85">{value.copy}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        <FinalCta
          title="Ready to work with one accountable growth partner?"
          copy="Tell us where your customer journey breaks down — we’ll show you how the full RingRight system closes the gap."
          primaryLabel="Start the conversation"
          secondaryLabel="Explore the growth strategy"
        />
      </main>

      <Footer />
    </div>
  )
}
