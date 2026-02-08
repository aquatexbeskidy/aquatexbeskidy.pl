import type { MetadataRoute } from 'next'

import { getNoveltiesPageCount } from '@/lib/mdx'

const BASE_URL = 'https://aquatexbeskidy.pl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pageCount = await getNoveltiesPageCount()

  const staticPages: MetadataRoute.Sitemap = [
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 1.0,
      url: `${BASE_URL}/`,
    },
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 0.8,
      url: `${BASE_URL}/about/`,
    },
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 0.7,
      url: `${BASE_URL}/contact/`,
    },
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 0.9,
      url: `${BASE_URL}/offer/`,
    },
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 0.9,
      url: `${BASE_URL}/works/`,
    },
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 0.8,
      url: `${BASE_URL}/deep-well/`,
    },
    {
      changeFrequency: 'monthly',
      lastModified: new Date(),
      priority: 0.8,
      url: `${BASE_URL}/borehole/`,
    },
    {
      changeFrequency: 'yearly',
      lastModified: new Date(),
      priority: 0.5,
      url: `${BASE_URL}/privacy-policy/`,
    },
  ]

  const noveltiesMain: MetadataRoute.Sitemap = [
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 0.8,
      url: `${BASE_URL}/novelties/`,
    },
  ]

  const noveltiesPages: MetadataRoute.Sitemap = Array.from({ length: pageCount - 1 }, (_, i) => ({
    changeFrequency: 'weekly',
    lastModified: new Date(),
    priority: 0.6,
    url: `${BASE_URL}/novelties/${i + 2}/`,
  }))

  return [...staticPages, ...noveltiesMain, ...noveltiesPages]
}
