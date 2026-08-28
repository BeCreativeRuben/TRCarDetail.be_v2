'use client'

import Hero from '@/components/sections/Hero'
import ServicesPreview from '@/components/sections/ServicesPreview'
import ProcessSection from '@/components/sections/ProcessSection'
import QualitySection from '@/components/sections/QualitySection'
import SocialsSection from '@/components/sections/SocialsSection'
import Testimonials from '@/components/sections/Testimonials'
import CTASection from '@/components/sections/CTASection'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { images } from '@/lib/images'

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="py-16 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">T&R Car Detailing in Vlaanderen</h2>
              <p className="text-lg text-primary-dark opacity-80 leading-relaxed">
                Bij T&R Car Detailing brengen we elke auto terug naar showroomkwaliteit — met car detailing aan huis in Vlaanderen, vanuit Sint-Niklaas. Met jarenlange ervaring en passie voor perfectie geven we uw voertuig de aandacht die het verdient.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-80 lg:h-96 bg-secondary-dark rounded-lg overflow-hidden">
              <Image src={images.homeAbout} alt="Professionele car detailing aan huis in Vlaanderen" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>
      <ServicesPreview />
      <ProcessSection />
      <Testimonials />
      <SocialsSection />
      <QualitySection />
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
