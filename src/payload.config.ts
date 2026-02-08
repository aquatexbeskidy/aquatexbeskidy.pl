import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pl } from '@payloadcms/translations/languages/pl'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from '@/collections/media'
import { Navigations } from '@/collections/navigations'
import { Pages } from '@/collections/pages'
import { Users } from '@/collections/users'
import { Novelties } from '@/collections/vovelties'
import { SiteConfig } from '@/globals/site-config'
import { translations } from '@/translations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },

  collections: [Pages, Novelties, Navigations, Media, Users],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  editor: lexicalEditor({}),

  globals: [SiteConfig],

  i18n: {
    fallbackLanguage: 'pl',
    supportedLanguages: { pl },
    translations,
  },

  localization: {
    defaultLocale: 'pl',
    fallback: true,
    locales: ['pl'],
  },

  plugins: [],

  secret: String(process.env.PAYLOAD_SECRET),

  sharp,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
