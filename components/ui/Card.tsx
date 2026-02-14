'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const baseStyles = 'bg-light rounded-lg p-6 border border-light shadow-lg'

  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`${baseStyles} ${className}`}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  )
}
