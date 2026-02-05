import type { Metadata } from 'next'
import type { Feature, HomePageContent } from '@/types/content'

import Image from 'next/image'

import { CountUp } from '@/components/count-up'
import { FAQ } from '@/components/faq'
import { Hero } from '@/components/hero'
import { getPageContent } from '@/lib/mdx'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<HomePageContent>('home')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'Strona główna',
  }
}

export default async function HomePage() {
  const { frontmatter } = await getPageContent<HomePageContent>('home')

  return (
    <main>
      {frontmatter.hero && (
        <Hero
          buttons={frontmatter.hero.buttons}
          image={frontmatter.hero.image}
          subtitle={frontmatter.hero.subtitle}
          title={frontmatter.hero.title}
        />
      )}

      {frontmatter.homeCountUp && (
        <CountUp
          count={frontmatter.homeCountUp.count}
          googleOpinions={frontmatter.homeCountUp.googleOpinions}
          iconGoogle={frontmatter.homeCountUp.iconGoogle}
          iconSmile={frontmatter.homeCountUp.iconSmile}
          iconStars={frontmatter.homeCountUp.iconStars}
          opinions={frontmatter.homeCountUp.opinions}
          score={frontmatter.homeCountUp.score}
          subTitle={frontmatter.homeCountUp.subTitle}
          title={frontmatter.homeCountUp.title}
        />
      )}

      {frontmatter.moreAdvantages && (
        <section className='mx-auto my-16 w-full max-w-[1200px] px-5'>
          <h2 className='mb-12 text-center font-semibold text-2xl'>{frontmatter.moreAdvantages.title}</h2>
          <div className='grid desktop-sm:grid-cols-3 grid-cols-1 tablet:grid-cols-2 gap-8'>
            {frontmatter.moreAdvantages.advantages?.map((item: Feature, index: number) => (
              <div className='rounded-lg bg-white-dark/30 p-6 text-center' key={index}>
                {item.icon && (
                  <Image alt={item.title} className='mx-auto mb-4' height={48} src={`/${item.icon}`} width={48} />
                )}
                <h3 className='mb-3 font-semibold text-lg'>{item.title}</h3>
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted MDX frontmatter content */}
                {item.desc && <p className='text-text leading-6' dangerouslySetInnerHTML={{ __html: item.desc }} />}
              </div>
            ))}
          </div>
        </section>
      )}

      {frontmatter.advantages && (
        <section className='bg-primary py-16 text-white'>
          <div className='container-main'>
            <h2 className='mb-12 text-center font-semibold text-2xl'>{frontmatter.advantages.title}</h2>
            <div className='grid grid-cols-1 tablet:grid-cols-3 gap-8'>
              {frontmatter.advantages.advList?.map((item: Feature, index: number) => (
                <div className='text-center' key={index}>
                  {item.icon && (
                    <Image
                      alt={item.title}
                      className='mx-auto mb-4 brightness-0 invert'
                      height={48}
                      src={`/${item.icon}`}
                      width={48}
                    />
                  )}
                  <h3 className='mb-2 font-semibold text-lg'>{item.title}</h3>
                  <p className='text-white/80'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {frontmatter.faq && <FAQ headline={frontmatter.faq.headline} list={frontmatter.faq.list} />}
    </main>
  )
}
