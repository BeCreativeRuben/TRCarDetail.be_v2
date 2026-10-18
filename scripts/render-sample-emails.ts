/**
 * Rendert de 6 transactionele mails met voorbeelddata en controleert de mailfixes.
 * Uitvoeren: npx tsx scripts/render-sample-emails.ts
 * HTML komt in EMAIL_ARTIFACT_DIR (standaard /opt/cursor/artifacts/emails).
 */
import assert from 'node:assert/strict'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { formatDutchDate, formatVehicleSize } from '@/lib/email-format'
import {
  BOOKING_CUSTOMER_SUBJECT,
  CUSTOMER_REPLY_TO,
  mailFromAddress,
  renderTransactionalEmails,
  type BookingPayload,
} from '@/lib/email'
import { formatServiceType } from '@/lib/service-labels'

const booking: BookingPayload = {
  customerName: 'Jan <script>alert("x")</script>',
  email: 'jan@example.com',
  phone: '+32 470 11 22 33',
  serviceType: 'exterieur-basis',
  vehicleInfo: { make: 'Volkswagen', model: 'Golf & Co', year: '2020', size: 'standard' },
  preferredDate: '2026-11-01',
  preferredTime: '09:30',
  address: 'Kerkstraat 1, 9100 Sint-Niklaas',
  travelDistanceKm: 12,
  travelFeeEuro: 0,
  selectedExtras: [{ id: 'extra-hondenharen', name: 'Hondenharen <b>', priceExclBtwEuro: 15 }],
  specialRequests: 'Opmerking <b>bold</b>',
  totalExclBtw: 65,
}

const contact = {
  name: 'Piet <img src=x onerror=alert(1)>',
  email: 'piet@example.com',
  phone: '+32 470 00 00 00',
  message: 'Hallo <script>alert(1)</script>\nTweede lijn',
}

const quote = {
  companyName: 'Vloot & Co <script>',
  contactName: 'An <i>Janssens</i>',
  email: 'an@vloot.be',
  phone: '+32 9 000 00 00',
  vatNumber: 'BE0123456789',
  location: 'Gent',
  fleetSize: '5-10',
  vehicleType: 'personenwagens',
  frequency: 'maandelijks',
  message: 'Graag een <offerte>',
}

const routing = {
  smtpUser: 'smtp-user@trcardetail.be',
  adminEmail: 'admin@trcardetail.be',
}

const informal = /(?:^|[\s>])(?:je|jij|jouw|jezelf)\b/i

function assertMail(html: string, text: string, label: string) {
  assert.equal(informal.test(html), false, `${label} html gebruikt je/jij/jouw`)
  assert.equal(informal.test(text), false, `${label} tekst gebruikt je/jij/jouw`)
  assert.equal(html.includes('<script'), false, `${label} bevat ontsnapte script-tag`)
  assert.ok(text.trim().length > 40, `${label} mist platte tekst`)
}

const emails = renderTransactionalEmails({ booking, contact, quote }, routing)
assert.equal(emails.length, 6)

const byId = Object.fromEntries(emails.map((email) => [email.id, email]))
const bookingAdmin = byId['booking-admin']
const bookingCustomer = byId['booking-customer']
const contactAdmin = byId['contact-admin']
const contactCustomer = byId['contact-customer']
const b2bAdmin = byId['b2b-admin']
const b2bCustomer = byId['b2b-customer']

for (const email of emails) {
  assertMail(email.html, email.text, email.id)
  assert.equal(email.from, mailFromAddress(routing.smtpUser))
  assert.equal(email.from, '"T&R Car Detail" <smtp-user@trcardetail.be>')
}

assert.equal(bookingAdmin.replyTo, booking.email)
assert.equal(contactAdmin.replyTo, contact.email)
assert.equal(b2bAdmin.replyTo, quote.email)
for (const email of [bookingCustomer, contactCustomer, b2bCustomer]) {
  assert.equal(email.replyTo, CUSTOMER_REPLY_TO)
  assert.equal(email.replyTo, 'info@trcardetail.be')
}

assert.equal(bookingCustomer.subject, BOOKING_CUSTOMER_SUBJECT)
assert.equal(bookingCustomer.subject, 'Boekingsaanvraag ontvangen – T&R Car Detail')
assert.equal(bookingCustomer.subject.includes('Bevestiging'), false)
assert.equal(bookingAdmin.subject, 'Nieuwe boeking: Exterieur Basis – T&R Car Detail')

