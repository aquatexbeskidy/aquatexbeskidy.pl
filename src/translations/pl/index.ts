import { fields } from './fields'
import { media } from './media'
import { navigations } from './navigations'
import { novelties } from './novelties'
import { pages } from './pages'
import { siteConfig } from './site-config'
import { users } from './users'

export const pl = {
  custom: {
    fields,
    media,
    navigations,
    novelties,
    pages,
    siteConfig,
    users,
  },
} as const
