import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import logo from '../../assets/ringright-mark.png'
import { homeSections, navLinks } from '../../data/site'
import { Magnetic } from './effects'

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
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
