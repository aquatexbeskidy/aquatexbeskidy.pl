'use client'

import type { HeaderProps } from '@/types/components'

import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { InfoBar } from './info-bar'

export function Header({ topLinks, bottomLinks, siteTitle, infoBar }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)

  return (
    <>
      <InfoBar infoBar={infoBar} />

      <section className='border-black/5 border-b bg-black/1'>
        <div className='container-main flex h-12 items-center tablet:justify-end justify-center'>
          <nav>
            <ul className='flex items-center gap-4'>
              {topLinks.map((link) => (
                <li key={link.url}>
                  <a
                    className='flex items-center gap-2 font-medium text-primary text-sm hover:underline'
                    href={link.url}
                    rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    target={link.url.startsWith('http') ? '_blank' : undefined}
                  >
                    {link.icon && <Image alt='' height={20} src={`/${link.icon}`} width={20} />}
                    <span className={link.icon ? 'tablet:inline hidden' : ''}>{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className='sticky top-0 z-50 bg-white shadow-sm'>
        <div className='container-main flex h-28 tablet:h-20 items-center justify-between'>
          <Link className='flex items-center' href='/'>
            <Image
              alt={siteTitle}
              className='h-12 tablet:h-10 w-auto'
              height={48}
              src='/assets/icons/atb_logo.svg'
              width={120}
            />
          </Link>

          <nav className='desktop-sm:block hidden'>
            <ul className='flex items-center gap-6'>
              {bottomLinks.slice(1).map((link) => (
                <li key={link.url}>
                  <Link
                    className={clsx(
                      'font-medium text-base transition-colors hover:text-primary',
                      pathname === link.url ? 'text-primary' : 'text-black',
                    )}
                    href={link.url}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            aria-label='Menu'
            className='flex desktop-sm:hidden flex-col gap-1.5 p-2'
            onClick={toggleMobileMenu}
            type='button'
          >
            <span
              className={clsx('h-0.5 w-6 bg-black transition-transform', isMobileMenuOpen && 'translate-y-2 rotate-45')}
            />
            <span className={clsx('h-0.5 w-6 bg-black transition-opacity', isMobileMenuOpen && 'opacity-0')} />
            <span
              className={clsx(
                'h-0.5 w-6 bg-black transition-transform',
                isMobileMenuOpen && '-translate-y-2 -rotate-45',
              )}
            />
          </button>
        </div>
      </section>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className='fixed inset-0 top-[calc(3rem+7rem)] z-40 desktop-sm:hidden bg-white'
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: -20 }}
          >
            <nav className='container-main py-8'>
              <ul className='flex flex-col gap-4'>
                {bottomLinks.map((link) => (
                  <li key={link.url}>
                    <Link
                      className={clsx(
                        'block border-white-dark border-b py-3 font-medium text-xl',
                        pathname === link.url ? 'text-primary' : 'text-black',
                      )}
                      href={link.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
