import { ENTERPRISE_NUMBER_LABEL, VAT_EXEMPT_LEGAL } from '@/lib/business'

export const EMAIL_BRAND = {
  name: 'T&R Car Detail',
  tagline: 'Professionele autoreiniging aan huis',
  primaryDark: '#0A0908',
  secondaryDark: '#22333B',
  light: '#F2F4F3',
  accentRed: '#FF2E00',
  white: '#ffffff',
  border: '#22333B',
  bg: '#F2F4F3',
  text: '#0A0908',
  textMuted: '#22333B',
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function emailLegalFooterHtml(): string {
  return `${EMAIL_BRAND.name} · Wij zorgen voor uw wagen<br/><span style="display:block; margin-top:8px;">${ENTERPRISE_NUMBER_LABEL}<br/>${VAT_EXEMPT_LEGAL}</span>`
}

export function emailWrapper(previewText: string, title: string, content: string): string {
  const BRAND = EMAIL_BRAND
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color:${BRAND.bg}; color:${BRAND.text}; font-size:16px; line-height:1.6;">
  <div style="display:none; max-height:0; overflow:hidden;">${previewText}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.secondaryDark}; padding:24px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:${BRAND.white}; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.15); border:1px solid ${BRAND.border};">
        <tr>
          <td style="background:${BRAND.primaryDark}; color:${BRAND.light}; padding:28px 32px; text-align:center;">
            <span style="font-size:26px; font-weight:700; letter-spacing:0.04em;">T&amp;R Car Detail</span>
            <p style="margin:8px 0 0; font-size:14px; opacity:0.9;">${BRAND.tagline}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px; background:${BRAND.white}; color:${BRAND.text};">
            ${content}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px; background:${BRAND.bg}; border-top:1px solid ${BRAND.border}; font-size:13px; color:${BRAND.textMuted}; text-align:center;">
            ${emailLegalFooterHtml()}
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}
