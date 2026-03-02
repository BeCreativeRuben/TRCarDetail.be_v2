'use client'

import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'

export default function PrivacyPage() {
  return (
    <div className="pt-20 pb-20 bg-light min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">
            Privacyvoorwaarden
          </h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-2xl mx-auto">
            Hoe wij omgaan met uw gegevens op deze website
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Card>
            <h2 className="text-xl font-bold text-primary-dark mb-4">Cookies en Google Analytics</h2>
            <p className="text-primary-dark opacity-80 leading-relaxed">
              Op deze website maken we gebruik van cookies via <strong>Google Analytics</strong>. 
              Dit helpt ons om te begrijpen hoe bezoekers de site gebruiken, zodat we de website kunnen verbeteren. 
              De gegevens worden anoniem verwerkt. U kunt cookies uitschakelen in de instellingen van uw browser 
              als u dit liever niet wilt.
            </p>
            <p className="text-primary-dark opacity-80 leading-relaxed mt-4">
              Voor vragen over ons privacybeleid kunt u contact met ons opnemen via{' '}
              <a href="mailto:info@trcardetail.be" className="text-accent-red font-semibold hover:underline">
                info@trcardetail.be
              </a>.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
