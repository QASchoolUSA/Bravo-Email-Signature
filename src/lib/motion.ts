export const springSoft = { type: 'spring' as const, bounce: 0, visualDuration: 0.4 }

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export const staggerList = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05, when: 'beforeChildren' as const },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

export const pageSlide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const pageEase = [0.22, 1, 0.36, 1] as const
