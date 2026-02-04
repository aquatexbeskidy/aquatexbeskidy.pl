'use client'

import type { InfoBarProps } from '@/types/components'

export function InfoBar({ infoBar }: InfoBarProps) {
  return <div className='bg-primary px-5 py-2 text-center font-bold text-lg text-white'>{infoBar}</div>
}
