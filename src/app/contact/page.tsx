import type { Metadata } from 'next'
import type { ContactPageContent } from '@/types/content'

import Image from 'next/image'

import { MapWrapper } from '@/components/map-wrapper'
import { SchemaScript } from '@/components/schema/schema-script'
import { getPageContent } from '@/lib/mdx'
import { getSocialMetadata } from '@/lib/metadata'
import {
  generateBreadcrumbList,
  generateBreadcrumbs,
  generateLocalBusiness,
  generateWebPage,
} from '@/lib/schema-generators'
import { buttonStyles } from '@/types/components'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<ContactPageContent>('contact')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'Kontakt',
    ...getSocialMetadata({
      canonicalUrl: '/contact/',
      description: frontmatter.meta?.description,
      title: frontmatter.meta?.title || 'Kontakt',
    }),
  }
}

export default async function ContactPage() {
  const { frontmatter } = await getPageContent<ContactPageContent>('contact')
  const { contact } = frontmatter

  // Extract address from pinDesc: "Plażowa 6, 34-350 Węgierska Górka"
  const addressMatch = contact.pinDesc.match(/(.+), (.+)/)
  const streetAddress = addressMatch?.[1] || contact.pinDesc
  const postalCity = addressMatch?.[2] || ''
  const [postalCode, addressLocality] = postalCity.split(' ')

  // Extract phone and email from buttons
  const phoneButton = contact.buttons?.find((b) => b.url.startsWith('tel:'))
  const emailButton = contact.buttons?.find((b) => b.url.startsWith('mailto:'))
  const phone = phoneButton?.text.replace(/\s/g, '') || ''
  const email = emailButton?.url.replace('mailto:', '') || ''

  const localBusinessSchema = generateLocalBusiness({
    address: {
      addressCountry: 'PL',
      addressLocality,
      postalCode,
      streetAddress,
    },
    areaServed: ['Śląskie', 'Małopolskie', 'Beskidy'],
    email,
    name: 'AQUA-TEX Beskidy',
    telephone: phone,
    url: 'https://aquatexbeskidy.pl/contact/',
  })

  const webPageSchema = generateWebPage({
    description: frontmatter.meta?.description,
    name: frontmatter.meta?.title || 'Kontakt',
    url: 'https://aquatexbeskidy.pl/contact/',
  })

  const breadcrumbs = generateBreadcrumbs('/contact')
  const breadcrumbSchema = generateBreadcrumbList(breadcrumbs)

  return (
    <main className='min-h-screen'>
      <SchemaScript data={localBusinessSchema} />
      <SchemaScript data={webPageSchema} />
      <SchemaScript data={breadcrumbSchema} />
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
