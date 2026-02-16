'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Input from '../ui/Input'
import Autocomplete from '../ui/Autocomplete'
import Button from '../ui/Button'
import BookingCalendar from './BookingCalendar'
import { Service, Booking } from '@/lib/types'
import { carBrands, getModelsForBrand, isLargeCar } from '@/lib/cars'

const services: Service[] = [
  { id: 'exterieur-basis', name: 'Exterieur Basis', description: '€60 · Glanzend en in topvorm', basePrice: 60, largeCarSurcharge: 0, features: [] },
  { id: 'exterieur-deluxe', name: 'Exterieur Deluxe', description: '€90 · Decontaminatie was', basePrice: 90, largeCarSurcharge: 0, features: [] },
  { id: 'full-basis', name: 'Exterieur Basis + Interieur Basis', description: '€100 · Binnen en buiten', basePrice: 100, largeCarSurcharge: 0, features: [] },
  { id: 'interieur-basis', name: 'Interieur Basis', description: '€50 · Opfrissen', basePrice: 50, largeCarSurcharge: 0, features: [] },
  { id: 'interieur-deluxe', name: 'Interieur Deluxe', description: '€130 · Uitgebreide dieptereiniging', basePrice: 130, largeCarSurcharge: 0, features: [] },
  { id: 'interieur-premium', name: 'Interieur Premium', description: '€220 · Meest complete interieurbehandeling', basePrice: 220, largeCarSurcharge: 0, features: [] },
  { id: 'polijsten-light', name: 'Light Polish – Basis correctie', description: 'Prijs op aanvraag', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'polijsten-full', name: 'Full Polish – Intensive correctie', description: 'Prijs op aanvraag', basePrice: 0, largeCarSurcharge: 0, features: [] },
]

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const validServiceIds = ['exterieur-basis', 'exterieur-deluxe', 'full-basis', 'interieur-basis', 'interieur-deluxe', 'interieur-premium', 'polijsten-light', 'polijsten-full']

const SERVICE_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Volledig pakket', ids: ['full-basis'] },
  { label: 'Exterieur', ids: ['exterieur-basis', 'exterieur-deluxe'] },
  { label: 'Interieur', ids: ['interieur-basis', 'interieur-deluxe', 'interieur-premium'] },
  { label: 'Polieren', ids: ['polijsten-light', 'polijsten-full'] },
]

