import Image from 'next/image'
import Link from 'next/link'

const HIGHLIGHTS = [
  { img: '/brand/hl-realisaties.png', label: 'Realisaties', href: '/#realisaties' },
  { img: '/brand/hl-team.png', label: 'Team', href: '/about' },
  { img: '/brand/hl-reviews.png', label: 'Reviews', href: '/#reviews' },
  { img: '/brand/hl-boeken.png', label: 'Boeken', href: '/booking?from=highlights' },
]

/** Instagram-hoogtepunten van Tristan als snelle navigatie. */
export default function Highlights() {
  return (
    <ul className="flex justify-center gap-5 sm:gap-10">
      {HIGHLIGHTS.map((h) => (
        <li key={h.label}>
          <Link href={h.href} className="group flex flex-col items-center gap-2">
            <span className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] bg-gradient-to-br from-accent-red via-accent-dark-red to-accent-red transition-transform group-hover:scale-105">
              <span className="relative block w-full h-full rounded-full bg-primary-dark overflow-hidden ring-2 ring-primary-dark">
                <Image src={h.img} alt="" fill sizes="80px" className="object-cover" />
              </span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-light group-hover:text-accent-red transition-colors">{h.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
