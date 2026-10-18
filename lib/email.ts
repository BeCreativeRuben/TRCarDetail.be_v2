import nodemailer from 'nodemailer'
import { ENTERPRISE_NUMBER_LABEL, VAT_EXEMPT_LEGAL, VAT_EXEMPT_SHORT } from '@/lib/business'
import { formatDutchDate, formatVehicleSize } from '@/lib/email-format'
import { buildReviewRequestHtml, buildReviewRequestText, REVIEW_MAIL_SUBJECT } from '@/lib/review-email'
import { BUSINESS } from '@/lib/seo'
import { formatServiceType } from '@/lib/service-labels'

/**
 * Email transport: Google Workspace SMTP (smtp.gmail.com, port 587, TLS).
 * Credentials: process.env.SMTP_USER, process.env.SMTP_PASS (App password).
 * No external service (Resend, SendGrid, etc.) – Nodemailer + Gmail only.
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export type BookingPayload = {
  customerName: string
  email: string
  phone: string
  serviceType: string
  vehicleInfo: { make: string; model: string; year: string; size: string }
  preferredDate: string
  preferredTime: string
  /** Adres voor aan huis (gebruikt voor kilometervergoeding) */
  address?: string
  travelDistanceKm?: number
  travelFeeEuro?: number
  /** Grote-wagen-toeslag in EUR (alleen bij groot voertuig) */
  largeCarSurchargeEuro?: number
  /** Totaal richtprijs (indicatie) voor e-mails */
  totalExclBtw?: number
  selectedExtras?: { id: string; name: string; priceExclBtwEuro: number; priceNote?: string }[]
  specialRequests?: string
}

export type ContactPayload = {
  name: string
  email: string
  phone?: string
  message: string
}

export type B2bQuotePayload = {
  companyName: string
  contactName: string
  email: string
  phone: string
  vatNumber: string
  location: string
  fleetSize: string
  vehicleType?: string
  frequency?: string
  message?: string
}

export type MailRouting = {
  smtpUser: string
  adminEmail: string
}

export type OutgoingMail = {
  from: string
  to: string
  replyTo: string
  subject: string
  text: string
  html: string
}

export type RenderedEmail = OutgoingMail & {
  id: string
  filename: string
}

/** Klantmails antwoorden naar het publieke adres. */
export const CUSTOMER_REPLY_TO = BUSINESS.email

export const BOOKING_CUSTOMER_SUBJECT = 'Boekingsaanvraag ontvangen – T&R Car Detail'

const WHATSAPP_URL = `https://wa.me/${BUSINESS.phone.replace(/\D/g, '')}`
const PHONE_TEL = `tel:${BUSINESS.phone}`

// —— T&R Car Detail branding (BRAND-BOOK.md): primary-dark, secondary-dark, light, accent-red ——
const BRAND = {
  name: 'T&R Car Detail',
  tagline: 'Professionele autoreiniging aan huis',
  primaryDark: '#0A0908',
  secondaryDark: '#22333B',
  light: '#F2F4F3',
  accentRed: '#FF2E00',
  accentDarkRed: '#B80C09',
  white: '#ffffff',
  border: '#22333B',
  bg: '#F2F4F3',
  text: '#0A0908',
  textMuted: '#22333B',
}

/** Zelfde escaping als de B2B-mails: alle gebruikersinvoer in HTML. */
function escapeEmailHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function esc(value: string | number | undefined | null): string {
  return escapeEmailHtml(value == null ? '' : String(value))
}

function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function replyAddress(value: string): string {
  return value.replace(/[\r\n]/g, '').trim()
}

export function mailFromAddress(smtpUser: string): string {
  return `"T&R Car Detail" <${smtpUser}>`
}

function serviceLabel(serviceType: string): string {
  return formatServiceType(serviceType)
}

function extraLabel(extra: { id: string; name: string }): string {
  return formatServiceType(extra.name?.trim() || extra.id)
}

