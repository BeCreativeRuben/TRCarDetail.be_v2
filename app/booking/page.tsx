'use client'

import { motion } from 'framer-motion'
import BookingForm from '@/components/booking/BookingForm'
import { Suspense } from 'react'

function BookingContent() {
  return (
    <div className="pt-20 pb-16 md:pb-24 bg-light min-h-screen">
      <div className="container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">Boek Uw Afspraak</h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-2xl mx-auto">
            Vul het formulier in om een afspraak te maken. We nemen zo spoedig mogelijk contact met u op om te bevestigen.
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="pt-20 pb-16 bg-light min-h-screen flex items-center justify-center">Laden...</div>}>
      <BookingContent />
    </Suspense>
  )
}
