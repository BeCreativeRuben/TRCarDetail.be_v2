import Link from 'next/link'
import { FiCalendar } from 'react-icons/fi'
import Navigation from './Navigation'
import Button from '../ui/Button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary-dark border-b border-secondary-dark">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-accent-red">T&R Car Detail</span>
          </Link>

          <Navigation />

          <div className="hidden md:block">
            <Link href="/booking">
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                Boek Nu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
