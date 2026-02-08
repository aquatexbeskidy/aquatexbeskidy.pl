import type { CollectionConfig } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { slugField } from '../fields/slug'

export const Novelties: CollectionConfig = {
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        published: {
          equals: true,
        },
      }
    },
  },

  admin: {
    defaultColumns: ['title', 'date', 'published', 'slug'],
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
      label: 'Facebook URL',
      name: 'url',
      type: 'text',
    },
    {
      name: 'image',
      relationTo: 'media',
      type: 'upload',
    },
    {
      admin: {
        position: 'sidebar',
      },
      defaultValue: false,
      name: 'published',
      type: 'checkbox',
    },
    {
      admin: {
        position: 'sidebar',
      },
      defaultValue: true,
      name: 'showDate',
      type: 'checkbox',
    },
    {
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        position: 'sidebar',
      },
      name: 'date',
      type: 'date',
    },
    {
      editor: lexicalEditor({}),
      localized: true,
      name: 'content',
      type: 'richText',
    },
  ],

  slug: 'novelties',
  timestamps: true,
}
