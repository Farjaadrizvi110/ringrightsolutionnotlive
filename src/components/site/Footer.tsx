import { Link } from 'react-router'
import { MapPin, Phone } from 'lucide-react'
import logoImport from '../../assets/ringright-mark.png'
const logo = (logoImport ?? '/favicon.png') as string
import { integrations, navLinks } from '../../data/site'

const WHATSAPP_NUMBER = '+44 7878 361409'
const WHATSAPP_HREF = 'https://wa.me/447878361409'
const ADDRESS_LINES = ['1a Edmundson Street', 'Blackburn, BB2 1HL', 'United Kingdom']

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.382l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

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
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-extrabold text-white shadow-sm transition hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {WHATSAPP_NUMBER}
            </a>
            <a
              href="tel:+447878361409"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-extrabold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
          </div>
          <div className="mt-4 flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
            <address className="text-xs font-semibold not-italic leading-5 text-slate-500">
              {ADDRESS_LINES.join(', ')}
            </address>
          </div>
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
