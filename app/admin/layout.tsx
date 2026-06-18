import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin – T&R Car Detail',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-light text-primary-dark">{children}</div>
}
