import { NextResponse } from 'next/server'
import { requireAdminApi } from '@/lib/admin-api'
import { getAllBookings } from '@/lib/bookings-store'

export async function GET() {
  const authError = await requireAdminApi()
  if (authError) return authError

  const bookings = await getAllBookings()
  const kvConfigured = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

  return NextResponse.json({ bookings, kvConfigured })
}
