import { cookies } from 'next/headers'

export const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000

function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD?.trim() || undefined
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminPassword())
}

async function hmacHex(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createAdminSessionToken(): Promise<string | null> {
  const secret = getAdminPassword()
  if (!secret) return null
  const payload = String(Date.now())
  const sig = await hmacHex(payload, secret)
  return `${payload}.${sig}`
}

export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  const secret = getAdminPassword()
  if (!secret || !token) return false
  const dot = token.lastIndexOf('.')
  if (dot <= 0) return false
  const payload = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = await hmacHex(payload, secret)
  if (!timingSafeEqualHex(sig, expected)) return false
  const createdAt = Number(payload)
  if (!Number.isFinite(createdAt)) return false
  return Date.now() - createdAt >= 0 && Date.now() - createdAt < SESSION_MAX_AGE_MS
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return verifyAdminSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_MS / 1000,
  }
}
