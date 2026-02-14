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

function bookingConfirmationHtml(booking: BookingPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <h2>Bedankt voor uw boeking!</h2>
  <p>Beste ${booking.customerName},</p>
  <p>We hebben uw boeking ontvangen. Hieronder vindt u de details:</p>
  <ul>
    <li><strong>Service:</strong> ${booking.serviceType}</li>
    <li><strong>Datum:</strong> ${booking.preferredDate}</li>
    <li><strong>Tijd:</strong> ${booking.preferredTime}</li>
    <li><strong>Voertuig:</strong> ${booking.vehicleInfo.make} ${booking.vehicleInfo.model} (${booking.vehicleInfo.year})</li>
  </ul>
  <p>We nemen zo spoedig mogelijk contact met u op om de afspraak te bevestigen.</p>
  <p>Met vriendelijke groet,<br>T&R Car Detail</p>
</body>
</html>
  `.trim()
}

function bookingConfirmationText(booking: BookingPayload): string {
  return [
    'Bedankt voor uw boeking!',
    '',
    `Beste ${booking.customerName},`,
    '',
    'We hebben uw boeking ontvangen. Hieronder vindt u de details:',
    `- Service: ${booking.serviceType}`,
    `- Datum: ${booking.preferredDate}`,
    `- Tijd: ${booking.preferredTime}`,
    `- Voertuig: ${booking.vehicleInfo.make} ${booking.vehicleInfo.model} (${booking.vehicleInfo.year})`,
    '',
    'We nemen zo spoedig mogelijk contact met u op om de afspraak te bevestigen.',
    '',
    'Met vriendelijke groet,',
    'T&R Car Detail',
  ].join('\n')
}

function contactNotificationHtml(contact: ContactPayload): string {
  const phoneLine = contact.phone ? `<p><strong>Telefoon:</strong> ${contact.phone}</p>` : ''
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <h2>Nieuw contactformulier ingevuld</h2>
  <p><strong>Naam:</strong> ${contact.name}</p>
  <p><strong>Email:</strong> ${contact.email}</p>
  ${phoneLine}
  <p><strong>Bericht:</strong></p>
  <p>${contact.message}</p>
</body>
</html>
  `.trim()
}

function contactAutoReplyHtml(contact: ContactPayload): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <h2>Bedankt voor uw bericht!</h2>
  <p>Beste ${contact.name},</p>
  <p>We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
  <p>Met vriendelijke groet,<br>T&R Car Detail</p>
</body>
</html>
  `.trim()
}

export async function sendBookingConfirmation(booking: BookingPayload): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Booking details:', booking)
    return
  }

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
