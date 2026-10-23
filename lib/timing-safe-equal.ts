/** Constant-time string compare. A missing secret never matches. */
export function secretsEqual(input: string, secret: string | undefined): boolean {
  if (typeof secret !== 'string') return false
  const length = Math.max(input.length, secret.length)
  let diff = input.length === secret.length ? 0 : 1
  for (let i = 0; i < length; i++) {
    const left = i < input.length ? input.charCodeAt(i) : 0
    const right = i < secret.length ? secret.charCodeAt(i) : 0
    diff |= left ^ right
  }
  return diff === 0
}
