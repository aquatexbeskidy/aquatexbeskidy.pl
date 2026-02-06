'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'

import { useConsent } from '@/hooks/use-consent'

const GA_MEASUREMENT_ID = String(process.env.GA_MEASUREMENT_ID)

export function GoogleAnalytics() {
  const hasConsent = useConsent()

  if (!hasConsent) return null

  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />
}
