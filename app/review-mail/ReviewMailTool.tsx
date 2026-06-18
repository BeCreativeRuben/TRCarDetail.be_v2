'use client'

import { useMemo, useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import {
  REVIEW_MAIL_SUBJECT,
  buildReviewRequestHtml,
  defaultReviewPersonalMessage,
} from '@/lib/review-email'

export default function ReviewMailTool() {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')
  const [personalMessage, setPersonalMessage] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [sendSuccess, setSendSuccess] = useState<string | null>(null)

  const fillDefaultMessage = () => {
    setPersonalMessage(defaultReviewPersonalMessage(customerName, serviceType))
  }

  const htmlPreview = useMemo(
    () =>
      buildReviewRequestHtml({
        customerName: customerName || 'Jan Peeters',
        serviceType: serviceType || 'Deluxe Pakket',
        appointmentDate: appointmentDate || undefined,
        personalMessage,
      }),
    [customerName, serviceType, appointmentDate, personalMessage]
  )

  const handleSend = async () => {
    setSendError(null)
    setSendSuccess(null)
    if (!customerName.trim() || !customerEmail.trim() || !serviceType.trim()) {
      setSendError('Vul naam, e-mail en dienst in.')
      return
    }
    setSending(true)
    try {
      const res = await fetch('/api/review-mail/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          email: customerEmail,
          serviceType,
          appointmentDate,
          personalMessage,
          password: adminPassword || undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setSendError(data.error || 'Versturen mislukt.')
        return
      }
      setSendSuccess(`Mail verstuurd naar ${customerEmail} met dezelfde layout als boekingsmails.`)
    } catch {
      setSendError('Versturen mislukt. Probeer opnieuw.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-accent-red mb-2">Intern · handmatig versturen</p>
        <h1 className="text-4xl font-bold text-primary-dark mb-3">Review-mail opstellen</h1>
        <p className="text-primary-dark/75">
          Vul de gegevens in en bekijk de preview. Via <strong>Verstuur mail</strong> gaat de mail met dezelfde
          professionele layout als uw boekingsbevestigingen — rechtstreeks via info@trcardetail.be (Google SMTP).
        </p>
      </div>

      <div className="rounded-xl border border-primary-dark/10 bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-primary-dark">Klantgegevens</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Naam klant *"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="bv. Jan Peeters"
          />
          <Input
            label="E-mail klant *"
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="klant@voorbeeld.be"
          />
          <Input
            label="Dienst / pakket *"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            placeholder="bv. Deluxe Pakket"
          />
          <Input
            label="Datum afspraak (optioneel)"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            placeholder="bv. 15/03/2026"
          />
        </div>
        <div>
          <label htmlFor="personalMessage" className="block text-sm font-medium text-primary-dark mb-2">
            Persoonlijk bericht in de mail
          </label>
          <textarea
            id="personalMessage"
            rows={5}
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-light border-2 border-secondary-dark/30 text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-red"
          />
          <button
            type="button"
            onClick={fillDefaultMessage}
            className="mt-2 text-sm text-accent-red hover:underline"
          >
            Standaardtekst invullen
          </button>
        </div>
        <Input
          label="Admin-wachtwoord (indien ingesteld op Vercel)"
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
          placeholder="ADMIN_PASSWORD"
          autoComplete="current-password"
        />
      </div>

      <div className="rounded-xl border border-primary-dark/10 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-primary-dark">Preview (exacte layout)</h2>
            <p className="text-sm text-primary-dark/60 mt-1">Onderwerp: {REVIEW_MAIL_SUBJECT}</p>
          </div>
          <Button type="button" size="sm" onClick={handleSend} disabled={sending}>
            {sending ? 'Versturen…' : 'Verstuur mail'}
          </Button>
        </div>

        <iframe
          title="E-mail preview"
          srcDoc={htmlPreview}
          className="w-full min-h-[520px] rounded-lg border border-primary-dark/10 bg-secondary-dark/20"
          sandbox=""
        />

        {sendError && <p className="text-sm text-accent-red">{sendError}</p>}
        {sendSuccess && <p className="text-sm text-green-700">{sendSuccess}</p>}
      </div>

      <div className="rounded-lg border border-primary-dark/10 bg-white/80 p-4 text-sm text-primary-dark/70 space-y-3">
        <p className="font-semibold text-primary-dark">Waarom niet via Gmail opstellen?</p>
        <p>
          Gmail ondersteunt geen HTML-layout bij handmatig plakken — u krijgt dan alleen platte tekst. Via{' '}
          <strong>Verstuur mail</strong> gebruikt de site dezelfde SMTP-server en templates als bij boekingen, zodat de
          klant exact dezelfde huisstijl ziet (header, kleuren, knop).
        </p>
        <p>U bepaalt zelf wanneer u verstuurt — dit is volledig manueel, geen automatisering.</p>
      </div>
    </div>
  )
}
