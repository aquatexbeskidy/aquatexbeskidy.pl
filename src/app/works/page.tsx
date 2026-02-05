import type { Metadata } from 'next'
import type { WorksPageContent } from '@/types/content'

import { SchemaScript } from '@/components/schema/schema-script'
import { getPageContent } from '@/lib/mdx'
import { generateBreadcrumbList, generateBreadcrumbs, generateWebPage } from '@/lib/schema-generators'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<WorksPageContent>('works')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'Realizacje',
  }
}

export default async function WorksPage() {
  const { frontmatter } = await getPageContent<WorksPageContent>('works')
  const { videosTitle, videos } = frontmatter

  const webPageSchema = generateWebPage({
    description: frontmatter.meta?.description,
    name: frontmatter.meta?.title || 'Realizacje',
    url: 'https://aquatexbeskidy.pl/works/',
  })

  const breadcrumbs = generateBreadcrumbs('/works')
  const breadcrumbSchema = generateBreadcrumbList(breadcrumbs)

  return (
    <main className='min-h-screen'>
      <SchemaScript data={webPageSchema} />
      <SchemaScript data={breadcrumbSchema} />
      <section className='bg-primary py-16 text-white'>
        <div className='container-main text-center'>
          <h1 className='font-bold text-4xl'>Realizacje</h1>
          <p className='mt-4 text-white/90 text-xl'>Zobacz nasze dotychczasowe prace</p>
        </div>
      </section>

      <section className='container-main py-16'>
        <h2 className='mb-12 text-center font-semibold text-2xl'>{videosTitle}</h2>
        <div className='grid desktop-sm:grid-cols-3 grid-cols-1 tablet:grid-cols-2 gap-8'>
          {videos?.map((video, index) => (
            <div className='overflow-hidden rounded-lg bg-white shadow-sm' key={index}>
              <div className='aspect-video'>
                <iframe
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  className='h-full w-full'
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.videoTitle}
                />
              </div>
              <div className='p-4'>
                <h3 className='mb-2 font-semibold text-primary'>{video.title}</h3>
                <p className='text-sm text-text/70'>{video.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
