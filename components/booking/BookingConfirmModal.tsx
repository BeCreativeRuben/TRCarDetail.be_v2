'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../ui/Button'
import { VAT_EXEMPT_SHORT, VAT_EXEMPT_LEGAL } from '@/lib/business'
import { getExtraById, type ExtraCatalogItem } from '@/lib/extras-catalog'
import { FiX, FiCalendar, FiClock, FiTruck, FiUser, FiMapPin, FiPackage, FiMessageSquare } from 'react-icons/fi'

export type ConfirmModalData = {
  serviceName: string
  servicePrice: number
  isCustomPackage: boolean
  isPrijsOpAanvraag: boolean
  customLabel?: string
  selectedExtraIds: ReadonlySet<string>
  extrasTotal: number
  preferredDate: string
  preferredTime: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  vehicleSize: 'standard' | 'large'
  customerName: string
  email: string
  phone: string
  address: string
  travelDistanceKm?: number
  travelFeeEuro?: number
  specialRequests?: string
  totalPrice: number
}

type Props = {
  open: boolean
  data: ConfirmModalData
  isSubmitting: boolean
  onConfirm: () => void
  onClose: () => void
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('nl-BE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default function BookingConfirmModal({ open, data, isSubmitting, onConfirm, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const prevFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    prevFocusRef.current = document.activeElement as HTMLElement | null
    const timer = setTimeout(() => {
      const btn = panelRef.current?.querySelector<HTMLElement>('[data-confirm-btn]')
      btn?.focus()
    }, 50)
    return () => {
      clearTimeout(timer)
      prevFocusRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose()
    },
    [onClose]
  )

  const selectedExtras: ExtraCatalogItem[] = [...data.selectedExtraIds]
    .map((id) => getExtraById(id))
    .filter((x): x is ExtraCatalogItem => Boolean(x))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Boeking bevestigen"
        >
          <motion.div
            ref={panelRef}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-primary-dark border border-light/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-light/10 bg-primary-dark px-6 py-4">
              <h2 className="text-xl font-bold text-light">Controleer uw boeking</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Sluiten"
                className="rounded-lg p-1.5 text-light/70 hover:bg-light/10 hover:text-light transition-colors"
              >
                <FiX size={22} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-5">
              {/* Service / Package */}
              <Section icon={<FiPackage />} title="Dienst">
                <Row label="Pakket" value={data.serviceName} />
                {data.isCustomPackage && data.customLabel && (
                  <p className="text-sm text-light/70 whitespace-pre-line mt-1">{data.customLabel}</p>
                )}
                {!data.isPrijsOpAanvraag && data.servicePrice > 0 && (
                  <Row label="Dienstprijs" value={`€${data.servicePrice.toFixed(2)}`} accent />
                )}
                {data.isPrijsOpAanvraag && (
                  <p className="text-sm text-accent-red font-medium mt-1">Prijs op aanvraag</p>
                )}
              </Section>

              {/* Extras */}
              {selectedExtras.length > 0 && (
                <Section icon={<FiPackage />} title="Extra's">
                  {selectedExtras.map((e) => (
                    <Row
                      key={e.id}
                      label={e.name}
                      value={`${e.priceNote ? `${e.priceNote} ` : '+'}€${e.priceExclBtwEuro.toFixed(2)}`}
                    />
                  ))}
                  {selectedExtras.length > 1 && (
                    <Row label="Subtotaal extra's" value={`€${data.extrasTotal.toFixed(2)}`} accent />
                  )}
                </Section>
              )}

              {/* Date & Time */}
              <Section icon={<FiCalendar />} title="Datum & Tijd">
                <Row label="Datum" value={formatDate(data.preferredDate)} />
                <Row label="Tijd" value={data.preferredTime} />
              </Section>

              {/* Vehicle */}
              <Section icon={<FiTruck />} title="Voertuig">
                <Row label="Merk / Model" value={`${data.vehicleMake} ${data.vehicleModel}`} />
                <Row label="Bouwjaar" value={data.vehicleYear} />
                {data.vehicleSize === 'large' && (
                  <p className="text-sm text-accent-red font-medium mt-1">Groot voertuig</p>
                )}
              </Section>

              {/* Customer details */}
              <Section icon={<FiUser />} title="Uw gegevens">
                <Row label="Naam" value={data.customerName} />
                <Row label="E-mail" value={data.email} />
                <Row label="Telefoon" value={data.phone} />
              </Section>

              {/* Address & travel */}
              <Section icon={<FiMapPin />} title="Adres">
                <Row label="Locatie" value={data.address} />
                {data.travelDistanceKm != null && (
                  <Row label="Afstand" value={`${data.travelDistanceKm} km`} />
                )}
                {data.travelFeeEuro != null && (
                  <Row
                    label="Kilometervergoeding"
                    value={data.travelFeeEuro === 0 ? 'Gratis' : `€${data.travelFeeEuro.toFixed(2)}`}
                  />
                )}
              </Section>

              {/* Remarks */}
              {data.specialRequests && data.specialRequests.trim() && (
                <Section icon={<FiMessageSquare />} title="Opmerkingen">
                  <p className="text-sm text-light/80 whitespace-pre-line">{data.specialRequests}</p>
                </Section>
              )}

              {/* Total */}
              {data.totalPrice > 0 && (
                <div className="rounded-xl bg-secondary-dark/60 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-light">Totaal (indicatie)</span>
                    <span className="text-2xl font-bold text-accent-red">€{data.totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-light/60 mt-2">{VAT_EXEMPT_SHORT}</p>
                  <p className="text-xs text-light/50 mt-0.5">{VAT_EXEMPT_LEGAL}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-light/10 bg-primary-dark px-6 py-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Wijzig
              </Button>
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={onConfirm}
                disabled={isSubmitting}
                data-confirm-btn=""
              >
                {isSubmitting ? 'Verzenden...' : 'Bevestig & Verstuur'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-light/10 bg-secondary-dark/30 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-accent-red">{icon}</span>
        <h3 className="text-sm font-semibold text-light uppercase tracking-wide">{title}</h3>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-light/70">{label}</span>
      <span className={`text-right font-medium ${accent ? 'text-accent-red' : 'text-light'}`}>{value}</span>
    </div>
  )
}
