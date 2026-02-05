import type { Metadata } from 'next'
import type { BoreholePageContent } from '@/types/content'

import Image from 'next/image'

import { getPageContent } from '@/lib/mdx'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<BoreholePageContent>('borehole')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'Odwierty',
  }
}

export default async function BoreholePage() {
  const { frontmatter } = await getPageContent<BoreholePageContent>('borehole')
  const { borehole } = frontmatter

  return (
    <main className='min-h-screen'>
      <section className='bg-primary py-16 text-white'>
        <div className='container-main'>
          <h1 className='text-center font-bold text-4xl'>{borehole.mainTitle}</h1>
        </div>
      </section>

      <section className='container-main py-16'>
        <div className='mx-auto max-w-4xl'>
          <p className='text-lg text-text leading-8'>{borehole.mainContent}</p>
        </div>
      </section>

      {borehole.equipmentImgList && borehole.equipmentImgList.length > 0 && (
        <section className='bg-white-dark py-16'>
          <div className='container-main'>
            <div className='grid desktop-sm:grid-cols-4 grid-cols-1 tablet:grid-cols-2 gap-6'>
              {borehole.equipmentImgList.map((item, index) => (
                <div className='relative aspect-square overflow-hidden rounded-lg' key={index}>
                  <Image
                    alt={`Sprzęt do odwiertów ${index + 1}`}
                    className='object-cover transition-transform duration-300 hover:scale-105'
                    fill
                    sizes='(max-width: 768px) 100vw, 25vw'
                    src={`/${item.image}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className='container-main py-16'>
        <div className='mx-auto max-w-4xl'>
          <p className='text-lg text-text leading-8'>{borehole.subContent}</p>
        </div>
      </section>
    </main>
  )
}
