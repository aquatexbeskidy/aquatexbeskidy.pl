'use client'

import type { FAQItem, FAQProps } from '@/types/components'

import { clsx } from 'clsx'
import { useState } from 'react'

export function FAQItemComponent({ title, content, icon }: FAQItem) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='w-full border-black/5 border-b py-3'>
      <button
        className='flex w-full cursor-pointer select-none items-center justify-between py-2 text-left'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className='pr-4 font-semibold text-base leading-6'>{title}</span>
        <img
          alt=''
          className={clsx('tablet:w-5 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
          src={icon ? `/${icon}` : '/assets/icons/arrow_down.svg'}
        />
      </button>

      <div
        className={clsx(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <p className='mt-2 max-w-[90%] text-base text-text leading-6'>{content}</p>
      </div>
    </div>
  )
}

export function FAQ({ headline, list }: FAQProps) {
  return (
    <section
      className="relative mx-auto mb-20 w-full max-w-[1200px] px-5 py-10 before:absolute before:top-0 before:left-1/2 before:h-px before:w-[70%] before:-translate-x-1/2 before:bg-black/5 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-[70%] after:-translate-x-1/2 after:bg-black/5 after:content-['']"
      id='faq-section'
    >
      {headline && <h2 className='mb-16 py-5 text-center font-semibold text-2xl'>{headline}</h2>}

      <div className='space-y-1'>
        {list.map((item, index) => (
          <FAQItemComponent key={index} {...item} />
        ))}
      </div>
    </section>
  )
}
