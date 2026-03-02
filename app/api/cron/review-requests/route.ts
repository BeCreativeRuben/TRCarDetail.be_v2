import { NextResponse } from 'next/server'
import { getBookingsForReviewRequest, markReviewRequestSent } from '@/lib/bookings-store'
import { sendReviewRequest } from '@/lib/email'

/**
 * Vercel Cron: runs daily. Sends a review-request email to customers
 * whose appointment date (preferredDate) has already passed.
 * Protect with CRON_SECRET in Vercel (Authorization: Bearer <CRON_SECRET>).
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const toProcess = await getBookingsForReviewRequest()
    let sent = 0
    for (const booking of toProcess) {
      try {
        await sendReviewRequest({
          customerName: booking.customerName,
          email: booking.email,
          serviceType: booking.serviceType,
          preferredDate: booking.preferredDate,
        })
        await markReviewRequestSent(booking.id)
        sent++
      } catch (e) {
        console.error('Failed to send review request to', booking.email, e)
      }
    }
    return NextResponse.json({ ok: true, sent, total: toProcess.length })
  } catch (error) {
    console.error('Cron review-requests error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
