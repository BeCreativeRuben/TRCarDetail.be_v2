import type { Metadata } from 'next'
import { isAdminConfigured } from '@/lib/admin-auth'
import ReviewMailTool from './ReviewMailTool'

export const metadata: Metadata = {
  title: 'Review-mail – T&R Car Detail',
  robots: { index: false, follow: false },
}

export default function ReviewMailPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="pt-24 pb-16 bg-light min-h-screen">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl font-bold text-primary-dark mb-3 normal-case">Review-mail uitgeschakeld</h1>
          <p className="text-primary-dark">
            Deze pagina verstuurt geen mail zolang de omgevingsvariabele ADMIN_PASSWORD niet is ingesteld.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 bg-light min-h-screen">
      <div className="container-custom max-w-3xl">
        <ReviewMailTool />
      </div>
    </div>
  )
}
