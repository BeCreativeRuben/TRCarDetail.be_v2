'use client'

import { motion } from 'framer-motion'
import { FiCalendar, FiMessageCircle, FiMapPin, FiCheck } from 'react-icons/fi'
import Link from 'next/link'
import Button from '../ui/Button'

const STEPS = [
  { icon: FiCalendar, title: 'Boek online', description: 'Kies je pakket en vul het formulier in met je voorkeursdatum.' },
  { icon: FiMessageCircle, title: 'Wij bevestigen', description: 'We nemen contact op om datum en tijd definitief vast te leggen.' },
  { icon: FiMapPin, title: 'Wij komen aan huis', description: 'We komen naar jouw locatie – jij hoeft nergens naartoe.' },
  { icon: FiCheck, title: 'Geniet van het resultaat', description: 'Je auto wordt professioneel verzorgd en ziet er weer als nieuw uit.' },
]

interface ProcessSectionProps {
  variant?: 'full' | 'compact'
}

export default function ProcessSection({ variant = 'full' }: ProcessSectionProps) {
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 p-6 rounded-lg bg-primary-dark/5 border border-primary-dark/10"
      >
        <h3 className="text-lg font-semibold text-primary-dark mb-4">Zo werkt het</h3>
        <ol className="space-y-3 text-primary-dark opacity-90 text-sm">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-red text-white flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span>
                  <strong className="text-primary-dark">{step.title}</strong> – {step.description}
                </span>
              </li>
            )
          })}
        </ol>
      </motion.div>
    )
  }

  return (
    <section className="py-20 bg-light">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-2">Zo werkt het</h2>
          <p className="text-primary-dark opacity-80 max-w-2xl mx-auto">Van boeking tot resultaat in vier duidelijke stappen</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white rounded-lg border border-primary-dark/10 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
              >
                <div className="inline-flex w-14 h-14 rounded-full bg-accent-red text-white items-center justify-center mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <span className="absolute top-4 right-4 text-3xl font-bold text-primary-dark/10 font-heading">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-bold text-primary-dark mb-2">{step.title}</h3>
                <p className="text-primary-dark opacity-80 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            )
          })}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link href="/booking">
            <Button variant="primary" size="lg">
              Boek nu je afspraak
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
