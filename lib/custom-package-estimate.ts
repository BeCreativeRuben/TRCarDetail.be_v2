import { exterieurCatalog, getServiceById, interieurCatalog } from '@/lib/services-catalog'

export type CustomExterieurTier = 'none' | 'basis' | 'deluxe'
export type CustomInterieurTier = 'none' | 'basis' | 'deluxe' | 'premium'

/** Stabiele sleutel per onderdeellijn: ext|int : tier : index */
export type CustomFeatureKey = `${'ext' | 'int'}:${string}:${number}`

const BUNDLE_PRICE_BASIS = 100
const BUNDLE_PRICE_DELUXE = 170
const BUNDLE_PRICE_PREMIUM = 250

function standaloneExtPrice(tier: Exclude<CustomExterieurTier, 'none'>): number {
  const s = getServiceById(exterieurCatalog, tier === 'basis' ? 'exterieur-basis' : 'exterieur-deluxe')
  return s?.basePrice ?? 0
}

function standaloneIntPrice(tier: Exclude<CustomInterieurTier, 'none'>): number {
  const id =
    tier === 'basis' ? 'interieur-basis' : tier === 'deluxe' ? 'interieur-deluxe' : 'interieur-premium'
  return getServiceById(interieurCatalog, id)?.basePrice ?? 0
}

/** Basisprijs vóór uitsluitingen: bundelprijs indien exact dezelfde combinaties als op de site, anders som van catalogusprijzen. */
export function getCustomBaseSubtotal(ext: CustomExterieurTier, int: CustomInterieurTier): number {
  if (ext === 'none' && int === 'none') return 0
  if (ext === 'basis' && int === 'basis') return BUNDLE_PRICE_BASIS
  if (ext === 'basis' && int === 'deluxe') return BUNDLE_PRICE_DELUXE
  if (ext === 'basis' && int === 'premium') return BUNDLE_PRICE_PREMIUM
  let sum = 0
  if (ext === 'basis') sum += standaloneExtPrice('basis')
  if (ext === 'deluxe') sum += standaloneExtPrice('deluxe')
  if (int === 'basis') sum += standaloneIntPrice('basis')
  if (int === 'deluxe') sum += standaloneIntPrice('deluxe')
  if (int === 'premium') sum += standaloneIntPrice('premium')
  return sum
}

function isBundleCombo(ext: CustomExterieurTier, int: CustomInterieurTier): boolean {
  return (
    (ext === 'basis' && int === 'basis') ||
    (ext === 'basis' && int === 'deluxe') ||
    (ext === 'basis' && int === 'premium')
  )
}

/** Bundel: verdeel bundelprijs proportioneel volgens catalogusprijzen van exterieur vs interieur. Anders: volledige catalogusprijs per gekozen tier. */
function tierAllocatedEuros(
  ext: CustomExterieurTier,
  int: CustomInterieurTier,
  baseTotal: number
): { extEuro: number; intEuro: number } {
  if (ext === 'none' && int === 'none') return { extEuro: 0, intEuro: 0 }
  if (isBundleCombo(ext, int)) {
    const extP = standaloneExtPrice('basis')
    const intP =
      int === 'basis'
        ? standaloneIntPrice('basis')
        : int === 'deluxe'
          ? standaloneIntPrice('deluxe')
          : standaloneIntPrice('premium')
    const sum = extP + intP
    if (sum <= 0) return { extEuro: 0, intEuro: 0 }
    return {
      extEuro: (baseTotal * extP) / sum,
      intEuro: (baseTotal * intP) / sum,
    }
  }
  let extEuro = 0
  let intEuro = 0
  if (ext === 'basis') extEuro = standaloneExtPrice('basis')
  if (ext === 'deluxe') extEuro = standaloneExtPrice('deluxe')
  if (int === 'basis') intEuro = standaloneIntPrice('basis')
  if (int === 'deluxe') intEuro = standaloneIntPrice('deluxe')
  if (int === 'premium') intEuro = standaloneIntPrice('premium')
  return { extEuro, intEuro }
}