function vehicleLine(booking: BookingPayload): string {
  const vehicle = booking.vehicleInfo
  return `${vehicle.make} ${vehicle.model} (${vehicle.year}) · ${formatVehicleSize(vehicle.size)}`
}

function extrasRowsHtml(booking: BookingPayload): string {
  const extras = booking.selectedExtras
  if (!extras?.length) return ''
  const rows = extras.map((extra) => {
    const pricePart = extra.priceNote
      ? `${esc(extra.priceNote)} €${extra.priceExclBtwEuro.toFixed(2)}`
      : `€${extra.priceExclBtwEuro.toFixed(2)}`
    return `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Extra</td><td style="padding:4px 0;"><strong>${esc(extraLabel(extra))}</strong> – ${pricePart}</td></tr>`
  })
  const sub = extras.reduce((sum, extra) => sum + extra.priceExclBtwEuro, 0)
  return (
    rows.join('') +
    `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Extra's (subtotaal)</td><td style="padding:4px 0;">€${sub.toFixed(2)}</td></tr>`
  )
}

function extrasLinesText(booking: BookingPayload): string[] {
  const extras = booking.selectedExtras
  if (!extras?.length) return []
  const lines = extras.map((extra) => {
    const pricePart = extra.priceNote
      ? `${extra.priceNote} €${extra.priceExclBtwEuro.toFixed(2)}`
      : `€${extra.priceExclBtwEuro.toFixed(2)}`
    return `- Extra: ${extraLabel(extra)} – ${pricePart}`
  })
  const sub = extras.reduce((sum, extra) => sum + extra.priceExclBtwEuro, 0)
  return ['', "Extra's:", ...lines, `- Extra's (subtotaal): €${sub.toFixed(2)}`]
}

function pricingTotalHtml(total: number): string {
  return `<div style="background:${BRAND.bg}; border-left:4px solid ${BRAND.accentRed}; padding:16px 20px; border-radius:0 8px 8px 0; margin:24px 0;"><p style="margin:0 0 8px; font-size:13px; color:${BRAND.textMuted}; text-transform:uppercase; letter-spacing:0.04em;">Richtprijs (indicatie)</p><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px; color:${BRAND.text};"><tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted}; font-weight:700;">Totaal</td><td style="padding:4px 0; font-weight:700; color:${BRAND.accentRed};">€${total.toFixed(2)}</td></tr></table><p style="margin:12px 0 0; font-size:12px; color:${BRAND.textMuted};">${VAT_EXEMPT_SHORT}<br/>${VAT_EXEMPT_LEGAL}</p></div>`
}

function pricingTotalText(total: number): string[] {
  return ['', 'Richtprijs (indicatie):', `- Totaal: €${total.toFixed(2)}`, VAT_EXEMPT_SHORT, VAT_EXEMPT_LEGAL]
}

function emailLegalFooterHtml(): string {
  return `${BRAND.name} · Wij zorgen voor uw wagen<br/><span style="display:block; margin-top:8px;">${ENTERPRISE_NUMBER_LABEL}<br/>${VAT_EXEMPT_LEGAL}</span>`
}

function reachUsHtml(): string {
  return `Vragen? Contacteer ons via WhatsApp op <a href="${WHATSAPP_URL}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${BUSINESS.phoneDisplay}</a> of bel ons op <a href="${PHONE_TEL}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${BUSINESS.phoneDisplay}</a>.`
}

function reachUsText(): string {
  return `Vragen? Contacteer ons via WhatsApp: ${WHATSAPP_URL} of bel ons op ${BUSINESS.phoneDisplay}.`
}

