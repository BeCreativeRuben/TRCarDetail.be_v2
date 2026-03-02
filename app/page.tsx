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

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="py-16 bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">T&R Car Detailing</h2>
              <p className="text-lg text-primary-dark opacity-80 leading-relaxed">
                Bij T&R Car Detailing streven we ernaar om elke auto terug te brengen naar showroomkwaliteit. Met jarenlange ervaring en een passie voor perfectie, bieden we professionele autoreiniging diensten die uw voertuig de aandacht geven die het verdient.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-80 lg:h-96 bg-secondary-dark rounded-lg overflow-hidden">
              <img src={images.homeAbout} alt="Professionele auto detailing" className="w-full h-full object-cover" />
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
      <CTASection title="Klaar om uw Auto te Laten Detailen?" description="Neem contact op of boek direct een afspraak" secondaryAction={{ label: 'Contact', to: '/contact', icon: 'contact' }} noTopMargin />
    </>
  )
}
