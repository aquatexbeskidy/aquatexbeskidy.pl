'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useRef } from 'react'

import { useConsent } from '@/hooks/use-consent'

interface FbqFunction {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  loaded: boolean
  version: string
  push: (...args: unknown[]) => void
}

declare global {
  interface Window {
    fbq?: FbqFunction
    _fbq?: FbqFunction
  }
}

const PIXEL_ID = String(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID)

function initFbqStub() {
  if (window.fbq) return

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
      fbq.callMethod(...args)
    } else {
      fbq.queue.push(args)
    }
  }) as FbqFunction

  fbq.queue = []
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.push = fbq

  window.fbq = fbq
  if (!window._fbq) window._fbq = fbq
}

export function FacebookPixel() {
  const lastTrackedPath = useRef<string | null>(null)
  const hasConsent = useConsent()
  const pathname = usePathname()

  useEffect(() => {
    if (!hasConsent) return

    initFbqStub()
    window.fbq?.('init', PIXEL_ID)
  }, [hasConsent])

  useEffect(() => {
    if (!hasConsent) return
    if (lastTrackedPath.current === pathname) return

    if (window.fbq) {
      window.fbq('track', 'PageView')
      lastTrackedPath.current = pathname
    }
  }, [pathname, hasConsent])

  if (!hasConsent) return null

  return <Script id='facebook-pixel' src='https://connect.facebook.net/en_US/fbevents.js' strategy='afterInteractive' />
}
