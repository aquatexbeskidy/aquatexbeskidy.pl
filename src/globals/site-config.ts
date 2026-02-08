import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      label: 'Info Bar Text',
      name: 'infoBar',
      type: 'text',
    },
    {
      fields: [
        {
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
      label: 'Call Me Up Button',
      name: 'callMeUp',
      type: 'group',
    },
    {
      fields: [
        {
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
      label: 'Facebook Link',
      name: 'facebook',
      type: 'group',
    },
    {
      fields: [
        {
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
      label: 'YouTube Link',
      name: 'youtube',
      type: 'group',
    },
  ],
  label: 'Site Configuration',
  slug: 'site-config',
}
