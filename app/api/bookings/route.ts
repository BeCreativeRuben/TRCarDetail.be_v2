import { NextResponse } from 'next/server'
import { sendBookingConfirmation } from '@/lib/email'
import { saveBooking } from '@/lib/bookings-store'
import { normalizeSelectedExtras } from '@/lib/normalize-booking-extras'
import { isPreferredDateBookable } from '@/lib/booking-dates'
import { isPreferredTimeValid } from '@/lib/booking-slots'

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
      selectedExtras: rawSelectedExtras,
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

    if (!isPreferredDateBookable(String(preferredDate))) {
      return NextResponse.json(
        { error: 'U kunt niet boeken voor vandaag of een datum in het verleden. Kies een latere datum.', field: 'preferredDate' },
        { status: 400 }
      )
    }

    if (!isPreferredTimeValid(String(preferredDate), String(preferredTime))) {
      return NextResponse.json(
        { error: 'Het gekozen tijdslot is niet beschikbaar op deze datum. Kies een ander tijdstip.', field: 'preferredTime' },
        { status: 400 }
      )
    }

    const selectedExtras = normalizeSelectedExtras(rawSelectedExtras)

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
      selectedExtras,
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
