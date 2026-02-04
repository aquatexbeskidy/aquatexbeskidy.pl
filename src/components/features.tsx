import type { FeaturesProps } from '@/types/components'

import Link from 'next/link'

export function Features({ features, title }: FeaturesProps) {
  return (
    <section className="relative mx-auto my-20 w-full max-w-[1200px] py-12 before:absolute before:top-0 before:left-1/2 before:h-px before:w-[70%] before:-translate-x-1/2 before:bg-black/5 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-[70%] after:-translate-x-1/2 after:bg-black/5 after:content-['']">
      {title && <h2 className='mb-20 w-full text-center font-semibold text-2xl'>{title}</h2>}

      <div className='flex tablet:flex-row flex-col flex-wrap items-center justify-center desktop-sm:gap-28 gap-12 tablet:gap-16'>
        {features.map((feature, index) => (
          <div className='flex flex-col items-center justify-center text-center' key={index}>
            {feature.icon && feature.icon.includes('/icons/') && (
              <img alt={feature.title} className='h-10 w-10' src={`/${feature.icon}`} />
            )}

            <div className='my-5 tablet:h-10 max-w-[160px] tablet:max-w-[120px] font-semibold text-base text-black leading-5'>
              {feature.title}
            </div>

            {feature.link && (
              <Link className='flex items-center gap-1 text-primary hover:text-primary-dark' href={feature.link.url}>
                <span>{feature.link.title}</span>
                <svg
                  className='h-4 w-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M9 5l7 7-7 7' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} />
                </svg>
              </Link>
            )}

            {feature.desc && <p className='mt-2 h-[100px] max-w-[210px] leading-8'>{feature.desc}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
