import type { Metadata } from 'next'
import type { OfferPageContent } from '@/types/content'

import Image from 'next/image'

import { getPageContent } from '@/lib/mdx'
import { buttonStyles } from '@/types/components'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<OfferPageContent>('offer')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'Oferta',
  }
}

export default async function OfferPage() {
  const { frontmatter } = await getPageContent<OfferPageContent>('offer')
  const { offer } = frontmatter

  return (
    <main className='min-h-screen'>
      <section className='bg-primary py-16 text-white'>
        <div className='container-main'>
          <h1 className='mb-6 text-center font-bold text-4xl'>{offer.mainTitle}</h1>
          <p className='mx-auto max-w-4xl text-center text-lg text-white/90 leading-7'>{offer.mainContent}</p>
        </div>
      </section>

      <section className='container-main py-12'>
        <p className='mx-auto max-w-3xl text-center text-lg text-text'>{offer.subContent}</p>
        {offer.bonusInfo && (
          <div className='mx-auto mt-8 max-w-3xl rounded-lg bg-primary/10 p-6 text-center'>
            <p className='text-text'>
              {offer.bonusInfo} <strong className='text-primary'>{offer.bonusInfoStrong}</strong>
            </p>
          </div>
        )}
      </section>

      <section className='bg-white-dark py-16'>
        <div className='container-main'>
          <h2 className='mb-12 text-center font-semibold text-2xl'>{offer.quickOfferTitle}</h2>
          <div className='grid desktop-sm:grid-cols-3 grid-cols-1 tablet:grid-cols-2 gap-8'>
            {offer.quickOfferList?.map((item, index) => (
              <div className='flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-sm' key={index}>
                {item.icon && <Image alt='' className='mb-4' height={64} src={`/${item.icon}`} width={64} />}
                <h3 className='mb-3 font-semibold text-lg text-primary'>{item.title}</h3>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted MDX frontmatter content */}
                <p className='text-text leading-6' dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
          {offer.link && offer.link.length > 0 && (
            <div className='mt-8 flex justify-center'>
              {offer.link.map((link, index) => (
                <a
                  className={buttonStyles[link.type as keyof typeof buttonStyles] || 'btn btn-primary'}
                  href={link.url}
                  key={index}
                >
                  {link.text}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className='container-main py-16'>
        <h2 className='mb-12 text-center font-semibold text-2xl'>{offer.subTitle}</h2>
        <div className='mx-auto max-w-3xl'>
          <div className='overflow-hidden rounded-lg bg-white shadow-sm'>
            {offer.offerList?.map((item, index) => (
              <div
                className={`flex items-center justify-between p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-white-dark'}`}
                key={index}
              >
                <span className='pr-4 text-text'>{item.title}</span>
                <span className='whitespace-nowrap font-semibold text-primary'>{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {offer.reviewImgList && offer.reviewImgList.length > 0 && (
        <section className='container-main pb-16'>
          <div className='grid grid-cols-1 tablet:grid-cols-3 gap-6'>
            {offer.reviewImgList.map((item, index) => (
              <div className='relative aspect-video overflow-hidden rounded-lg' key={index}>
                <Image
                  alt={`Zdjęcie z realizacji ${index + 1}`}
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
    </main>
  )
}
