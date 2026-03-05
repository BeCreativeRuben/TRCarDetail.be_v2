import { NextResponse } from 'next/server'
import { sendBookingConfirmation } from '@/lib/email'
import { saveBooking } from '@/lib/bookings-store'

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
      address: rawAddress,
      travelDistanceKm,
      travelFeeEuro,
      totalExclBtw,
      specialRequests,
    } = body

    const address = typeof rawAddress === 'string' ? rawAddress.trim() : ''

    if (
      !customerName ||
      !email ||
      !phone ||
      !serviceType ||
      !preferredDate ||
      !preferredTime ||
      !vehicleInfo ||
      !address
    ) {
      return NextResponse.json(
        { error: 'Niet alle verplichte velden zijn ingevuld. Controleer vooral het adres.', field: !address ? 'address' : undefined },
        { status: 400 }
      )
    }

    const payload = {
      customerName,
      email,
      phone,
      serviceType,
      vehicleInfo,
      preferredDate,
      preferredTime,
      address,
      travelDistanceKm: travelDistanceKm != null ? Number(travelDistanceKm) : undefined,
      travelFeeEuro: travelFeeEuro != null ? Number(travelFeeEuro) : undefined,
      totalExclBtw: totalExclBtw != null ? Number(totalExclBtw) : undefined,
      specialRequests,
    }

    await sendBookingConfirmation(payload)

    await saveBooking(payload)

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
