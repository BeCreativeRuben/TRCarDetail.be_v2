import { useState, useRef, useEffect, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '../ui/Input'
import Autocomplete from '../ui/Autocomplete'
import Button from '../ui/Button'
import BookingCalendar from './BookingCalendar'
import { Service, Booking } from '../../types'
import { carBrands, getModelsForBrand } from '../../data/cars'

const services: Service[] = [
  {
    id: 'interieur-basic',
    name: 'Interieur Basic',
    description: 'Basis interieurreiniging',
    basePrice: 95,
    largeCarSurcharge: 15,
    features: []
  },
  {
    id: 'interieur-deepclean',
    name: 'Interieur DeepClean',
    description: 'Grondige dieptereiniging van het interieur',
    basePrice: 175,
    largeCarSurcharge: 25,
    features: []
  },
  {
    id: 'exterieur-basic',
    name: 'Exterieur Basic',
    description: 'Basis exterieurreiniging',
    basePrice: 95,
    largeCarSurcharge: 15,
    features: []
  },
  {
    id: 'exterieur-premium',
    name: 'Exterieur Premium',
    description: 'Dieptereiniging met teer- en vliegroest verwijdering',
    basePrice: 125,
    largeCarSurcharge: 25,
    features: []
  },
  {
    id: 'full-basic',
    name: 'Full Package Basic',
    description: 'Complete reiniging inclusief basis interieur en exterieur',
    basePrice: 175,
    largeCarSurcharge: 25,
    features: []
  },
  {
    id: 'full-premium',
    name: 'Full Package Premium',
    description: 'Complete dieptereiniging interieur en exterieur',
    basePrice: 275,
    largeCarSurcharge: 40,
    features: []
  }
]

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
]

const validServiceIds = ['interieur-basic', 'interieur-deepclean', 'exterieur-basic', 'exterieur-premium', 'full-basic', 'full-premium']

