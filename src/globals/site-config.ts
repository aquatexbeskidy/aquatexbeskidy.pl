import type { GlobalConfig } from 'payload'
import type { TLabel } from '@/translations'

export const SiteConfig: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      label: ({ t }: TLabel) => t('custom:siteConfig:infoBar'),
      localized: true,
      name: 'infoBar',
      type: 'text',
    },
    {
      fields: [
        {
          localized: true,
          name: 'title',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'icon',
          relationTo: 'media',
          type: 'upload',
        },
      ],
      label: ({ t }: TLabel) => t('custom:siteConfig:callMeUp'),
      name: 'callMeUp',
      type: 'group',
    },
    {
      fields: [
        {
          localized: true,
          name: 'title',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'icon',
          relationTo: 'media',
          type: 'upload',
        },
      ],
      label: ({ t }: TLabel) => t('custom:siteConfig:facebook'),
      name: 'facebook',
      type: 'group',
    },
    {
      fields: [
        {
          localized: true,
          name: 'title',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'icon',
          relationTo: 'media',
          type: 'upload',
        },
      ],
      label: ({ t }: TLabel) => t('custom:siteConfig:youtube'),
      name: 'youtube',
      type: 'group',
    },
  ],
  label: ({ t }: TLabel) => t('custom:siteConfig:label'),
  slug: 'site-config',
}
