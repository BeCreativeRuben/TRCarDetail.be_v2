'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '../ui/Button'
import { FiCalendar, FiMail, FiList } from 'react-icons/fi'

interface CTASectionProps {
  title: string
  description?: string
  primaryAction?: { label: string; to: string; icon?: 'calendar' | 'mail' }
  secondaryAction?: { label: string; to: string; icon?: 'contact' | 'services' | 'calendar' }
  noTopMargin?: boolean
}

export default function CTASection({
  title,
  description,
  primaryAction = { label: 'Boek Nu', to: '/booking', icon: 'calendar' },
  secondaryAction,
  noTopMargin = false
}: CTASectionProps) {
  const PrimaryIcon = primaryAction?.icon === 'mail' ? FiMail : FiCalendar
  const SecondaryIcon = secondaryAction?.icon === 'contact' ? FiMail : secondaryAction?.icon === 'calendar' ? FiCalendar : FiList

  return (
    <section className={`pt-24 md:pt-28 pb-20 bg-gradient-to-r from-accent-red to-accent-dark-red ${!noTopMargin ? 'mt-16 md:mt-20' : ''}`}>
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h2>
          {description && (
            <p className="text-xl text-white opacity-95 mb-8 max-w-2xl mx-auto">{description}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryAction.to}>
              <Button variant="secondary" size="lg" className="flex items-center gap-2 hover:bg-white hover:text-primary-dark hover:shadow-lg">
                <PrimaryIcon className="w-5 h-5" />
                {primaryAction.label}
              </Button>
            </Link>
            {secondaryAction && (
              <Link href={secondaryAction.to}>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/95 hover:text-primary-dark hover:border-white flex items-center gap-2">
                  <SecondaryIcon className="w-5 h-5" />
                  {secondaryAction.label}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
