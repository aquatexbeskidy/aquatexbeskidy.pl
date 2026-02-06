'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  CONSENT_COOKIE_EXPIRY,
  CONSENT_COOKIE_NAME,
  type ConsentValue,
  dispatchConsentChange,
  getCookie,
  setCookie,
} from '@/lib/consent'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (!getCookie(CONSENT_COOKIE_NAME)) {
      setShowBanner(true)
    }
  }, [])

  function setConsent(value: ConsentValue) {
    setCookie(CONSENT_COOKIE_NAME, value, CONSENT_COOKIE_EXPIRY)
    dispatchConsentChange()
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className='fixed right-0 bottom-0 left-0 z-50 border-gray-200 border-t bg-white p-4 shadow-lg'>
      <div className='container-main flex tablet:flex-row flex-col items-center tablet:justify-between gap-4'>
        <p className='tablet:text-left text-center text-sm text-text'>
          Ta strona używa plików cookies w celu zapewnienia prawidłowego działania oraz do celów analitycznych.{' '}
          <Link className='text-primary underline hover:text-primary-dark' href='/privacy-policy'>
            Polityka prywatności
          </Link>
        </p>

        <div className='flex shrink-0 gap-3'>
          <button className='btn btn-primary text-sm' onClick={() => setConsent('accepted')} type='button'>
            Akceptuj
          </button>
          <button
            className='btn border-2 border-gray-300 bg-white text-sm text-text hover:bg-gray-100'
            onClick={() => setConsent('rejected')}
            type='button'
          >
            Odrzuć
          </button>
        </div>
      </div>
    </div>
  )
}
