import {
  coatingServices,
  exterieurCatalog,
  extrasServices,
  fullServices,
  interieurCatalog,
  motoServices,
} from '@/lib/services-catalog'

/**
 * Polijsten staat in de catalogus als vergelijkingstabel, niet als Service met id+name.
 * Deze fallback dekt die ids tot ze daar een eigen naam krijgen.
 */
const FALLBACK_LABELS: Record<string, string> = {
  'polijsten-light': 'Light Polish',
  'polijsten-full': 'Full Polish',
}

const catalogNames = new Map<string, string>()
for (const service of [
  ...interieurCatalog,
  ...exterieurCatalog,
  ...fullServices,
  ...coatingServices,
  ...motoServices,
  ...extrasServices,
]) {
  catalogNames.set(service.id, service.name)
}

/** Id uit de diensten-catalogus → weergavenaam. Een naam die al uitgeschreven is, blijft staan. */
export function formatServiceType(serviceType: string): string {
  const key = serviceType.trim()
  return catalogNames.get(key) ?? FALLBACK_LABELS[key] ?? serviceType
}
