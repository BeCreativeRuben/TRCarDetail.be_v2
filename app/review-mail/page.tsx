import type { Metadata } from 'next'
import ReviewMailTool from './ReviewMailTool'

export const metadata: Metadata = {
  title: 'Review-mail – T&R Car Detail',
  robots: { index: false, follow: false },
}

export default function ReviewMailPage() {
  return (
    <div className="pt-24 pb-16 bg-light min-h-screen">
      <div className="container-custom max-w-3xl">
        <ReviewMailTool />
      </div>
    </div>
  )
}