function emailWrapper(previewText: string, title: string, content: string): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <title>${esc(title)}</title>
</head>
<body style="margin:0; padding:0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color:${BRAND.bg}; color:${BRAND.text}; font-size:16px; line-height:1.6;">
  <div style="display:none; max-height:0; overflow:hidden;">${esc(previewText)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.secondaryDark}; padding:24px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:${BRAND.white}; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.15); border:1px solid ${BRAND.border};">
        <tr>
          <td style="background:${BRAND.primaryDark}; color:${BRAND.light}; padding:28px 32px; text-align:center;">
            <span style="font-size:26px; font-weight:700; letter-spacing:0.04em;">T&amp;R Car Detail</span>
            <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">${BRAND.tagline}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px; background:${BRAND.white}; color:${BRAND.text};">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px; background:${BRAND.bg}; border-top:1px solid ${BRAND.border}; font-size:13px; color:${BRAND.textMuted}; text-align:center;">
            ${emailLegalFooterHtml()}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}

function bookingConfirmationHtml(booking: BookingPayload): string {
  const label = serviceLabel(booking.serviceType)
  const date = formatDutchDate(booking.preferredDate)
  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.primaryDark};">Boekingsaanvraag ontvangen</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">We hebben uw aanvraag goed ontvangen. Uw afspraak is nog niet bevestigd.</p>
    <p style="margin:0 0 20px;">Beste ${esc(booking.customerName)},</p>
    <p style="margin:0 0 24px;">We zullen <strong>uw afspraak nog bevestigen</strong>. U ontvangt zo snel mogelijk een bericht van ons om de datum en het tijdstip definitief te maken.</p>
    <div style="background:${BRAND.bg}; border-left:4px solid ${BRAND.accentRed}; padding:16px 20px; border-radius:0 8px 8px 0; margin:24px 0;">
      <p style="margin:0 0 8px; font-size:13px; color:${BRAND.textMuted}; text-transform:uppercase; letter-spacing:0.04em;">Uw aanvraag</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px; color:${BRAND.text};">
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Service</td><td style="padding:4px 0;"><strong>${esc(label)}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Datum</td><td style="padding:4px 0;">${esc(date)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Tijd</td><td style="padding:4px 0;">${esc(booking.preferredTime)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Voertuig</td><td style="padding:4px 0;">${esc(vehicleLine(booking))}</td></tr>
        ${booking.largeCarSurchargeEuro ? `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Grote wagen toeslag</td><td style="padding:4px 0;">€${booking.largeCarSurchargeEuro.toFixed(2)}</td></tr>` : ''}
        ${booking.address ? `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Adres</td><td style="padding:4px 0;">${esc(booking.address)}</td></tr>` : ''}
        ${booking.travelFeeEuro != null && booking.travelFeeEuro > 0 ? `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Kilometervergoeding</td><td style="padding:4px 0;">€${booking.travelFeeEuro.toFixed(2)}${booking.travelDistanceKm != null ? ` (${booking.travelDistanceKm} km)` : ''}</td></tr>` : booking.address && booking.travelDistanceKm != null ? `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Kilometervergoeding</td><td style="padding:4px 0;">Gratis (binnen 15 km)</td></tr>` : ''}
        ${extrasRowsHtml(booking)}
      </table>
    </div>
    ${booking.totalExclBtw != null && booking.totalExclBtw > 0 ? pricingTotalHtml(booking.totalExclBtw) : ''}
    <p style="margin:24px 0 0;">${reachUsHtml()}</p>
    <p style="margin:16px 0 0; font-size:13px; color:${BRAND.textMuted}; font-style:italic;">Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren.</p>
    <p style="margin:20px 0 0;">Met vriendelijke groet,<br><strong>${BRAND.name}</strong></p>
  `
  return emailWrapper(
    `Uw boekingsaanvraag bij T&R Car Detail: ${label} op ${date}. We bevestigen uw afspraak nog.`,
    'Boekingsaanvraag ontvangen - T&R Car Detail',
    content
  )
}

function bookingConfirmationText(booking: BookingPayload): string {
  return [
    'Boekingsaanvraag ontvangen',
    '',
    `Beste ${booking.customerName},`,
    '',
    'We hebben uw aanvraag ontvangen. Uw afspraak is nog niet bevestigd. We zullen uw afspraak nog bevestigen – u ontvangt zo snel mogelijk een bericht van ons om de datum en het tijdstip definitief te maken.',
    '',
    'Uw aanvraag:',
    `- Service: ${serviceLabel(booking.serviceType)}`,
    `- Datum: ${formatDutchDate(booking.preferredDate)}`,
    `- Tijd: ${booking.preferredTime}`,
    `- Voertuig: ${vehicleLine(booking)}`,
    ...(booking.largeCarSurchargeEuro ? [`- Grote wagen toeslag: €${booking.largeCarSurchargeEuro.toFixed(2)}`] : []),
    ...(booking.address ? [`- Adres: ${booking.address}`] : []),
    ...(booking.travelFeeEuro != null && booking.travelFeeEuro > 0
      ? [`- Kilometervergoeding: €${booking.travelFeeEuro.toFixed(2)}${booking.travelDistanceKm != null ? ` (${booking.travelDistanceKm} km)` : ''}`]
      : booking.address && booking.travelDistanceKm != null
        ? ['- Kilometervergoeding: Gratis (binnen 15 km)']
        : []),
    ...extrasLinesText(booking),
    ...(booking.totalExclBtw != null && booking.totalExclBtw > 0 ? pricingTotalText(booking.totalExclBtw) : []),
    '',
    reachUsText(),
    '',
    'Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren.',
    '',
    'Met vriendelijke groet,',
    BRAND.name,
  ].join('\n')
}

function bookingNotificationHtml(booking: BookingPayload): string {
  const label = serviceLabel(booking.serviceType)
  const date = formatDutchDate(booking.preferredDate)
  const addressRow = booking.address
    ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Adres</td><td style="padding:12px 16px;">${esc(booking.address)}${booking.travelDistanceKm != null ? ` · ${booking.travelDistanceKm} km` : ''}${booking.travelFeeEuro != null ? ` · Vergoeding: ${booking.travelFeeEuro > 0 ? `€${booking.travelFeeEuro.toFixed(2)}` : 'Gratis'}` : ''}</td></tr>`
    : ''
  const specialBlock = booking.specialRequests
    ? `<tr><td colspan="2" style="padding:12px 0 0; border-top:1px solid ${BRAND.border};"><strong>Opmerkingen</strong><br><span style="color:${BRAND.text}; white-space:pre-wrap;">${esc(booking.specialRequests)}</span></td></tr>`
    : ''
  const pricingBlock =
    booking.totalExclBtw != null && booking.totalExclBtw > 0 ? pricingTotalHtml(booking.totalExclBtw) : ''
  const extrasBlock = booking.selectedExtras?.length
    ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; vertical-align:top;">Extra's</td><td style="padding:12px 16px;">${booking.selectedExtras
        .map((extra) => {
          const price = extra.priceNote
            ? `${esc(extra.priceNote)} €${extra.priceExclBtwEuro.toFixed(2)}`
            : `€${extra.priceExclBtwEuro.toFixed(2)}`
          return `• <strong>${esc(extraLabel(extra))}</strong> – ${price}`
        })
        .join('<br/>')}<br/><span style="color:${BRAND.textMuted}; font-size:14px;">Subtotaal extra's: €${booking.selectedExtras.reduce((sum, extra) => sum + extra.priceExclBtwEuro, 0).toFixed(2)}</span></td></tr>`
    : ''
  const content = `
    <h1 style="margin:0 0 8px; font-size:22px; color:${BRAND.primaryDark};">Nieuwe boeking</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Via de website</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; border:1px solid ${BRAND.border}; border-radius:8px; color:${BRAND.text};">
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Naam</td><td style="padding:12px 16px;">${esc(booking.customerName)}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">E-mail</td><td style="padding:12px 16px;"><a href="mailto:${esc(booking.email)}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${esc(booking.email)}</a></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Telefoon</td><td style="padding:12px 16px;"><a href="tel:${esc(booking.phone)}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${esc(booking.phone)}</a></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Service</td><td style="padding:12px 16px;">${esc(label)}</td></tr>
      ${extrasBlock}
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Datum</td><td style="padding:12px 16px;">${esc(date)}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Tijd</td><td style="padding:12px 16px;">${esc(booking.preferredTime)}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Voertuig</td><td style="padding:12px 16px;">${esc(vehicleLine(booking))}</td></tr>
      ${booking.largeCarSurchargeEuro ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Grote wagen toeslag</td><td style="padding:12px 16px;">€${booking.largeCarSurchargeEuro.toFixed(2)}</td></tr>` : ''}
      ${addressRow}
      ${specialBlock}
    </table>
    ${pricingBlock}
  `
  return emailWrapper(
    `Nieuwe boeking: ${label} op ${date}.`,
    'Nieuwe boeking - T&R Car Detail',
    content
  )
}

function bookingNotificationText(booking: BookingPayload): string {
  const extras = booking.selectedExtras ?? []
  const lines = [
    'Nieuwe boeking',
    'Via de website',
    '',
    `Naam: ${booking.customerName}`,
    `E-mail: ${booking.email}`,
    `Telefoon: ${booking.phone}`,
    `Service: ${serviceLabel(booking.serviceType)}`,
  ]
  if (extras.length) {
    lines.push("Extra's:")
    for (const extra of extras) {
      const pricePart = extra.priceNote
        ? `${extra.priceNote} €${extra.priceExclBtwEuro.toFixed(2)}`
        : `€${extra.priceExclBtwEuro.toFixed(2)}`
      lines.push(`- ${extraLabel(extra)} – ${pricePart}`)
    }
    const sub = extras.reduce((sum, extra) => sum + extra.priceExclBtwEuro, 0)
    lines.push(`Subtotaal extra's: €${sub.toFixed(2)}`)
  }
  lines.push(
    `Datum: ${formatDutchDate(booking.preferredDate)}`,
    `Tijd: ${booking.preferredTime}`,
    `Voertuig: ${vehicleLine(booking)}`,
  )
  if (booking.largeCarSurchargeEuro) lines.push(`Grote wagen toeslag: €${booking.largeCarSurchargeEuro.toFixed(2)}`)
  if (booking.address) {
    const km = booking.travelDistanceKm != null ? ` · ${booking.travelDistanceKm} km` : ''
    const fee =
      booking.travelFeeEuro != null
        ? ` · Vergoeding: ${booking.travelFeeEuro > 0 ? `€${booking.travelFeeEuro.toFixed(2)}` : 'Gratis'}`
        : ''
    lines.push(`Adres: ${booking.address}${km}${fee}`)
  }
  if (booking.specialRequests) {
    lines.push('', 'Opmerkingen:', booking.specialRequests)
  }
  if (booking.totalExclBtw != null && booking.totalExclBtw > 0) lines.push(...pricingTotalText(booking.totalExclBtw))
  return lines.join('\n')
}

