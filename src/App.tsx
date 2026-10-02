import { useCallback, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Lenis from '@studio-freight/lenis'
import Preloader from './components/site/Preloader'
import { CursorGlow, ScrollProgress } from './components/site/effects'
import Home from './pages/Home'
import GrowthStrategy from './pages/GrowthStrategy'
import About from './pages/About'
import Contact from './pages/Contact'

const WHATSAPP_HREF = 'https://wa.me/447878361409'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.382l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="floating-whatsapp"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}

let lenisInstance: Lenis | null = null
let lenisDestroyed = false

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    })
    lenisInstance = lenis
    lenisDestroyed = false
    let frame = 0
    let cancelled = false
    const raf = (time: number) => {
      if (cancelled || lenisDestroyed) return
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      if (!lenisDestroyed) {
        lenisDestroyed = true
        try {
          lenis.destroy()
        } catch {
          /* no-op — Lenis can throw on double-destroy in StrictMode */
        }
        if (lenisInstance === lenis) lenisInstance = null
      }
    }
  }, [])
}

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      if (!/^#[A-Za-z0-9_-]+$/.test(hash)) return
      const timer = window.setTimeout(() => {
        const target = document.querySelector(hash)
        if (target && lenisInstance && !lenisDestroyed) {
          try {
            lenisInstance.scrollTo(target as HTMLElement, { offset: -110 })
          } catch {
            ;(target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        } else if (target) {
          ;(target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
      return () => window.clearTimeout(timer)
    }
    try {
      if (lenisInstance && !lenisDestroyed) {
        lenisInstance.scrollTo(0, { immediate: true })
      }
    } catch {
      /* no-op */
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const onceRef = useRef(false)
  useLenis()

  const handlePreloaderComplete = useCallback(() => {
    if (onceRef.current) return
    onceRef.current = true
    setLoading(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      {!loading && (
        <>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/growth-strategy" element={<GrowthStrategy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <FloatingWhatsApp />
        </>
      )}
    </>
  )
}
