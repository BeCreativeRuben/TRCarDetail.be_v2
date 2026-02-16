'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '../ui/Button'
import { images } from '@/lib/images'
import { FiCheck, FiList } from 'react-icons/fi'

export default function QualitySection() {
  return (
    <section className="py-20 bg-primary-dark">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 bg-secondary-dark rounded-lg overflow-hidden"
          >
            <img src={images.qualityProducts} alt="Professionele auto detailing producten" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
              DE BESTE MERKEN,
              <span className="block text-accent-red">HET BESTE RESULTAAT</span>
            </h2>
            <p className="text-lg text-light opacity-90 mb-6">
              Wij werken uitsluitend met professionele producten van topmerken zoals CARPRO, P&S, Koch Chemie en Soft99. Geen compromissen op kwaliteit – uw auto verdient de beste behandeling.
            </p>
            <ul className="space-y-3 mb-6 text-light opacity-90">
              {['Professionele producten van topmerken', 'pH-neutrale wasmiddelen voor veilige reiniging', 'Keramische coatings voor langdurige bescherming', 'Microvezel materialen – krasvrij en zacht'].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <FiCheck className="text-accent-red flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/services">
              <Button variant="primary" size="md" className="flex items-center gap-2 w-fit">
                <FiList className="w-5 h-5" />
                Bekijk Onze Diensten
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
