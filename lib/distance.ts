/**
 * Kilometervergoeding: gratis binnen 15 km, daarna €0,40 per extra km.
 * Referentie: Heidebloemstraat 66 Bus 11, 9100 Sint-Niklaas
 */

export const TRAVEL_CONFIG = {
  freeRadiusKm: 15,
  pricePerKmEuro: 0.4,
  /** Coördinaten Heidebloemstraat 66, 9100 Sint-Niklaas (bij benadering) */
  businessLat: 51.163,
  businessLon: 4.139,
}

/** Haversine-afstand in km tussen twee punten (WGS84) */
export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/** Bereken kilometervergoeding in EUR op basis van afstand in km */
export function travelFeeEuro(distanceKm: number): number {
  if (distanceKm <= TRAVEL_CONFIG.freeRadiusKm) return 0
  const extraKm = distanceKm - TRAVEL_CONFIG.freeRadiusKm
  return Math.round(extraKm * TRAVEL_CONFIG.pricePerKmEuro * 100) / 100
}
