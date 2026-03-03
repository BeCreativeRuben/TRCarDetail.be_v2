import { NextResponse } from 'next/server'
import { haversineKm, travelFeeEuro, TRAVEL_CONFIG } from '@/lib/distance'

/** Geocode adres via Nominatim (OpenStreetMap). Rate limit: 1 req/sec, User-Agent verplicht. */
async function geocodeAddress(address: string): Promise<{ lat: number; lon: number } | null> {
  const trimmed = address.trim()
  const query = encodeURIComponent(/belgium$/i.test(trimmed) ? trimmed : `${trimmed}, Belgium`)
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'TRCarDetail-Booking/1.0 (contact@trcardetail.be)' },
  })
  if (!res.ok) return null
  const data = await res.json()
  if (!Array.isArray(data) || data.length === 0) return null
  const lat = parseFloat(data[0].lat)
  const lon = parseFloat(data[0].lon)
  if (Number.isNaN(lat) || Number.isNaN(lon)) return null
  return { lat, lon }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')?.trim()
  const latParam = searchParams.get('lat')
  const lonParam = searchParams.get('lon')

  // Optie 1: directe coördinaten (bv. van adressuggestie) – geen extra Nominatim-call
  const lat = latParam != null ? parseFloat(latParam) : NaN
  const lon = lonParam != null ? parseFloat(lonParam) : NaN
  if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
    try {
      const distanceKm = Math.round(haversineKm(
        TRAVEL_CONFIG.businessLat,
        TRAVEL_CONFIG.businessLon,
        lat,
        lon
      ) * 10) / 10
      const fee = travelFeeEuro(distanceKm)
      return NextResponse.json({
        distanceKm,
        travelFeeEuro: fee,
        freeRadiusKm: TRAVEL_CONFIG.freeRadiusKm,
      })
    } catch (e) {
      console.error('Travel fee API error (coords):', e)
      return NextResponse.json(
        { error: 'Could not calculate distance', distanceKm: null, travelFeeEuro: null },
        { status: 200 }
      )
    }
  }

  // Optie 2: geocode via adres
  if (!address || address.length < 5) {
    return NextResponse.json(
      { error: 'Address or coordinates required' },
      { status: 400 }
    )
  }

  try {
    const coords = await geocodeAddress(address)
    if (!coords) {
      return NextResponse.json(
        { error: 'Address not found', distanceKm: null, travelFeeEuro: null },
        { status: 200 }
      )
    }

    const distanceKm = Math.round(haversineKm(
      TRAVEL_CONFIG.businessLat,
      TRAVEL_CONFIG.businessLon,
      coords.lat,
      coords.lon
    ) * 10) / 10
    const fee = travelFeeEuro(distanceKm)

    return NextResponse.json({
      distanceKm,
      travelFeeEuro: fee,
      freeRadiusKm: TRAVEL_CONFIG.freeRadiusKm,
    })
  } catch (e) {
    console.error('Travel fee API error:', e)
    return NextResponse.json(
      { error: 'Could not calculate distance', distanceKm: null, travelFeeEuro: null },
      { status: 200 }
    )
  }
}
