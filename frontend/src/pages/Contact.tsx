import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-20 bg-light min-h-screen">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6">
            Contact
          </h1>
          <p className="text-xl text-primary-dark opacity-80 max-w-2xl mx-auto">
            Heeft u vragen of wilt u meer informatie? Neem gerust contact met ons op!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-primary-dark mb-6">Stuur ons een bericht</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Naam"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <Input
                  label="Telefoon"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <div>
                  <label className="block text-sm font-medium text-primary-dark mb-2">
                    Bericht
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all duration-200"
                  />
                </div>
                {submitStatus === 'success' && (
                  <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-4 text-green-400">
                    Bedankt! Uw bericht is verzonden. We nemen zo spoedig mogelijk contact met u op.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="bg-accent-red bg-opacity-20 border border-accent-red rounded-lg p-4 text-accent-red">
                    Er is een fout opgetreden. Probeer het later opnieuw.
                  </div>
                )}
                <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Verzenden...' : 'Verstuur Bericht'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-primary-dark mb-4">Contactgegevens</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMapPin className="text-accent-red mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-primary-dark font-semibold">Adres</p>
                    <p className="text-primary-dark opacity-70 text-sm">Wordt later toegevoegd</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiPhone className="text-accent-red mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-primary-dark font-semibold">Telefoon</p>
                    <p className="text-primary-dark opacity-70 text-sm">Wordt later toegevoegd</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiMail className="text-accent-red mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-primary-dark font-semibold">Email</p>
                    <p className="text-primary-dark opacity-70 text-sm">Wordt later toegevoegd</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-primary-dark mb-4">Openingstijden</h3>
              <div className="space-y-2 text-primary-dark text-sm">
                <div className="flex justify-between">
                  <span>Maandag - Vrijdag</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zaterdag</span>
                  <span>09:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zondag</span>
                  <span>Gesloten</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
