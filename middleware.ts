import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isMaintenanceMode } from '@/lib/maintenance'

export function middleware(request: NextRequest) {
  if (!isMaintenanceMode()) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  if (pathname === '/maintenance') {
    return NextResponse.next()
  }

  if (
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next()
  }

  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/maintenance', request.url))
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
