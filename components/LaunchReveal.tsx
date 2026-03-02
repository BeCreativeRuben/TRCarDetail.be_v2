'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

const DURATION_SEC = 2.8

interface LaunchRevealProps {
  onComplete: () => void
}

export default function LaunchReveal({ onComplete }: LaunchRevealProps) {
  useEffect(() => {
    const t = setTimeout(onComplete, DURATION_SEC * 1000)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary-dark"
    >
        <div className="flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <img
              src="/logo.jpg"
              alt="T&R Car Detail"
              className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
            />
          </motion.div>
          <p className="font-heading text-xl sm:text-2xl text-light tracking-wider mb-8">
            T&R Car Detail
          </p>
          <div className="w-64 sm:w-80 h-1.5 bg-secondary-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-red rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATION_SEC, ease: 'easeInOut' }}
            />
          </div>
        </div>
    </motion.div>
  )
}
