import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Diensten' },
  { path: '/about', label: 'Over ons' },
  { path: '/booking', label: 'Boeken' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`
              text-sm font-medium transition-colors duration-200
              ${location.pathname === link.path
                ? 'text-accent-red'
                : 'text-light hover:text-accent-red'
              }
            `}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-light hover:text-accent-red transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-primary-dark bg-opacity-95 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-64 bg-secondary-dark z-50 md:hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 space-y-4">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold text-accent-red">T&R Car Detail</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-light hover:text-accent-red"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`
                      text-lg font-medium py-2 transition-colors duration-200
                      ${location.pathname === link.path
                        ? 'text-accent-red'
                        : 'text-light hover:text-accent-red'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
