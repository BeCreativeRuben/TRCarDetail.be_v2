import type { Metadata } from 'next'
import { FiTool } from 'react-icons/fi'

export const metadata: Metadata = {
  title: 'Onderhoud – T&R Car Detail',
  description: 'We zijn even bezig met onderhoud aan de website.',
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="rounded-full bg-secondary-dark/80 p-6 mb-8">
        <FiTool className="w-14 h-14 text-accent-red" aria-hidden />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-light mb-4 font-[family-name:var(--font-bebas)] tracking-wide">
        We zijn zo terug
      </h1>
      <p className="text-lg text-light/85 max-w-md mb-8">
        De website is tijdelijk niet beschikbaar wegens onderhoud. Probeer het later opnieuw, of neem contact op
        als het dringend is.
      </p>
      <a
        href="mailto:info@trcardetail.be"
        className="inline-flex items-center justify-center rounded-lg bg-accent-red text-white font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
      >
        Mail ons
      </a>
      <p className="mt-10 text-sm text-light/50">T&amp;R Car Detail</p>
    </div>
  )
}
