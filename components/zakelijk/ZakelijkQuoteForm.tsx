'use client'

import { FormEvent, useEffect, useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import {
  trackB2bQuoteError,
  trackB2bQuoteStart,
  trackB2bQuoteSuccess,
} from '@/lib/analytics'

const FLEET_SIZES = [
  { value: '1-5', label: '1 – 5 wagens' },
  { value: '5-10', label: '5 – 10 wagens' },
  { value: '11-25', label: '11 – 25 wagens' },
  { value: '26-50', label: '26 – 50 wagens' },
  { value: '50+', label: 'Meer dan 50 wagens' },
]

const VEHICLE_TYPES = [
  { value: 'personenwagens', label: 'Personenwagens' },
  { value: 'bestel', label: 'Bestelwagens' },
  { value: 'mixed', label: 'Gemengd' },
]

const FREQUENCIES = [
  { value: 'eenmalig', label: 'Eenmalig' },
  { value: 'maandelijks', label: 'Maandelijks / periodiek' },
  { value: 'op-maat', label: 'Op maat / te bespreken' },
]

const selectClass =
  'w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark/30 text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-red'

export default function ZakelijkQuoteForm() {
  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    vatNumber: '',
    location: '',
    fleetSize: '',
    vehicleType: '',
    frequency: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    trackB2bQuoteStart()
  }, [])

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setStatus('idle')

    if (
      !form.companyName.trim() ||
      !form.contactName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.vatNumber.trim() ||
      !form.location.trim() ||
      !form.fleetSize
    ) {
      setStatus('error')
      setError('Vul alle verplichte velden in.')
      trackB2bQuoteError('missing_required_fields')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/b2b-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setError(data.error || 'Verzenden mislukt. Probeer opnieuw.')
        trackB2bQuoteError(typeof data.error === 'string' ? data.error : 'api_error')
        return
      }
      trackB2bQuoteSuccess(form.fleetSize)
      setStatus('success')
      setForm({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        vatNumber: '',
        location: '',
        fleetSize: '',
        vehicleType: '',
        frequency: '',
        message: '',
      })
    } catch {
      setStatus('error')
      setError('Verzenden mislukt. Probeer opnieuw.')
      trackB2bQuoteError('network_error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-green-500/40 bg-green-50 p-6 text-center">
        <h3 className="text-xl font-bold text-primary-dark mb-2">Offerteaanvraag ontvangen</h3>
        <p className="text-primary-dark/80 text-sm">
          Bedankt. We nemen binnen 1–2 werkdagen contact met u op om uw vloot en planning te bespreken.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Bedrijfsnaam *"
          value={form.companyName}
          onChange={update('companyName')}
          required
          placeholder="Uw bedrijf"
        />
        <Input
          label="Contactpersoon *"
          value={form.contactName}
          onChange={update('contactName')}
          required
          placeholder="Voor- en achternaam"
        />
        <Input
          label="E-mail *"
          type="email"
          value={form.email}
          onChange={update('email')}
          required
          placeholder="naam@bedrijf.be"
        />
        <Input
          label="Telefoon *"
          type="tel"
          value={form.phone}
          onChange={update('phone')}
          required
          placeholder="+32 …"
        />
        <Input
          label="BTW-nummer *"
          value={form.vatNumber}
          onChange={update('vatNumber')}
          required
          placeholder="bv. BE0123.456.789"
        />
      </div>

      <Input
        label="Locatie (adres of gemeente) *"
        value={form.location}
        onChange={update('location')}
        required
        placeholder="bv. parking Gent, depot Antwerpen…"
      />
      <p className="text-sm text-primary-dark/65 -mt-2">
        Op uw locatie werken we met water en elektriciteit ter beschikking van de klant.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-2">Vlootomvang *</label>
          <select
            className={selectClass}
            value={form.fleetSize}
            onChange={update('fleetSize')}
            required
          >
            <option value="">Kies…</option>
            {FLEET_SIZES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-2">Type voertuigen</label>
          <select className={selectClass} value={form.vehicleType} onChange={update('vehicleType')}>
            <option value="">Optioneel…</option>
            {VEHICLE_TYPES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-2">Frequentie</label>
          <select className={selectClass} value={form.frequency} onChange={update('frequency')}>
            <option value="">Optioneel…</option>
            {FREQUENCIES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-2">Bericht (optioneel)</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={update('message')}
          className={selectClass}
          placeholder="Bijv. timing, type wagens, speciale eisen…"
        />
      </div>

      {error && <p className="text-sm text-accent-red">{error}</p>}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? 'Verzenden…' : 'Offerte aanvragen'}
      </Button>
    </form>
  )
}
