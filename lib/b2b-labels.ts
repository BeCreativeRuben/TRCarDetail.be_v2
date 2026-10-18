/** Zelfde labels als het offerteformulier. De API blijft de ruwe waarden sturen. */

export const FLEET_SIZE_OPTIONS = [
  { value: '1-5', label: '1 – 5 wagens' },
  { value: '5-10', label: '5 – 10 wagens' },
  { value: '11-25', label: '11 – 25 wagens' },
  { value: '26-50', label: '26 – 50 wagens' },
  { value: '50+', label: 'Meer dan 50 wagens' },
] as const

export const VEHICLE_TYPE_OPTIONS = [
  { value: 'personenwagens', label: 'Personenwagens' },
  { value: 'bestel', label: 'Bestelwagens' },
  { value: 'mixed', label: 'Gemengd' },
] as const

export const FREQUENCY_OPTIONS = [
  { value: 'eenmalig', label: 'Eenmalig' },
  { value: 'maandelijks', label: 'Maandelijks / periodiek' },
  { value: 'op-maat', label: 'Op maat / te bespreken' },
] as const

function labelFrom(options: readonly { value: string; label: string }[], value?: string): string {
  if (!value) return ''
  return options.find((option) => option.value === value)?.label ?? value
}

export function fleetSizeLabel(value?: string): string {
  return labelFrom(FLEET_SIZE_OPTIONS, value)
}

export function vehicleTypeLabel(value?: string): string {
  return labelFrom(VEHICLE_TYPE_OPTIONS, value)
}

export function frequencyLabel(value?: string): string {
  return labelFrom(FREQUENCY_OPTIONS, value)
}
