export const CONSENT_COOKIE_NAME = 'cookie_consent'
export const CONSENT_COOKIE_EXPIRY = 365
export const CONSENT_CHANGE_EVENT = 'consent-change'

export type ConsentValue = 'accepted' | 'rejected'

export function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : undefined
}

export function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  // biome-ignore lint/suspicious/noDocumentCookie: dedicated cookie utility
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`
}

export function dispatchConsentChange() {
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}
