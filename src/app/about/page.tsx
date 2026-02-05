import type { Metadata } from 'next'
import type { AboutPageContent } from '@/types/content'

import Image from 'next/image'

import { SchemaScript } from '@/components/schema/schema-script'
import { getPageContent } from '@/lib/mdx'
import { generateBreadcrumbList, generateLocalBusiness, generateWebPage } from '@/lib/schema-generators'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<AboutPageContent>('about')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'O nas',
  }
}

export default async function AboutPage() {
  const { frontmatter } = await getPageContent<AboutPageContent>('about')
  const { about } = frontmatter

  const localBusinessSchema = generateLocalBusiness({
    address: {
      addressCountry: 'PL',
      addressLocality: 'Węgierska Górka',
      postalCode: '34-350',
      streetAddress: 'Plażowa 6',
    },
    areaServed: ['Śląskie', 'Małopolskie', 'Beskidy'],
    description: frontmatter.meta?.description,
    name: 'AQUA-TEX Beskidy',
    url: 'https://aquatexbeskidy.pl/about/',
  })

  const webPageSchema = generateWebPage({
    description: frontmatter.meta?.description,
    name: frontmatter.meta?.title || 'O nas',
    url: 'https://aquatexbeskidy.pl/about/',
  })

  const breadcrumbSchema = generateBreadcrumbList([
    { name: 'Strona główna', url: 'https://aquatexbeskidy.pl/' },
    { name: 'O nas', url: 'https://aquatexbeskidy.pl/about/' },
  ])

  return (
    <main className='min-h-screen'>
      <SchemaScript data={localBusinessSchema} />
      <SchemaScript data={webPageSchema} />
      <SchemaScript data={breadcrumbSchema} />
      <section className='bg-primary py-16 text-white'>
        <div className='container-main'>
          <h1 className='text-center font-bold text-4xl'>{about.mainTitle}</h1>
        </div>
      </section>

      <section className='container-main py-16'>
        <div className='grid grid-cols-1 tablet:grid-cols-2 gap-12'>
          {about.contentBlocks?.map((block, index) => (
            <div key={index}>
              {block.contentList?.map((item, i) => (
                <p className='mb-4 text-text leading-7' key={i}>
                  {item.desc}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {about.viewOfWorkImgList && about.viewOfWorkImgList.length > 0 && (
        <section className='container-main pb-16'>
          <div className='grid grid-cols-1 tablet:grid-cols-3 gap-6'>
            {about.viewOfWorkImgList.map((item, index) => (
              <div className='relative aspect-video overflow-hidden rounded-lg' key={index}>
                <Image
                  alt={`Zdjęcie z pracy ${index + 1}`}
                  className='object-cover transition-transform duration-300 hover:scale-105'
                  fill
                  sizes='(max-width: 768px) 100vw, 33vw'
                  src={`/${item.image}`}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {about.whyUsList && (
        <section className='bg-white-dark py-16'>
          <div className='container-main'>
            <h2 className='mb-12 text-center font-semibold text-2xl'>{about.subTitle}</h2>
            <div className='grid desktop-sm:grid-cols-3 grid-cols-1 tablet:grid-cols-2 gap-8'>
              {about.whyUsList.map((item, index) => (
                <div className='rounded-lg bg-white p-6 shadow-sm' key={index}>
                  <h3 className='mb-3 font-semibold text-lg text-primary'>{item.title}</h3>
                  <p className='text-text leading-6'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
