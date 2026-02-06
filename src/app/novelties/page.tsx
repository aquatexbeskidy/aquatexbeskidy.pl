import type { Metadata } from 'next'

import Link from 'next/link'

import { SchemaScript } from '@/components/schema/schema-script'
import { getPaginatedNovelties } from '@/lib/mdx'
import { getSocialMetadata } from '@/lib/metadata'
import { generateBreadcrumbList, generateBreadcrumbs, generateWebPage } from '@/lib/schema-generators'

export const metadata: Metadata = {
  description: 'Najnowsze informacje i realizacje AQUA-TEX Beskidy',
  title: 'Aktualności',
  ...getSocialMetadata({
    canonicalUrl: '/novelties/',
    description: 'Najnowsze informacje i realizacje AQUA-TEX Beskidy',
    title: 'Aktualności',
  }),
}

export default async function NoveltiesPage() {
  const { items, pageInfo } = await getPaginatedNovelties(1)

  const webPageSchema = generateWebPage({
    description: 'Najnowsze informacje i realizacje AQUA-TEX Beskidy',
    name: 'Aktualności',
    url: 'https://aquatexbeskidy.pl/novelties/',
  })

  const breadcrumbs = generateBreadcrumbs('/novelties')
  const breadcrumbSchema = generateBreadcrumbList(breadcrumbs)

  return (
    <main className='min-h-screen'>
      <SchemaScript data={webPageSchema} />
      <SchemaScript data={breadcrumbSchema} />
      <div className='container-main py-20'>
        <h1 className='mb-8 font-bold text-4xl text-primary'>Aktualności</h1>

        <div className='grid gap-6'>
          {items.map((item) => (
            <article
              className='rounded-lg border border-white-dark p-6 transition-shadow hover:shadow-lg'
              key={item.slug}
            >
              <h2 className='mb-2 font-semibold text-black text-xl'>{item.title}</h2>
              {item.showDate && (
                <time className='mb-3 block text-sm text-text/70'>
                  {new Date(item.date).toLocaleDateString('pl-PL')}
                </time>
              )}
              <p className='mb-4 text-text'>{item.excerpt}...</p>
              <a
                className='font-medium text-primary hover:text-primary-dark'
                href={item.url}
                rel='noopener noreferrer'
                target='_blank'
              >
                Czytaj więcej na Facebook →
              </a>
            </article>
          ))}
        </div>

        <nav className='mt-12 flex justify-center gap-2'>
          {pageInfo.hasPreviousPage && (
            <Link className='btn btn-secondary border-black text-black' href='/novelties/'>
              ← Poprzednia
            </Link>
          )}

          {Array.from({ length: pageInfo.totalPages }, (_, i) => (
            <Link
              className={`rounded px-4 py-2 ${
                pageInfo.currentPage === i + 1
                  ? 'bg-primary text-white'
                  : 'bg-white-dark text-black hover:bg-primary hover:text-white'
              }`}
              href={i === 0 ? '/novelties/' : `/novelties/${i + 1}/`}
              key={i + 1}
            >
              {i + 1}
            </Link>
          ))}

          {pageInfo.hasNextPage && (
            <Link className='btn btn-secondary border-black text-black' href='/novelties/2/'>
              Następna →
            </Link>
          )}
        </nav>
      </div>
    </main>
  )
}
