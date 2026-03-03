import nodemailer from 'nodemailer'

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
  specialRequests?: string
}

export type ContactPayload = {
  name: string
  email: string
  phone?: string
  message: string
}

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

function emailWrapper(previewText: string, title: string, content: string): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color:${BRAND.bg}; color:${BRAND.text}; font-size:16px; line-height:1.6;">
  <div style="display:none; max-height:0; overflow:hidden;">${previewText}</div>
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
            ${BRAND.name} · Wij zorgen voor uw wagen
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
  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.primaryDark};">Bedankt voor uw boeking</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">We hebben uw aanvraag goed ontvangen.</p>
    <p style="margin:0 0 20px;">Beste ${booking.customerName},</p>
    <p style="margin:0 0 24px;">We zullen <strong>uw afspraak nog bevestigen</strong>. U ontvangt zo snel mogelijk een bericht van ons om de datum en het tijdstip definitief te maken.</p>
    <div style="background:${BRAND.bg}; border-left:4px solid ${BRAND.accentRed}; padding:16px 20px; border-radius:0 8px 8px 0; margin:24px 0;">
      <p style="margin:0 0 8px; font-size:13px; color:${BRAND.textMuted}; text-transform:uppercase; letter-spacing:0.04em;">Uw aanvraag</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px; color:${BRAND.text};">
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Service</td><td style="padding:4px 0;"><strong>${booking.serviceType}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Datum</td><td style="padding:4px 0;">${booking.preferredDate}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Tijd</td><td style="padding:4px 0;">${booking.preferredTime}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Voertuig</td><td style="padding:4px 0;">${booking.vehicleInfo.make} ${booking.vehicleInfo.model} (${booking.vehicleInfo.year})</td></tr>
        ${booking.address ? `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Adres</td><td style="padding:4px 0;">${booking.address}</td></tr>` : ''}
        ${booking.travelFeeEuro != null && booking.travelFeeEuro > 0 ? `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Kilometervergoeding</td><td style="padding:4px 0;">€${booking.travelFeeEuro.toFixed(2)}${booking.travelDistanceKm != null ? ` (${booking.travelDistanceKm} km)` : ''}</td></tr>` : booking.address && booking.travelDistanceKm != null ? `<tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Kilometervergoeding</td><td style="padding:4px 0;">Gratis (binnen 15 km)</td></tr>` : ''}
      </table>
    </div>
    <p style="margin:24px 0 0;">Vragen? Antwoord op deze mail of bel ons op <a href="tel:+32499128500" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">+32 499 12 85 00</a>.</p>
    <p style="margin:16px 0 0; font-size:13px; color:${BRAND.textMuted}; font-style:italic;">Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren.</p>
    <p style="margin:20px 0 0;">Met vriendelijke groet,<br><strong>${BRAND.name}</strong></p>
  `
  return emailWrapper(
    `Je boeking bij T&R Car Detail: ${booking.serviceType} op ${booking.preferredDate}. We bevestigen je afspraak nog.`,
    'Boeking ontvangen - T&R Car Detail',
    content
  )
}

function bookingConfirmationText(booking: BookingPayload): string {
  return [
    'Bedankt voor uw boeking!',
    '',
    `Beste ${booking.customerName},`,
    '',
    'We hebben uw aanvraag ontvangen. We zullen uw afspraak nog bevestigen – u ontvangt zo snel mogelijk een bericht van ons om de datum en het tijdstip definitief te maken.',
    '',
    'Jouw aanvraag:',
    `- Service: ${booking.serviceType}`,
    `- Datum: ${booking.preferredDate}`,
    `- Tijd: ${booking.preferredTime}`,
    `- Voertuig: ${booking.vehicleInfo.make} ${booking.vehicleInfo.model} (${booking.vehicleInfo.year})`,
    ...(booking.address ? [`- Adres: ${booking.address}`] : []),
    ...(booking.travelFeeEuro != null && booking.travelFeeEuro > 0 ? [`- Kilometervergoeding: €${booking.travelFeeEuro.toFixed(2)}${booking.travelDistanceKm != null ? ` (${booking.travelDistanceKm} km)` : ''}`] : booking.address && booking.travelDistanceKm != null ? ['- Kilometervergoeding: Gratis (binnen 15 km)'] : []),
    '',
    'Bij diensten aan huis maken we gebruik van uw water en elektriciteit om de werken uit te voeren.',
    '',
    'Met vriendelijke groet,',
    BRAND.name,
  ].join('\n')
}

function bookingNotificationHtml(booking: BookingPayload): string {
  const addressRow = booking.address
    ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Adres</td><td style="padding:12px 16px;">${booking.address}${booking.travelDistanceKm != null ? ` · ${booking.travelDistanceKm} km` : ''}${booking.travelFeeEuro != null ? ` · Vergoeding: ${booking.travelFeeEuro > 0 ? `€${booking.travelFeeEuro.toFixed(2)}` : 'Gratis'}` : ''}</td></tr>`
    : ''
  const specialBlock = booking.specialRequests
    ? `<tr><td colspan="2" style="padding:12px 0 0; border-top:1px solid ${BRAND.border};"><strong>Opmerkingen</strong><br><span style="color:${BRAND.text};">${booking.specialRequests}</span></td></tr>`
    : ''
  const content = `
    <h1 style="margin:0 0 8px; font-size:22px; color:${BRAND.primaryDark};">Nieuwe boeking</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Via de website</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; border:1px solid ${BRAND.border}; border-radius:8px; color:${BRAND.text};">
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Naam</td><td style="padding:12px 16px;">${booking.customerName}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">E-mail</td><td style="padding:12px 16px;"><a href="mailto:${booking.email}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${booking.email}</a></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Telefoon</td><td style="padding:12px 16px;"><a href="tel:${booking.phone}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${booking.phone}</a></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Service</td><td style="padding:12px 16px;">${booking.serviceType}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Datum</td><td style="padding:12px 16px;">${booking.preferredDate}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Tijd</td><td style="padding:12px 16px;">${booking.preferredTime}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Voertuig</td><td style="padding:12px 16px;">${booking.vehicleInfo.make} ${booking.vehicleInfo.model} (${booking.vehicleInfo.year}) · ${booking.vehicleInfo.size}</td></tr>
      ${addressRow}
      ${specialBlock}
    </table>
  `
  return emailWrapper('Nieuwe boeking ontvangen', 'Nieuwe boeking - T&R Car Detail', content)
}

