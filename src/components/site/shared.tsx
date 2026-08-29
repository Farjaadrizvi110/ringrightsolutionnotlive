import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { ease, fadeUp, stagger } from './presets'
import { Magnetic } from './effects'

export function SectionIntro({
  eyebrow,
  title,
  copy,
  align = 'left',
  dark = false,
}: {
  eyebrow: string
  title: string
  copy: string
  align?: 'left' | 'center'
  dark?: boolean
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <motion.p variants={fadeUp} className={`section-eyebrow ${align === 'center' ? 'justify-center' : ''} ${dark ? 'section-eyebrow-dark' : ''}`}>
        {eyebrow}
      </motion.p>
      <motion.h2 variants={fadeUp} className={`section-title ${dark ? 'text-white' : ''}`}>
        {title}
      </motion.h2>
      <motion.p variants={fadeUp} className={`section-copy ${dark ? 'text-blue-100/85' : ''}`}>
        {copy}
      </motion.p>
    </motion.div>
  )
}

export function PageHero({
  eyebrow,
  title,
  accent,
  copy,
  image,
  alt,
  children,
}: {
  eyebrow: string
  title: string
  accent: string
  copy: string
  image: string
  alt: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-40">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img src={image} alt="" className="h-full w-full object-cover opacity-[0.16]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/70 via-[#f8fafc]/86 to-[#f8fafc]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="lg:col-span-7">
          <motion.p variants={fadeUp} className="hero-kicker">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
            {eyebrow}
          </motion.p>
          <motion.h1 variants={fadeUp} className="page-hero-title">
            {title} <span className="font-serif-accent">{accent}</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="hero-copy">
            {copy}
          </motion.p>
          {children}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="relative lg:col-span-5"
        >
          <div className="page-hero-media">
            <img src={image} alt={alt} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function FinalCta({
  title,
  copy,
  primaryLabel = 'Start the conversation',
  secondaryLabel = 'Explore the growth strategy',
  secondaryTo = '/growth-strategy',
}: {
  title: string
  copy: string
  primaryLabel?: string
  secondaryLabel?: string
  secondaryTo?: string
}) {
  return (
    <section className="section-wrap pb-20">
      <motion.div
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease }}
        className="final-cta"
      >
        <div className="relative z-10 max-w-3xl">
          <p className="section-eyebrow section-eyebrow-dark">Integrated growth architecture</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] text-white sm:text-6xl">{title}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100/90 sm:text-lg">{copy}</p>
        </div>
        <div className="relative z-10 mt-10 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:flex-col xl:flex-row">
          <Magnetic strength={0.22}>
            <Link to="/contact" className="dark-cta">
              {primaryLabel} <ArrowUpRight className="h-5 w-5" />
            </Link>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Link to={secondaryTo} className="light-cta">
              {secondaryLabel} <ArrowUpRight className="h-5 w-5" />
            </Link>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  )
}
