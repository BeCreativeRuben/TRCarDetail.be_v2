import { ENTERPRISE_NUMBER_LABEL, VAT_EXEMPT_LEGAL } from '@/lib/business'

export const EMAIL_LOGO_URL = 'https://www.trcardetail.be/brand/logo-email.png'
export const EMAIL_TEXTURE_URL = 'https://www.trcardetail.be/brand/email-texture.jpg'
export const EMAIL_TORN_URL = 'https://www.trcardetail.be/brand/email-torn.png'

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
  return `${escapeHtml(EMAIL_BRAND.name)} · Wij zorgen voor uw wagen<br/><span style="display:block; margin-top:8px;">${escapeHtml(ENTERPRISE_NUMBER_LABEL)}<br/>${escapeHtml(VAT_EXEMPT_LEGAL)}</span>`
}

/**
 * Tabel-layout voor Gmail, Outlook en Apple Mail.
 * Donkere header met logo, rode scheurrand, lichte kaart. Donkere modus houdt dezelfde merkkleuren.
 */
export function emailWrapper(previewText: string, title: string, content: string): string {
  const BRAND = EMAIL_BRAND
  return `
<!DOCTYPE html>
<html lang="nl" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: light dark; }
    body { margin:0; padding:0; }
    a { color:${BRAND.accentRed}; }
    @media (prefers-color-scheme: dark) {
      .dm-page { background-color:${BRAND.primaryDark} !important; }
      .dm-card { background-color:#161412 !important; }
      .dm-header, .dm-footer { background-color:${BRAND.primaryDark} !important; }
      .dm-text, .dm-text p, .dm-text h1, .dm-text li, .dm-text td, .dm-text span, .dm-text strong { color:${BRAND.light} !important; }
      .dm-text div { background-color:#221F1E !important; }
      .dm-text a, .em-accent { color:#FF5C33 !important; }
      .em-btn { background-color:#FF2E00 !important; color:#0A0908 !important; }
    }
  </style>
</head>
<body class="dm-page" style="margin:0; padding:0; background-color:${BRAND.bg}; color:${BRAND.text}; font-family: Montserrat, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6;">
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">${escapeHtml(previewText)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-page" bgcolor="${BRAND.bg}" style="background-color:${BRAND.bg}; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="dm-card" bgcolor="${BRAND.white}" style="max-width:600px; width:100%; background-color:${BRAND.white}; border-collapse:collapse;">
          <tr>
            <td class="dm-header" align="center" bgcolor="${BRAND.primaryDark}" style="background-color:${BRAND.primaryDark}; padding:0; line-height:0; font-size:0;">
              <img src="${EMAIL_TEXTURE_URL}" width="600" alt="" style="display:block; width:100%; max-width:600px; height:auto; border:0;">
            </td>
          </tr>
          <tr>
            <td class="dm-header" align="center" bgcolor="${BRAND.primaryDark}" style="background-color:${BRAND.primaryDark}; padding:8px 24px 20px;">
              <img src="${EMAIL_LOGO_URL}" width="200" alt="T&amp;R Car Detail" style="display:block; margin:0 auto; border:0; width:200px; max-width:70%; height:auto;">
              <p style="margin:14px 0 0; font-family: Montserrat, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:13px; letter-spacing:0.08em; text-transform:uppercase; color:${BRAND.light};">${BRAND.tagline}</p>
            </td>
          </tr>
          <tr>
            <td class="dm-header" bgcolor="${BRAND.primaryDark}" style="background-color:${BRAND.primaryDark}; padding:0; line-height:0; font-size:0;">
              <img src="${EMAIL_TORN_URL}" width="600" alt="" style="display:block; width:100%; max-width:600px; height:auto; border:0;">
            </td>
          </tr>
          <tr>
            <td class="dm-text" bgcolor="${BRAND.white}" style="background-color:${BRAND.white}; padding:32px 28px; color:${BRAND.text}; font-family: Montserrat, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6;">
              ${content}
            </td>
          </tr>
          <tr>
            <td class="dm-footer dm-text" align="center" bgcolor="${BRAND.primaryDark}" style="background-color:${BRAND.primaryDark}; padding:20px 28px; color:${BRAND.light}; font-family: Montserrat, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:12px; line-height:1.5; text-align:center;">
              ${emailLegalFooterHtml()}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
