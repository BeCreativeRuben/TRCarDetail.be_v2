const SERVICE_LABELS: Record<string, string> = {
  'exterieur-basis': 'Exterieur Basis',
  'exterieur-deluxe': 'Exterieur Deluxe',
  'full-basis': 'Basis Pakket',
  'full-deluxe': 'Deluxe Pakket',
  'full-premium': 'Premium Pakket',
  'full-custom': 'Combinatie op maat',
  'interieur-basis': 'Interieur Basis',
  'interieur-deluxe': 'Interieur Deluxe',
  'interieur-premium': 'Interieur Premium',
  'polijsten-light': 'Light Polish',
  'polijsten-full': 'Full Polish',
}

export function formatServiceType(serviceType: string): string {
  return SERVICE_LABELS[serviceType] ?? serviceType
}
