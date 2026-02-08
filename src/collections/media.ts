import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'alt',
      required: true,
      type: 'text',
    },
  ],

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
