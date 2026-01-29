import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'

interface Testimonial {
  id: string
  name: string
  rating: number
  text: string
  car?: string
  service?: string
  date?: string
  /** Optional: profile photo. Falls back to initials. */
  image?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jan V.',
    rating: 5,
    text: 'Uitstekende service. Mijn auto ziet er weer als nieuw uit – professioneel en met oog voor detail. Precies wat ik zocht.',
    car: 'BMW 3-serie',
    service: 'Volledig pakket',
    date: '2 weken geleden',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: '2',
    name: 'Maria D.',
    rating: 5,
    text: 'Fantastische resultaten na de dieptereiniging. Het interieur ruikt weer fris en ziet er onberispelijk uit. Absoluut de moeite waard.',
    car: 'Audi A4',
    service: 'Interieur DeepClean',
    date: '1 maand geleden',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
  },
  {
    id: '3',
    name: 'Tom S.',
    rating: 5,
    text: 'De premium handwash heeft mijn auto een glans gegeven die ik nog nooit eerder zag. Een echte aanrader.',
    car: 'Mercedes C-Klasse',
    service: 'Exterieur Premium',
    date: '3 weken geleden',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
  },
]

const getAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=96&background=22333B&color=F2F4F3&bold=true&font-size=0.4`

export default function Testimonials() {
  return (
    <section className="py-24 bg-light">
      <div className="container-custom">
        {/* Header - Trustpilot style: clean, minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-2">
            Wat Onze Klanten Zeggen
          </h2>
          <p className="text-primary-dark opacity-70">
            Beoordeeld als uitstekend door onze klanten
          </p>
        </motion.div>

        {/* Trustpilot-style review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} getAvatarUrl={getAvatarUrl} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index, getAvatarUrl }: { testimonial: Testimonial; index: number; getAvatarUrl: (name: string) => string }) {
  const [profileImageError, setProfileImageError] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white rounded-lg border border-primary-dark/10 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      {/* Trustpilot layout: header row with avatar, name, stars */}
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-secondary-dark">
            <img
              src={profileImageError ? getAvatarUrl(testimonial.name) : (testimonial.image ?? getAvatarUrl(testimonial.name))}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              onError={() => setProfileImageError(true)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="font-semibold text-primary-dark">{testimonial.name}</h3>
              {/* Stars - Trustpilot style: clear, prominent */}
              <div className="flex gap-0.5" aria-label={`${testimonial.rating} van 5 sterren`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 flex-shrink-0 ${i < testimonial.rating ? 'text-accent-red' : 'text-primary-dark/20'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            {testimonial.date && (
              <p className="text-sm text-primary-dark/50 mt-0.5">{testimonial.date}</p>
            )}
          </div>
        </div>

        {/* Review text - Trustpilot style: clean, left-aligned, no quotes */}
        <p className="text-primary-dark text-[15px] leading-relaxed">
          {testimonial.text}
        </p>

        {/* Verified / service info - Trustpilot style badge */}
        {(testimonial.car || testimonial.service) && (
          <div className="mt-4 pt-4 border-t border-primary-dark/5 flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs text-accent-red font-medium">
              <FiCheck className="w-3.5 h-3.5" />
              Geverifieerde klant
            </span>
            <span className="text-primary-dark/50">·</span>
            <span className="text-xs text-primary-dark/60">
              {[testimonial.car, testimonial.service].filter(Boolean).join(' · ')}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  )
}
