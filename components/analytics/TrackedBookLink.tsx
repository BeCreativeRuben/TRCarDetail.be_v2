'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { trackBookCtaClick } from '@/lib/analytics'

type TrackedBookLinkProps = {
  href?: string
  location: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

/** Link naar /booking (of service-URL) met GA4 book_cta_click. */
export default function TrackedBookLink({
  href = '/booking',
  location,
  className,
  children,
  onClick,
}: TrackedBookLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackBookCtaClick(location, href)
        onClick?.()
      }}
    >
      {children}
    </Link>
  )
}
