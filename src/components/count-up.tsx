'use client'

import type { CountUpProps } from '@/types/components'

import Image from 'next/image'
import ReactCountUp from 'react-countup'

export function CountUp({
  title,
  subTitle,
  count,
  score,
  iconSmile,
  iconStars,
  iconGoogle,
  opinions,
  googleOpinions,
}: CountUpProps) {
  return (
    <section className='mx-auto desktop:my-20 my-16 flex w-full max-w-[1200px] flex-col items-center desktop:px-0 px-5'>
      {title && <h2 className='desktop-sm:mb-3 mb-4 text-center font-semibold text-3xl'>{title}</h2>}

      {subTitle && <p className='desktop-sm:mt-4 mt-2 desktop-sm:mb-5 text-center text-xl leading-5'>{subTitle}</p>}

      {iconSmile?.includes('/icons/') && (
        <div className='my-5'>
          <Image
            alt={title}
            className='h-12 tablet-lg:h-16 tablet:h-14 tablet-lg:w-16 tablet:w-14 w-12'
            height={64}
            src={`/${iconSmile}`}
            width={64}
          />
        </div>
      )}

      {count > 0 && (
        <ReactCountUp
          className='mb-5 font-bold text-3xl text-primary'
          enableScrollSpy
          end={count}
          scrollSpyOnce
          separator=''
          start={0}
        />
      )}

      <div className='mb-8 flex items-center justify-center gap-2'>
        {score && <span className='font-bold'>{score}</span>}
        {iconStars?.includes('/icons/') && (
          <Image alt='Rating stars' className='h-5 w-auto' height={20} src={`/${iconStars}`} width={100} />
        )}
        {iconGoogle?.includes('/icons/') && (
          <Image alt='Google' className='h-5 w-auto' height={20} src={`/${iconGoogle}`} width={100} />
        )}
      </div>

      <div className='mb-8 grid grid-cols-2 tablet-lg:grid-cols-3 gap-4 tablet-lg:gap-7'>
        {opinions.map((opinion, index) => (
          <div
            className='flex tablet-lg:h-[250px] flex-col items-center justify-center rounded p-3 tablet-lg:p-6 shadow-md'
            key={index}
          >
            <p className='mb-2 w-full text-left font-bold text-primary text-xl'>{opinion.user}</p>
            {opinion.message && <span className='text-text leading-5 tablet:leading-6'>{opinion.message}</span>}
          </div>
        ))}
      </div>

      <a className='btn btn-tertiary' href={googleOpinions} rel='noopener noreferrer' target='_blank'>
        Czytaj więcej
      </a>
    </section>
  )
}
