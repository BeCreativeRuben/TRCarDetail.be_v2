/**
 * Onderhoudsmodus: alle pagina’s gaan naar /maintenance (behalve uitgezonderde paden).
 * Zet `MAINTENANCE_ENABLED` op `false` in .env.local om lokaal te werken zonder onderhoud.
 */
const DEFAULT_MAINTENANCE = true

export function isMaintenanceMode(): boolean {
  const env = process.env.MAINTENANCE_ENABLED
  if (env === 'false' || env === '0') return false
  if (env === 'true' || env === '1') return true
  return DEFAULT_MAINTENANCE
}
