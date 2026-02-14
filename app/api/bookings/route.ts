import { NextResponse } from 'next/server'
import { sendBookingConfirmation } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      customerName,
      email,
      phone,
      serviceType,
      preferredDate,
      preferredTime,
      vehicleInfo,
      specialRequests,
    } = body

    if (
      !customerName ||
      !email ||
      !phone ||
      !serviceType ||
      !preferredDate ||
      !preferredTime ||
      !vehicleInfo
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await sendBookingConfirmation({
      customerName,
      email,
      phone,
      serviceType,
      vehicleInfo,
      preferredDate,
      preferredTime,
      specialRequests,
    })

    return NextResponse.json(
      { message: 'Booking received successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
