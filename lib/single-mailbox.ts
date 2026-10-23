/**
 * One plain mailbox. Rejects lists, display names, comments, and header injection.
 * The caller of a public form must not be able to add recipients.
 */
const BANNED = /[\s,;<>()[\]"\\:]|[\u0000-\u001f\u007f]/

export function singleMailbox(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const email = value.trim()
  if (email.length === 0 || email.length > 254) return null
  if (BANNED.test(email)) return null
  const at = email.indexOf('@')
  if (at <= 0 || at !== email.lastIndexOf('@')) return null
  const domain = email.slice(at + 1)
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.') || domain.includes('..')) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email
}
