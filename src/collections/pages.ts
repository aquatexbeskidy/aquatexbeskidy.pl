import type { CollectionConfig } from 'payload'
import type { TLabel } from '@/translations'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  access: {
    read: () => true,
  },

  admin: {
    defaultColumns: ['title', 'pageType', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },

  fields: [
    {
      localized: true,
      name: 'title',
      required: true,
      type: 'text',
    },
    slugField(),
    {
      defaultValue: 'home',
      label: ({ t }: TLabel) => t('custom:pages:pageType:label'),
      name: 'pageType',
      options: [
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:home'),
          value: 'home',
        },
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:about'),
          value: 'about',
        },
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:contact'),
          value: 'contact',
        },
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:offer'),
          value: 'offer',
        },
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:works'),
          value: 'works',
        },
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:borehole'),
          value: 'borehole',
        },
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:deepWell'),
          value: 'deep-well',
        },
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:novelties'),
          value: 'novelties',
        },
        {
          label: ({ t }: TLabel) => t('custom:pages:pageType:privacyPolicy'),
          value: 'privacy-policy',
        },
      ],
      required: true,
      type: 'select',
    },
    {
      fields: [
        {
          localized: true,
          name: 'title',
          type: 'text',
        },
        {
          localized: true,
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'permalink',
          type: 'text',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:meta'),
      name: 'meta',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'home',
      },
      fields: [
        {
          localized: true,
          name: 'title',
          type: 'text',
        },
        {
          localized: true,
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'image',
          relationTo: 'media',
          type: 'upload',
        },
        {
          fields: [
            {
              localized: true,
              name: 'title',
              type: 'text',
            },
            {
              name: 'link',
              type: 'text',
            },
            {
              name: 'type',
              options: ['primary', 'secondary'],
              type: 'select',
            },
          ],
          name: 'buttons',
          type: 'array',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:hero'),
      name: 'hero',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'home',
      },
      fields: [
        {
          name: 'image',
          relationTo: 'media',
          type: 'upload',
        },
        {
          fields: [
            {
              name: 'content',
              type: 'text',
            },
          ],
          name: 'texts',
          type: 'array',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:homeInfoModal'),
      name: 'homeInfoModal',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'about',
      },
      fields: [
        {
          localized: true,
          name: 'mainTitle',
          type: 'text',
        },
        {
          localized: true,
          name: 'subTitle',
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
              fields: [
                {
                  localized: true,
                  name: 'desc',
                  type: 'textarea',
                },
              ],
              name: 'contentList',
              type: 'array',
            },
          ],
          name: 'contentBlocks',
          type: 'array',
        },
        {
          fields: [
            {
              name: 'image',
              relationTo: 'media',
              type: 'upload',
            },
          ],
          name: 'viewOfWorkImgList',
          type: 'array',
        },
        {
          fields: [
            {
              localized: true,
              name: 'title',
              type: 'text',
            },
            {
              localized: true,
              name: 'desc',
              type: 'textarea',
            },
          ],
          name: 'whyUsList',
          type: 'array',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:about'),
      name: 'about',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'contact',
      },
      fields: [
        {
          localized: true,
          name: 'title',
          type: 'text',
        },
        {
          localized: true,
          name: 'subTitle',
          type: 'text',
        },
        {
          localized: true,
          name: 'pinTitle',
          type: 'text',
        },
        {
          localized: true,
          name: 'pinDesc',
          type: 'textarea',
        },
        {
          fields: [
            {
              localized: true,
              name: 'title',
              type: 'text',
            },
            {
              name: 'link',
              type: 'text',
            },
            {
              name: 'type',
              options: ['primary', 'secondary'],
              type: 'select',
            },
          ],
          name: 'buttons',
          type: 'array',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:contact'),
      name: 'contact',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'offer',
      },
      fields: [
        {
          localized: true,
          name: 'mainTitle',
          type: 'text',
        },
        {
          editor: lexicalEditor({}),
          localized: true,
          name: 'mainContent',
          type: 'richText',
        },
        {
          editor: lexicalEditor({}),
          localized: true,
          name: 'subContent',
          type: 'richText',
        },
        {
          editor: lexicalEditor({}),
          localized: true,
          name: 'bonusInfo',
          type: 'richText',
        },
        {
          localized: true,
          name: 'quickOfferTitle',
          type: 'text',
        },
        {
          fields: [
            {
              localized: true,
              name: 'text',
              type: 'text',
            },
          ],
          name: 'quickOfferList',
          type: 'array',
        },
        {
          fields: [
            {
              localized: true,
              name: 'title',
              type: 'text',
            },
            {
              localized: true,
              name: 'desc',
              type: 'textarea',
            },
          ],
          name: 'offerList',
          type: 'array',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:offer'),
      name: 'offer',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'works',
      },
      fields: [
        {
          localized: true,
          name: 'videosTitle',
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
              name: 'date',
              type: 'date',
            },
            {
              name: 'videoId',
              type: 'text',
            },
            {
              name: 'videoTitle',
              type: 'text',
            },
          ],
          name: 'videos',
          type: 'array',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:works'),
      name: 'works',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'borehole',
      },
      fields: [
        {
          localized: true,
          name: 'mainTitle',
          type: 'text',
        },
        {
          editor: lexicalEditor({}),
          localized: true,
          name: 'mainContent',
          type: 'richText',
        },
        {
          editor: lexicalEditor({}),
          localized: true,
          name: 'subContent',
          type: 'richText',
        },
        {
          fields: [
            {
              name: 'image',
              relationTo: 'media',
              type: 'upload',
            },
          ],
          name: 'equipmentImgList',
          type: 'array',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:borehole'),
      name: 'borehole',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'deep-well',
      },
      fields: [
        {
          localized: true,
          name: 'mainTitle',
          type: 'text',
        },
        {
          editor: lexicalEditor({}),
          localized: true,
          name: 'mainContent',
          type: 'richText',
        },
        {
          editor: lexicalEditor({}),
          localized: true,
          name: 'bonusContent',
          type: 'richText',
        },
        {
          fields: [
            {
              localized: true,
              name: 'text',
              type: 'text',
            },
          ],
          name: 'additionList',
          type: 'array',
        },
        {
          localized: true,
          name: 'waterSearchTitle',
          type: 'text',
        },
        {
          localized: true,
          name: 'waterSearchDesc',
          type: 'textarea',
        },
        {
          name: 'waterSearchId',
          type: 'text',
        },
        {
          localized: true,
          name: 'waterConnectTitle',
          type: 'text',
        },
        {
          localized: true,
          name: 'waterConnectDesc',
          type: 'textarea',
        },
        {
          name: 'waterConnectId',
          type: 'text',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:deepWell'),
      name: 'deepWell',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'novelties',
      },
      fields: [
        {
          localized: true,
          name: 'mainTitle',
          type: 'text',
        },
        {
          fields: [
            {
              name: 'postId',
              type: 'text',
            },
            {
              name: 'postHeight',
              type: 'number',
            },
          ],
          name: 'fbPosts',
          type: 'array',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:novelties'),
      name: 'novelties',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'privacy-policy',
      },
      fields: [
        {
          editor: lexicalEditor({}),
          localized: true,
          name: 'content',
          type: 'richText',
        },
      ],
      label: ({ t }: TLabel) => t('custom:pages:groups:privacyPolicy'),
      name: 'privacyPolicy',
      type: 'group',
    },
  ],

  labels: {
    plural: ({ t }: TLabel) => t('custom:pages:plural'),
    singular: ({ t }: TLabel) => t('custom:pages:singular'),
  },

  slug: 'pages',
  timestamps: true,
}
