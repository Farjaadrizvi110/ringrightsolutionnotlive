import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence, motion } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowUpRight, CalendarClock, CheckCircle2, Clock4, Headset, MapPin, MessageSquareText, Phone, Send, ShieldCheck } from 'lucide-react'
import Header from '../components/site/Header'
import Footer from '../components/site/Footer'
import { PageHero, SectionIntro } from '../components/site/shared'
import { ease, fadeUp, stagger } from '../components/site/presets'
import { services } from '../data/site'
import contactImageImport from '../assets/contact-office.jpg'

const WHATSAPP_NUMBER = '+44 7878 361409'
const WHATSAPP_HREF = 'https://wa.me/447878361409'
const PHONE_HREF = 'tel:+447878361409'
const ADDRESS_LINES = ['1a Edmundson Street', 'Blackburn, BB2 1HL', 'United Kingdom']

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.382l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const fallbackImg = '/favicon.png'
const contactImage = (contactImageImport ?? fallbackImg) as string

const expectations = [
  {
    title: 'A real conversation, fast',
    copy: 'Your request is reviewed by a specialist — not triaged by a bot. Expect a substantive reply, not an autoresponder.',
    icon: Headset,
  },
  {
    title: 'A scoped recommendation',
    copy: 'We map your situation to the right services and the right sequence, so you know exactly what to fix first and why.',
    icon: MessageSquareText,
  },
  {
    title: 'No pressure, ever',
    copy: 'You leave the first conversation with a clear plan you can act on — whether or not you act on it with us.',
    icon: ShieldCheck,
  },
]

const SERVICE_ALLOWLIST = [...services.map((s) => s.id), 'growth-audit', 'other']

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your full name (at least 2 characters)')
    .max(100, 'Name must be 100 characters or fewer'),
  company: z
    .string()
    .trim()
    .min(2, 'Please enter your company name')
    .max(200, 'Company must be 200 characters or fewer'),
  email: z
    .string()
    .trim()
    .min(1, 'Work email is required')
    .email('Please enter a valid email address')
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v), {
      message: 'Email must include a valid domain (e.g. company.com)',
    })
    .max(254),
  phone: z
    .string()
    .trim()
    .max(30, 'Phone must be 30 characters or fewer')
    .refine((v) => v === '' || /^[\d\s+()\-.ext,]+$/i.test(v), {
      message: 'Phone can only contain numbers, spaces, +, -, (, ), and .',
    })
    .optional()
    .or(z.literal('')),
  service: z
    .string()
    .min(1, 'Please select a focus area')
    .refine((v) => SERVICE_ALLOWLIST.includes(v), {
      message: 'Please select a valid focus area',
    }),
  message: z
    .string()
    .trim()
    .min(10, 'Please share a bit more detail (at least 10 characters)')
    .max(5000, 'Message must be 5000 characters or fewer'),
})

type ContactFormValues = z.infer<typeof formSchema>

const inputBase =
  'w-full rounded-2xl border bg-white/80 px-4 py-3.5 text-sm font-semibold text-slate-900 placeholder:font-medium placeholder:text-slate-400 shadow-inner shadow-slate-100 transition focus:outline-none focus:ring-4'

