import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
import logo from '../../assets/ringright-mark.png'

const ease = [0.16, 1, 0.32, 1] as const
const word = 'RINGRIGHT'
const PANELS = 5

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.1,
      ease: [0.32, 0.72, 0.24, 1],
      onUpdate: (value) => setProgress(Math.round(value)),
      onComplete: () => {
        setExiting(true)
        window.setTimeout(onComplete, 1120)
      },
    })
    return () => controls.stop()
  }, [onComplete])

  return (
    <div className="preloader" role="status" aria-label="Loading RingRight Solution">
      <div className="preloader-panels" aria-hidden="true">
        {Array.from({ length: PANELS }).map((_, i) => (
          <motion.span
            key={i}
            initial={false}
            animate={{ y: exiting ? '-102%' : '0%' }}
            transition={{ duration: 0.8, delay: i * 0.07, ease }}
          />
        ))}
      </div>

      <motion.div
        className="preloader-center"
        initial={false}
        animate={{ opacity: exiting ? 0 : 1, y: exiting ? -22 : 0 }}
        transition={{ duration: 0.42, ease }}
      >
        <motion.div
          initial={{ scale: 0.55, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease }}
          className="preloader-logo"
        >
          <img src={logo} alt="RingRight Solution" />
        </motion.div>

        <div className="preloader-word" aria-hidden="true">
          {word.split('').map((letter, i) => (
            <span key={i} className="preloader-letter-mask">
              <motion.span
                className="preloader-letter"
                initial={{ y: '118%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.32 + i * 0.055, duration: 0.7, ease }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="preloader-tag"
        >
          Solution · Integrated Growth Partner
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="preloader-bar"
        >
          <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="preloader-count"
        >
          {progress}%
        </motion.p>
      </motion.div>
    </div>
  )
}