for (const email of [bookingAdmin, bookingCustomer]) {
  assert.equal(email.html.includes('exterieur-basis'), false)
  assert.equal(email.text.includes('exterieur-basis'), false)
  assert.ok(email.html.includes('Exterieur Basis'))
  assert.ok(email.text.includes('Exterieur Basis'))
  assert.ok(email.html.includes('zondag 1 november 2026'))
  assert.ok(email.text.includes('zondag 1 november 2026'))
  assert.equal(email.html.includes('2026-11-01'), false)
  assert.equal(email.text.includes('· standard'), false)
  assert.equal(email.html.includes('· standard'), false)
  assert.ok(email.html.includes('Standaard'))
  assert.ok(email.text.includes('Standaard'))
  assert.ok(email.html.includes('Jan &lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'))
  assert.ok(email.html.includes('Golf &amp; Co'))
  assert.ok(email.html.includes('Hondenharen &lt;b&gt;'))
}
assert.ok(bookingAdmin.html.includes('Opmerking &lt;b&gt;bold&lt;/b&gt;'))

assert.ok(bookingCustomer.html.includes('https://wa.me/32499128500'))
assert.ok(bookingCustomer.html.includes('tel:+32499128500'))
assert.ok(bookingCustomer.text.includes('https://wa.me/32499128500'))
assert.equal(bookingCustomer.html.includes('WhatsApp op <a href="tel:'), false)
assert.ok(bookingCustomer.html.includes('Boekingsaanvraag ontvangen'))
assert.ok(bookingCustomer.html.includes('nog niet bevestigd'))
assert.ok(bookingCustomer.text.includes('Uw aanvraag:'))

assert.ok(contactAdmin.html.includes('Piet &lt;img src=x onerror=alert(1)&gt;'))
assert.ok(contactAdmin.html.includes('Hallo &lt;script&gt;alert(1)&lt;/script&gt;'))
assert.ok(contactCustomer.html.includes('Piet &lt;img src=x onerror=alert(1)&gt;'))
assert.ok(b2bAdmin.html.includes('Vloot &amp; Co &lt;script&gt;'))
assert.ok(b2bAdmin.html.includes('Graag een &lt;offerte&gt;'))
assert.ok(b2bCustomer.html.includes('An &lt;i&gt;Janssens&lt;/i&gt;'))
assert.equal(b2bAdmin.subject, 'B2B offerte: Vloot & Co <script> (5-10)')

const customBooking: BookingPayload = { ...booking, serviceType: 'full-custom', vehicleInfo: { ...booking.vehicleInfo, size: 'large' } }
const customMails = renderTransactionalEmails({ booking: customBooking, contact, quote }, routing)
const customCustomer = customMails.find((email) => email.id === 'booking-customer')
assert.ok(customCustomer)
assert.ok(customCustomer.html.includes('Combinatie op maat'))
assert.equal(customCustomer.html.includes('full-custom'), false)
assert.ok(customCustomer.html.includes('Groot'))
assert.equal(customCustomer.html.includes('· large'), false)

assert.equal(formatServiceType('exterieur-basis'), 'Exterieur Basis')
assert.equal(formatServiceType('full-custom'), 'Combinatie op maat')
assert.equal(formatServiceType('Combinatie op maat'), 'Combinatie op maat')
assert.equal(formatServiceType('exterieur-deluxe'), 'Exterieur Deluxe (Decontaminatie was)')
assert.equal(formatDutchDate('2026-11-01'), 'zondag 1 november 2026')
assert.equal(formatDutchDate('ergens in november'), 'ergens in november')
assert.equal(formatVehicleSize('standard'), 'Standaard')
assert.equal(formatVehicleSize('large'), 'Groot')

const outDir = process.env.EMAIL_ARTIFACT_DIR || '/opt/cursor/artifacts/emails'
mkdirSync(outDir, { recursive: true })
for (const email of emails) {
  writeFileSync(path.join(outDir, email.filename), email.html, 'utf8')
}
writeFileSync(
  path.join(outDir, 'manifest.json'),
  JSON.stringify(
    emails.map((email) => ({
      id: email.id,
      filename: email.filename,
      subject: email.subject,
      from: email.from,
      replyTo: email.replyTo,
      to: email.to,
    })),
    null,
    2,
  ),
  'utf8',
)

console.log(`Rendered ${emails.length} emails to ${outDir}`)
