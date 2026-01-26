import { motion } from 'framer-motion'
import Card from '../ui/Card'

interface Testimonial {
  id: string
  name: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jan V.',
    rating: 5,
    text: 'Uitstekende service! Mijn auto ziet er weer als nieuw uit. Zeer professioneel en aandacht voor detail.'
  },
  {
    id: '2',
    name: 'Maria D.',
    rating: 5,
    text: 'Fantastische resultaten! Mijn auto ziet er weer als nieuw uit na de dieptereiniging. Absoluut de moeite waard.'
  },
  {
    id: '3',
    name: 'Tom S.',
    rating: 5,
    text: 'Zeer tevreden over de premium handwash. Mijn auto glanst weer als nooit tevoren. Aanrader!'
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-primary-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
            Wat Onze Klanten Zeggen
          </h2>
          <p className="text-xl text-light opacity-90">
            Tevreden klanten zijn onze beste reclame
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent-red text-xl">★</span>
                  ))}
                </div>
                <p className="text-primary-dark mb-4 italic opacity-90">"{testimonial.text}"</p>
                <p className="text-primary-dark font-semibold">- {testimonial.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
