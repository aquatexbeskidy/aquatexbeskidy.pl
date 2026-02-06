'use client'

import { useSyncExternalStore } from 'react'

import { CONSENT_CHANGE_EVENT, CONSENT_COOKIE_NAME, getCookie } from '@/lib/consent'

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}

function getSnapshot(): boolean {
  return getCookie(CONSENT_COOKIE_NAME) === 'accepted'
}

function getServerSnapshot(): boolean {
  return false
}

export function useConsent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
