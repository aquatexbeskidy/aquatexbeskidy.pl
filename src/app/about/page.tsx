import type { Metadata } from 'next'
import type { AboutPageContent } from '@/types/content'

import { getPageContent } from '@/lib/mdx'

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

  return (
    <main className='min-h-screen'>
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
                <p className='mb-4 text-text leading-7' dangerouslySetInnerHTML={{ __html: item.desc }} key={i} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {about.viewOfWorkImgList && about.viewOfWorkImgList.length > 0 && (
        <section className='container-main pb-16'>
          <div className='grid grid-cols-1 tablet:grid-cols-3 gap-6'>
            {about.viewOfWorkImgList.map((item, index) => (
              <div className='aspect-video overflow-hidden rounded-lg' key={index}>
                <img
                  alt={`Zdjęcie z pracy ${index + 1}`}
                  className='h-full w-full object-cover transition-transform duration-300 hover:scale-105'
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
