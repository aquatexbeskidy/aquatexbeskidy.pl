import type { CollectionConfig } from 'payload'

export const Navigations: CollectionConfig = {
  access: {
    read: () => true,
  },

  admin: {
    defaultColumns: ['title', 'navType', 'updatedAt'],
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'navType',
      options: [
        {
          label: 'Header Top',
          value: 'header-top',
        },
        {
          label: 'Header Bottom',
          value: 'header-bottom',
        },
        {
          label: 'Footer',
          value: 'footer',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      fields: [
        {
          name: 'text',
          required: true,
          type: 'text',
        },
        {
          defaultValue: 'internal',
          name: 'type',
          options: [
            {
              label: 'Internal',
              value: 'internal',
            },
            {
              label: 'External',
              value: 'external',
            },
          ],
          type: 'select',
        },
        {
          name: 'url',
          required: true,
          type: 'text',
        },
        {
          name: 'icon',
          relationTo: 'media',
          type: 'upload',
        },
        {
          defaultValue: false,
          label: 'Open in new tab',
          name: 'newTab',
          type: 'checkbox',
        },
      ],
      name: 'links',
      type: 'array',
    },
  ],

  slug: 'navigations',
  timestamps: true,
}
