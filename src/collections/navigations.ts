import type { CollectionConfig } from 'payload'
import type { TLabel } from '@/translations'

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
      localized: true,
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      label: ({ t }: TLabel) => t('custom:navigations:navType:label'),
      name: 'navType',
      options: [
        {
          label: ({ t }: TLabel) => t('custom:navigations:navType:headerTop'),
          value: 'header-top',
        },
        {
          label: ({ t }: TLabel) => t('custom:navigations:navType:headerBottom'),
          value: 'header-bottom',
        },
        {
          label: ({ t }: TLabel) => t('custom:navigations:navType:footer'),
          value: 'footer',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      fields: [
        {
          localized: true,
          name: 'text',
          required: true,
          type: 'text',
        },
        {
          defaultValue: 'internal',
          name: 'type',
          options: [
            {
              label: ({ t }: TLabel) => t('custom:navigations:linkType:internal'),
              value: 'internal',
            },
            {
              label: ({ t }: TLabel) => t('custom:navigations:linkType:external'),
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
          label: ({ t }: TLabel) => t('custom:navigations:newTab'),
          name: 'newTab',
          type: 'checkbox',
        },
      ],
      name: 'links',
      type: 'array',
    },
  ],

  labels: {
    plural: ({ t }: TLabel) => t('custom:navigations:plural'),
    singular: ({ t }: TLabel) => t('custom:navigations:singular'),
  },

  slug: 'navigations',
  timestamps: true,
}
