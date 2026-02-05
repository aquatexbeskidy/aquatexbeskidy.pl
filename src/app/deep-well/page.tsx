import type { Metadata } from 'next'
import type { DeepWellPageContent } from '@/types/content'

import Image from 'next/image'

import { SchemaScript } from '@/components/schema/schema-script'
import { getPageContent } from '@/lib/mdx'
import { generateBreadcrumbList, generateBreadcrumbs, generateWebPage } from '@/lib/schema-generators'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<DeepWellPageContent>('deep-well')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'Studnie głębinowe',
  }
}

export default async function DeepWellPage() {
  const { frontmatter } = await getPageContent<DeepWellPageContent>('deep-well')
  const { deepWell } = frontmatter

  const webPageSchema = generateWebPage({
    description: frontmatter.meta?.description,
    name: frontmatter.meta?.title || 'Studnie głębinowe',
    url: 'https://aquatexbeskidy.pl/deep-well/',
  })

  const breadcrumbs = generateBreadcrumbs('/deep-well')
  const breadcrumbSchema = generateBreadcrumbList(breadcrumbs)

  return (
    <main className='min-h-screen'>
      <SchemaScript data={webPageSchema} />
      <SchemaScript data={breadcrumbSchema} />
      <section className='bg-primary py-16 text-white'>
        <div className='container-main'>
          <h1 className='text-center font-bold text-4xl'>{deepWell.mainTitle}</h1>
        </div>
      </section>

      <section className='container-main py-16'>
        <div className='mx-auto max-w-4xl'>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted MDX frontmatter content */}
          <p className='mb-8 text-lg text-text leading-8' dangerouslySetInnerHTML={{ __html: deepWell.mainContent }} />
          {deepWell.bonusContent && (
            <div className='rounded-lg bg-primary/10 p-6'>
              {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted MDX frontmatter content */}
              <p className='text-text leading-7' dangerouslySetInnerHTML={{ __html: deepWell.bonusContent }} />
            </div>
          )}
        </div>
      </section>

      {deepWell.additionList && (
        <section className='bg-white-dark py-16'>
          <div className='container-main'>
            <div className='grid grid-cols-1 tablet:grid-cols-2 gap-12'>
              {deepWell.additionList.map((item, index) => (
                <div className='overflow-hidden rounded-lg bg-white shadow-sm' key={index}>
                  {item.image && (
                    <div className='relative aspect-video'>
                      <Image
                        alt=''
                        className='object-cover'
                        fill
                        sizes='(max-width: 768px) 100vw, 50vw'
                        src={`/${item.image}`}
                      />
                    </div>
                  )}
                  <div className='p-6'>
                    <h3 className='mb-4 font-semibold text-lg text-primary'>{item.description}</h3>
                    <ul className='space-y-2'>
                      {item.contentList?.map((content, i) => (
                        <li className='flex items-start gap-2 text-text' key={i}>
                          <span className='mt-1 text-primary'>•</span>
                          {content.desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className='container-main py-16' id={deepWell.waterSearchId}>
        <div className='mx-auto max-w-4xl'>
          <h2 className='mb-6 font-semibold text-2xl text-primary'>{deepWell.waterSearchTitle}</h2>
          <p className='text-text leading-7'>{deepWell.waterSearchDesc}</p>
        </div>
      </section>

      <section className='bg-white-dark py-16' id={deepWell.waterConnectId}>
        <div className='container-main'>
          <div className='mx-auto max-w-4xl'>
            <h2 className='mb-6 font-semibold text-2xl text-primary'>{deepWell.waterConnectTitle}</h2>
            <p className='text-text leading-7'>{deepWell.waterConnectDesc}</p>
          </div>
        </div>
      </section>
    </main>
  )
}
