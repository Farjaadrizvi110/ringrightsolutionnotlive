import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { homeSections, navLinks } from '../../data/site'
import { Magnetic } from './effects'
import logoImport from '../../assets/ringright-mark.png'
const logo = (logoImport ?? '/favicon.png') as string

const WHATSAPP_HREF = 'https://wa.me/447878361409'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.382l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const ease = [0.16, 1, 0.32, 1] as const

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'
  const closeMenu = () => setOpen(false)

  const sectionHref = (hash: string) => (onHome ? hash : `/${hash}`)

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-[0_18px_60px_rgba(34,62,134,0.12)] backdrop-blur-2xl sm:px-5">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="RingRight Solution home">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-2xl bg-white shadow-inner shadow-slate-200">
            <img src={logo} alt="RingRight Solution" className="h-9 w-9 object-cover object-center" />
          </span>
          <span className="hidden text-sm font-bold tracking-[0.22em] text-slate-950 sm:block">RINGRIGHT</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-blue-700 hover:shadow-sm ${
                  isActive ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="mx-1 h-5 w-px bg-slate-200" aria-hidden="true" />
          {homeSections.map((item) => (
            <a
              key={item.hash}
              href={sectionHref(item.hash)}
              className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-blue-700 hover:shadow-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white shadow-sm transition hover:opacity-90"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <Magnetic strength={0.2}>
            <Link to="/contact" className="nav-cta group hidden sm:inline-flex">
              <span>Start a conversation</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/70 bg-white/92 p-3 shadow-[0_24px_70px_rgba(34,62,134,0.18)] backdrop-blur-2xl lg:hidden"
            aria-label="Mobile navigation"
          >
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-base font-bold transition ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="my-2 h-px bg-slate-100" aria-hidden="true" />
            {homeSections.map((item) => (
              <a
                key={item.hash}
                href={sectionHref(item.hash)}
                onClick={closeMenu}
                className="block rounded-2xl px-4 py-3 text-base font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-blue-700"
              >
                {item.label}
              </a>
            ))}
            <Link to="/contact" onClick={closeMenu} className="primary-cta mt-3 w-full">
              Start a conversation
              <ArrowUpRight className="h-5 w-5" />
            </Link>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-base font-extrabold text-white shadow-sm transition hover:opacity-90"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp: +44 7878 361409
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
