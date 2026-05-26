import { VAT_EXEMPT_LEGAL, VAT_EXEMPT_SHORT } from '@/lib/business'

type PriceVatNoteProps = {
  variant?: 'short' | 'full' | 'both'
  className?: string
}

/** Btw-vrijstellingsvermelding bij prijzen (kleine ondernemingsregeling). */
export default function PriceVatNote({ variant = 'short', className = '' }: PriceVatNoteProps) {
  if (variant === 'short') {
    return <p className={`text-xs text-primary-dark opacity-60 ${className}`}>{VAT_EXEMPT_SHORT}</p>
  }
  if (variant === 'full') {
    return <p className={`text-xs text-primary-dark opacity-70 ${className}`}>{VAT_EXEMPT_LEGAL}</p>
  }
  return (
    <div className={`space-y-1 ${className}`}>
      <p className="text-xs text-primary-dark opacity-60">{VAT_EXEMPT_SHORT}</p>
      <p className="text-xs text-primary-dark opacity-70">{VAT_EXEMPT_LEGAL}</p>
    </div>
  )
}
