export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-accent-red mb-4">T&R Car Detail</h1>
      <p className="text-light/80 mb-6">Next.js + API routes + Nodemailer (Gmail SMTP)</p>
      <ul className="text-sm text-light/70 space-y-1">
        <li><a href="/api/health" className="underline">GET /api/health</a></li>
        <li>POST /api/contact</li>
        <li>POST /api/booking</li>
      </ul>
    </div>
  )
}
