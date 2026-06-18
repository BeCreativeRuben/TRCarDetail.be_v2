import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.booking

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children
}
