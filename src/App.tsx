import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Lenis from '@studio-freight/lenis'
import Preloader from './components/site/Preloader'
import { CursorGlow, ScrollProgress } from './components/site/effects'
import Home from './pages/Home'
import GrowthStrategy from './pages/GrowthStrategy'
import About from './pages/About'
import Contact from './pages/Contact'

let lenisInstance: Lenis | null = null

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    })
    lenisInstance = lenis
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisInstance = null
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
        if (target && lenisInstance) {
          lenisInstance.scrollTo(target as HTMLElement, { offset: -110 })
        } else if (target) {
          ;(target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 80)
      return () => window.clearTimeout(timer)
    }
    lenisInstance?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useLenis()

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
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <ScrollManager />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/growth-strategy" element={<GrowthStrategy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </>
      )}
    </>
  )
}
