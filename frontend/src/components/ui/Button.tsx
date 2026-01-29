import { ReactNode } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark inline-flex items-center justify-center'
  
  const variants = {
    primary: 'bg-accent-red text-white hover:bg-accent-dark-red focus:ring-accent-red active:bg-accent-dark-red shadow-sm hover:shadow-md',
    secondary: 'bg-secondary-dark text-light hover:bg-opacity-90 focus:ring-secondary-dark active:bg-opacity-80 shadow-sm hover:shadow-md',
    outline: 'border-2 border-accent-red text-accent-red bg-transparent hover:bg-accent-red hover:text-white hover:border-accent-red focus:ring-accent-red active:bg-accent-dark-red active:border-accent-dark-red'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.15 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} corner-shape ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