function bookingAdminSubject(booking: BookingPayload): string {
  return `Nieuwe boeking: ${singleLine(serviceLabel(booking.serviceType))} – T&R Car Detail`
}

function contactNotificationHtml(contact: ContactPayload): string {
  const phoneRow = contact.phone
    ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Telefoon</td><td style="padding:12px 16px;"><a href="tel:${esc(contact.phone)}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${esc(contact.phone)}</a></td></tr>`
    : ''
  const content = `
    <h1 style="margin:0 0 8px; font-size:22px; color:${BRAND.primaryDark};">Nieuw contactbericht</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Via het contactformulier</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; border:1px solid ${BRAND.border}; border-radius:8px; color:${BRAND.text};">
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Naam</td><td style="padding:12px 16px;">${esc(contact.name)}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">E-mail</td><td style="padding:12px 16px;"><a href="mailto:${esc(contact.email)}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${esc(contact.email)}</a></td></tr>
      ${phoneRow}
      <tr><td colspan="2" style="padding:16px; border-top:1px solid ${BRAND.border};"><strong>Bericht</strong><br><span style="white-space:pre-wrap;">${esc(contact.message)}</span></td></tr>
    </table>
  `
  return emailWrapper('Nieuw contactbericht', 'Nieuw contact - T&R Car Detail', content)
}

