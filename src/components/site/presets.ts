export const ease = [0.16, 1, 0.32, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease },
  },
}

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}
