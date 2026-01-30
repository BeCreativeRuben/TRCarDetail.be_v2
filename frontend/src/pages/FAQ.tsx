import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import Card from '../components/ui/Card'
import CTASection from '../components/sections/CTASection'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Hoe lang duurt een wasbeurt?',
    answer: 'Een premium handwash duurt gemiddeld 2-3 uur, afhankelijk van de grootte en staat van uw voertuig. Een complete behandeling met interieur kan 4-6 uur duren.'
  },
  {
    question: 'Moet ik een afspraak maken?',
    answer: 'Ja, we werken uitsluitend op afspraak om u de beste service te kunnen bieden. U kunt online een afspraak boeken of contact met ons opnemen.'
  },
  {
    question: 'Wat is het verschil tussen een gewone wasbeurt en een premium handwash?',
    answer: 'Een premium handwash gebruikt de 2-emmer methode om krassen te voorkomen, professionele producten, en extra aandacht voor details zoals deurstijlen, wielkasten en bandendressing. Dit zorgt voor een veel grondigere en veiligere reiniging.'
  },
  {
    question: 'Hoe vaak moet ik mijn auto laten detailing?',
    answer: 'Dit hangt af van uw gebruik en omgeving. Voor de meeste auto\'s raden we aan om elke 3-6 maanden een grondige reiniging te laten uitvoeren. Regelmatig onderhoud helpt om uw auto in topstaat te houden.'
  },
  {
    question: 'Kunnen jullie ook busjes en grote voertuigen behandelen?',
    answer: 'Ja, we behandelen ook busjes en grote voertuigen. Voor oversize voertuigen vragen we u contact met ons op te nemen voor een prijsopgave op maat.'
  },
  {
    question: 'Wat als mijn auto in slechte staat is?',
    answer: 'Geen probleem! We behandelen auto\'s in alle condities. Voor auto\'s die extra aandacht nodig hebben, kunnen we een programma op maat samenstellen. Neem contact met ons op voor advies.'
  },
  {
    question: 'Zijn de prijzen inclusief BTW?',
    answer: 'Ja, alle prijzen zijn inclusief 21% BTW. De prijzen zijn indicatief en kunnen variëren afhankelijk van de grootte, staat en complexiteit van uw voertuig.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="pt-20 pb-0 bg-light min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">
            Veelgestelde Vragen
          </h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-2xl mx-auto">
            Vind hier antwoorden op de meest gestelde vragen over onze diensten
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-primary-dark pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <FiChevronUp className="text-accent-red flex-shrink-0" size={24} />
                  ) : (
                    <FiChevronDown className="text-accent-red flex-shrink-0" size={24} />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-primary-dark opacity-80 mt-4 pt-4 border-t border-secondary-dark border-opacity-20">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <CTASection
        title="Nog Vragen?"
        description="Heeft u nog andere vragen? Neem gerust contact met ons op!"
        primaryAction={{ label: 'Contact Opnemen', to: '/contact', icon: 'mail' }}
        secondaryAction={{ label: 'Boek Nu', to: '/booking', icon: 'calendar' }}
      />
    </div>
  )
}
