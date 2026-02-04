'use client'

import { useEffect, useState } from 'react'

export function MapLeaflet() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className='flex h-[400px] w-full items-center justify-center bg-white-dark'>Ładowanie mapy...</div>
  }

  // Węgierska Górka coordinates
  const lat = 49.6036
  const lng = 19.1772

  return (
    <div className='h-[400px] w-full'>
      <iframe
        allowFullScreen
        height='100%'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
        style={{ border: 0 }}
        title='Lokalizacja AQUA-TEX Beskidy'
        width='100%'
      />
    </div>
  )
}
