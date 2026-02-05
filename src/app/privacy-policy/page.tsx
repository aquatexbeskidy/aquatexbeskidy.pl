import type { Metadata } from 'next'
import type { PrivacyPolicyPageContent } from '@/types/content'

import { SchemaScript } from '@/components/schema/schema-script'
import { getPageContent } from '@/lib/mdx'
import { generateWebPage } from '@/lib/schema-generators'

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPageContent<PrivacyPolicyPageContent>('privacy-policy')
  return {
    description: frontmatter.meta?.description,
    title: frontmatter.meta?.title || 'Polityka prywatności',
  }
}

export default async function PrivacyPolicyPage() {
  const { frontmatter, content } = await getPageContent<PrivacyPolicyPageContent>('privacy-policy')

  const webPageSchema = generateWebPage({
    description: frontmatter.meta?.description,
    name: frontmatter.meta?.title || 'Polityka prywatności',
    url: 'https://aquatexbeskidy.pl/privacy-policy/',
  })

  return (
    <main className='min-h-screen'>
      <SchemaScript data={webPageSchema} />
      <div className='container-main py-20'>
        <h1 className='mb-4 font-bold text-4xl text-primary'>Polityka prywatności</h1>
        <div className='prose prose-lg max-w-none'>{content}</div>
      </div>
    </main>
  )
}
