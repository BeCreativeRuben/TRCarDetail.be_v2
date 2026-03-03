import { NextResponse } from 'next/server'

/**
 * Adressuggesties voor België via Nominatim (OpenStreetMap).
 * Gebruikt voor herkenning van adressen in het boekingsformulier.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  if (!q || q.length < 3) {
    return NextResponse.json({ suggestions: [] })
  }

  try {
    const query = encodeURIComponent(q)
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=6&countrycodes=be`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'TRCarDetail-Booking/1.0 (contact@trcardetail.be)' },
    })
    if (!res.ok) return NextResponse.json({ suggestions: [] })

    const data = await res.json()
    if (!Array.isArray(data)) return NextResponse.json({ suggestions: [] })

    const suggestions = data.map((item: { display_name?: string; lat?: string; lon?: string }) => {
      const name = item.display_name || ''
      const lat = parseFloat(item.lat ?? '')
      const lon = parseFloat(item.lon ?? '')
      if (!name || Number.isNaN(lat) || Number.isNaN(lon)) return null
      return { display_name: name, lat, lon }
    }).filter((s): s is { display_name: string; lat: number; lon: number } => s !== null)
    return NextResponse.json({ suggestions })
  } catch (e) {
    console.error('Address suggestions error:', e)
    return NextResponse.json({ suggestions: [] })
  }
}
