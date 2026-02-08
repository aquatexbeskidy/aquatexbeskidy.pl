import type { Field, FieldHook } from 'payload'

const formatSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return formatSlug(value)
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]

    if (fallbackData && typeof fallbackData === 'string') {
      return formatSlug(fallbackData)
    }

    return value
  }

export const slugField = (fieldToUse = 'title'): Field => ({
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [formatSlugHook(fieldToUse)],
  },
  index: true,
  label: 'Slug',
  name: 'slug',
  type: 'text',
})
