import { NextResponse } from 'next/server'
import { requireAdminApi } from '@/lib/admin-api'
import { getBookingById, markReviewRequestSent } from '@/lib/bookings-store'
import { sendReviewRequest } from '@/lib/email'
import { formatServiceType } from '@/lib/service-labels'

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(request: Request, context: RouteContext) {
  const authError = await requireAdminApi()
  if (authError) return authError

  const { id } = await context.params
  const booking = await getBookingById(id)
  if (!booking) {
    return NextResponse.json({ error: 'Boeking niet gevonden.' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const personalMessage = typeof body.personalMessage === 'string' ? body.personalMessage.trim() : ''
    const serviceLabel = formatServiceType(booking.serviceType)

    await sendReviewRequest({
      customerName: booking.customerName,
      email: booking.email,
      serviceType: serviceLabel,
      preferredDate: booking.preferredDate,
      personalMessage: personalMessage || undefined,
    })
    await markReviewRequestSent(booking.id)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to send review request:', error)
    return NextResponse.json({ error: 'Review-mail kon niet worden verstuurd.' }, { status: 500 })
  }
}
