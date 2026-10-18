'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import PageHero from '@/components/brand/PageHero'
import { openCookieSettings } from '@/lib/consent'
import { ENTERPRISE_NUMBER_LABEL, VAT_EXEMPT_LEGAL } from '@/lib/business'

export default function PrivacyPage() {
  return (
    <div className="pb-20 bg-light min-h-screen">
      <PageHero eyebrow="Juridisch" title="Privacyvoorwaarden" withRedPaper={false}>
        <p className="text-lg md:text-xl text-light/85 max-w-2xl mx-auto">
          Hoe wij omgaan met uw gegevens op deze website
        </p>
      </PageHero>
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-primary-dark mb-4">Bedrijfsgegevens</h2>
            <p className="text-primary-dark opacity-80 leading-relaxed">
              <strong>T&amp;R Car Detail</strong>
              <br />
              Heidebloemstraat 66 Bus 11, 9100 Sint-Niklaas
              <br />
              <a href="mailto:info@trcardetail.be" className="text-accent-dark-red font-semibold hover:underline">
                info@trcardetail.be
              </a>
              {' · '}
              <a href="tel:+32499128500" className="text-accent-dark-red font-semibold hover:underline">
                +32 499 12 85 00
              </a>
            </p>
            <p className="text-primary-dark opacity-80 leading-relaxed mt-4">
              {ENTERPRISE_NUMBER_LABEL}
              <br />
              {VAT_EXEMPT_LEGAL}
            </p>
          </Card>

          <Card className="mb-6">
            <h2 className="text-xl font-bold text-primary-dark mb-4">Cookies</h2>
            <p className="text-primary-dark opacity-80 leading-relaxed">
              Deze site zet geen analytische of marketingcookies voordat u daarvoor kiest. De cookiebanner vraagt uw toestemming volgens de AVG (GDPR) en de Belgische regels voor elektronische communicatie. U kunt alles aanvaarden, alleen het noodzakelijke bewaren, of analytics en marketing apart instellen. Beide keuzes zijn even duidelijk aangeboden.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6 mb-2">Noodzakelijk</h3>
            <p className="text-primary-dark opacity-80 leading-relaxed">
              De cookie <strong>tr_cookie_consent</strong> (en een kopie in de lokale opslag van uw browser) onthoudt uw keuze. Bewaartermijn: ongeveer 6 maanden. Zonder deze cookie kunnen we niet weten dat u de banner al beantwoord hebt. Dit is geen reclame- of meetcookie.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6 mb-2">Analytisch — alleen na toestemming</h3>
            <p className="text-primary-dark opacity-80 leading-relaxed">
              Google Analytics (meting-ID&apos;s G-2Z07BE36YG en G-WLZKJ16ZZ4) helpt ons te zien welke pagina&apos;s bezocht worden. Die cookies worden pas geplaatst als u analytics toestaat. Google Consent Mode v2 staat standaard op geweigerd voor <em>analytics_storage</em>.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6 mb-2">Marketing — alleen na toestemming</h3>
            <p className="text-primary-dark opacity-80 leading-relaxed">
              Google Ads (AW-18036326015) meet of een advertentie tot een aanvraag leidt. Die cookies worden pas geplaatst als u marketing toestaat. Standaard zijn <em>ad_storage</em>, <em>ad_user_data</em> en <em>ad_personalization</em> geweigerd, nog vóór de Google-tag geladen wordt.
            </p>
            <h3 className="text-lg font-bold text-primary-dark mt-6 mb-2">Uw keuze wijzigen</h3>
            <p className="text-primary-dark opacity-80 leading-relaxed">
              Onderaan elke pagina staat <strong>Cookie-instellingen</strong>. Daarmee opent u de banner opnieuw. U kunt cookies ook wissen in uw browser. De rechtsgrond voor analytics en marketing is uw toestemming (artikel 6.1.a AVG).
            </p>
            <button
              type="button"
              onClick={() => openCookieSettings()}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-accent-red px-4 py-2 text-sm font-bold text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2"
            >
              Cookie-instellingen openen
            </button>
            <p className="text-primary-dark opacity-80 leading-relaxed mt-6">
              Voor vragen over dit privacy- en cookiebeleid kunt u mailen naar{' '}
              <a href="mailto:info@trcardetail.be" className="text-accent-dark-red font-semibold hover:underline">
                info@trcardetail.be
              </a>.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
