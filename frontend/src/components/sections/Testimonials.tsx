import { useState } from 'react'
import { motion } from 'framer-motion'
import { images } from '../../utils/images'

interface Testimonial {
  id: string
  name: string
  rating: number
  text: string
  car?: string
  service?: string
  /** Optional: profile photo (person). Falls back to elegant initials. */
  image?: string
  /** Optional: photo of their car - shows next to profile for exclusive feel */
  carImage?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jan V.',
    rating: 5,
    text: 'Uitstekende service. Mijn auto ziet er weer als nieuw uit – professioneel en met oog voor detail. Precies wat ik zocht.',
    car: 'BMW 3-serie',
    service: 'Volledig pakket',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    carImage: images.serviceFull,
  },
  {
    id: '2',
    name: 'Maria D.',
    rating: 5,
    text: 'Fantastische resultaten na de dieptereiniging. Het interieur ruikt weer fris en ziet er onberispelijk uit. Absoluut de moeite waard.',
    car: 'Audi A4',
    service: 'Interieur DeepClean',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80',
    carImage: images.serviceInterieur,
  },
  {
    id: '3',
    name: 'Tom S.',
    rating: 5,
    text: 'De premium handwash heeft mijn auto een glans gegeven die ik nog nooit eerder zag. Een echte aanrader.',
    car: 'Mercedes C-Klasse',
    service: 'Exterieur Premium',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80',
    carImage: images.serviceExterieur,
  },
]

// Elegant initials fallback when no image - exclusive luxury feel
const getAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=96&background=22333B&color=F2F4F3&bold=true&font-size=0.4`

export default function Testimonials() {
  return (
    <section className="py-24 bg-light">
      <div className="container-custom">
        {/* Header - refined, editorial feel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-accent-red text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Ervaringen
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Wat Onze Klanten Zeggen
          </h2>
          <p className="text-primary-dark opacity-70 text-lg font-serif italic">
            Tevreden klanten zijn onze beste reclame
          </p>
        </motion.div>

        {/* Testimonial cards - exclusive design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} getAvatarUrl={getAvatarUrl} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index, getAvatarUrl }: { testimonial: Testimonial; index: number; getAvatarUrl: (name: string) => string }) {
  const [carImageError, setCarImageError] = useState(false)
  const [profileImageError, setProfileImageError] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
              <div className="h-full flex flex-col bg-primary-dark rounded-lg border border-secondary-dark shadow-xl hover:shadow-2xl hover:border-accent-red/30 transition-all duration-300 overflow-hidden">
                {/* Stars - prominent & clear */}
                <div className="pt-8 pb-4 flex justify-center">
                  <div className="flex gap-1" aria-label={`${testimonial.rating} van 5 sterren`}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-2xl ${i < testimonial.rating ? 'text-accent-red' : 'text-secondary-dark'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote - centered */}
                <div className="flex-1 px-8 pb-6 text-center">
                  <blockquote className="font-serif text-lg md:text-xl text-light leading-relaxed italic">
                    "{testimonial.text}"
                  </blockquote>
                </div>

                {/* Profile row - centered */}
                <div className="px-8 pb-8 pt-4 border-t border-secondary-dark">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-accent-red/50 bg-secondary-dark">
                        <img
                          src={profileImageError ? getAvatarUrl(testimonial.name) : (testimonial.image ?? getAvatarUrl(testimonial.name))}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={() => setProfileImageError(true)}
                        />
                      </div>
                      {testimonial.carImage && !carImageError && (
                        <div className="relative w-14 h-9 rounded overflow-hidden ring ring-accent-red/30 hidden sm:block">
                          <img
                            src={testimonial.carImage}
                            alt={testimonial.car ?? 'Auto'}
                            className="w-full h-full object-cover"
                            onError={() => setCarImageError(true)}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-light">{testimonial.name}</p>
                      {(testimonial.car || testimonial.service) && (
                        <p className="text-sm text-light/60">
                          {[testimonial.car, testimonial.service].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
    </motion.article>
  )
}
