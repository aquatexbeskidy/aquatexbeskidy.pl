import type { CollectionConfig } from 'payload'
import type { TLabel } from '@/translations'

export const Media: CollectionConfig = {
  access: {
    read: () => true,
  },

  fields: [
    {
      localized: true,
      name: 'alt',
      required: true,
      type: 'text',
    },
  ],

  labels: {
    plural: ({ t }: TLabel) => t('custom:media:plural'),
    singular: ({ t }: TLabel) => t('custom:media:singular'),
  },

  slug: 'media',

  upload: {
    adminThumbnail: 'thumbnail',

    imageSizes: [
      {
        height: 300,
        name: 'thumbnail',
        position: 'centre',
        width: 400,
      },
      {
        height: 1024,
        name: 'card',
        position: 'centre',
        width: 768,
      },
      {
        height: undefined,
        name: 'tablet',
        position: 'centre',
        width: 1024,
      },
    ],

    mimeTypes: ['image/*'],
    staticDir: 'media',
  },
}
