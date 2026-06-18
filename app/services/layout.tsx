import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata.services

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
