import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  getAdminSessionCookieOptions,
  isAdminConfigured,
} from '@/lib/admin-auth'

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: 'Admin is niet geconfigureerd.' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const password = typeof body.password === 'string' ? body.password : ''
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Onjuist wachtwoord.' }, { status: 401 })
    }

    const token = await createAdminSessionToken()
    if (!token) {
      return NextResponse.json({ error: 'Kon geen sessie aanmaken.' }, { status: 500 })
    }

    const cookieStore = await cookies()
    cookieStore.set(ADMIN_SESSION_COOKIE, token, getAdminSessionCookieOptions())
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Inloggen mislukt.' }, { status: 500 })
  }
}
