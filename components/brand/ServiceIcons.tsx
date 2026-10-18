import Image from 'next/image'
import Link from 'next/link'

export const BRAND_SERVICES = [
  { icon: '/brand/icon-exterieur.png', label: 'Exterieur reiniging', href: '/services?category=exterieur' },
  { icon: '/brand/icon-interieur.png', label: 'Interieur reiniging', href: '/services?category=interieur' },
  { icon: '/brand/icon-polijsten.png', label: 'Polijsten & herstel', href: '/services?category=polieren' },
  { icon: '/brand/icon-coating.png', label: 'Bescherming en coating', href: '/services?category=coating' },
]

/** Ronde rode service-iconen uit Tristans banner. */
export default function ServiceIcons({ tone = 'dark', size = 'md', className = '' }: { tone?: 'dark' | 'light'; size?: 'sm' | 'md'; className?: string }) {
  const box = size === 'sm' ? 'w-12 h-12 md:w-14 md:h-14' : 'w-14 h-14 md:w-16 md:h-16'
  return (
    <ul className={`grid grid-cols-4 gap-2 sm:gap-6 ${className}`}>
      {BRAND_SERVICES.map((s) => (
        <li key={s.label}>
          <Link href={s.href} className="group flex flex-col items-center text-center gap-2">
            <span className={`relative ${box} rounded-full transition-transform duration-200 group-hover:scale-110 ${tone === 'light' ? 'bg-primary-dark' : ''}`}>
              <Image src={s.icon} alt="" fill sizes="64px" className="object-contain" />
            </span>
            <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wide leading-tight max-w-[7.5rem] ${tone === 'dark' ? 'text-light' : 'text-primary-dark'} group-hover:text-accent-red transition-colors`}>
              {s.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
