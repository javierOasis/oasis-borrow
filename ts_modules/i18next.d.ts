import 'next-i18next'

import type {
  DefaultTFuncReturn as OriginalDefaultTFuncReturn,
  I18n as Originali18n,
  InitOptions as OriginalInitOptions,
  TFunction as OriginalTFunction,
} from 'i18next'
import type engLocales from 'public/locales/en/common.json'
import type { ReportNamespaces } from 'react-i18next';

type AcceptAnyString<T> = T | (string & Record<never, never>);

type PathsToProps<T, V> = T extends V ? "" : {
  [K in Extract<keyof T, string>]: Dot<K, PathsToProps<T[K], V>>
}[Extract<keyof T, string>];

type Dot<T extends string, U extends string> =
"" extends U ? T : `${T}.${U}`

type LanguageDotNotationKeys = AcceptAnyString<PathsToProps<typeof engLocales, string>>
type TranslationType = (key: LanguageDotNotationKeys, translationData?: Record<string, any>) => string & string[]
declare module 'next-i18next' {
  export function useTranslation(): {
    t: TranslationType
    i18n: Originali18n
  }
}
declare module 'i18next' {
  export type TFunction = OriginalTFunction
  export type InitOptions = OriginalInitOptions
  export type DefaultTFuncReturn = OriginalDefaultTFuncReturn
  interface i18n {
    reportNamespaces: ReportNamespaces;
  }
}