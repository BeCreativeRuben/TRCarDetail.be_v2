'use client'

import Link from 'next/link'
import { FiCalendar } from 'react-icons/fi'
import Navigation from './Navigation'
import Button from '../ui/Button'
import TrackedBookLink from '../analytics/TrackedBookLink'
import Logo from '../brand/Logo'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full shrink-0 self-start bg-primary-dark border-b border-accent-red/40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center" aria-label="T&R Car Detail – home">
            <Logo priority className="h-12 w-auto" />
          </Link>

          <Navigation />

          <div className="hidden md:block">
            <TrackedBookLink href="/booking?from=header" location="header">
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                Boek Nu
              </Button>
            </TrackedBookLink>
          </div>
        </div>
      </div>
    </header>
  )
}