function contactNotificationText(contact: ContactPayload): string {
  return [
    'Nieuw contactbericht',
    'Via het contactformulier',
    '',
    `Naam: ${contact.name}`,
    `E-mail: ${contact.email}`,
    ...(contact.phone ? [`Telefoon: ${contact.phone}`] : []),
    '',
    'Bericht:',
    contact.message,
  ].join('\n')
}

function contactAutoReplyHtml(contact: ContactPayload): string {
  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.primaryDark};">Bedankt voor uw bericht</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">We hebben het goed ontvangen.</p>
    <p style="margin:0 0 20px;">Beste ${esc(contact.name)},</p>
    <p style="margin:0 0 24px;">We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
    <p style="margin:24px 0 0;">${reachUsHtml()}</p>
    <p style="margin:24px 0 0;">Tot dan,<br><strong>${BRAND.name}</strong></p>
  `
  return emailWrapper(
    'We hebben uw bericht ontvangen en nemen zo snel mogelijk contact met u op.',
    'Bericht ontvangen - T&R Car Detail',
    content
  )
}

function contactAutoReplyText(contact: ContactPayload): string {
  return [
    'Bedankt voor uw bericht',
    '',
    `Beste ${contact.name},`,
    '',
    'We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.',
    '',
    reachUsText(),
    '',
    'Tot dan,',
    BRAND.name,
  ].join('\n')
}

function b2bQuoteNotificationHtml(quote: B2bQuotePayload): string {
  const optionalRows = [
    quote.vehicleType
      ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Type voertuigen</td><td style="padding:12px 16px;">${esc(quote.vehicleType)}</td></tr>`
      : '',
    quote.frequency
      ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Frequentie</td><td style="padding:12px 16px;">${esc(quote.frequency)}</td></tr>`
      : '',
    quote.message
      ? `<tr><td colspan="2" style="padding:16px; border-top:1px solid ${BRAND.border};"><strong>Bericht</strong><br><span style="white-space:pre-wrap;">${esc(quote.message)}</span></td></tr>`
      : '',
  ].join('')

  const content = `
    <h1 style="margin:0 0 8px; font-size:22px; color:${BRAND.primaryDark};">Nieuwe B2B-offerteaanvraag</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Via /zakelijk/offerte</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; border:1px solid ${BRAND.border}; border-radius:8px; color:${BRAND.text};">
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:160px;">Bedrijf</td><td style="padding:12px 16px;"><strong>${esc(quote.companyName)}</strong></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">BTW-nummer</td><td style="padding:12px 16px;">${esc(quote.vatNumber)}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Contactpersoon</td><td style="padding:12px 16px;">${esc(quote.contactName)}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">E-mail</td><td style="padding:12px 16px;"><a href="mailto:${esc(quote.email)}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${esc(quote.email)}</a></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Telefoon</td><td style="padding:12px 16px;"><a href="tel:${esc(quote.phone)}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${esc(quote.phone)}</a></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Locatie</td><td style="padding:12px 16px;">${esc(quote.location)}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Vlootomvang</td><td style="padding:12px 16px;">${esc(quote.fleetSize)}</td></tr>
      ${optionalRows}
    </table>
  `
  return emailWrapper('Nieuwe B2B-offerteaanvraag', 'B2B offerte - T&R Car Detail', content)
}

function b2bQuoteNotificationText(quote: B2bQuotePayload): string {
  return [
    'Nieuwe B2B-offerteaanvraag',
    'Via /zakelijk/offerte',
    '',
    `Bedrijf: ${quote.companyName}`,
    `BTW-nummer: ${quote.vatNumber}`,
    `Contactpersoon: ${quote.contactName}`,
    `E-mail: ${quote.email}`,
    `Telefoon: ${quote.phone}`,
    `Locatie: ${quote.location}`,
    `Vlootomvang: ${quote.fleetSize}`,
    ...(quote.vehicleType ? [`Type voertuigen: ${quote.vehicleType}`] : []),
    ...(quote.frequency ? [`Frequentie: ${quote.frequency}`] : []),
    ...(quote.message ? ['', 'Bericht:', quote.message] : []),
  ].join('\n')
}

function b2bQuoteAutoReplyHtml(quote: B2bQuotePayload): string {
  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.primaryDark};">Offerteaanvraag ontvangen</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Bedankt voor uw interesse in vlootdetailing.</p>
    <p style="margin:0 0 20px;">Beste ${esc(quote.contactName)},</p>
    <p style="margin:0 0 24px;">We hebben de aanvraag voor <strong>${esc(quote.companyName)}</strong> goed ontvangen. We nemen binnen 1–2 werkdagen contact met u op om uw vloot, locatie en planning te bespreken.</p>
    <p style="margin:24px 0 0;">${reachUsHtml()}</p>
    <p style="margin:24px 0 0;">Met vriendelijke groet,<br><strong>${BRAND.name}</strong><br>Zakelijk · Vlootdetailing</p>
  `
  return emailWrapper(
    'We hebben uw B2B-offerteaanvraag ontvangen.',
    'Offerteaanvraag ontvangen - T&R Car Detail',
    content
  )
}

