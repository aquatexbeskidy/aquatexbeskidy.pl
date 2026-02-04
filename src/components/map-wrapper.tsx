'use client'

import dynamic from 'next/dynamic'

const MapLeaflet = dynamic(() => import('@/components/map-leaflet'), {
  loading: () => (
    <div className='flex h-[400px] w-full items-center justify-center bg-white-dark'>Ładowanie mapy...</div>
  ),
  ssr: false,
})

export function MapWrapper() {
  return <MapLeaflet />
}

export default MapWrapper
