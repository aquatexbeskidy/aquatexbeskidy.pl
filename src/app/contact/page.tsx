import type { Metadata } from 'next'
import type { ContactPageContent } from '@/types/content'

import Image from 'next/image'

import { MapWrapper } from '@/components/map-wrapper'
import { getPageContent } from '@/lib/mdx'
import { buttonStyles } from '@/types/components'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<ContactPageContent>('contact')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'Kontakt',
  }
}

export default async function ContactPage() {
  const { frontmatter } = await getPageContent<ContactPageContent>('contact')
  const { contact } = frontmatter

  return (
    <main className='min-h-screen'>
      <section className='bg-primary py-16 text-white'>
        <div className='container-main text-center'>
          <h1 className='mb-4 font-bold text-4xl'>{contact.title}</h1>
          <p className='mx-auto max-w-2xl text-white/90 text-xl'>{contact.subTitle}</p>
        </div>
      </section>

      <section className='container-main py-16'>
        <div className='grid grid-cols-1 tablet:grid-cols-2 gap-12'>
          <div>
            <h2 className='mb-6 font-semibold text-2xl'>{contact.pinTitle}</h2>
            <p className='mb-8 text-lg text-text'>{contact.pinDesc}</p>

            <div className='flex flex-col gap-4'>
              {contact.buttons?.map((button, index) => (
                <a
                  className={`${buttonStyles[button.type as keyof typeof buttonStyles] || 'btn btn-primary'} inline-flex w-fit items-center gap-3`}
                  href={button.url}
                  key={index}
                  rel={button.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  target={button.url.startsWith('http') ? '_blank' : undefined}
                >
                  {button.icon && <Image alt='' height={20} src={`/${button.icon}`} width={20} />}
                  {button.text}
                </a>
              ))}
            </div>
          </div>

          <div className='overflow-hidden rounded-lg shadow-lg'>
            <MapWrapper />
          </div>
        </div>
      </section>
    </main>
  )
}
