import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isMaintenanceMode } from '@/lib/maintenance'
import { verifyAdminSessionToken, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const isAdminAuthed = await verifyAdminSessionToken(sessionToken)

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isAdminAuthed) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === '/admin/login' && isAdminAuthed) {
    return NextResponse.redirect(new URL('/admin/bookings', request.url))
  }

  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')) {
    if (!isAdminAuthed) {
      return NextResponse.json({ error: 'Niet geautoriseerd' }, { status: 401 })
    }
  }

  if (!isMaintenanceMode()) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  if (pathname === '/maintenance') {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  return NextResponse.redirect(new URL('/maintenance', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
