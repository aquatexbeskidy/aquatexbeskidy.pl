import type { FooterProps } from '@/types/components'

import Image from 'next/image'
import Link from 'next/link'

export function Footer({ links, quickContact, copyright, nomadsCodes, siteTitle }: FooterProps) {
  return (
    <>
      <section className='bg-primary'>
        <div className='container-main flex tablet:flex-row flex-col items-center justify-between gap-4 py-5 tablet:py-3'>
          <div className='tablet:text-left text-center text-white'>
            <p className='font-semibold text-xl'>{quickContact.title}</p>
            <p className='mt-2 max-w-[270px] tablet:max-w-none text-base'>{quickContact.desc}</p>
          </div>
          <div className='flex gap-3'>
            {quickContact.link.map((item) => (
              <a className='btn btn-secondary flex items-center gap-2 font-semibold' href={item.url} key={item.text}>
                {item.icon && (
                  <Image
                    alt=''
                    className='h-4 tablet:h-5 tablet:w-5 w-4'
                    height={20}
                    src={`/${item.icon}`}
                    width={20}
                  />
                )}
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className='bg-black/[0.01]'>
        <div className='container-main flex tablet:flex-row flex-col tablet:items-start items-center justify-between gap-8 py-10'>
          {links.map((section) => (
            <div className='tablet:text-left text-center' key={section.title}>
              <h3 className='mb-4 font-semibold text-lg'>{section.title}</h3>
              {section.type === 'nested' && (
                <ul className='space-y-2'>
                  {section.links.map((link) => (
                    <li key={link.url}>
                      {link.url.startsWith('http') ? (
                        <a
                          className='text-text hover:text-black hover:underline'
                          href={link.url}
                          rel='noopener noreferrer'
                          target='_blank'
                        >
                          {link.text}
                        </a>
                      ) : (
                        <Link className='text-text hover:text-black hover:underline' href={link.url}>
                          {link.text}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className='container-main flex tablet:flex-row flex-col items-center justify-between gap-4 py-4 text-sm'>
          <div className='tablet:text-left text-center'>
            <Image
              alt={siteTitle}
              className='mx-auto tablet:mx-0 mb-4 h-8 w-auto'
              height={32}
              src='/assets/icons/atb_logo.svg'
              width={80}
            />
            <p className='text-text'>{copyright}</p>
          </div>

          <div className='flex items-center gap-2'>
            {nomadsCodes.map((item) => (
              <a
                className='flex items-center gap-2 text-text hover:text-black'
                href={item.url}
                key={item.url}
                rel='noopener noreferrer'
                target='_blank'
              >
                <span>{item.madeBy}:</span>
                <Image alt={item.name} className='h-5 w-auto' height={20} src={`/${item.icon}`} width={20} />
                <span className='font-medium'>{item.name}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
