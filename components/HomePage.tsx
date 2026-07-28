'use client'

import Hero from '@/components/sections/Hero'
import ServicesPreview from '@/components/sections/ServicesPreview'
import ProcessSection from '@/components/sections/ProcessSection'
import QualitySection from '@/components/sections/QualitySection'
import SocialsSection from '@/components/sections/SocialsSection'
import Testimonials from '@/components/sections/Testimonials'
import CTASection from '@/components/sections/CTASection'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { images } from '@/lib/images'
import Button from '@/components/ui/Button'
import TrackedBookLink from '@/components/analytics/TrackedBookLink'
import { FiCalendar } from 'react-icons/fi'

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="py-16 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">T&R Car Detailing in Vlaanderen</h2>
              <p className="text-lg text-primary-dark opacity-80 leading-relaxed mb-6">
                Bij T&R Car Detailing brengen we elke auto terug naar showroomkwaliteit — met car detailing aan huis in Vlaanderen, vanuit Sint-Niklaas. Met jarenlange ervaring en passie voor perfectie geven we uw voertuig de aandacht die het verdient.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <TrackedBookLink href="/booking?from=home_intro" location="home_intro">
                  <Button variant="primary" size="md" className="flex items-center gap-2 justify-center">
                    <FiCalendar className="w-4 h-4" />
                    Boek een afspraak
                  </Button>
                </TrackedBookLink>
                <Link href="/services">
                  <Button variant="outline" size="md">Bekijk pakketten</Button>
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-80 lg:h-96 bg-secondary-dark rounded-lg overflow-hidden">
              <img src={images.homeAbout} alt="Professionele car detailing aan huis in Vlaanderen" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
      <ServicesPreview />
      <section className="py-16 bg-primary-dark">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
              Binnenkort ook <span className="text-accent-red">moto detailing</span>
            </h2>
            <p className="text-lg text-light opacity-90">
              We breiden onze diensten uit. Binnenkort kunt u ook uw motor of moto bij ons laten detailen – dezelfde professionele aanpak en kwaliteit als voor uw auto.
            </p>
            <Link href="/services?category=moto" className="inline-block mt-6 text-accent-red font-semibold hover:underline transition-colors">
              Bekijk het Moto-pakket →
            </Link>
          </motion.div>
        </div>
      </section>
      <ProcessSection />
      <QualitySection />
      <SocialsSection />
      <Testimonials />
      <CTASection
        title="Klaar om uw Auto te Laten Detailen?"
        description="Boek online in een paar stappen — wij komen aan huis in Vlaanderen."
        primaryAction={{ label: 'Boek Nu', to: '/booking?from=home_cta', icon: 'calendar' }}
        secondaryAction={{ label: 'Bekijk Diensten', to: '/services', icon: 'services' }}
        trackLocation="home_cta"
        noTopMargin
      />
    </>
  )
}
