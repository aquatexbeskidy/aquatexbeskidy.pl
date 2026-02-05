// ─────────────────────────────────────────
// Schema.org Generator Utilities
// ─────────────────────────────────────────
//
// This module provides type-safe helper functions for generating Schema.org JSON-LD data.
//
// To add a new schema type:
// 1. Define the type in `src/types/schema.ts` extending WithContext
// 2. Create an Input interface (e.g., NewTypeInput) for function parameters
// 3. Implement generator function `generateNewType(data: NewTypeInput): NewType`
// 4. Export the function and use it in page components with <SchemaScript data={...} />
//
// Example pattern:
//   export function generateNewType(data: NewTypeInput): NewType {
//     return {
//       '@context': 'https://schema.org',
//       '@type': 'NewType',
//       ...data,  // Spread input properties
//       ...(computedFields && { ...computedFields })
//     }
//   }
// ─────────────────────────────────────────

import type { BreadcrumbList, FAQPage, LocalBusiness, Organization, Service, WebPage } from '@/types/schema'

interface LocalBusinessInput {
  name: string
  url?: string
  telephone?: string
  email?: string
  address?: {
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
    addressRegion?: string
  }
  openingHours?: string[]
  priceRange?: string
  description?: string
  image?: string | { url: string; width?: number; height?: number; caption?: string }
  areaServed?: string | string[]
}

interface OrganizationInput {
  name: string
  url: string
  logo?: string | { url: string; width?: number; height?: number; caption?: string }
  sameAs?: string[]
  foundingDate?: string
  description?: string
}

interface WebPageInput {
  url: string
  name: string
  description?: string
  datePublished?: string
  dateModified?: string
  author?: { name: string; url?: string }
  mainEntity?: Service | FAQPage | unknown
}

interface FAQPageInput {
  questions: Array<{ question: string; answer: string }>
}

interface ServiceInput {
  name: string
  description?: string
  provider?: LocalBusiness | Organization
  areaServed?: string | string[]
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function generateLocalBusiness(data: LocalBusinessInput): LocalBusiness {
  const address = data.address
    ? {
        '@type': 'PostalAddress' as const,
        addressCountry: data.address.addressCountry,
        addressLocality: data.address.addressLocality,
        postalCode: data.address.postalCode,
        streetAddress: data.address.streetAddress,
        ...(data.address.addressRegion && { addressRegion: data.address.addressRegion }),
      }
    : undefined

  const image = data.image
    ? typeof data.image === 'string'
      ? data.image
      : {
          '@type': 'ImageObject' as const,
          url: data.image.url,
          ...(data.image.width !== undefined && { width: data.image.width }),
          ...(data.image.height !== undefined && { height: data.image.height }),
          ...(data.image.caption !== undefined && { caption: data.image.caption }),
        }
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.name,
    ...(data.url !== undefined && { url: data.url }),
    ...(data.telephone !== undefined && { telephone: data.telephone }),
    ...(data.email !== undefined && { email: data.email }),
    ...(address !== undefined && { address }),
    ...(data.openingHours !== undefined && { openingHours: data.openingHours }),
    ...(data.priceRange !== undefined && { priceRange: data.priceRange }),
    ...(data.description !== undefined && { description: data.description }),
    ...(image !== undefined && { image }),
    ...(data.areaServed !== undefined && { areaServed: data.areaServed }),
  }
}

export function generateOrganization(data: OrganizationInput): Organization {
  const logo = data.logo
    ? typeof data.logo === 'string'
      ? data.logo
      : {
          '@type': 'ImageObject' as const,
          url: data.logo.url,
          ...(data.logo.width !== undefined && { width: data.logo.width }),
          ...(data.logo.height !== undefined && { height: data.logo.height }),
          ...(data.logo.caption !== undefined && { caption: data.logo.caption }),
        }
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    ...(logo !== undefined && { logo }),
    ...(data.sameAs !== undefined && data.sameAs.length > 0 && { sameAs: data.sameAs }),
    ...(data.foundingDate !== undefined && { foundingDate: data.foundingDate }),
    ...(data.description !== undefined && { description: data.description }),
  }
}

export function generateWebPage(data: WebPageInput): WebPage {
  const author = data.author
    ? ({
        '@context': 'https://schema.org' as const,
        '@type': 'Person' as const,
        name: data.author.name,
        ...(data.author.url !== undefined && { url: data.author.url }),
      } as const)
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data.name,
    url: data.url,
    ...(data.description !== undefined && { description: data.description }),
    ...(data.datePublished !== undefined && { datePublished: data.datePublished }),
    ...(data.dateModified !== undefined && { dateModified: data.dateModified }),
    ...(author !== undefined && { author }),
    ...(data.mainEntity !== undefined && { mainEntity: data.mainEntity }),
  }
}

export function generateFAQPage(data: FAQPageInput): FAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.questions.map((q) => ({
      '@type': 'Question' as const,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: q.answer,
      },
      name: q.question,
    })),
  }
}

export function generateService(data: ServiceInput): Service {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    ...(data.description !== undefined && { description: data.description }),
    ...(data.provider !== undefined && { provider: data.provider }),
    ...(data.areaServed !== undefined && { areaServed: data.areaServed }),
  }
}

export function generateBreadcrumbList(items: BreadcrumbItem[]): BreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      item: item.url,
      name: item.name,
      position: index + 1,
    })),
  }
}

interface SiteRoute {
  path: string
  name: string
}

const SITE_ROUTES: SiteRoute[] = [
  { name: 'Strona główna', path: '/' },
  { name: 'O nas', path: '/about' },
  { name: 'Oferta', path: '/offer' },
  { name: 'Studnie głębinowe', path: '/deep-well' },
  { name: 'Odwierty', path: '/borehole' },
  { name: 'Realizacje', path: '/works' },
  { name: 'Kontakt', path: '/contact' },
  { name: 'Aktualności', path: '/novelties' },
]

export function generateBreadcrumbs(path: string): BreadcrumbItem[] {
  const cleanPath = path.replace(/\/$/, '')
  const breadcrumbs: BreadcrumbItem[] = [{ name: 'Strona główna', url: 'https://aquatexbeskidy.pl/' }]

  if (cleanPath === '' || cleanPath === '/') {
    return breadcrumbs
  }

  const segments = cleanPath.split('/').filter(Boolean)

  let currentPath = ''

  for (const segment of segments) {
    currentPath += `/${segment}`

    let name = segment
    const route = SITE_ROUTES.find((r) => r.path === currentPath || r.path === `/${segment}`)
    if (route) {
      name = route.name
    }

    if (segment.match(/^\d+$/)) {
      name = `Strona ${segment}`
    }

    breadcrumbs.push({
      name,
      url: `https://aquatexbeskidy.pl${currentPath}/`,
    })
  }

  return breadcrumbs
}
