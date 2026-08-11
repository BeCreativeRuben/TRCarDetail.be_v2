'use client'

import { usePathname } from 'next/navigation'
import ScrollToTop from '@/components/ScrollToTop'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  const isZakelijkRoute = pathname.startsWith('/zakelijk')

  if (isAdminRoute || isZakelijkRoute) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}