function b2bQuoteAutoReplyText(quote: B2bQuotePayload): string {
  return [
    'Offerteaanvraag ontvangen',
    '',
    `Beste ${quote.contactName},`,
    '',
    `We hebben de aanvraag voor ${quote.companyName} goed ontvangen. We nemen binnen 1–2 werkdagen contact met u op om uw vloot, locatie en planning te bespreken.`,
    '',
    reachUsText(),
    '',
    'Met vriendelijke groet,',
    BRAND.name,
    'Zakelijk · Vlootdetailing',
  ].join('\n')
}

function bookingMessages(booking: BookingPayload, routing: MailRouting): { admin: OutgoingMail; customer: OutgoingMail } {
  const from = mailFromAddress(routing.smtpUser)
  return {
    admin: {
      from,
      to: routing.adminEmail,
      replyTo: replyAddress(booking.email),
      subject: bookingAdminSubject(booking),
      text: bookingNotificationText(booking),
      html: bookingNotificationHtml(booking),
    },
    customer: {
      from,
      to: booking.email,
      replyTo: CUSTOMER_REPLY_TO,
      subject: BOOKING_CUSTOMER_SUBJECT,
      text: bookingConfirmationText(booking),
      html: bookingConfirmationHtml(booking),
    },
  }
}

function contactMessages(contact: ContactPayload, routing: MailRouting): { admin: OutgoingMail; customer: OutgoingMail } {
  const from = mailFromAddress(routing.smtpUser)
  return {
    admin: {
      from,
      to: routing.adminEmail,
      replyTo: replyAddress(contact.email),
      subject: 'Nieuw Contactformulier - T&R Car Detail',
      text: contactNotificationText(contact),
      html: contactNotificationHtml(contact),
    },
    customer: {
      from,
      to: contact.email,
      replyTo: CUSTOMER_REPLY_TO,
      subject: 'Bericht Ontvangen - T&R Car Detail',
      text: contactAutoReplyText(contact),
      html: contactAutoReplyHtml(contact),
    },
  }
}

