import { NextResponse } from 'next/server'
import { sendBookingConfirmation } from '@/lib/email'
import { saveBooking } from '@/lib/bookings-store'
import { normalizeSelectedExtras } from '@/lib/normalize-booking-extras'
import { isPreferredDateBookable, getBlockedRangeReason } from '@/lib/booking-dates'
import { isPreferredTimeValid } from '@/lib/booking-slots'
import { largeCarSurchargeFor } from '@/lib/cars'

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
      largeCarSurchargeEuro: clientLargeCarSurcharge,
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
      const blockedReason = getBlockedRangeReason(String(preferredDate))
      return NextResponse.json(
        {
          error:
            blockedReason ??
            'U kunt niet boeken voor vandaag of een datum in het verleden. Kies een latere datum.',
          field: 'preferredDate',
        },
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

    // Grote-wagen-toeslag altijd server-side bepalen (zelfde regel als het formulier).
    const largeCarSurchargeEuro = largeCarSurchargeFor(String(serviceType), vehicleInfo?.size)
    let total = totalExclBtw != null ? Number(totalExclBtw) : undefined
    // Oudere (gecachte) formulieren rekenden de toeslag niet mee: tel ze dan hier alsnog op.
    if (total != null && total > 0 && largeCarSurchargeEuro > 0 && clientLargeCarSurcharge == null) {
      total = Math.round((total + largeCarSurchargeEuro) * 100) / 100
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
      largeCarSurchargeEuro: largeCarSurchargeEuro > 0 ? largeCarSurchargeEuro : undefined,
      totalExclBtw: total,
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
