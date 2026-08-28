'use client'

import { motion } from 'framer-motion'

const brands = ['CARPRO', 'P&S', 'Koch Chemie', 'Soft99']

export default function QualitySection() {
  return (
    <section className="py-8 bg-primary-dark">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center"
        >
          <p className="text-light opacity-80 text-sm">
            Wij werken uitsluitend met professionele topmerken
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {brands.map((brand) => (
              <span
                key={brand}
                className="text-light font-bold text-sm tracking-wide opacity-70"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
