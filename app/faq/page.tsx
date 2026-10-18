'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { FAQ_ITEMS } from '@/lib/faq-data'
import Card from '@/components/ui/Card'
import CTASection from '@/components/sections/CTASection'
import PageHero from '@/components/brand/PageHero'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = FAQ_ITEMS

  return (
    <div className="pb-0 bg-light min-h-screen">
      <PageHero eyebrow="Antwoorden" title="Veelgestelde Vragen" withRedPaper={false}>
        <p className="text-lg md:text-xl text-light/85 max-w-2xl mx-auto">Vind hier antwoorden op de meest gestelde vragen over onze diensten</p>
      </PageHero>
      <div className="container-custom">

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
              <Card className="overflow-hidden">
                <h2 className="text-lg font-semibold normal-case leading-snug tracking-normal text-primary-dark">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full min-h-11 flex items-center justify-between text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-antwoord-${index}`}
                  >
                    <span className="pr-4">{faq.question}</span>
                    {openIndex === index ? <FiChevronUp className="text-accent-red flex-shrink-0" size={24} /> : <FiChevronDown className="text-accent-red flex-shrink-0" size={24} />}
                  </button>
                </h2>
                {/* Antwoord staat altijd in de HTML (crawlbaar voor Google en AI-zoekmachines); dichtgeklapt via hoogte 0. */}
                <motion.div
                  id={`faq-antwoord-${index}`}
                  initial={false}
                  animate={openIndex === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                  aria-hidden={openIndex !== index}
                >
                  <p className="text-primary-dark opacity-80 mt-4 pt-4 border-t border-secondary-dark border-opacity-20">{faq.answer}</p>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <CTASection title="Nog Vragen?" description="Heeft u nog andere vragen? Neem gerust contact met ons op!" primaryAction={{ label: 'Contact Opnemen', to: '/contact', icon: 'mail' }} secondaryAction={{ label: 'Boek Nu', to: '/booking', icon: 'calendar' }} />
    </div>
  )
}
