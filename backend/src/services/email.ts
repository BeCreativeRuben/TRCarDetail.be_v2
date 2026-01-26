import nodemailer from 'nodemailer'
import { BookingCreate } from '../models/Booking.js'
import { ContactSubmission } from '../models/Contact.js'

// Configure email transporter
// In production, use environment variables for credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendBookingConfirmation(booking: BookingCreate & { id?: number | bigint }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Booking details:', booking)
    return
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: booking.email,
      subject: 'Boeking Bevestiging - T&R Car Detail',
      html: `
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
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log('Booking confirmation email sent to:', booking.email)
  } catch (error) {
    console.error('Error sending booking confirmation email:', error)
  }
}

export async function sendContactNotification(contact: ContactSubmission & { id?: number | bigint }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Contact submission:', contact)
    return
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: 'Nieuw Contactformulier - T&R Car Detail',
      html: `
        <h2>Nieuw contactformulier ingevuld</h2>
        <p><strong>Naam:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        ${contact.phone ? `<p><strong>Telefoon:</strong> ${contact.phone}</p>` : ''}
        <p><strong>Bericht:</strong></p>
        <p>${contact.message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log('Contact notification email sent to admin')

    // Also send auto-reply to customer
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: contact.email,
      subject: 'Bericht Ontvangen - T&R Car Detail',
      html: `
        <h2>Bedankt voor uw bericht!</h2>
        <p>Beste ${contact.name},</p>
        <p>We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
        <p>Met vriendelijke groet,<br>T&R Car Detail</p>
      `,
    }

    await transporter.sendMail(customerMailOptions)
    console.log('Auto-reply email sent to:', contact.email)
  } catch (error) {
    console.error('Error sending contact notification email:', error)
  }
}