export default function BookingForm() {
  const searchParams = useSearchParams()
  const serviceFromUrl = searchParams.get('service')

  const [formData, setFormData] = useState<Partial<Booking>>({
    serviceType: validServiceIds.includes(serviceFromUrl || '') ? serviceFromUrl! : '',
    vehicleInfo: { make: '', model: '', year: '', size: 'standard' },
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

  useEffect(() => {
    if (serviceFromUrl && validServiceIds.includes(serviceFromUrl)) {
      const t = setTimeout(() => calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)
      return () => clearTimeout(t)
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          serviceType: '',
          vehicleInfo: { make: '', model: '', year: '', size: 'standard' },
          preferredDate: undefined,
          preferredTime: '',
          customerName: '',
          email: '',
          phone: '',
          specialRequests: ''
        })
      } else setSubmitStatus('error')
    } catch {
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
      <div>
        <label className="block text-sm font-medium text-primary-dark mb-4">Selecteer Service *</label>
        <div className="space-y-6">
          {SERVICE_GROUPS.map((group) => {
            const groupServices = services.filter((s) => group.ids.includes(s.id))
            if (groupServices.length === 0) return null
            return (
              <div key={group.label} className="rounded-xl border-2 border-primary-dark/10 bg-white p-4 md:p-5">
                <h3 className="text-base font-bold text-primary-dark mb-3 pb-2 border-b border-primary-dark/10">
                  {group.label}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupServices.map((service) => (
                    <motion.button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, serviceType: service.id })
                        setTimeout(() => calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
                      }}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${formData.serviceType === service.id ? 'border-accent-red bg-accent-red bg-opacity-10 ring-2 ring-accent-red ring-offset-2' : 'border-primary-dark/20 bg-light hover:border-accent-red hover:bg-accent-red/5'}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <h4 className="font-semibold text-primary-dark mb-1 text-sm md:text-base">{service.name}</h4>
                      <p className="text-xs text-primary-dark opacity-70 mb-2 line-clamp-2">{service.description}</p>
                      <p className="text-accent-red font-bold text-sm">{service.basePrice > 0 ? `€${service.basePrice}` : 'Prijs op aanvraag'}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div ref={calendarRef} className="flex flex-col justify-center min-h-[50vh] md:min-h-0 md:py-4">
        <label className="block text-sm font-medium text-primary-dark mb-3 text-center">Selecteer Datum *</label>
        <BookingCalendar
          selectedDate={formData.preferredDate || null}
          onDateSelect={(date) => {
            setFormData({ ...formData, preferredDate: date })
            setTimeout(() => timeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)
          }}
        />
      </div>

      {formData.preferredDate && (
        <motion.div ref={timeRef} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label className="block text-sm font-medium text-primary-dark mb-3">Selecteer Tijd *</label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setFormData({ ...formData, preferredTime: time })}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${formData.preferredTime === time ? 'bg-accent-red text-white' : 'bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark hover:border-accent-red hover:text-accent-red'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <div>
        <h3 className="text-xl font-bold text-primary-dark mb-4">Voertuig Informatie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Autocomplete
            label="Merk"
            value={formData.vehicleInfo?.make || ''}
            onChange={(make) => {
              const models = getModelsForBrand(make)
              const currentModel = formData.vehicleInfo?.model || ''
              const newModel = models.includes(currentModel) ? currentModel : ''
              const size = isLargeCar(make, newModel) ? 'large' : 'standard'
              setFormData({
                ...formData,
                vehicleInfo: { ...formData.vehicleInfo!, make, model: newModel, size }
              })
            }}
            options={carBrands}
            placeholder="bv. Volkswagen, BMW, Audi... of vul eigen merk in"
            required
          />
          <Autocomplete
            label="Model"
            value={formData.vehicleInfo?.model || ''}
            onChange={(model) => {
              const make = formData.vehicleInfo?.make || ''
              const size = isLargeCar(make, model) ? 'large' : 'standard'
              setFormData({ ...formData, vehicleInfo: { ...formData.vehicleInfo!, model, size } })
            }}
            options={getModelsForBrand(formData.vehicleInfo?.make || '')}
            placeholder={formData.vehicleInfo?.make ? 'Selecteer model of vul eigen in' : 'Selecteer eerst een merk of vul eigen in'}
            required
          />
          <p className="text-sm text-primary-dark opacity-60 -mt-2 md:col-span-2">Nieuwe of minder bekende merken? Vul gerust uw eigen merk en model in. Grote wagens (SUV, bus, enz.) worden automatisch herkend voor de toeslag.</p>
          <Input label="Jaar *" type="text" required value={formData.vehicleInfo?.year || ''} onChange={(e) => setFormData({ ...formData, vehicleInfo: { ...formData.vehicleInfo!, year: e.target.value } })} />
          {formData.vehicleInfo?.make && formData.vehicleInfo?.model && (
            <p className="text-sm text-primary-dark md:col-span-2">
              {formData.vehicleInfo?.size === 'large' ? (
                <span className="inline-flex items-center gap-1.5 text-accent-red font-medium">
                  Groot voertuig – toeslag van toepassing
                  {selectedService && selectedService.largeCarSurcharge > 0 && ` (+€${selectedService.largeCarSurcharge})`}
                </span>
              ) : (
                <span className="text-primary-dark opacity-70">Standaard voertuig</span>
              )}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-primary-dark mb-4">Uw Gegevens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Naam *" type="text" required value={formData.customerName || ''} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
          <Input label="Email *" type="email" required value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <Input label="Telefoon *" type="tel" required value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="md:col-span-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-2">Speciale Verzoeken of Opmerkingen</label>
        <textarea rows={4} value={formData.specialRequests || ''} onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all duration-200" />
      </div>

      {selectedService && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-primary-dark rounded-lg p-6">
          <h3 className="text-xl font-bold text-light mb-4">Prijs Overzicht</h3>
          {selectedService.basePrice > 0 ? (
            <>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-light"><span>{selectedService.name}</span><span>€{selectedService.basePrice}</span></div>
                {formData.vehicleInfo?.size === 'large' && selectedService.largeCarSurcharge > 0 && <div className="flex justify-between text-light"><span>Grote wagen toeslag</span><span>€{selectedService.largeCarSurcharge}</span></div>}
              </div>
              <div className="border-t border-light border-opacity-20 pt-4 flex justify-between">
                <span className="text-xl font-bold text-light">Totaal</span>
                <span className="text-2xl font-bold text-accent-red">€{totalPrice}</span>
              </div>
            </>
          ) : (
            <p className="text-light">Prijs voor <strong>{selectedService.name}</strong> wordt na uw aanvraag persoonlijk met u afgestemd.</p>
          )}
          <p className="text-sm text-light opacity-70 mt-2">* Prijzen zijn excl. BTW, indicatief en kunnen variëren</p>
        </motion.div>
      )}

      {submitStatus === 'success' && <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-4 text-green-400">Bedankt! Uw boeking is verzonden. We nemen zo spoedig mogelijk contact met u op om de afspraak te bevestigen.</div>}
      {submitStatus === 'error' && <div className="bg-accent-red bg-opacity-20 border border-accent-red rounded-lg p-4 text-accent-red">Er is een fout opgetreden. Controleer of alle verplichte velden zijn ingevuld en probeer het opnieuw.</div>}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Verzenden...' : 'Boeking Versturen'}
      </Button>
    </form>
  )
}
