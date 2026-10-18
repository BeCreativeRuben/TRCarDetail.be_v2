import Link from 'next/link'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import Logo from '@/components/brand/Logo'
import Texture from '@/components/brand/Texture'
import TornEdge from '@/components/brand/TornEdge'
import CookieSettingsLink from '@/components/consent/CookieSettingsLink'

const focusRing =
  'rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark'

export default function ZakelijkFooter() {
  return (
      <footer className="relative overflow-hidden bg-primary-dark">
        <Texture className="opacity-90" />
        <TornEdge position="top" color="#FF2E00" />
        <div className="relative container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Logo className="h-14 w-auto mb-3" />
              <p className="text-accent-red text-xs font-semibold uppercase tracking-[0.2em] mb-3">Zakelijk · Vlootdetailing</p>
              <p className="text-light text-sm max-w-md">
                Professionele detailing voor bedrijfswagens en fleets — op uw locatie in Vlaanderen.
                Minder stilstand, vaste kwaliteit, één aanspreekpunt.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold normal-case leading-snug tracking-normal text-light mb-4">Links</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/zakelijk" className={`text-light hover:text-accent-red transition-colors ${focusRing}`}>
                    Zakelijk home
                  </Link>
                </li>
                <li>
                  <Link href="/zakelijk/aanbod" className={`text-light hover:text-accent-red transition-colors ${focusRing}`}>
                    Aanbod
                  </Link>
                </li>
                <li>
                  <Link href="/zakelijk/offerte" className={`text-light hover:text-accent-red transition-colors ${focusRing}`}>
                    Offerte aanvragen
                  </Link>
                </li>
                <li>
                  <Link href="/" className={`text-light hover:text-accent-red transition-colors ${focusRing}`}>
                    Particulieren
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className={`text-light hover:text-accent-red transition-colors ${focusRing}`}>
                    Privacy
                  </Link>
                </li>
                <li>
                  <CookieSettingsLink className={`text-light hover:text-accent-red transition-colors text-left ${focusRing}`} />
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold normal-case leading-snug tracking-normal text-light mb-4">Contact</h2>
              <ul className="space-y-3 text-sm text-light">
                <li className="flex items-start gap-2">
                  <FiMapPin className="text-accent-red flex-shrink-0 mt-0.5" aria-hidden />
                  <span>Heidebloemstraat 66 Bus 11<br />9100 Sint-Niklaas</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiPhone className="text-accent-red flex-shrink-0" aria-hidden />
                  <a href="tel:+32499128500" className={`hover:text-accent-red transition-colors ${focusRing}`}>
                    +32 499 12 85 00
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FiMail className="text-accent-red flex-shrink-0" aria-hidden />
                  <a href="mailto:info@trcardetail.be" className={`hover:text-accent-red transition-colors ${focusRing}`}>
                    info@trcardetail.be
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="relative w-full mt-8 pt-6 pb-6 border-t border-white/10">
          <p className="text-center text-sm text-light/90">
            &copy; {new Date().getFullYear()} T&R Car Detail. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
  )
}
