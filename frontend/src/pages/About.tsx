import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function About() {
  return (
    <div className="py-20 bg-light min-h-screen">
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
            className="relative h-96 bg-secondary-dark rounded-lg flex items-center justify-center"
          >
            <div className="text-center text-light opacity-50">
              <svg
                className="w-32 h-32 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <p>Afbeelding placeholder</p>
            </div>
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

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary-dark rounded-lg p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-light mb-6">Bezoek Ons</h2>
          <p className="text-light opacity-90 mb-4">
            Benieuwd wat ons team voor jouw wagen kan betekenen? Bezoek onze winkel en detail studio. 
            Je kan hier terecht voor vrijblijvend advies en de aankoop van car detailing producten.
          </p>
          <p className="text-light opacity-80 mb-6">
            Adres wordt later toegevoegd
          </p>
          <Link to="/contact">
            <Button variant="primary" size="md">
              Contact Opnemen
            </Button>
          </Link>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-primary-dark mb-6">Klaar om te Starten?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button variant="primary" size="lg">
                🚗 Boek Nu
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="lg">
                ✨ Bekijk Diensten
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