function b2bMessages(quote: B2bQuotePayload, routing: MailRouting): { admin: OutgoingMail; customer: OutgoingMail } {
  const from = mailFromAddress(routing.smtpUser)
  return {
    admin: {
      from,
      to: routing.adminEmail,
      replyTo: replyAddress(quote.email),
      subject: `B2B offerte: ${singleLine(quote.companyName)} (${singleLine(quote.fleetSize)})`,
      text: b2bQuoteNotificationText(quote),
      html: b2bQuoteNotificationHtml(quote),
    },
    customer: {
      from,
      to: quote.email,
      replyTo: CUSTOMER_REPLY_TO,
      subject: 'Offerteaanvraag ontvangen – T&R Car Detail Zakelijk',
      text: b2bQuoteAutoReplyText(quote),
      html: b2bQuoteAutoReplyHtml(quote),
    },
  }
}

export function renderTransactionalEmails(
  input: { booking: BookingPayload; contact: ContactPayload; quote: B2bQuotePayload },
  routing: MailRouting,
): RenderedEmail[] {
  const booking = bookingMessages(input.booking, routing)
  const contact = contactMessages(input.contact, routing)
  const quote = b2bMessages(input.quote, routing)
  return [
    { id: 'booking-admin', filename: '01-booking-admin.html', ...booking.admin },
    { id: 'booking-customer', filename: '02-booking-customer.html', ...booking.customer },
    { id: 'contact-admin', filename: '03-contact-admin.html', ...contact.admin },
    { id: 'contact-customer', filename: '04-contact-customer.html', ...contact.customer },
    { id: 'b2b-admin', filename: '05-b2b-admin.html', ...quote.admin },
    { id: 'b2b-customer', filename: '06-b2b-customer.html', ...quote.customer },
  ]
}

