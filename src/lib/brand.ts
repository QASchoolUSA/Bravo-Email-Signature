/** Brand tokens and asset URLs for Bravo Transport tools */

export const colors = {
  navy: '#08415E',
  blue: '#2A91C7',
  sky: '#4DA8D3',
  charcoal: '#212121',
  grey: '#6E6868',
  muted: '#474642',
  surface: '#FAFAFA',
  white: '#FFFFFF',
  accent: '#374A61',
  softBg: '#E6F0F7',
} as const

/** Absolute CDN URLs for exported email HTML (images must load in email clients) */
export const cdn = {
  linkedin: 'https://bravo-transport.com/icons/linkedin.svg',
  facebook: 'https://bravo-transport.com/icons/facebook.svg',
  fleet: [
    'https://bravo-transport.com/bravo/benchmark_trucks1.jpg',
    'https://bravo-transport.com/bravo/benchmark_trucks2.jpg',
    'https://bravo-transport.com/images/divisions/flatbed-usa-bravo.jpg',
    'https://bravo-transport.com/images/divisions/stepdeck-usa-bravo.jpg',
  ] as const,
} as const

/** Local assets for generator UI preview */
export const local = {
  logo: '/assets/bravo-transport.webp',
  logoPng: '/assets/bravo-transport.png',
  linkedin: '/assets/linkedin.svg',
  facebook: '/assets/facebook.svg',
  fleet: [
    '/assets/fleet-1.jpg',
    '/assets/fleet-2.jpg',
    '/assets/fleet-3.jpg',
    '/assets/fleet-4.jpg',
  ] as const,
} as const

/** Absolute logo URL for pasted email signatures.
 * Uses PNG (with transparency) so Outlook desktop can render the mark.
 */
export function absoluteLogoUrl(origin = typeof window !== 'undefined' ? window.location.origin : ''): string {
  const base = origin.replace(/\/$/, '')
  return `${base}${local.logoPng}`
}

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/company/bravo-transport/',
  facebook: 'https://www.facebook.com/p/Bravo-Transport-LLC-100057520296178/',
} as const

export const SERVICES_LINE =
  'FTL | LTL | Oversize | Expedited | Dedicated | Military'

export const FONT_STACK =
  "Montserrat, Arial, Helvetica, sans-serif"

export type SignatureFields = {
  fullName: string
  title: string
  email: string
  mainPhone: string
  extension: string
  directPhone: string
  fax: string
  company: string
  address: string
  website: string
  showSocial: boolean
}

export const defaultFields: SignatureFields = {
  fullName: 'Dimitri Tarus',
  title: 'Operations Manager',
  email: 'dimitri@bravo-transport.com',
  mainPhone: '(630) 576-1131',
  extension: '209',
  directPhone: '(630) 580-0779',
  fax: '(630) 481-4999',
  company: 'Bravo Transport LLC',
  address: '631 Executive Dr. Willowbrook, IL 60527',
  website: 'www.bravo-transport.com',
  showSocial: true,
}
