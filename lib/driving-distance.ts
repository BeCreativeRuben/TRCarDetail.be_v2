/**
 * Rijafstand via OSRM (OpenStreetMap-router), profiel "driving" (autowegen, snelste pad).
 * Standaard: publieke demo-router; voor productie eigen instantie via OSRM_ROUTE_BASE_URL.
 * Bij fout of time-out: null → caller gebruikt Haversine (vogelvlucht).
 */

const DEFAULT_OSRM_BASE = 'https://router.project-osrm.org'

function osrmBaseUrl(): string {
  const raw = process.env.OSRM_ROUTE_BASE_URL?.trim()
  if (!raw) return DEFAULT_OSRM_BASE
  return raw.replace(/\/$/, '')
}

/**
 * Eénrichtings-afstand in km langs de weg (OSRM). Retourneert null als routing faalt.
 */
export async function drivingRouteKmOneWay(
  fromLat: number,
  fromLon: number,
  toLat: number,
  toLon: number
): Promise<number | null> {
  const coords = `${fromLon},${fromLat};${toLon},${toLat}`
  const url = `${osrmBaseUrl()}/route/v1/driving/${coords}?overview=false`

  const ctrl = new AbortController()
  const timeout = setTimeout(() => ctrl.abort(), 12_000)

  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const data = (await res.json()) as {
      code?: string
      routes?: Array<{ distance?: number }>
    }
    if (data.code !== 'Ok' || !data.routes?.length) return null
    const meters = data.routes[0]?.distance
    if (typeof meters !== 'number' || !Number.isFinite(meters) || meters < 0) return null
    return meters / 1000
  } catch {
    return null
  } finally {
    clearTimeout(timeout)
  }
}