function featureKeysForTier(
  kind: 'ext' | 'int',
  tier: CustomExterieurTier | CustomInterieurTier
): CustomFeatureKey[] {
  if (kind === 'ext') {
    const t = tier as CustomExterieurTier
    if (t === 'none') return []
    const id = t === 'basis' ? 'exterieur-basis' : 'exterieur-deluxe'
    const f = getServiceById(exterieurCatalog, id)?.features ?? []
    return f.map((_, i) => `ext:${t}:${i}` as CustomFeatureKey)
  }
  const t = tier as CustomInterieurTier
  if (t === 'none') return []
  const id =
    t === 'basis' ? 'interieur-basis' : t === 'deluxe' ? 'interieur-deluxe' : 'interieur-premium'
  const f = getServiceById(interieurCatalog, id)?.features ?? []
  return f.map((_, i) => `int:${t}:${i}` as CustomFeatureKey)
}

export function getAllFeatureKeysForSelection(
  ext: CustomExterieurTier,
  int: CustomInterieurTier
): CustomFeatureKey[] {
  return [...featureKeysForTier('ext', ext), ...featureKeysForTier('int', int)]
}

function parseKey(key: CustomFeatureKey): { kind: 'ext' | 'int'; tier: string; index: number } | null {
  const m = /^ext:(basis|deluxe):(\d+)$/.exec(key)
  if (m) return { kind: 'ext', tier: m[1], index: Number(m[2]) }
  const m2 = /^int:(basis|deluxe|premium):(\d+)$/.exec(key)
  if (m2) return { kind: 'int', tier: m2[1], index: Number(m2[2]) }
  return null
}

function perFeatureValue(
  key: CustomFeatureKey,
  ext: CustomExterieurTier,
  int: CustomInterieurTier,
  baseTotal: number
): number {
  const parsed = parseKey(key)
  if (!parsed) return 0
  const { extEuro, intEuro } = tierAllocatedEuros(ext, int, baseTotal)
  if (parsed.kind === 'ext') {
    const tier = parsed.tier as 'basis' | 'deluxe'
    const count = featureKeysForTier('ext', tier).length
    if (count === 0) return 0
    return extEuro / count
  }
  const tier = parsed.tier as 'basis' | 'deluxe' | 'premium'
  const count = featureKeysForTier('int', tier).length
  if (count === 0) return 0
  return intEuro / count
}

export function computeCustomEstimateExclBtw(
  ext: CustomExterieurTier,
  int: CustomInterieurTier,
  excludedKeys: ReadonlySet<CustomFeatureKey>
): number {
  const baseTotal = getCustomBaseSubtotal(ext, int)
  if (baseTotal <= 0) return 0
  const allKeys = getAllFeatureKeysForSelection(ext, int)
  let deduction = 0
  for (const key of allKeys) {
    if (excludedKeys.has(key)) {
      deduction += perFeatureValue(key, ext, int, baseTotal)
    }
  }
  const raw = baseTotal - deduction
  return Math.max(0, Math.round(raw * 100) / 100)
}

export function labelForExterieurTier(t: CustomExterieurTier): string {
  if (t === 'none') return 'Geen'
  return t === 'basis' ? 'Exterieur Basis' : 'Exterieur Deluxe'
}

export function labelForInterieurTier(t: CustomInterieurTier): string {
  if (t === 'none') return 'Geen'
  return t === 'basis' ? 'Interieur Basis' : t === 'deluxe' ? 'Interieur Deluxe' : 'Interieur Premium'
}

export function humanLabelForFeatureKey(key: CustomFeatureKey): string {
  const p = parseKey(key)
  if (!p) return key
  const id =
    p.kind === 'ext'
      ? p.tier === 'basis'
        ? 'exterieur-basis'
        : 'exterieur-deluxe'
      : p.tier === 'basis'
        ? 'interieur-basis'
        : p.tier === 'deluxe'
          ? 'interieur-deluxe'
          : 'interieur-premium'
  const svc = getServiceById(p.kind === 'ext' ? exterieurCatalog : interieurCatalog, id)
  const line = svc?.features[p.index]
  return line ?? key
}
