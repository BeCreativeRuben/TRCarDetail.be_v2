import { EMAIL_BRAND, emailWrapper, escapeHtml } from '@/lib/email-layout'
import { formatDutchDate } from '@/lib/email-format'
import { formatServiceType } from '@/lib/service-labels'
import { GOOGLE_MAPS_REVIEW_URL } from '@/lib/socials'

export const REVIEW_MAIL_SUBJECT = 'Hoe was uw ervaring? – T&R Car Detail'

export type ReviewEmailFields = {
  customerName: string
  serviceType: string
  appointmentDate?: string
  personalMessage?: string
}

function displayService(serviceType: string): string {
  return formatServiceType(serviceType.trim() || 'behandeling')
}

function displayDate(appointmentDate?: string): string {
  const value = appointmentDate?.trim()
  return value ? formatDutchDate(value) : ''
}

function serviceSentence(serviceType: string, appointmentDate?: string): string {
  const service = escapeHtml(displayService(serviceType))
  const date = displayDate(appointmentDate)
  if (date) {
    return `Onlangs heeft u bij ons een <strong>${service}</strong> laten uitvoeren (${escapeHtml(date)}). We hopen dat u tevreden bent!`
  }
  return `Onlangs heeft u bij ons een <strong>${service}</strong> laten uitvoeren. We hopen dat u tevreden bent!`
}

function serviceSentenceText(serviceType: string, appointmentDate?: string): string {
  const service = displayService(serviceType)
  const date = displayDate(appointmentDate)
  if (date) {
    return `Onlangs heeft u bij ons een ${service} laten uitvoeren (${date}). We hopen dat u tevreden bent!`
  }
  return `Onlangs heeft u bij ons een ${service} laten uitvoeren. We hopen dat u tevreden bent!`
}

export function defaultReviewPersonalMessage(_customerName: string, serviceType: string): string {
  const service = displayService(serviceType)
  return `We hopen dat u tevreden bent met uw ${service}! Zou u even willen laten weten hoe u onze service ervaren heeft? Uw feedback helpt ons enorm — u kunt eenvoudig antwoorden op deze e-mail.`
}

export function buildReviewRequestHtml(fields: ReviewEmailFields): string {
  const BRAND = EMAIL_BRAND
  const name = escapeHtml(fields.customerName.trim() || 'klant')
  const personalMessage = fields.personalMessage?.trim()
  const customBlock = personalMessage
    ? `<p style="margin:0 0 24px; white-space:pre-wrap;">${escapeHtml(personalMessage)}</p>`
    : `<p style="margin:0 0 24px;">Zou u een korte review willen achterlaten? Dat helpt andere klanten en ons om de service verder te verbeteren. U kunt uw ervaring met ons delen door te antwoorden op deze e-mail.</p>`

  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.primaryDark};">Hoe was uw ervaring?</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Uw afspraak is geweest – we horen graag wat u ervan vond.</p>
    <p style="margin:0 0 20px;">Beste ${name},</p>
    <p style="margin:0 0 24px;">${serviceSentence(fields.serviceType, fields.appointmentDate)}</p>
    ${customBlock}
    <p style="margin:24px 0 0;">
      <a href="${GOOGLE_MAPS_REVIEW_URL}" class="em-btn" style="display:inline-block; background:${BRAND.accentRed}; color:${BRAND.primaryDark}; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:700;">Review achterlaten</a>
    </p>
    <p style="margin:24px 0 0;">Alvast bedankt,<br><strong>${BRAND.name}</strong></p>
  `

  return emailWrapper(
    'Laat een review achter na uw bezoek bij T&R Car Detail',
    'Review aanvraag - T&R Car Detail',
    content
  )
}

export function buildReviewRequestText(fields: ReviewEmailFields): string {
  const name = fields.customerName.trim() || 'klant'
  const personalMessage = fields.personalMessage?.trim()
  const customBlock = personalMessage
    ? ['', personalMessage, '']
    : ['', 'Zou u een korte review willen achterlaten? Laat uw review achter via Google Maps:', GOOGLE_MAPS_REVIEW_URL, '']

  return [
    'Hoe was uw ervaring?',
    '',
    `Beste ${name},`,
    '',
    serviceSentenceText(fields.serviceType, fields.appointmentDate),
    ...customBlock,
    'Alvast bedankt,',
    EMAIL_BRAND.name,
  ].join('\n')
}
