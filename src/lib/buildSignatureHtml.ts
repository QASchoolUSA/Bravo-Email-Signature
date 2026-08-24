import {
  FONT_STACK,
  SERVICES_LINE,
  cdn,
  colors,
  local,
  socialLinks,
  type SignatureFields,
} from './brand'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function websiteHref(website: string): string {
  const trimmed = website.trim()
  if (!trimmed) return 'https://www.bravo-transport.com'
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed.replace(/^\/+/, '')}`
}

function websiteLabel(website: string): string {
  return website
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '')
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

/**
 * Outlook-safe table signature. Uses absolute image URLs so pasted
 * signatures load assets in Gmail / Outlook / Apple Mail.
 */
export function buildSignatureHtml(
  fields: SignatureFields,
  options: { logoUrl: string } = { logoUrl: local.logoPng },
): string {
  const logoUrl = escapeHtml(options.logoUrl)
  const name = escapeHtml(fields.fullName.trim())
  const title = fields.title.trim()
  const company = escapeHtml(fields.company.trim())
  const email = fields.email.trim()
  const address = escapeHtml(fields.address.trim())
  const website = fields.website.trim()
  const webHref = websiteHref(website)
  const webLabel = escapeHtml(websiteLabel(website) || 'www.bravo-transport.com')

  const nameLine = title
    ? `${name} <span style="font-weight:400;color:${colors.charcoal};">|</span> ${escapeHtml(title)}`
    : name

  const phoneLines: string[] = []
  if (fields.mainPhone.trim()) {
    const main = fields.mainPhone.trim()
    const ext = fields.extension.trim()
    const label = ext ? `${escapeHtml(main)} ext. ${escapeHtml(ext)}` : escapeHtml(main)
    phoneLines.push(
      `<a href="${telHref(main)}" style="color:${colors.charcoal};text-decoration:none;">${label}</a>`,
    )
  }
  if (fields.directPhone.trim()) {
    const direct = fields.directPhone.trim()
    phoneLines.push(
      `<a href="${telHref(direct)}" style="color:${colors.charcoal};text-decoration:none;">${escapeHtml(direct)} Direct</a>`,
    )
  }
  if (fields.fax.trim()) {
    phoneLines.push(`Fax: ${escapeHtml(fields.fax.trim())}`)
  }

  const socialBlock = fields.showSocial
    ? `&nbsp;<a href="${socialLinks.linkedin}" target="_blank" style="text-decoration:none;"><img src="${cdn.linkedin}" width="16" height="16" alt="LinkedIn" style="display:inline-block;border:0;vertical-align:middle;" /></a>&nbsp;<a href="${socialLinks.facebook}" target="_blank" style="text-decoration:none;"><img src="${cdn.facebook}" width="16" height="16" alt="Facebook" style="display:inline-block;border:0;vertical-align:middle;" /></a>`
    : ''

  const phoneHtml = phoneLines
    .map(
      (p) =>
        `<div style="font-family:${FONT_STACK};font-size:12px;line-height:18px;color:${colors.charcoal};mso-line-height-rule:exactly;">${p}</div>`,
    )
    .join('')

  const emailHtml = email
    ? `<div style="font-family:${FONT_STACK};font-size:12px;line-height:18px;mso-line-height-rule:exactly;"><a href="mailto:${escapeHtml(email)}" style="color:${colors.blue};text-decoration:none;">${escapeHtml(email)}</a></div>`
    : ''

  const bannerCells = cdn.fleet
    .map(
      (src, i) =>
        `<td width="150" valign="top" style="padding:0;margin:0;border:0;font-size:0;line-height:0;"><img src="${src}" width="150" height="90" alt="Bravo Transport fleet ${i + 1}" style="display:block;border:0;outline:none;text-decoration:none;width:150px;height:90px;" /></td>`,
    )
    .join('')

  return `<!-- Bravo Transport Email Signature -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;border-collapse:collapse;background-color:${colors.white};">
  <tr>
    <td style="padding:0;vertical-align:top;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr>
          <td width="140" valign="top" style="width:140px;padding:0 16px 0 0;vertical-align:top;">
            <a href="https://www.bravo-transport.com" target="_blank" style="text-decoration:none;">
              <img src="${logoUrl}" width="120" alt="Bravo Transport" style="display:block;width:120px;height:auto;border:0;outline:none;" />
            </a>
          </td>
          <td valign="top" style="padding:0;vertical-align:top;">
            <div style="font-family:${FONT_STACK};font-size:15px;font-weight:700;line-height:20px;color:${colors.charcoal};mso-line-height-rule:exactly;">${nameLine}</div>
            <div style="font-family:${FONT_STACK};font-size:13px;line-height:20px;color:${colors.sky};mso-line-height-rule:exactly;padding-top:2px;">
              <span style="color:${colors.sky};">${company}</span>${socialBlock}
            </div>
            <div style="padding-top:6px;">${phoneHtml}</div>
            ${emailHtml}
            <div style="font-family:${FONT_STACK};font-size:12px;line-height:18px;mso-line-height-rule:exactly;"><a href="${escapeHtml(webHref)}" target="_blank" style="color:${colors.blue};text-decoration:none;">${webLabel}</a></div>
            ${address ? `<div style="font-family:${FONT_STACK};font-size:12px;line-height:18px;color:${colors.grey};mso-line-height-rule:exactly;padding-top:2px;">${address}</div>` : ''}
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:14px 0 10px 0;">
      <div style="font-family:${FONT_STACK};font-size:11px;font-weight:600;letter-spacing:0.04em;line-height:16px;color:${colors.blue};text-transform:uppercase;mso-line-height-rule:exactly;">${SERVICES_LINE}</div>
    </td>
  </tr>
  <tr>
    <td style="padding:0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:600px;">
        <tr>
          ${bannerCells}
        </tr>
      </table>
    </td>
  </tr>
</table>`
}
