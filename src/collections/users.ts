import type { CollectionConfig } from 'payload'
import type { TLabel } from '@/translations'

export const Users: CollectionConfig = {
  admin: {
    useAsTitle: 'email',
  },

  auth: true,

  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      defaultValue: ['editor'],
      hasMany: true,
      label: ({ t }: TLabel) => t('custom:users:roles:label'),
      name: 'roles',
      options: [
        {
          label: ({ t }: TLabel) => t('custom:users:roles:admin'),
          value: 'admin',
        },
        {
          label: ({ t }: TLabel) => t('custom:users:roles:editor'),
          value: 'editor',
        },
      ],
      type: 'select',
    },
  ],

  labels: {
    plural: ({ t }: TLabel) => t('custom:users:plural'),
    singular: ({ t }: TLabel) => t('custom:users:singular'),
  },

  slug: 'users',
}
