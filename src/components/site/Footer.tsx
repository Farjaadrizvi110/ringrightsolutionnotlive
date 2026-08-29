import { Link } from 'react-router'
import logo from '../../assets/ringright-mark.png'
import { integrations, navLinks } from '../../data/site'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-white/80 px-5 py-14 backdrop-blur-2xl sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200">
              <img src={logo} alt="RingRight Solution logo" className="h-12 w-12 object-cover" />
            </span>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-950">RingRight Solution</p>
              <p className="text-sm font-semibold text-slate-500">Integrated growth partner</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
            A single operational backbone for 24/7 live human interaction, digital marketing, software engineering,
            commercial print, and authoritative brand strategy.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
          <div>
            <h3 className="footer-heading">Company</h3>
            {navLinks.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="footer-heading">Growth services</h3>
            <a href="/#services">Email automation</a>
            <a href="/#services">Paid acquisition</a>
            <a href="/#services">MERN development</a>
            <a href="/#services">Commercial printing</a>
            <a href="/#answering">24/7 live answering</a>
          </div>
          <div>
            <h3 className="footer-heading">Integration ecosystem</h3>
            <div className="flex flex-wrap gap-2">
              {integrations.map((item) => (
                <span key={item} className="footer-badge">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-slate-200 pt-6 text-xs font-semibold text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 RingRight Solution. Built for always-on growth.</p>
        <p>WCAG-conscious contrast · SEO structured data · Fully responsive</p>
      </div>
    </footer>
  )
}
