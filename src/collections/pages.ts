import type { CollectionConfig } from 'payload'

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
      name: 'title',
      required: true,
      type: 'text',
    },
    slugField(),
    {
      defaultValue: 'home',
      name: 'pageType',
      options: [
        { label: 'Home', value: 'home' },
        { label: 'About', value: 'about' },
        { label: 'Contact', value: 'contact' },
        { label: 'Offer', value: 'offer' },
        { label: 'Works', value: 'works' },
        { label: 'Borehole', value: 'borehole' },
        { label: 'Deep Well', value: 'deep-well' },
        { label: 'Novelties', value: 'novelties' },
        { label: 'Privacy Policy', value: 'privacy-policy' },
      ],
      required: true,
      type: 'select',
    },
    {
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'permalink',
          type: 'text',
        },
      ],
      name: 'meta',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'home',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
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
      name: 'homeInfoModal',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'about',
      },
      fields: [
        {
          name: 'mainTitle',
          type: 'text',
        },
        {
          name: 'subTitle',
          type: 'text',
        },
        {
          fields: [
            {
              name: 'title',
              type: 'text',
            },
            {
              fields: [
                {
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
              name: 'title',
              type: 'text',
            },
            {
              name: 'desc',
              type: 'textarea',
            },
          ],
          name: 'whyUsList',
          type: 'array',
        },
      ],
      name: 'about',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'contact',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'subTitle',
          type: 'text',
        },
        {
          name: 'pinTitle',
          type: 'text',
        },
        {
          name: 'pinDesc',
          type: 'textarea',
        },
        {
          fields: [
            {
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
      name: 'contact',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'offer',
      },
      fields: [
        {
          name: 'mainTitle',
          type: 'text',
        },
        {
          editor: lexicalEditor({}),
          name: 'mainContent',
          type: 'richText',
        },
        {
          editor: lexicalEditor({}),
          name: 'subContent',
          type: 'richText',
        },
        {
          editor: lexicalEditor({}),
          name: 'bonusInfo',
          type: 'richText',
        },
        {
          name: 'quickOfferTitle',
          type: 'text',
        },
        {
          fields: [
            {
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
              name: 'title',
              type: 'text',
            },
            {
              name: 'desc',
              type: 'textarea',
            },
          ],
          name: 'offerList',
          type: 'array',
        },
      ],
      name: 'offer',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'works',
      },
      fields: [
        {
          name: 'videosTitle',
          type: 'text',
        },
        {
          fields: [
            {
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
      name: 'works',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'borehole',
      },
      fields: [
        {
          name: 'mainTitle',
          type: 'text',
        },
        {
          editor: lexicalEditor({}),
          name: 'mainContent',
          type: 'richText',
        },
        {
          editor: lexicalEditor({}),
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
      name: 'borehole',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'deep-well',
      },
      fields: [
        {
          name: 'mainTitle',
          type: 'text',
        },
        {
          editor: lexicalEditor({}),
          name: 'mainContent',
          type: 'richText',
        },
        {
          editor: lexicalEditor({}),
          name: 'bonusContent',
          type: 'richText',
        },
        {
          fields: [
            {
              name: 'text',
              type: 'text',
            },
          ],
          name: 'additionList',
          type: 'array',
        },
        {
          name: 'waterSearchTitle',
          type: 'text',
        },
        {
          name: 'waterSearchDesc',
          type: 'textarea',
        },
        {
          name: 'waterSearchId',
          type: 'text',
        },
        {
          name: 'waterConnectTitle',
          type: 'text',
        },
        {
          name: 'waterConnectDesc',
          type: 'textarea',
        },
        {
          name: 'waterConnectId',
          type: 'text',
        },
      ],
      name: 'deepWell',
      type: 'group',
    },
    {
      admin: {
        condition: (_, siblingData) => siblingData?.pageType === 'novelties',
      },
      fields: [
        {
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
          name: 'content',
          type: 'richText',
        },
      ],
      name: 'privacyPolicy',
      type: 'group',
    },
  ],
  slug: 'pages',
  timestamps: true,
}