const inputClass = `${inputBase} border-slate-200 focus:border-blue-400 focus:ring-blue-100`
const inputClassError = `${inputBase} border-red-300 bg-red-50/70 focus:border-red-400 focus:ring-red-100`
const errorClass = 'mt-1.5 flex items-start gap-1.5 text-xs font-extrabold leading-5 text-red-600'
const labelClass = 'contact-label'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      service: '' as ContactFormValues['service'],
      message: '',
    },
    mode: 'onTouched',
  })

  const onValidSubmit = async (data: ContactFormValues) => {
    const serviceLabel =
      services.find((s) => s.id === data.service)?.title ??
      (data.service === 'growth-audit' ? 'Full growth audit' : data.service === 'other' ? 'Something else' : data.service)

    const lines = [
      `*New Inquiry — RingRight Solution*`,
      ``,
      `*Name:* ${data.name}`,
      `*Company:* ${data.company}`,
      `*Email:* ${data.email}`,
      data.phone ? `*Phone:* ${data.phone}` : null,
      `*Service:* ${serviceLabel}`,
      ``,
      `*Message:*`,
      data.message,
    ].filter(Boolean)

    const waText = encodeURIComponent(lines.join('\n'))
    const waUrl = `${WHATSAPP_HREF}?text=${waText}`

    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const handleEdit = () => {
    setSubmitted(false)
    reset()
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f8fafc] text-slate-950 selection:bg-blue-100 selection:text-blue-950">
      <Helmet>
        <title>Contact Us | RingRight Solution</title>
        <meta
          name="description"
          content="Start a conversation with RingRight Solution about 24/7 live answering, digital marketing, software engineering, commercial print, or brand strategy."
        />
        <link rel="canonical" href="https://ringrightsolution.com/contact" />
        <meta property="og:title" content="Contact RingRight Solution" />
        <meta property="og:description" content="Tell us where your customer journey breaks down — we'll map the fix." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ringrightsolution.com/contact" />
        <meta name="theme-color" content="#f8fafc" />
      </Helmet>

      <Header />

      <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
        <PageHero
          eyebrow="Contact us"
          title="Tell us where it breaks."
          accent="We’ll map the fix."
          copy="Whether it’s missed calls after hours, campaigns that don’t convert, or systems that don’t talk to each other — start the conversation below and a RingRight specialist will respond with a scoped recommendation."
          image={contactImage}
          alt="Modern RingRight office lounge ready for client consultations"
        />

        <section className="section-wrap pt-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionIntro
                eyebrow="What happens next"
                title="Three things you can count on."
                copy="Every inquiry follows the same standard — the same one we apply to your customers’ calls."
              />
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mt-10 grid gap-4"
              >
                {expectations.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={item.title} variants={fadeUp} className="expectation-card">
                      <span className="principle-icon shrink-0">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="text-base font-extrabold tracking-tight text-slate-950">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-7 text-slate-600">{item.copy}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="contact-hours"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <Clock4 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-slate-950">We answer around the clock</p>
                    <p className="text-xs font-semibold text-slate-500">24 hours · 7 days · 365 days</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  The same always-on standard we run for clients applies here: your message is never landing in an
                  unmonitored inbox.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="contact-hours"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">Reach us directly</p>

                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info-row group mt-2"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1eb858] text-white shadow-md shadow-emerald-500/30 transition-transform group-hover:scale-105">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-950">WhatsApp</p>
                    <p className="text-xs font-semibold text-slate-500">{WHATSAPP_NUMBER}</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-300 transition-colors group-hover:text-emerald-600" />
                </a>

                <div className="contact-info-divider" />

                <a href={PHONE_HREF} className="contact-info-row group">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-500/30 transition-transform group-hover:scale-105">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-950">Call directly</p>
                    <p className="text-xs font-semibold text-slate-500">{WHATSAPP_NUMBER}</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-300 transition-colors group-hover:text-blue-600" />
                </a>

                <div className="contact-info-divider" />

                <div className="contact-info-row">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 shadow-sm">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-950">Office</p>
                    {ADDRESS_LINES.map((line) => (
                      <p key={line} className="text-xs font-semibold leading-5 text-slate-500">{line}</p>
                    ))}
                  </div>
                </div>

                <p className="mt-5 text-xs leading-6 text-slate-400">
                  Prefer to talk? Message us on WhatsApp or call — a real person picks up, every time.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease }}
              className="lg:col-span-7"
            >
              <div className="contact-form-shell">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="confirmation"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.6, ease }}
                      className="flex min-h-[32rem] flex-col items-center justify-center text-center"
                    >
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white">
                        <WhatsAppIcon className="h-8 w-8" />
                      </span>
                      <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950">Opening WhatsApp…</h3>
                      <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
                        Your inquiry has been formatted and WhatsApp should have opened in a new tab. If it didn't,
                        tap the button below to send your message directly.
                      </p>
                      <a
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-cta mt-6"
                      >
                        Open WhatsApp
                        <WhatsAppIcon className="h-5 w-5" />
                      </a>
                      <button type="button" onClick={handleEdit} className="secondary-cta mt-3">
                        Edit the request
                        <ArrowUpRight className="h-5 w-5" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit(onValidSubmit)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.5, ease }}
                      noValidate
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="panel-label">PROJECT INQUIRY</p>
                          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                            Start the conversation
                          </h2>
                        </div>
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25">
                          <Send className="h-5 w-5" />
                        </span>
                      </div>

                      <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        <Controller
                          name="name"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <label htmlFor="name" className={labelClass}>Full name</label>
                              <input
                                {...field}
                                id="name"
                                type="text"
                                autoComplete="name"
                                maxLength={100}
                                placeholder="Jordan Avery"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? 'name-error' : undefined}
                                className={errors.name ? inputClassError : inputClass}
                              />
                              {errors.name && (
                                <p id="name-error" role="alert" className={errorClass}>
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 translate-y-[2px] rotate-45 text-red-600" />
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                        <Controller
                          name="company"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <label htmlFor="company" className={labelClass}>Company</label>
                              <input
                                {...field}
                                id="company"
                                type="text"
                                autoComplete="organization"
                                maxLength={200}
                                placeholder="Avery & Co."
                                aria-invalid={!!errors.company}
                                aria-describedby={errors.company ? 'company-error' : undefined}
                                className={errors.company ? inputClassError : inputClass}
                              />
                              {errors.company && (
                                <p id="company-error" role="alert" className={errorClass}>
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 translate-y-[2px] rotate-45 text-red-600" />
                                  {errors.company.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <label htmlFor="email" className={labelClass}>Work email</label>
                              <input
                                {...field}
                                id="email"
                                type="email"
                                autoComplete="email"
                                maxLength={254}
                                placeholder="jordan@company.com"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                className={errors.email ? inputClassError : inputClass}
                              />
                              {errors.email && (
                                <p id="email-error" role="alert" className={errorClass}>
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 translate-y-[2px] rotate-45 text-red-600" />
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                        <Controller
                          name="phone"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
                              <input
                                {...field}
                                id="phone"
                                type="tel"
                                autoComplete="tel"
                                maxLength={30}
                                placeholder="(555) 010-0199"
                                aria-invalid={!!errors.phone}
                                aria-describedby={errors.phone ? 'phone-error' : undefined}
                                className={errors.phone ? inputClassError : inputClass}
                              />
                              {errors.phone && (
                                <p id="phone-error" role="alert" className={errorClass}>
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 translate-y-[2px] rotate-45 text-red-600" />
                                  {errors.phone.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                        <Controller
                          name="service"
                          control={control}
                          render={({ field }) => (
                            <div className="sm:col-span-2">
                              <label htmlFor="service" className={labelClass}>What do you need most?</label>
                              <select
                                {...field}
                                id="service"
                                defaultValue=""
                                aria-invalid={!!errors.service}
                                aria-describedby={errors.service ? 'service-error' : undefined}
                                className={errors.service ? inputClassError : inputClass}
                              >
                                <option value="" disabled>Select a focus area</option>
                                {services.map((service) => (
                                  <option key={service.id} value={service.id}>{service.title}</option>
                                ))}
                                <option value="growth-audit">Full growth audit — show me where I’m leaking</option>
                                <option value="other">Something else</option>
                              </select>
                              {errors.service && (
                                <p id="service-error" role="alert" className={errorClass}>
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 translate-y-[2px] rotate-45 text-red-600" />
                                  {errors.service.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                        <Controller
                          name="message"
                          control={control}
                          render={({ field }) => (
                            <div className="sm:col-span-2">
                              <label htmlFor="message" className={labelClass}>Where is the journey breaking down?</label>
                              <textarea
                                {...field}
                                id="message"
                                rows={5}
                                maxLength={5000}
                                placeholder="e.g. We miss calls after 6pm and our ads generate clicks but no booked appointments…"
                                aria-invalid={!!errors.message}
                                aria-describedby={errors.message ? 'message-error' : undefined}
                                className={`${errors.message ? inputClassError : inputClass} resize-none`}
                              />
                              {errors.message && (
                                <p id="message-error" role="alert" className={errorClass}>
                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 translate-y-[2px] rotate-45 text-red-600" />
                                  {errors.message.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="primary-cta mt-8 w-full disabled:opacity-70 disabled:cursor-wait sm:w-auto"
                      >
                        {isSubmitting ? 'Sending…' : 'Send the request'}
                        <Send className="h-5 w-5" />
                      </button>
                      <p className="mt-4 flex items-start gap-2 text-xs font-semibold leading-5 text-slate-500">
                        <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                        A specialist reviews every request personally. You’ll get a substantive reply — not an
                        autoresponder.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
