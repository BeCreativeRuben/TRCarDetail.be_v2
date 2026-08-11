'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiFileText } from 'react-icons/fi'
import Button from '../ui/Button'

const navLinks = [
  { path: '/zakelijk', label: 'Home' },
  { path: '/zakelijk/aanbod', label: 'Aanbod' },
  { path: '/zakelijk/offerte', label: 'Offerte' },
]

export default function ZakelijkHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-primary-dark border-b border-secondary-dark">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/zakelijk" className="flex flex-col leading-tight">
            <span className="text-2xl font-bold text-accent-red">T&R Car Detail</span>
            <span className="text-[11px] uppercase tracking-wider text-light/70">Zakelijk · Vloot</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ path, label }) => {
              const active = pathname === path
              return (
                <Link
                  key={path}
                  href={path}
                  className={`text-sm font-medium transition-colors ${
                    active ? 'text-accent-red' : 'text-light hover:text-accent-red'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <Link
              href="/"
              className="text-sm font-medium text-light/60 hover:text-light transition-colors"
            >
              Particulieren
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link href="/zakelijk/offerte">
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <FiFileText className="w-4 h-4" />
                Offerte aanvragen
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-light hover:text-accent-red transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
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
              className="fixed inset-0 bg-primary-dark/80 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 h-full w-72 bg-primary-dark border-l border-accent-red/30 z-50 md:hidden p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-accent-red font-bold">Zakelijk</span>
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Sluiten">
                  <FiX size={24} className="text-light" />
                </button>
              </div>
              <div className="space-y-2 flex-1">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    href={path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-medium ${
                      pathname === path ? 'bg-accent-red/15 text-accent-red' : 'text-light hover:bg-secondary-dark'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-light/70 hover:text-light"
                >
                  Particulieren
                </Link>
              </div>
              <Link href="/zakelijk/offerte" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                  <FiFileText />
                  Offerte aanvragen
                </Button>
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
