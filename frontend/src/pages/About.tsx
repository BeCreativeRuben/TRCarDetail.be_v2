import { motion } from 'framer-motion'
import { FiPackage, FiUsers, FiAward } from 'react-icons/fi'
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

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-4">Ons Team</h2>
          <p className="text-primary-dark opacity-80 text-center max-w-2xl mx-auto mb-12">
            Twee jonge, gemotiveerde specialisten die uw auto met passie behandelen
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card hover className="text-center overflow-hidden">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-secondary-dark flex items-center justify-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=Thibo&size=96&background=FF2E00&color=fff&bold=true`}
                    alt="Thibo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-1">Thibo</h3>
                <p className="text-accent-red font-semibold text-sm">Exterieur Expert</p>
                <p className="text-primary-dark opacity-70 text-sm mt-2">
                  Specialist in exterieurreiniging, lakbescherming en showroomglans
                </p>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card hover className="text-center overflow-hidden">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-secondary-dark flex items-center justify-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=Renzo&size=96&background=FF2E00&color=fff&bold=true`}
                    alt="Renzo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-1">Renzo</h3>
                <p className="text-accent-red font-semibold text-sm">Interieur Expert</p>
                <p className="text-primary-dark opacity-70 text-sm mt-2">
                  Specialist in interieurreiniging, stoffering en dieptereiniging
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-primary-dark text-center mb-12">Waarom T&R Car Detail?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Professionele Producten',
                description: 'We gebruiken alleen de beste producten van topmerken voor optimale resultaten.',
                icon: FiPackage,
                image: images.qualityProducts
              },
              {
                title: 'Ervaren Team',
                description: 'Ons team heeft jarenlange ervaring in auto detailing en perfectionering.',
                icon: FiUsers,
                image: images.aboutStory
              },
              {
                title: 'Aandacht voor Detail',
                description: 'Elke auto wordt met de grootste zorg en aandacht behandeld.',
                icon: FiAward,
                image: images.serviceExterieur
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full overflow-hidden p-0">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-accent-red flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white drop-shadow-sm">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-primary-dark opacity-80 leading-relaxed">{item.description}</p>
                  </div>
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