function contactNotificationHtml(contact: ContactPayload): string {
  const phoneRow = contact.phone
    ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Telefoon</td><td style="padding:12px 16px;"><a href="tel:${contact.phone}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${contact.phone}</a></td></tr>`
    : ''
  const content = `
    <h1 style="margin:0 0 8px; font-size:22px; color:${BRAND.primaryDark};">Nieuw contactbericht</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Via het contactformulier</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; border:1px solid ${BRAND.border}; border-radius:8px; color:${BRAND.text};">
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Naam</td><td style="padding:12px 16px;">${contact.name}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">E-mail</td><td style="padding:12px 16px;"><a href="mailto:${contact.email}" style="color:${BRAND.accentRed}; text-decoration:none; font-weight:600;">${contact.email}</a></td></tr>
      ${phoneRow}
      <tr><td colspan="2" style="padding:16px; border-top:1px solid ${BRAND.border};"><strong>Bericht</strong><br><span style="white-space:pre-wrap;">${contact.message}</span></td></tr>
    </table>
  `
  return emailWrapper('Nieuw contactbericht', 'Nieuw contact - T&R Car Detail', content)
}

function contactAutoReplyHtml(contact: ContactPayload): string {
  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.primaryDark};">Bedankt voor uw bericht</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">We hebben het goed ontvangen.</p>
    <p style="margin:0 0 20px;">Beste ${contact.name},</p>
    <p style="margin:0 0 24px;">We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
    <p style="margin:24px 0 0;">Tot dan,<br><strong>${BRAND.name}</strong></p>
  `
  return emailWrapper(
    `We hebben je bericht ontvangen en nemen zo snel mogelijk contact op.`,
    'Bericht ontvangen - T&R Car Detail',
    content
  )
}

export async function sendBookingConfirmation(booking: BookingPayload): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Booking details:', booking)
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

  // Notificatie naar jullie (info@trcardetail.be)
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: 'Nieuwe boeking - T&R Car Detail',
    html: bookingNotificationHtml(booking),
  })
  console.log('Booking notification sent to admin:', adminEmail)

  // Bevestiging naar de klant
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: booking.email,
    subject: 'Boeking Bevestiging - T&R Car Detail',
    text: bookingConfirmationText(booking),
    html: bookingConfirmationHtml(booking),
  })
  console.log('Booking confirmation email sent to:', booking.email)
}

function reviewRequestHtml(customerName: string, serviceType: string, preferredDate: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trcardetail.be'
  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.primaryDark};">Hoe was uw ervaring?</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Uw afspraak is geweest – we horen graag wat u ervan vond.</p>
    <p style="margin:0 0 20px;">Beste ${customerName},</p>
    <p style="margin:0 0 24px;">Onlangs heeft u bij ons een <strong>${serviceType}</strong> laten uitvoeren (${preferredDate}). We hopen dat u tevreden bent!</p>
    <p style="margin:0 0 24px;">Zou u een korte review willen achterlaten? Dat helpt andere klanten en ons om de service verder te verbeteren. U kunt uw ervaring met ons delen door te antwoorden op deze e-mail of via onze website.</p>
    <p style="margin:24px 0 0;">
      <a href="${siteUrl}/contact" style="display:inline-block; background:${BRAND.accentRed}; color:${BRAND.white}; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">Review achterlaten</a>
    </p>
    <p style="margin:24px 0 0;">Alvast bedankt,<br><strong>${BRAND.name}</strong></p>
  `
  return emailWrapper(
    'Laat een review achter na uw bezoek bij T&R Car Detail',
    'Review aanvraag - T&R Car Detail',
    content
  )
}

