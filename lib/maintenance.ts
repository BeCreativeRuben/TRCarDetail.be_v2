/**
 * Onderhoudsmodus: alle pagina’s gaan naar /maintenance (behalve uitgezonderde paden).
 * - Productie (Vercel production): standaard aan tenzij `MAINTENANCE_ENABLED=false`.
 * - Preview / `next dev`: standaard uit tenzij `MAINTENANCE_ENABLED=true`.
 * - Lokaal met `next start` (geen VERCEL_ENV): zet `MAINTENANCE_ENABLED=false` in .env.local.
 */
const DEFAULT_MAINTENANCE_PRODUCTION = true

function isPreviewOrDevRuntime(): boolean {
  return (
    process.env.NODE_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview' ||
    process.env.VERCEL_ENV === 'development'
  )
}

export function isMaintenanceMode(): boolean {
  const env = process.env.MAINTENANCE_ENABLED
  if (env === 'false' || env === '0') return false
  if (env === 'true' || env === '1') return true
  if (isPreviewOrDevRuntime()) return false
  return DEFAULT_MAINTENANCE_PRODUCTION
}
