import type { HeroProps } from '@/types/components'

import { clsx } from 'clsx'
import Link from 'next/link'

import { stringIncludesHTML } from '@/lib/mdx'
import { buttonStyles } from '@/types/components'

export function Hero({ title, subtitle, image, buttons }: HeroProps) {
  const imagePath = image ? (image.startsWith('/') ? image : `/${image}`) : ''

  return (
    <section
      className='filter-duotone w-full bg-cover bg-left bg-no-repeat'
      style={{ backgroundImage: `url(${imagePath})` }}
    >
      <div className='container-main flex desktop-sm:min-h-[600px] min-h-110 tablet:min-h-[500px] flex-col tablet:items-start items-center justify-center py-16'>
        {title &&
          (stringIncludesHTML(title) ? (
            <h1
              className='tablet:text-left text-center font-semibold text-4xl text-white leading-tight'
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted MDX frontmatter content
              dangerouslySetInnerHTML={{ __html: title }}
            />
          ) : (
            <h1 className='tablet:text-left text-center font-semibold text-4xl text-white leading-tight'>{title}</h1>
          ))}

        {subtitle &&
          (stringIncludesHTML(subtitle) ? (
            <p
              className='my-4 tablet:my-8 max-w-58 tablet:max-w-none tablet:text-left text-center font-medium text-2xl text-white leading-8'
              // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted MDX frontmatter content
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          ) : (
            <p className='my-4 tablet:my-8 max-w-58 tablet:max-w-none tablet:text-left text-center font-medium text-2xl text-white leading-8'>
              {subtitle}
            </p>
          ))}

        {buttons && buttons.length > 0 && (
          <div className='mt-4 flex tablet:flex-row flex-col gap-4'>
            {buttons.map((button, index) =>
              button.link.startsWith('tel:') || button.link.startsWith('mailto:') || button.link.startsWith('http') ? (
                <a
                  className={clsx(
                    buttonStyles[button.type] || 'btn btn-primary',
                    index === 1 && 'font-semibold text-xl',
                  )}
                  href={button.link}
                  key={index}
                  rel={button.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  target={button.link.startsWith('http') ? '_blank' : undefined}
                >
                  {button.title}
                </a>
              ) : (
                <Link
                  className={clsx(
                    buttonStyles[button.type] || 'btn btn-primary',
                    index === 1 && 'font-semibold text-xl',
                  )}
                  href={button.link}
                  key={index}
                >
                  {button.title}
                </Link>
              ),
            )}
          </div>
        )}
      </div>
    </section>
  )
}
