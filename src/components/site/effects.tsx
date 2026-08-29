import { useEffect, useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export function CursorGlow() {
  const x = useMotionValue(-600)
  const y = useMotionValue(-600)
  const glowX = useSpring(x, { stiffness: 55, damping: 18, mass: 0.6 })
  const glowY = useSpring(y, { stiffness: 55, damping: 18, mass: 0.6 })

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return <motion.div className="cursor-glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />
}

export function Magnetic({ children, strength = 0.26 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: 'inline-block' }}
    >
      {children}
    </motion.div>
  )
}
