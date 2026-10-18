'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiFileText, FiHome, FiGrid, FiUser } from 'react-icons/fi'
import Button from '../ui/Button'
import Logo from '../brand/Logo'

const navLinks = [
  { path: '/zakelijk', label: 'Home', icon: FiHome },
  { path: '/zakelijk/aanbod', label: 'Aanbod', icon: FiGrid },
  { path: '/zakelijk/offerte', label: 'Offerte', icon: FiFileText },
]

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark'

export default function ZakelijkHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full shrink-0 self-start bg-primary-dark border-b border-accent-red/40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20 gap-3">
          <Link
            href="/zakelijk"
            className={`flex items-center gap-3 min-w-0 rounded-sm ${focusRing}`}
          >
            <Logo priority className="h-11 sm:h-12 w-auto shrink-0" />
            <span className="hidden lg:flex flex-col leading-none border-l border-white/20 pl-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-red">Zakelijk</span>
              <span className="text-[11px] uppercase tracking-wider text-light/75 mt-1">Vloot</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Zakelijk">
            {navLinks.map(({ path, label }) => {
              const active = pathname === path
              return (
                <Link
                  key={path}
                  href={path}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors rounded-sm ${focusRing} ${
                    active ? 'text-accent-red' : 'text-light hover:text-accent-red'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <Link
              href="/"
              className={`text-sm font-medium text-light/80 hover:text-light transition-colors border-l border-white/15 pl-6 lg:pl-8 rounded-sm ${focusRing}`}
            >
              Particulieren
            </Link>
          </nav>

          <div className="hidden md:block shrink-0">
            <Link href="/zakelijk/offerte" className={`inline-flex rounded-sm ${focusRing}`}>
              <Button variant="primary" size="sm" className="pointer-events-none flex items-center gap-2">
                <FiFileText className="w-4 h-4" aria-hidden />
                Offerte aanvragen
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className={`md:hidden inline-flex items-center justify-center min-h-11 min-w-11 text-light hover:text-accent-red transition-colors rounded-lg ${focusRing}`}
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Sluit menu' : 'Menu'}
            aria-expanded={isOpen}
            aria-controls="zakelijk-mobile-nav"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

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
              id="zakelijk-mobile-nav"
              aria-label="Zakelijk"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-primary-dark border-l-2 border-accent-red/30 z-50 md:hidden shadow-2xl rounded-l-2xl overflow-hidden"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center gap-3 p-6 pb-4 border-b border-secondary-dark/50">
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <Logo className="h-9 w-auto" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-accent-red">Zakelijk · Vloot</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className={`inline-flex items-center justify-center min-h-11 min-w-11 rounded-lg text-light/80 hover:text-accent-red hover:bg-accent-red/10 transition-colors shrink-0 ${focusRing}`}
                    aria-label="Sluit menu"
                  >
                    <FiX size={24} />
                  </button>
                </div>

                <div className="flex-1 p-6 space-y-1 overflow-y-auto">
                  {navLinks.map(({ path, label, icon: Icon }, idx) => {
                    const active = pathname === path
                    return (
                      <motion.div
                        key={path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * idx, duration: 0.2 }}
                      >
                        <Link
                          href={path}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? 'page' : undefined}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${focusRing} ${
                            active
                              ? 'bg-accent-red/15 text-accent-red'
                              : 'text-light/90 hover:bg-secondary-dark/50 hover:text-accent-red'
                          }`}
                        >
                          <Icon size={20} className="flex-shrink-0 opacity-80" aria-hidden />
                          {label}
                        </Link>
                      </motion.div>
                    )
                  })}
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-light/80 hover:text-light hover:bg-secondary-dark/50 transition-all ${focusRing}`}
                  >
                    <FiUser size={20} className="flex-shrink-0 opacity-80" aria-hidden />
                    Particulieren
                  </Link>
                </div>

                <div className="p-6 pt-4 border-t border-secondary-dark/50">
                  <Link href="/zakelijk/offerte" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                      <FiFileText size={20} aria-hidden />
                      Offerte aanvragen
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
