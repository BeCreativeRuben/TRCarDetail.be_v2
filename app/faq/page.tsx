'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { FAQ_ITEMS } from '@/lib/faq-data'
import Card from '@/components/ui/Card'
import CTASection from '@/components/sections/CTASection'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = FAQ_ITEMS

  return (
    <div className="pt-20 pb-0 bg-light min-h-screen">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">Veelgestelde Vragen</h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-2xl mx-auto">Vind hier antwoorden op de meest gestelde vragen over onze diensten</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Card className="overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between text-left">
                  <h3 className="text-lg font-semibold text-primary-dark pr-4">{faq.question}</h3>
                  {openIndex === index ? <FiChevronUp className="text-accent-red flex-shrink-0" size={24} /> : <FiChevronDown className="text-accent-red flex-shrink-0" size={24} />}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="text-primary-dark opacity-80 mt-4 pt-4 border-t border-secondary-dark border-opacity-20">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <CTASection title="Nog Vragen?" description="Heeft u nog andere vragen? Neem gerust contact met ons op!" primaryAction={{ label: 'Contact Opnemen', to: '/contact', icon: 'mail' }} secondaryAction={{ label: 'Boek Nu', to: '/booking', icon: 'calendar' }} />
    </div>
  )
}
