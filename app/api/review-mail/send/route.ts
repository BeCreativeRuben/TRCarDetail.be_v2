import { NextResponse } from 'next/server'
import { sendReviewRequest } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (process.env.ADMIN_PASSWORD && body.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Onjuist wachtwoord.' }, { status: 401 })
    }

    const customerName = typeof body.customerName === 'string' ? body.customerName.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const serviceType = typeof body.serviceType === 'string' ? body.serviceType.trim() : ''
    const appointmentDate = typeof body.appointmentDate === 'string' ? body.appointmentDate.trim() : ''
    const personalMessage = typeof body.personalMessage === 'string' ? body.personalMessage.trim() : ''

    if (!customerName || !email || !serviceType) {
      return NextResponse.json(
        { error: 'Vul minstens naam, e-mail en dienst in.' },
        { status: 400 }
      )
    }

    await sendReviewRequest({
      customerName,
      email,
      serviceType,
      preferredDate: appointmentDate,
      personalMessage: personalMessage || undefined,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Manual review mail send failed:', error)
    return NextResponse.json({ error: 'Mail kon niet worden verstuurd.' }, { status: 500 })
  }
}
