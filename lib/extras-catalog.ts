import type { Service } from '@/lib/types'

export type ExtraCatalogItem = {
  id: string
  name: string
  description: string
  /** Bedrag voor subtotaal in boeking/mail (excl. BTW). Bij “vanaf” = ondergrens. */
  priceExclBtwEuro: number
  /** Optioneel: bv. "vanaf" voor weergave in mail en formulier. */
  priceNote?: string
}

export const EXTRAS_CATALOG: ExtraCatalogItem[] = [
  {
    id: 'extra-wax-traditioneel-12m',
    name: 'Traditionele wax 12 maanden',
    description: 'Langdurige waxbescherming. Prijs: vanaf €35 excl. BTW.',
    priceExclBtwEuro: 35,
    priceNote: 'vanaf',
  },
  {
    id: 'extra-bodemreiniging',
    name: 'Bodemreiniging',
    description: 'Reiniging van de onderzijde van het voertuig. +€25 excl. BTW.',
    priceExclBtwEuro: 25,
  },
  {
    id: 'extra-glas-coating',
    name: 'Coating glas',
    description: 'Glacoating voor ruiten en spiegels. +€60 excl. BTW.',
    priceExclBtwEuro: 60,
  },
  {
    id: 'extra-hondenharen',
    name: 'Hondenharen',
    description: 'Verwijdering van hondenharen uit het interieur. +€15 excl. BTW.',
    priceExclBtwEuro: 15,
  },
  {
    id: 'extra-motoruimte',
    name: 'Motoruimte',
    description: 'Reiniging van de motorruimte. +€25 excl. BTW.',
    priceExclBtwEuro: 25,
  },
]

export function getExtraById(id: string): ExtraCatalogItem | undefined {
  return EXTRAS_CATALOG.find((e) => e.id === id)
}

export function extrasAsServices(): Service[] {
  return EXTRAS_CATALOG.map((e) => ({
    id: e.id,
    name: e.name,
    description: e.description,
    basePrice: e.priceExclBtwEuro,
    largeCarSurcharge: 0,
    features: e.priceNote ? [`Prijs: ${e.priceNote} €${e.priceExclBtwEuro} excl. BTW`] : [`+€${e.priceExclBtwEuro} excl. BTW`],
  }))
}

export function sumExtrasPriceExclBtw(selectedIds: ReadonlySet<string>): number {
  let sum = 0
  for (const id of selectedIds) {
    const x = getExtraById(id)
    if (x) sum += x.priceExclBtwEuro
  }
  return Math.round(sum * 100) / 100
}
