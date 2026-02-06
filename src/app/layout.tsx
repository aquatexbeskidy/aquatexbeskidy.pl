import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'

import { CookieConsent } from '@/components/cookie-consent'
import { FacebookPixel } from '@/components/facebook-pixel'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { SchemaScript } from '@/components/schema/schema-script'
import { getGlobalContent, getLayoutData } from '@/lib/mdx'
import { generateOrganization } from '@/lib/schema-generators'
import './globals.css'

const montserrat = Montserrat({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  description:
    'Profesjonalne wiercenie studni głębinowych w Beskidach. Ponad 20 lat doświadczenia, 3 lata gwarancji na usługi.',
  title: {
    default: 'AQUA-TEX Beskidy - Studnie głębinowe i odwierty',
    template: '%s | AQUA-TEX Beskidy',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [{ siteTitle, header, footer }, globalContent] = await Promise.all([getLayoutData(), getGlobalContent()])

  const organizationSchema = generateOrganization({
    name: siteTitle,
    sameAs: [globalContent.facebook.url, globalContent.youtube?.url].filter((url): url is string => url !== undefined),
    url: 'https://aquatexbeskidy.pl',
  })

  return (
    <html className={montserrat.variable} lang='pl'>
      <body className='font-montserrat antialiased' suppressHydrationWarning>
        <SchemaScript data={organizationSchema} />
        <FacebookPixel />
        <Header
          bottomLinks={header.bottomLinks}
          infoBar={header.infoBar}
          siteTitle={siteTitle}
          topLinks={header.topLinks}
        />

        {children}

        <Footer
          copyright={footer.copyright}
          links={footer.links}
          nomadsCodes={footer.nomadsCodes}
          quickContact={footer.quickContact}
          siteTitle={siteTitle}
        />
        <CookieConsent />
      </body>
    </html>
  )
}
