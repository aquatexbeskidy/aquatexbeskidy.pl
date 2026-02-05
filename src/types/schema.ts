// ─────────────────────────────────────────
// Schema.org Type Definitions
// ─────────────────────────────────────────

// Base Schema.org type with @context
export interface WithContext {
  '@context': 'https://schema.org'
}

// ─────────────────────────────────────────
// Supporting Types
// ─────────────────────────────────────────

export interface PostalAddress {
  '@type': 'PostalAddress'
  streetAddress: string
  addressLocality: string
  postalCode: string
  addressCountry: string
  addressRegion?: string
}

export interface ImageObject {
  '@type': 'ImageObject'
  url: string
  width?: number
  height?: number
  caption?: string
}

export interface ListItem {
  '@type': 'ListItem'
  position: number
  name: string
  item: string
}

export interface Answer {
  '@type': 'Answer'
  text: string
}

export interface Question {
  '@type': 'Question'
  name: string
  acceptedAnswer: Answer
}

// ─────────────────────────────────────────
// Organization
// ─────────────────────────────────────────

export interface Organization extends WithContext {
  '@type': 'Organization'
  name: string
  url: string
  logo?: ImageObject | string
  sameAs?: string[]
  foundingDate?: string
  description?: string
}

// ─────────────────────────────────────────
// LocalBusiness
// ─────────────────────────────────────────

export interface LocalBusiness extends WithContext {
  '@type': 'LocalBusiness'
  name: string
  url?: string
  telephone?: string
  email?: string
  address?: PostalAddress
  openingHours?: string[]
  priceRange?: string
  description?: string
  image?: string | ImageObject
  areaServed?: string | string[]
}

// ─────────────────────────────────────────
// WebPage
// ─────────────────────────────────────────

export interface WebPage extends WithContext {
  '@type': 'WebPage'
  url: string
  name: string
  description?: string
  datePublished?: string
  dateModified?: string
  author?: Organization | Person
  mainEntity?: Service | FAQPage | unknown
}

export interface Person extends WithContext {
  '@type': 'Person'
  name: string
  url?: string
}

// ─────────────────────────────────────────
// BreadcrumbList
// ─────────────────────────────────────────

export interface BreadcrumbList extends WithContext {
  '@type': 'BreadcrumbList'
  itemListElement: ListItem[]
}

// ─────────────────────────────────────────
// FAQPage
// ─────────────────────────────────────────

export interface FAQPage extends WithContext {
  '@type': 'FAQPage'
  mainEntity: Question[]
}

// ─────────────────────────────────────────
// Service
// ─────────────────────────────────────────

export interface Service extends WithContext {
  '@type': 'Service'
  name: string
  description?: string
  provider?: LocalBusiness | Organization
  areaServed?: string | string[]
}
