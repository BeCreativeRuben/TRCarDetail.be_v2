import { Link } from 'react-router-dom'
import { FiCalendar } from 'react-icons/fi'
import Navigation from './Navigation'
import Button from '../ui/Button'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary-dark border-b border-secondary-dark corner-shape">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-accent-red">T&R Car Detail</span>
          </Link>
          
          <Navigation />
          
          <div className="hidden md:block">
            <Link to="/booking">
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
