import { isLocale, type Locale } from '@/lib/i18n'

export function replaceLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean)

  if (isLocale(segments[0])) segments.shift()

  const remaining = segments.join('/')
  return remaining ? `/${locale}/${remaining}` : `/${locale}`
}
