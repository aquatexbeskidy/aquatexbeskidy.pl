import type { DefaultTranslationKeys, NestedKeysStripped, TFunction } from '@payloadcms/translations'
import type { Config } from 'payload'

import { pl } from './pl'

// @ts-expect-error: TFunction type is not automatically merged with the default translations
export const translations: Config['i18n']['translations'] = { pl }

export type TranslationDictionary = (typeof translations)[keyof typeof translations]
export type TranslationKeys = NestedKeysStripped<TranslationDictionary>
export type TranslationFunction = TFunction<TranslationKeys | DefaultTranslationKeys>
export type TLabel = { t: TranslationFunction }