function reviewRequestText(customerName: string, serviceType: string, preferredDate: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trcardetail.be'
  return [
    'Hoe was uw ervaring?',
    '',
    `Beste ${customerName},`,
    '',
    `Onlangs heeft u bij ons een ${serviceType} laten uitvoeren (${preferredDate}). We hopen dat u tevreden bent!`,
    '',
    'Zou u een korte review willen achterlaten? Antwoord op deze e-mail of ga naar onze website:',
    siteUrl + '/contact',
    '',
    'Alvast bedankt,',
    BRAND.name,
  ].join('\n')
}

export async function sendReviewRequest(booking: { customerName: string; email: string; serviceType: string; preferredDate: string }): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Review request skipped for:', booking.email)
    return
  }
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: booking.email,
    subject: 'Hoe was uw ervaring? – T&R Car Detail',
    text: reviewRequestText(booking.customerName, booking.serviceType, booking.preferredDate),
    html: reviewRequestHtml(booking.customerName, booking.serviceType, booking.preferredDate),
  })
  console.log('Review request email sent to:', booking.email)
}

export async function sendContactNotification(contact: ContactPayload): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Contact submission:', contact)
    return
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: 'Nieuw Contactformulier - T&R Car Detail',
    html: contactNotificationHtml(contact),
  })
  console.log('Contact notification email sent to admin')

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: contact.email,
    subject: 'Bericht Ontvangen - T&R Car Detail',
    html: contactAutoReplyHtml(contact),
  })
  console.log('Auto-reply email sent to:', contact.email)
}
