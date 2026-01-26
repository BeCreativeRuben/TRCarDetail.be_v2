import { Link } from 'react-router-dom'
import { FiFacebook, FiYoutube, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-secondary-dark border-t border-primary-dark">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-accent-red mb-4">T&R Car Detail</h3>
            <p className="text-light text-sm">
              Professionele autoreiniging en detailing diensten. Wij brengen uw auto terug in absolute showroomstaat!
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-light mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-light hover:text-accent-red transition-colors text-sm">
                  Over ons
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-light hover:text-accent-red transition-colors text-sm">
                  Diensten
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-light hover:text-accent-red transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light hover:text-accent-red transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-light mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-light">
              <li className="flex items-center gap-2">
                <FiMapPin className="text-accent-red" />
                <span>Adres wordt later toegevoegd</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-accent-red" />
                <span>Telefoon wordt later toegevoegd</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-accent-red" />
                <span>Email wordt later toegevoegd</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-light mb-4">Volg ons</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-light hover:text-accent-red transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-light hover:text-accent-red transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube size={24} />
              </a>
              <a
                href="#"
                className="text-light hover:text-accent-red transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-dark text-center text-sm text-light">
          <p>&copy; {new Date().getFullYear()} T&R Car Detail. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  )
}