export default function BookingForm() {
  const [searchParams] = useSearchParams()
  const serviceFromUrl = searchParams.get('service')

  const [formData, setFormData] = useState<Partial<Booking>>({
    serviceType: validServiceIds.includes(serviceFromUrl || '') ? serviceFromUrl! : '',
    vehicleInfo: {
      make: '',
      model: '',
      year: '',
      size: 'standard'
    },
    preferredDate: undefined,
    preferredTime: '',
    customerName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const calendarRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLDivElement>(null)

  // Scroll to calendar when arriving with pre-selected service from Services page
  useEffect(() => {
    if (serviceFromUrl && validServiceIds.includes(serviceFromUrl)) {
      const timer = setTimeout(() => {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [serviceFromUrl])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!formData.preferredDate || !formData.preferredTime || !formData.serviceType) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          serviceType: '',
          vehicleInfo: {
            make: '',
            model: '',
            year: '',
            size: 'standard'
          },
          preferredDate: undefined,
          preferredTime: '',
          customerName: '',
          email: '',
          phone: '',
          specialRequests: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedService = services.find(s => s.id === formData.serviceType)
  const totalPrice = selectedService
    ? formData.vehicleInfo?.size === 'large'
      ? selectedService.basePrice + selectedService.largeCarSurcharge
      : selectedService.basePrice
    : 0

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Service Selection */}
      <div>
        <label className="block text-sm font-medium text-primary-dark mb-3">
          Selecteer Service *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => {
                setFormData({ ...formData, serviceType: service.id })
                setTimeout(() => {
                  calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }, 100)
              }}
              className={`
                p-4 rounded-lg border-2 text-left transition-all
                ${formData.serviceType === service.id
                  ? 'border-accent-red bg-accent-red bg-opacity-10'
                  : 'border-secondary-dark border-opacity-30 bg-light hover:border-accent-red'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="font-semibold text-primary-dark mb-1">{service.name}</h3>
              <p className="text-sm text-primary-dark opacity-70 mb-2">{service.description}</p>
              <p className="text-accent-red font-bold">€{service.basePrice}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div ref={calendarRef} className="flex flex-col justify-center min-h-[50vh] md:min-h-0 md:py-4">
        <label className="block text-sm font-medium text-primary-dark mb-3 text-center">
          Selecteer Datum *
        </label>
        <BookingCalendar
          selectedDate={formData.preferredDate || null}
          onDateSelect={(date) => {
            setFormData({ ...formData, preferredDate: date })
            setTimeout(() => {
              timeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 150)
          }}
        />
      </div>

      {/* Time Selection */}
      {formData.preferredDate && (
        <motion.div
          ref={timeRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-primary-dark mb-3">
            Selecteer Tijd *
          </label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setFormData({ ...formData, preferredTime: time })}
                className={`
                  py-2 px-4 rounded-lg font-medium transition-all
                  ${formData.preferredTime === time
                    ? 'bg-accent-red text-white'
                    : 'bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark hover:border-accent-red hover:text-accent-red'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Vehicle Information */}
      <div>
        <h3 className="text-xl font-bold text-primary-dark mb-4">Voertuig Informatie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Autocomplete
            label="Merk"
            value={formData.vehicleInfo?.make || ''}
            onChange={(make) => {
              const models = getModelsForBrand(make)
              const currentModel = formData.vehicleInfo?.model || ''
              const modelValid = models.includes(currentModel)
              setFormData({
                ...formData,
                vehicleInfo: {
                  ...formData.vehicleInfo!,
                  make,
                  model: modelValid ? currentModel : ''
                }
              })
            }}
            options={carBrands}
            placeholder="bv. Volkswagen, BMW, Audi... of vul eigen merk in"
            required
          />
          <Autocomplete
            label="Model"
            value={formData.vehicleInfo?.model || ''}
            onChange={(model) => setFormData({
              ...formData,
              vehicleInfo: { ...formData.vehicleInfo!, model }
            })}
            options={getModelsForBrand(formData.vehicleInfo?.make || '')}
            placeholder={formData.vehicleInfo?.make ? 'Selecteer model of vul eigen in' : 'Selecteer eerst een merk of vul eigen in'}
            required
          />
          <p className="text-sm text-primary-dark opacity-60 -mt-2 md:col-span-2">
            Nieuwe of minder bekende merken? Vul gerust uw eigen merk en model in.
          </p>
          <Input
            label="Jaar *"
            type="text"
            required
            value={formData.vehicleInfo?.year || ''}
            onChange={(e) => setFormData({
              ...formData,
              vehicleInfo: { ...formData.vehicleInfo!, year: e.target.value }
            })}
          />
          <div>
            <label className="block text-sm font-medium text-primary-dark mb-2">
              Grootte *
            </label>
            <select
              required
              value={formData.vehicleInfo?.size || 'standard'}
              onChange={(e) => setFormData({
                ...formData,
                vehicleInfo: { ...formData.vehicleInfo!, size: e.target.value as 'standard' | 'large' }
              })}
              className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent"
            >
              <option value="standard">Standaard</option>
              <option value="large">Groot (+€{selectedService?.largeCarSurcharge || 0})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div>
        <h3 className="text-xl font-bold text-primary-dark mb-4">Uw Gegevens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Naam *"
            type="text"
            required
            value={formData.customerName || ''}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          />
          <Input
            label="Email *"
            type="email"
            required
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Telefoon *"
            type="tel"
            required
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="md:col-span-2"
          />
        </div>
      </div>

      {/* Special Requests */}
      <div>
        <label className="block text-sm font-medium text-primary-dark mb-2">
          Speciale Verzoeken of Opmerkingen
        </label>
        <textarea
          rows={4}
          value={formData.specialRequests || ''}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Price Summary */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-primary-dark rounded-lg p-6"
        >
          <h3 className="text-xl font-bold text-light mb-4">Prijs Overzicht</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-light">
              <span>{selectedService.name}</span>
              <span>€{selectedService.basePrice}</span>
            </div>
            {formData.vehicleInfo?.size === 'large' && (
              <div className="flex justify-between text-light">
                <span>Grote wagen toeslag</span>
                <span>€{selectedService.largeCarSurcharge}</span>
              </div>
            )}
          </div>
          <div className="border-t border-light border-opacity-20 pt-4 flex justify-between">
            <span className="text-xl font-bold text-light">Totaal</span>
            <span className="text-2xl font-bold text-accent-red">€{totalPrice}</span>
          </div>
          <p className="text-sm text-light opacity-70 mt-2">
            * Prijzen zijn indicatief en kunnen variëren
          </p>
        </motion.div>
      )}

      {/* Submit Status */}
      {submitStatus === 'success' && (
        <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-4 text-green-400">
          Bedankt! Uw boeking is verzonden. We nemen zo spoedig mogelijk contact met u op om de afspraak te bevestigen.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-accent-red bg-opacity-20 border border-accent-red rounded-lg p-4 text-accent-red">
          Er is een fout opgetreden. Controleer of alle verplichte velden zijn ingevuld en probeer het opnieuw.
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Verzenden...' : 'Boeking Versturen'}
      </Button>
    </form>
  )
}
