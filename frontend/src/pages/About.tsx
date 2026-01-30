import { motion } from 'framer-motion'
import { images } from '../utils/images'
import Card from '../components/ui/Card'
import CTASection from '../components/sections/CTASection'

export default function About() {
  return (
    <div className="pt-20 pb-0 bg-light min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">
            Over T&R Car Detail
          </h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-3xl mx-auto">
            Professionele autoreiniging en detailing diensten met passie voor perfectie
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-96 bg-secondary-dark rounded-lg overflow-hidden"
          >
            <img
              src={images.aboutStory}
              alt="Car detailing workshop"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Ons Verhaal</h2>
            <p className="text-primary-dark opacity-80 mb-4">
              Bij T&R Car Detail bieden we een totaalpakket aan professionele auto detailing diensten. 
              Deze diensten omvatten het grondig reinigen van interieur en exterieur van auto's. 
              Steeds met het doel om jouw wagen terug in absolute showroomstaat te brengen!
            </p>
            <p className="text-primary-dark opacity-80 mb-4">
              Door gebruik te maken van de beste materialen, producten en technieken kunnen wij het allerbeste 
              resultaat behalen. Of je nu kiest voor een interieurreiniging, exterieurreiniging of een volledig pakket, 
              bij T&R Car Detail wordt jouw auto met de grootste zorg behandeld.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-12">Waarom T&R Car Detail?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Professionele Producten',
                description: 'We gebruiken alleen de beste producten van topmerken voor optimale resultaten.'
              },
              {
                title: 'Ervaren Team',
                description: 'Ons team heeft jarenlange ervaring in auto detailing en perfectionering.'
              },
              {
                title: 'Aandacht voor Detail',
                description: 'Elke auto wordt met de grootste zorg en aandacht behandeld.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <h3 className="text-xl font-bold text-primary-dark mb-3">{item.title}</h3>
                  <p className="text-primary-dark opacity-80">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <CTASection
        title="Klaar om te Starten?"
        description="Boek direct een afspraak of ontdek onze diensten."
        secondaryAction={{ label: 'Bekijk Diensten', to: '/services', icon: 'services' }}
      />
    </div>
  )
}
