import BookingsPanel from '@/components/admin/BookingsPanel'
import { getAllBookings } from '@/lib/bookings-store'

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings()
  const kvConfigured = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

  return <BookingsPanel initialBookings={bookings} kvConfigured={kvConfigured} />
}
