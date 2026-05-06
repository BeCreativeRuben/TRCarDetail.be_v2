'use client'

import { useState, useRef, useEffect, useCallback, useMemo, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Input from '../ui/Input'
import Autocomplete from '../ui/Autocomplete'
import AddressAutocomplete from '../ui/AddressAutocomplete'
import Button from '../ui/Button'
import BookingCalendar from './BookingCalendar'
import CustomPackageBuilder from './CustomPackageBuilder'
import { Service, Booking } from '@/lib/types'
import { carBrands, getModelsForBrand, isLargeCar } from '@/lib/cars'
import { TRAVEL_CONFIG } from '@/lib/distance'
import { EXTRAS_CATALOG, getExtraById, sumExtrasPriceExclBtw } from '@/lib/extras-catalog'
import {
  type CustomExterieurTier,
  type CustomFeatureKey,
  type CustomInterieurTier,
  computeCustomEstimateExclBtw,
  humanLabelForFeatureKey,
  labelForExterieurTier,
  labelForInterieurTier,
} from '@/lib/custom-package-estimate'

const services: Service[] = [
  { id: 'exterieur-basis', name: 'Exterieur Basis', description: '€60 · Glanzend en in topvorm', basePrice: 60, largeCarSurcharge: 0, features: [] },
  { id: 'exterieur-deluxe', name: 'Exterieur Deluxe', description: '€90 · Decontaminatie was', basePrice: 90, largeCarSurcharge: 0, features: [] },
  { id: 'full-basis', name: 'Basis Pakket', description: '€100 · Basis Pakket', basePrice: 100, largeCarSurcharge: 0, features: [] },
  { id: 'full-deluxe', name: 'Deluxe Pakket', description: '€170 · Deluxe Pakket', basePrice: 170, largeCarSurcharge: 0, features: [] },
  { id: 'full-premium', name: 'Premium Pakket', description: '€250 · Premium Pakket', basePrice: 250, largeCarSurcharge: 0, features: [] },
  {
    id: 'full-custom',
    name: 'Combinatie op maat',
    description: 'Richtprijs op basis van uw keuze (indicatie)',
    basePrice: 0,
    largeCarSurcharge: 0,
    features: [],
  },
  { id: 'interieur-basis', name: 'Interieur Basis', description: '€50 · Opfrissen', basePrice: 50, largeCarSurcharge: 0, features: [] },
  { id: 'interieur-deluxe', name: 'Interieur Deluxe', description: '€130 · Uitgebreide dieptereiniging', basePrice: 130, largeCarSurcharge: 0, features: [] },
  { id: 'interieur-premium', name: 'Interieur Premium', description: '€220 · Meest complete interieurbehandeling', basePrice: 220, largeCarSurcharge: 0, features: [] },
  { id: 'polijsten-light', name: 'Light Polish – Basis correctie', description: 'Prijs op aanvraag', basePrice: 0, largeCarSurcharge: 0, features: [] },
  { id: 'polijsten-full', name: 'Full Polish – Intensive correctie', description: 'Prijs op aanvraag', basePrice: 0, largeCarSurcharge: 0, features: [] },
]

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const validServiceIds = [
  'exterieur-basis',
  'exterieur-deluxe',
  'full-basis',
  'full-deluxe',
  'full-premium',
  'full-custom',
  'interieur-basis',
  'interieur-deluxe',
  'interieur-premium',
  'polijsten-light',
  'polijsten-full',
]

const SERVICE_GROUPS: { label: string; ids: string[] }[] = [
  { label: 'Volledig pakket', ids: ['full-basis', 'full-deluxe', 'full-premium', 'full-custom'] },
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
    address: '',
    specialRequests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [travelFeeLoading, setTravelFeeLoading] = useState(false)
  const [travelFeeUnavailable, setTravelFeeUnavailable] = useState<string | null>(null)
  const [customExt, setCustomExt] = useState<CustomExterieurTier>('basis')
  const [customInt, setCustomInt] = useState<CustomInterieurTier>('basis')
  const [excludedKeys, setExcludedKeys] = useState<Set<CustomFeatureKey>>(() => new Set())
  const [selectedExtraIds, setSelectedExtraIds] = useState<Set<string>>(() => new Set())
  const calendarRef = useRef<HTMLDivElement>(null)
  const extrasRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const travelFeeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastFetchedAddressRef = useRef<string | null>(null)

  useEffect(() => {
    if (serviceFromUrl && validServiceIds.includes(serviceFromUrl)) {
      const t = setTimeout(() => calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)
      return () => clearTimeout(t)
    }
  }, [serviceFromUrl])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash !== '#booking-extras') return
    const t = setTimeout(() => {
      extrasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 350)
    return () => clearTimeout(t)
  }, [])

  const fetchTravelFee = useCallback(async (address: string) => {
    if (!address || address.trim().length < 5) {
      setFormData((prev) => ({ ...prev, travelDistanceKm: undefined, travelFeeEuro: undefined }))
      setTravelFeeUnavailable(null)
      return
    }
    setTravelFeeLoading(true)
    setTravelFeeUnavailable(null)
    try {
      const res = await fetch(`/api/travel-fee?address=${encodeURIComponent(address.trim())}`)
      const data = await res.json()
      if (!res.ok) {
        setTravelFeeUnavailable('Kon afstand niet bepalen.')
        setFormData((prev) => ({ ...prev, travelDistanceKm: undefined, travelFeeEuro: undefined }))
        return
      }
      if (data.error && data.distanceKm == null) {
        setTravelFeeUnavailable('Adres niet herkend voor afstandsberekening.')
        setFormData((prev) => ({ ...prev, travelDistanceKm: undefined, travelFeeEuro: undefined }))
        return
      }
      lastFetchedAddressRef.current = address.trim()
      setTravelFeeUnavailable(null)
      setFormData((prev) => ({
        ...prev,
        travelDistanceKm: data.distanceKm ?? undefined,
        travelFeeEuro: data.travelFeeEuro ?? undefined,
      }))
    } catch {
      setTravelFeeUnavailable('Afstand kon niet worden berekend.')
      setFormData((prev) => ({ ...prev, travelDistanceKm: undefined, travelFeeEuro: undefined }))
    } finally {
      setTravelFeeLoading(false)
    }
  }, [])

  const fetchTravelFeeByCoords = useCallback(async (lat: number, lon: number) => {
    setTravelFeeLoading(true)
    setTravelFeeUnavailable(null)
    try {
      const res = await fetch(`/api/travel-fee?lat=${lat}&lon=${lon}`)
      const data = await res.json()
      if (data.error && data.distanceKm == null) {
        setTravelFeeUnavailable('Kon afstand niet bepalen.')
        setFormData((prev) => ({ ...prev, travelDistanceKm: undefined, travelFeeEuro: undefined }))
        return
      }
      setTravelFeeUnavailable(null)
      setFormData((prev) => ({
        ...prev,
        travelDistanceKm: data.distanceKm ?? undefined,
        travelFeeEuro: data.travelFeeEuro ?? undefined,
      }))
    } catch {
      setTravelFeeUnavailable('Afstand kon niet worden berekend.')
      setFormData((prev) => ({ ...prev, travelDistanceKm: undefined, travelFeeEuro: undefined }))
    } finally {
      setTravelFeeLoading(false)
    }
  }, [])

  useEffect(() => {
    const address = formData.address?.trim() ?? ''
    if (address.length < 5) {
      setFormData((prev) => ({ ...prev, travelDistanceKm: undefined, travelFeeEuro: undefined }))
      setTravelFeeUnavailable(null)
      lastFetchedAddressRef.current = null
      return
    }
    if (travelFeeTimeoutRef.current) clearTimeout(travelFeeTimeoutRef.current)
    travelFeeTimeoutRef.current = setTimeout(() => {
      if (address === lastFetchedAddressRef.current) return
      fetchTravelFee(address)
    }, 500)
    return () => {
      if (travelFeeTimeoutRef.current) clearTimeout(travelFeeTimeoutRef.current)
    }
  }, [formData.address, fetchTravelFee])

  useEffect(() => {
    if (submitStatus === 'success') {
      const t = setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 150)
      return () => clearTimeout(t)
    }
  }, [submitStatus])

  const customEstimate = useMemo(
    () =>
      formData.serviceType === 'full-custom'
        ? computeCustomEstimateExclBtw(customExt, customInt, excludedKeys)
        : 0,
    [formData.serviceType, customExt, customInt, excludedKeys]
  )

  const extrasTotal = useMemo(() => sumExtrasPriceExclBtw(selectedExtraIds), [selectedExtraIds])

  const toggleExcluded = useCallback((key: CustomFeatureKey) => {
    setExcludedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }, [])

  const toggleExtra = useCallback((id: string) => {
    setSelectedExtraIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    if (!formData.preferredDate || !formData.preferredTime || !formData.serviceType || !formData.address?.trim()) {
      setSubmitStatus('error')
      setSubmitError('Vul alle verplichte velden in, inclusief het adres (kies een suggestie of vul handmatig in).')
      return
    }
    if (formData.serviceType === 'full-custom') {
      if (customExt === 'none' && customInt === 'none') {
        setSubmitStatus('error')
        setSubmitError('Kies minstens een exterieur- of interieurniveau voor uw combinatie op maat.')
        return
      }
      if (customEstimate <= 0) {
        setSubmitStatus('error')
        setSubmitError('Uw richtprijs is €0. Pas uw selectie aan (bijvoorbeeld minder uitsluitingen) of neem contact op.')
        return
      }
    }
    setIsSubmitting(true)
    setSubmitStatus('idle')
    try {
      const excludedLines = [...excludedKeys].map((k) => humanLabelForFeatureKey(k))
      const customBlock =
        formData.serviceType === 'full-custom'
          ? [
              '--- Combinatie op maat ---',
              `Exterieur: ${labelForExterieurTier(customExt)}`,
              `Interieur: ${labelForInterieurTier(customInt)}`,
              excludedLines.length
                ? `Uitgesloten onderdelen:\n${excludedLines.map((l) => `  - ${l}`).join('\n')}`
                : 'Geen onderdelen uitgesloten.',
              `Richtprijs (excl. BTW, indicatie): €${customEstimate.toFixed(2)}`,
              'Toelichting: deze richtprijs is een indicatie op basis van uw selectie en kan afwijken van de definitieve prijs na inspectie van de werken die moeten gebeuren.',
            ].join('\n')
          : ''
      const mergedSpecial =
        formData.serviceType === 'full-custom' && customBlock
          ? (formData.specialRequests || '').trim()
            ? `${customBlock}\n\n${formData.specialRequests}`
            : customBlock
          : formData.specialRequests

      const selectedExtrasPayload = [...selectedExtraIds]
        .map((id) => getExtraById(id))
        .filter((x): x is NonNullable<typeof x> => Boolean(x))
        .map((e) => ({
          id: e.id,
          name: e.name,
          priceExclBtwEuro: e.priceExclBtwEuro,
          ...(e.priceNote ? { priceNote: e.priceNote } : {}),
        }))

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType: formData.serviceType === 'full-custom' ? 'Combinatie op maat' : formData.serviceType,
          specialRequests: mergedSpecial,
          selectedExtras: selectedExtrasPayload.length ? selectedExtrasPayload : undefined,
          totalExclBtw: totalPrice > 0 ? totalPrice : undefined,
        }),
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
          address: '',
          travelDistanceKm: undefined,
          travelFeeEuro: undefined,
          specialRequests: ''
        })
        setCustomExt('basis')
        setCustomInt('basis')
        setExcludedKeys(new Set())
        setSelectedExtraIds(new Set())
      } else {
        const data = await response.json().catch(() => ({}))
        setSubmitStatus('error')
        setSubmitError(data?.error || 'Er is iets misgegaan. Controleer of alle velden zijn ingevuld.')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const BTW_RATE = 0.21
  const selectedService = services.find(s => s.id === formData.serviceType)
  const baseServicePrice =
    formData.serviceType === 'full-custom'
      ? customEstimate
      : selectedService
        ? formData.vehicleInfo?.size === 'large'
          ? selectedService.basePrice + selectedService.largeCarSurcharge
          : selectedService.basePrice
        : 0
  const servicePrice = baseServicePrice + extrasTotal
  const travelFee = formData.travelFeeEuro ?? 0
  const totalPrice = servicePrice + travelFee
  const totalExclBtw = totalPrice
  const btwAmount = Math.round(totalExclBtw * BTW_RATE * 100) / 100
  const totalInclBtw = Math.round(totalExclBtw * (1 + BTW_RATE) * 100) / 100

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
                        if (service.id === 'full-custom') {
                          setCustomExt('basis')
                          setCustomInt('basis')
                          setExcludedKeys(new Set())
                        }
                        setFormData({ ...formData, serviceType: service.id })
                        setTimeout(() => calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
                      }}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${formData.serviceType === service.id ? 'border-accent-red bg-accent-red bg-opacity-10 ring-2 ring-accent-red ring-offset-2' : 'border-primary-dark/20 bg-light hover:border-accent-red hover:bg-accent-red/5'}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <h4 className="font-semibold text-primary-dark mb-1 text-sm md:text-base">{service.name}</h4>
                      <p className="text-xs text-primary-dark opacity-70 mb-2 line-clamp-2">{service.description}</p>
                      <p className="text-accent-red font-bold text-sm">
                        {service.id === 'full-custom'
                          ? 'Richtprijs (indicatie)'
                          : service.basePrice > 0
                            ? `€${service.basePrice}`
                            : 'Prijs op aanvraag'}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {formData.serviceType === 'full-custom' && (
        <CustomPackageBuilder
          ext={customExt}
          int={customInt}
          onExtChange={(t) => {
            setCustomExt(t)
            setExcludedKeys(new Set())
          }}
          onIntChange={(t) => {
            setCustomInt(t)
            setExcludedKeys(new Set())
          }}
          excludedKeys={excludedKeys}
          onToggleExcluded={toggleExcluded}
        />
      )}

      <div
        id="booking-extras"
        ref={extrasRef}
        className="rounded-xl border-2 border-primary-dark/10 bg-white p-4 md:p-5"
      >
        <h3 className="text-base font-bold text-primary-dark mb-2 pb-2 border-b border-primary-dark/10">
          Extra&apos;s (optioneel)
        </h3>
        <p className="text-sm text-primary-dark opacity-75 mb-4">
          Vink aan wat u wenst bovenop uw gekozen service. Alle bedragen zijn excl. BTW.
        </p>
        <div className="space-y-3">
          {EXTRAS_CATALOG.map((extra) => {
            const checked = selectedExtraIds.has(extra.id)
            return (
              <label
                key={extra.id}
                className="flex min-h-[120px] cursor-pointer items-start gap-3 rounded-lg border border-primary-dark/15 bg-light/80 p-3 text-sm text-primary-dark"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleExtra(extra.id)}
                  className="mt-0.5 h-4 w-4 rounded border-secondary-dark/40 text-accent-red focus:ring-accent-red"
                />
                <span className="flex h-full flex-1 flex-col">
                  <span className="font-semibold block">{extra.name}</span>
                  <span className="text-primary-dark/75 block mt-0.5 line-clamp-2">{extra.description}</span>
                  <span className="text-accent-red font-bold mt-auto pt-1 inline-block">
                    {extra.priceNote ? `${extra.priceNote} €${extra.priceExclBtwEuro}` : `+€${extra.priceExclBtwEuro}`}{' '}
                    <span className="text-xs font-normal text-primary-dark/60">excl. BTW</span>
                  </span>
                </span>
              </label>
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
          <Input label="Telefoon *" type="tel" required value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <div className="md:col-span-2">
            <AddressAutocomplete
              label="Adres (aan huis) *"
              value={formData.address || ''}
              onChange={(address, coords) => {
                setFormData((prev) => ({ ...prev, address }))
                if (coords) {
                  lastFetchedAddressRef.current = address.trim()
                  fetchTravelFeeByCoords(coords.lat, coords.lon)
                }
              }}
              placeholder="Typ straat, postcode of gemeente (bv. 9100 Sint-Niklaas)"
              required
            />
            <p className="text-sm text-primary-dark opacity-60 mt-1">
              Wij rijden naar u toe. Binnen {TRAVEL_CONFIG.freeRadiusKm} km van Heidebloemstraat 66, Sint-Niklaas is de kilometervergoeding gratis. Vanaf {TRAVEL_CONFIG.freeRadiusKm} km: €{TRAVEL_CONFIG.pricePerKmEuro.toFixed(2)} per extra km.
            </p>
            {travelFeeLoading && <p className="text-sm text-primary-dark opacity-70 mt-1">Afstand wordt berekend…</p>}
            {travelFeeUnavailable && (
              <p className="text-sm text-primary-dark/80 mt-1">
                {travelFeeUnavailable} U kunt gewoon verzenden; de kilometervergoeding wordt dan na uw aanvraag bepaald.
              </p>
            )}
            {!travelFeeLoading && !travelFeeUnavailable && formData.address && formData.address.trim().length >= 5 && formData.travelDistanceKm != null && (
              <p className="text-sm text-primary-dark mt-1">
                Afstand: {formData.travelDistanceKm} km — Kilometervergoeding: {formData.travelFeeEuro === 0 ? 'Gratis' : `€${formData.travelFeeEuro?.toFixed(2)}`}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-2">Speciale Verzoeken of Opmerkingen</label>
        <textarea rows={4} value={formData.specialRequests || ''} onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark border-opacity-30 text-primary-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red focus:border-transparent transition-all duration-200" />
      </div>

      {selectedService && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-primary-dark rounded-lg p-6">
          <h3 className="text-xl font-bold text-light mb-4">Prijs Overzicht</h3>
          {formData.serviceType === 'full-custom' ? (
            customEstimate > 0 ? (
              <>
                <p className="text-sm text-light/85 mb-3">
                  Richtprijs op basis van uw geselecteerde niveaus en onderdelen. Dit is <strong className="text-light">geen definitieve offerte</strong>: de uiteindelijke prijs kan afwijken na zicht op de werken.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-light">
                    <span>Richtprijs dienst (excl. BTW)</span>
                    <span>€{customEstimate.toFixed(2)}</span>
                  </div>
                  {extrasTotal > 0 && (
                    <>
                      {[...selectedExtraIds].map((id) => {
                        const e = getExtraById(id)
                        if (!e) return null
                        return (
                          <div key={id} className="flex justify-between text-light text-sm">
                            <span>
                              Extra: {e.name}
                              {e.priceNote ? ` (${e.priceNote})` : ''}
                            </span>
                            <span>€{e.priceExclBtwEuro.toFixed(2)}</span>
                          </div>
                        )
                      })}
                      <div className="flex justify-between text-light text-sm border-b border-light/20 pb-2">
                        <span>Extra&apos;s (subtotaal)</span>
                        <span>€{extrasTotal.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                  {(formData.travelDistanceKm != null || formData.travelFeeEuro != null) && (
                    <div className="flex justify-between text-light">
                      <span>Kilometervergoeding{formData.travelDistanceKm != null ? ` (${formData.travelDistanceKm} km)` : ''}</span>
                      <span>{formData.travelFeeEuro === 0 ? 'Gratis' : `€${formData.travelFeeEuro?.toFixed(2)}`}</span>
                    </div>
                  )}
                </div>
                <div className="border-t border-light border-opacity-20 pt-4 space-y-2">
                  <div className="flex justify-between text-light">
                    <span>Subtotaal excl. BTW</span>
                    <span>€{totalExclBtw.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-light">
                    <span>BTW (21%)</span>
                    <span>€{btwAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-light pt-2 border-t border-light border-opacity-20">
                    <span className="text-xl font-bold text-light">Totaal incl. BTW</span>
                    <span className="text-2xl font-bold text-accent-red">€{totalInclBtw.toFixed(2)}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-light">Pas uw combinatie aan om een richtprijs te zien (minstens één niveau kiezen en niet alle onderdelen uitsluiten).</p>
            )
          ) : selectedService.basePrice > 0 ? (
            <>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-light"><span>{selectedService.name}</span><span>€{selectedService.basePrice}</span></div>
                {formData.vehicleInfo?.size === 'large' && selectedService.largeCarSurcharge > 0 && <div className="flex justify-between text-light"><span>Grote wagen toeslag</span><span>€{selectedService.largeCarSurcharge}</span></div>}
                {extrasTotal > 0 && (
                  <>
                    {[...selectedExtraIds].map((id) => {
                      const e = getExtraById(id)
                      if (!e) return null
                      return (
                        <div key={id} className="flex justify-between text-light text-sm">
                          <span>
                            Extra: {e.name}
                            {e.priceNote ? ` (${e.priceNote})` : ''}
                          </span>
                          <span>€{e.priceExclBtwEuro.toFixed(2)}</span>
                        </div>
                      )
                    })}
                    <div className="flex justify-between text-light text-sm border-b border-light/20 pb-2">
                      <span>Extra&apos;s (subtotaal)</span>
                      <span>€{extrasTotal.toFixed(2)}</span>
                    </div>
                  </>
                )}
                {(formData.travelDistanceKm != null || formData.travelFeeEuro != null) && (
                  <div className="flex justify-between text-light">
                    <span>Kilometervergoeding{formData.travelDistanceKm != null ? ` (${formData.travelDistanceKm} km)` : ''}</span>
                    <span>{formData.travelFeeEuro === 0 ? 'Gratis' : `€${formData.travelFeeEuro?.toFixed(2)}`}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-light border-opacity-20 pt-4 space-y-2">
                <div className="flex justify-between text-light">
                  <span>Subtotaal excl. BTW</span>
                  <span>€{totalExclBtw.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-light">
                  <span>BTW (21%)</span>
                  <span>€{btwAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-light pt-2 border-t border-light border-opacity-20">
                  <span className="text-xl font-bold text-light">Totaal incl. BTW</span>
                  <span className="text-2xl font-bold text-accent-red">€{totalInclBtw.toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-light">Prijs voor <strong>{selectedService.name}</strong> wordt na uw aanvraag persoonlijk met u afgestemd.</p>
              {extrasTotal > 0 && (
                <div className="space-y-2 mt-3 mb-2">
                  {[...selectedExtraIds].map((id) => {
                    const e = getExtraById(id)
                    if (!e) return null
                    return (
                      <div key={id} className="flex justify-between text-light text-sm">
                        <span>
                          Extra: {e.name}
                          {e.priceNote ? ` (${e.priceNote})` : ''}
                        </span>
                        <span>€{e.priceExclBtwEuro.toFixed(2)}</span>
                      </div>
                    )
                  })}
                  <div className="flex justify-between text-light text-sm border-b border-light/20 pb-2">
                    <span>Extra&apos;s (subtotaal)</span>
                    <span>€{extrasTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
              {(formData.travelDistanceKm != null || formData.travelFeeEuro != null) && (
                <p className="text-light mt-2">Kilometervergoeding: {formData.travelFeeEuro === 0 ? 'Gratis' : `€${formData.travelFeeEuro?.toFixed(2)}`}{formData.travelDistanceKm != null ? ` (${formData.travelDistanceKm} km)` : ''}</p>
              )}
              {totalPrice > 0 && (
                <div className="mt-4 pt-4 border-t border-light border-opacity-20 space-y-1">
                  <div className="flex justify-between text-light"><span>Subtotaal excl. BTW</span><span>€{totalExclBtw.toFixed(2)}</span></div>
                  <div className="flex justify-between text-light"><span>BTW (21%)</span><span>€{btwAmount.toFixed(2)}</span></div>
                  <div className="flex justify-between text-light pt-2"><span className="font-bold">Totaal incl. BTW</span><span className="font-bold text-accent-red">€{totalInclBtw.toFixed(2)}</span></div>
                </div>
              )}
            </>
          )}
        </motion.div>
      )}

      <p className="text-sm text-primary-dark opacity-70 mt-2 mb-2">Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren.</p>

      {submitStatus === 'success' && (
        <div ref={successRef} className="bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-4 text-green-400 space-y-2">
          <p>Bedankt! Uw boeking is verzonden. We nemen zo spoedig mogelijk contact met u op om de afspraak te bevestigen.</p>
          <p className="text-sm opacity-90">Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren.</p>
        </div>
      )}
      {submitStatus === 'error' && <div className="bg-accent-red bg-opacity-20 border border-accent-red rounded-lg p-4 text-accent-red">{submitError || 'Er is een fout opgetreden. Controleer of alle verplichte velden zijn ingevuld en probeer het opnieuw.'}</div>}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Verzenden...' : 'Boeking Versturen'}
      </Button>
    </form>
  )
}
