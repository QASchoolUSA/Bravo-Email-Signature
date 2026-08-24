import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { HomePage } from './pages/HomePage'
import { SignaturePage } from './pages/SignaturePage'
import { pageEase, pageFade, pageSlide } from './lib/motion'

function AnimatedRoutes() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const enterExit = reduce ? pageFade : pageSlide

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={enterExit.initial}
        animate={enterExit.animate}
        exit={enterExit.exit}
        transition={{ duration: reduce ? 0.2 : 0.28, ease: pageEase }}
        className="min-h-dvh bg-canvas"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/signature" element={<SignaturePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutGroup>
        <AnimatedRoutes />
      </LayoutGroup>
    </BrowserRouter>
  )
}
