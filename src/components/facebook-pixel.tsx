'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

/**
 * Facebook Pixel types for TypeScript strict mode
 */
declare global {
  interface Window {
    fbq?: (command: 'init' | 'track', ...args: unknown[]) => void
  }
}

/**
 * Facebook Pixel component for tracking analytics and conversion events.
 *
 * Features:
 * - Pixel initialization with consent check
 * - Automatic PageView tracking on route changes
 * - Noscript fallback for users without JavaScript
 * - Error handling without breaking page functionality
 * - Manual testing flag for development
 *
 * @remarks
 * - Consent integration depends on future cookie consent system (task #8)
 * - Currently defaults to no tracking (consent = false)
 * - Manual testing: Set `localStorage.setItem('test-facebook-pixel', 'true')` to enable tracking
 */

/**
 * Get consent state for Facebook Pixel tracking.
 *
 * @returns `true` if user has granted consent for tracking, `false` otherwise
 *
 * @remarks
 * - Currently returns `false` (no tracking) by default
 * - Checks localStorage for manual testing flag: `test-facebook-pixel === 'true'`
 * - Will be updated to read from cookie consent system in task #8
 */
function getConsentState(): boolean {
  // Manual testing flag - set localStorage.setItem('test-facebook-pixel', 'true') in browser console
  const testFlag = typeof window !== 'undefined' && window.localStorage.getItem('test-facebook-pixel') === 'true'

  // Placeholder: Cookie consent integration will be added in task #8
  // TODO: Replace with actual consent check when cookie consent system is implemented
  return testFlag || false
}

export function FacebookPixel() {
  const pathname = usePathname()
  const lastTrackedPath = useRef<string | null>(null)
  const [consent, setConsent] = useState(false)
  const pixelLoaded = useRef(false)

  // Check consent state on mount
  useEffect(() => {
    setConsent(getConsentState())
  }, [])

  useEffect(() => {
    if (!consent || !pixelLoaded.current) return

    if (lastTrackedPath.current === pathname) {
      console.log('[Facebook Pixel] Skipped tracking: duplicate route, lastTrackedPath:', lastTrackedPath.current)
      return
    }

    console.log('[Facebook Pixel] Tracking PageView for pathname:', pathname)
    try {
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'PageView')
        lastTrackedPath.current = pathname
        console.log(`[Facebook Pixel] PageView tracked for: ${pathname}`)
      }
    } catch (error) {
      console.warn('[Facebook Pixel] Error tracking PageView:', error)
    }
  }, [pathname])

  function initializePixel(pixelId: string): void {
    const currentConsent = getConsentState()

    if (!currentConsent) {
      console.log('[Facebook Pixel] Skipped initialization: No consent')
      return
    }

    // Mark pixel as loaded after successful initialization
    pixelLoaded.current = true

    // Delay initialization slightly to ensure Facebook script is fully loaded
    try {
      setTimeout(() => {
        window.fbq?.('init', pixelId)
        console.log(`[Facebook Pixel] Initialized with ID: ${pixelId}`)
      }, 100)
    } catch (error) {
      console.warn('[Facebook Pixel] Initialization error:', error)
    }
  }

  const pixelId = String(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '1369004450132215')

  return (
    <>
      {consent && (
        <Script
          id='facebook-pixel'
          onError={() => console.warn('[Facebook Pixel] Failed to load script')}
          onLoad={() => initializePixel(pixelId)}
          src='https://connect.facebook.net/en_US/fbevents.js'
          strategy='afterInteractive'
        />
      )}

      <noscript>
        {/* biome-ignore lint/performance/noImgElement: Required for noscript fallback - Next.js Image requires JavaScript */}
        <img
          alt='Facebook Pixel'
          height='1'
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          style={{ display: 'none' }}
          width='1'
        />
      </noscript>
    </>
  )
}
