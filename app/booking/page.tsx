'use client'

import BookingForm from '@/components/booking/BookingForm'
import ProcessSection from '@/components/sections/ProcessSection'
import { Suspense } from 'react'
import PageHero from '@/components/brand/PageHero'

function BookingContent() {
  return (
    <div className="pb-16 md:pb-24 bg-light min-h-screen">
        <PageHero eyebrow="Reserveer je afspraak" title="Boek Uw Afspraak">
          <p className="text-lg md:text-xl text-light/85 max-w-2xl mx-auto">
            Vul het formulier in om een afspraak te maken. We nemen zo spoedig mogelijk contact met u op om te bevestigen.
          </p>
        </PageHero>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <ProcessSection variant="compact" />
          {/* Alleen het formulier leest de URL (useSearchParams); titel en uitleg blijven server-side gerenderd. */}
          <Suspense fallback={<div className="py-16 text-center text-primary-dark opacity-70">Laden...</div>}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return <BookingContent />
}