export async function sendBookingConfirmation(booking: BookingPayload): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Booking details:', booking)
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
  const mails = bookingMessages(booking, { smtpUser: process.env.SMTP_USER, adminEmail })

  await transporter.sendMail(mails.admin)
  console.log('Booking notification sent to admin:', adminEmail)

  await transporter.sendMail(mails.customer)
  console.log('Booking confirmation email sent to:', booking.email)
}

export async function sendReviewRequest(booking: {
  customerName: string
  email: string
  serviceType: string
  preferredDate: string
  personalMessage?: string
}): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Review request skipped for:', booking.email)
    return
  }
  await transporter.sendMail({
    from: mailFromAddress(process.env.SMTP_USER),
    to: booking.email,
    replyTo: CUSTOMER_REPLY_TO,
    subject: REVIEW_MAIL_SUBJECT,
    text: buildReviewRequestText({
      customerName: booking.customerName,
      serviceType: booking.serviceType,
      appointmentDate: booking.preferredDate,
      personalMessage: booking.personalMessage,
    }),
    html: buildReviewRequestHtml({
      customerName: booking.customerName,
      serviceType: booking.serviceType,
      appointmentDate: booking.preferredDate,
      personalMessage: booking.personalMessage,
    }),
  })
  console.log('Review request email sent to:', booking.email)
}

export async function sendContactNotification(contact: ContactPayload): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Contact submission:', contact)
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
  const mails = contactMessages(contact, { smtpUser: process.env.SMTP_USER, adminEmail })

  await transporter.sendMail(mails.admin)
  console.log('Contact notification email sent to admin')

  await transporter.sendMail(mails.customer)
  console.log('Auto-reply email sent to:', contact.email)
}

export async function sendB2bQuoteNotification(quote: B2bQuotePayload): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. B2B quote:', quote)
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER
  const mails = b2bMessages(quote, { smtpUser: process.env.SMTP_USER, adminEmail })

  await transporter.sendMail(mails.admin)
  console.log('B2B quote notification sent to admin')

  await transporter.sendMail(mails.customer)
  console.log('B2B quote auto-reply sent to:', quote.email)
}
