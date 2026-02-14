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
  specialRequests?: string
}

export type ContactPayload = {
  name: string
  email: string
  phone?: string
  message: string
}

// —— Brand & layout (moderne mailing: max 600px, duidelijke hiërarchie, inline CSS) ——
const BRAND = {
  name: 'T&R Car Detail',
  headerBg: '#0f172a',
  accent: '#0ea5e9',
  accentMuted: '#e0f2fe',
  text: '#334155',
  textMuted: '#64748b',
  border: '#e2e8f0',
  bg: '#f8fafc',
  white: '#ffffff',
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
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color:${BRAND.bg}; color:${BRAND.text}; font-size:16px; line-height:1.6;">
  <div style="display:none; max-height:0; overflow:hidden;">${previewText}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg}; padding:24px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:${BRAND.white}; border-radius:12px; overflow:hidden; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
        <tr>
          <td style="background:${BRAND.headerBg}; color:${BRAND.white}; padding:24px 32px; text-align:center;">
            <span style="font-size:22px; font-weight:700; letter-spacing:0.02em;">T&amp;R Car Detail</span>
            <p style="margin:6px 0 0; font-size:13px; opacity:0.9;">Professionele auto-verzorging</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
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
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.headerBg};">Bedankt voor je boeking</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">We hebben je aanvraag goed ontvangen.</p>
    <p style="margin:0 0 20px;">Beste ${booking.customerName},</p>
    <p style="margin:0 0 24px;">We zullen <strong>je afspraak nog bevestigen</strong>. Je ontvangt zo snel mogelijk een bericht van ons om de datum en het tijdstip definitief te maken.</p>
    <div style="background:${BRAND.accentMuted}; border-left:4px solid ${BRAND.accent}; padding:16px 20px; border-radius:0 8px 8px 0; margin:24px 0;">
      <p style="margin:0 0 8px; font-size:13px; color:${BRAND.textMuted}; text-transform:uppercase; letter-spacing:0.04em;">Jouw aanvraag</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;">
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Service</td><td style="padding:4px 0;"><strong>${booking.serviceType}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Datum</td><td style="padding:4px 0;">${booking.preferredDate}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Tijd</td><td style="padding:4px 0;">${booking.preferredTime}</td></tr>
        <tr><td style="padding:4px 12px 4px 0; color:${BRAND.textMuted};">Voertuig</td><td style="padding:4px 0;">${booking.vehicleInfo.make} ${booking.vehicleInfo.model} (${booking.vehicleInfo.year})</td></tr>
      </table>
    </div>
    <p style="margin:24px 0 0;">Vragen? Antwoord gewoon op deze mail of bel ons.</p>
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
    'Bedankt voor je boeking!',
    '',
    `Beste ${booking.customerName},`,
    '',
    'We hebben je aanvraag ontvangen. We zullen je afspraak nog bevestigen – je ontvangt zo snel mogelijk een bericht van ons om de datum en het tijdstip definitief te maken.',
    '',
    'Jouw aanvraag:',
    `- Service: ${booking.serviceType}`,
    `- Datum: ${booking.preferredDate}`,
    `- Tijd: ${booking.preferredTime}`,
    `- Voertuig: ${booking.vehicleInfo.make} ${booking.vehicleInfo.model} (${booking.vehicleInfo.year})`,
    '',
    'Met vriendelijke groet,',
    BRAND.name,
  ].join('\n')
}

function bookingNotificationHtml(booking: BookingPayload): string {
  const specialBlock = booking.specialRequests
    ? `<tr><td colspan="2" style="padding:12px 0 0; border-top:1px solid ${BRAND.border};"><strong>Opmerkingen</strong><br><span style="color:${BRAND.text};">${booking.specialRequests}</span></td></tr>`
    : ''
  const content = `
    <h1 style="margin:0 0 8px; font-size:22px; color:${BRAND.headerBg};">Nieuwe boeking</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Via de website</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; border:1px solid ${BRAND.border}; border-radius:8px;">
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Naam</td><td style="padding:12px 16px;">${booking.customerName}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">E-mail</td><td style="padding:12px 16px;"><a href="mailto:${booking.email}" style="color:${BRAND.accent}; text-decoration:none;">${booking.email}</a></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Telefoon</td><td style="padding:12px 16px;"><a href="tel:${booking.phone}" style="color:${BRAND.accent}; text-decoration:none;">${booking.phone}</a></td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Service</td><td style="padding:12px 16px;">${booking.serviceType}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Datum</td><td style="padding:12px 16px;">${booking.preferredDate}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Tijd</td><td style="padding:12px 16px;">${booking.preferredTime}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">Voertuig</td><td style="padding:12px 16px;">${booking.vehicleInfo.make} ${booking.vehicleInfo.model} (${booking.vehicleInfo.year}) · ${booking.vehicleInfo.size}</td></tr>
      ${specialBlock}
    </table>
  `
  return emailWrapper('Nieuwe boeking ontvangen', 'Nieuwe boeking - T&R Car Detail', content)
}

function contactNotificationHtml(contact: ContactPayload): string {
  const phoneRow = contact.phone
    ? `<tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Telefoon</td><td style="padding:12px 16px;"><a href="tel:${contact.phone}" style="color:${BRAND.accent}; text-decoration:none;">${contact.phone}</a></td></tr>`
    : ''
  const content = `
    <h1 style="margin:0 0 8px; font-size:22px; color:${BRAND.headerBg};">Nieuw contactbericht</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">Via het contactformulier</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px; border:1px solid ${BRAND.border}; border-radius:8px;">
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted}; width:140px;">Naam</td><td style="padding:12px 16px;">${contact.name}</td></tr>
      <tr><td style="padding:12px 16px; background:${BRAND.bg}; color:${BRAND.textMuted};">E-mail</td><td style="padding:12px 16px;"><a href="mailto:${contact.email}" style="color:${BRAND.accent}; text-decoration:none;">${contact.email}</a></td></tr>
      ${phoneRow}
      <tr><td colspan="2" style="padding:16px; border-top:1px solid ${BRAND.border};"><strong>Bericht</strong><br><span style="white-space:pre-wrap;">${contact.message}</span></td></tr>
    </table>
  `
  return emailWrapper('Nieuw contactbericht', 'Nieuw contact - T&R Car Detail', content)
}

function contactAutoReplyHtml(contact: ContactPayload): string {
  const content = `
    <h1 style="margin:0 0 8px; font-size:24px; color:${BRAND.headerBg};">Bedankt voor je bericht</h1>
    <p style="margin:0 0 24px; color:${BRAND.textMuted}; font-size:15px;">We hebben het goed ontvangen.</p>
    <p style="margin:0 0 20px;">Beste ${contact.name},</p>
    <p style="margin:0 0 24px;">We hebben je bericht ontvangen en nemen zo spoedig mogelijk contact met je op.</p>
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
