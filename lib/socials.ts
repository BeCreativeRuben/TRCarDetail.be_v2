/**
 * Social links and Instagram config.
 * Configure via .env.local (NEXT_PUBLIC_* for client/build).
 */
const INSTAGRAM_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'trcar_detail'

/** Comma-separated shortcodes in .env, e.g. NEXT_PUBLIC_INSTAGRAM_POST_SHORTCODES=ABC123,DEF456 */
function getInstagramPostShortcodes(): string[] {
  const raw = process.env.NEXT_PUBLIC_INSTAGRAM_POST_SHORTCODES
  if (!raw?.trim()) {
    return ['DVk2PQ-Dxwz', 'DVf8OxhAcyc', 'DVOfjw_iJsz'] // fallback shortcodes
  }
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}

export const instagram = {
  handle: INSTAGRAM_HANDLE,
  url: `https://www.instagram.com/${INSTAGRAM_HANDLE}/`,
  postShortcodes: getInstagramPostShortcodes(),
}
