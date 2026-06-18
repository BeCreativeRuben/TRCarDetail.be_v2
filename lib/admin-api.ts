import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_SESSION_COOKIE, isAdminConfigured, verifyAdminSessionToken } from '@/lib/admin-auth'

export async function requireAdminApi(): Promise<NextResponse | null> {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: 'Admin is niet geconfigureerd. Stel ADMIN_PASSWORD in.' }, { status: 503 })
  }
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  if (!(await verifyAdminSessionToken(token))) {
    return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
  }
  return null
}
