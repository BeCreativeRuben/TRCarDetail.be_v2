import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiGrid, FiUser, FiCalendar, FiHelpCircle, FiMail } from 'react-icons/fi'
import Button from '../ui/Button'

const navLinks = [
  { path: '/', label: 'Home', icon: FiHome },
  { path: '/services', label: 'Diensten', icon: FiGrid },
  { path: '/about', label: 'Over ons', icon: FiUser },
  { path: '/booking', label: 'Boeken', icon: FiCalendar },
  { path: '/faq', label: 'FAQ', icon: FiHelpCircle },
  { path: '/contact', label: 'Contact', icon: FiMail },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`
              text-sm font-medium transition-colors duration-200
              ${location.pathname === path
                ? 'text-accent-red'
                : 'text-light hover:text-accent-red'
              }
            `}
          >
            {label}
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
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-primary-dark border-l-2 border-accent-red/30 z-50 md:hidden shadow-2xl rounded-l-2xl overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-4 border-b border-secondary-dark/50">
                  <span className="text-xl font-bold text-accent-red tracking-wide">T&R Car Detail</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-light/80 hover:text-accent-red hover:bg-accent-red/10 transition-colors"
                    aria-label="Sluit menu"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 p-6 space-y-1 overflow-y-auto">
                  {navLinks.map(({ path, label, icon: Icon }, idx) => {
                    const isActive = location.pathname === path
                    return (
                      <motion.div
                        key={path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                      >
                        <Link
                          to={path}
                          onClick={() => setIsOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                            ${isActive
                              ? 'bg-accent-red/15 text-accent-red'
                              : 'text-light/90 hover:bg-secondary-dark/50 hover:text-accent-red'
                            }
                          `}
                        >
                          <Icon size={20} className="flex-shrink-0 opacity-80" />
                          {label}
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* CTA */}
                <div className="p-6 pt-4 border-t border-secondary-dark/50">
                  <Link to="/booking" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                      <FiCalendar size={20} />
                      Boek Nu
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
