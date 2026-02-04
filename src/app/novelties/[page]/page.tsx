import type { Metadata } from 'next'

import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getNoveltiesPageCount, getPaginatedNovelties } from '@/lib/mdx'

interface Props {
  params: Promise<{ page: string }>
}

export async function generateStaticParams() {
  const totalPages = await getNoveltiesPageCount()

  // Generate params for pages 2 and up (page 1 is handled by /novelties/page.tsx)
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: String(i + 2),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params
  return {
    description: 'Najnowsze informacje i realizacje AQUA-TEX Beskidy',
    title: `Aktualności - Strona ${page}`,
  }
}

export default async function NoveltiesPaginatedPage({ params }: Props) {
  const { page } = await params
  const pageNum = parseInt(page, 10)

  if (isNaN(pageNum) || pageNum < 2) {
    notFound()
  }

  const { items, pageInfo } = await getPaginatedNovelties(pageNum)

  if (items.length === 0) {
    notFound()
  }

  return (
    <main className='min-h-screen'>
      <div className='container-main py-20'>
        <h1 className='mb-8 font-bold text-4xl text-primary'>Aktualności - Strona {pageNum}</h1>

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
            <Link
              className='btn btn-secondary border-black text-black'
              href={pageInfo.currentPage === 2 ? '/novelties/' : `/novelties/${pageInfo.currentPage - 1}/`}
            >
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
            <Link
              className='btn btn-secondary border-black text-black'
              href={`/novelties/${pageInfo.currentPage + 1}/`}
            >
              Następna →
            </Link>
          )}
        </nav>
      </div>
    </main>
  )
}
