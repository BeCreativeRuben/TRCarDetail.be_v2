import { NextResponse } from 'next/server'
import { sendB2bQuoteNotification, type B2bQuotePayload } from '@/lib/email'

const FLEET_SIZES = new Set(['5-10', '11-25', '26-50', '50+'])

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const companyName = typeof body.companyName === 'string' ? body.companyName.trim() : ''
    const contactName = typeof body.contactName === 'string' ? body.contactName.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const location = typeof body.location === 'string' ? body.location.trim() : ''
    const fleetSize = typeof body.fleetSize === 'string' ? body.fleetSize.trim() : ''
    const vehicleType = typeof body.vehicleType === 'string' ? body.vehicleType.trim() : ''
    const frequency = typeof body.frequency === 'string' ? body.frequency.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!companyName || !contactName || !email || !phone || !location || !fleetSize) {
      return NextResponse.json({ error: 'Niet alle verplichte velden zijn ingevuld.' }, { status: 400 })
    }

    if (!FLEET_SIZES.has(fleetSize)) {
      return NextResponse.json({ error: 'Ongeldige vlootomvang.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres.' }, { status: 400 })
    }

    const payload: B2bQuotePayload = {
      companyName,
      contactName,
      email,
      phone,
      location,
      fleetSize,
      vehicleType: vehicleType || undefined,
      frequency: frequency || undefined,
      message: message || undefined,
    }

    await sendB2bQuoteNotification(payload)

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error('B2B quote error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
