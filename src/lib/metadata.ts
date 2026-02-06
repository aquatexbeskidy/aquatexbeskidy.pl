import type { Metadata } from 'next'

const SITE_URL = 'https://aquatexbeskidy.pl'
const DEFAULT_OG_IMAGE = '/images/home/home-photo-1.jpg'

interface SocialMetadataParams {
  title: string
  description?: string
  imagePath?: string
  canonicalUrl?: string
}

export function getSocialMetadata({ title, description, imagePath, canonicalUrl }: SocialMetadataParams): Metadata {
  const image = imagePath ? `/${imagePath}` : DEFAULT_OG_IMAGE
  const url = canonicalUrl ? new URL(canonicalUrl, SITE_URL).toString() : SITE_URL

  return {
    alternates: {
      canonical: url,
    },
    openGraph: {
      description: description || undefined,
      images: [{ url: image }],
      locale: 'pl_PL',
      title,
      type: 'website',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      description: description || undefined,
      images: [image],
      title,
    },
  }
}
