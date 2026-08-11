import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function ZakelijkFooter() {
  return (
    <footer className="bg-secondary-dark border-t border-primary-dark">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-accent-red mb-2">T&R Car Detail</h3>
            <p className="text-light/50 text-xs uppercase tracking-wider mb-3">Zakelijk · Vlootdetailing</p>
            <p className="text-light text-sm">
              Professionele detailing voor bedrijfswagens en fleets — op uw locatie in Vlaanderen.
              Minder stilstand, vaste kwaliteit, één aanspreekpunt.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-light mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/zakelijk" className="text-light hover:text-accent-red transition-colors">
                  Zakelijk home
                </Link>
              </li>
              <li>
                <Link href="/zakelijk/aanbod" className="text-light hover:text-accent-red transition-colors">
                  Aanbod
                </Link>
              </li>
              <li>
                <Link href="/zakelijk/offerte" className="text-light hover:text-accent-red transition-colors">
                  Offerte aanvragen
                </Link>
              </li>
              <li>
                <Link href="/" className="text-light/70 hover:text-accent-red transition-colors">
                  Particulieren
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-light/70 hover:text-accent-red transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-light mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-light">
              <li className="flex items-start gap-2">
                <FiMapPin className="text-accent-red flex-shrink-0 mt-0.5" />
                <span>Heidebloemstraat 66 Bus 11<br />9100 Sint-Niklaas</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-accent-red flex-shrink-0" />
                <a href="tel:+32499128500" className="hover:text-accent-red transition-colors">
                  +32 499 12 85 00
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-accent-red flex-shrink-0" />
                <a href="mailto:info@trcardetail.be" className="hover:text-accent-red transition-colors">
                  info@trcardetail.be
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-dark bg-primary-dark/50 py-6">
        <p className="text-center text-sm text-light/80">
          &copy; {new Date().getFullYear()} T&R Car Detail. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  )
}
