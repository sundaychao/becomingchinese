import type { Article } from '@/content/articles'
import { LOCALES, type Locale } from '@/lib/i18n'

const DEFAULT_SITE_URL = 'https://becomingchinese.com'

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')
}

function absoluteUrl(path: string): string {
  return new URL(path, `${getSiteUrl()}/`).toString()
}

export function localizedAlternates(path: string) {
  const normalizedPath = `/${path.replace(/^\/+|\/+$/g, '')}`
  const localeMatch = normalizedPath.match(/^\/(en|zh)(\/.*)?$/)
  const currentLocale: Locale = localeMatch?.[1] as Locale ?? 'en'
  const semanticPath = localeMatch ? (localeMatch[2] ?? '') : (normalizedPath === '/' ? '' : normalizedPath)
  const localizedUrls = Object.fromEntries(
    LOCALES.map((locale) => [locale, absoluteUrl(`/${locale}${semanticPath}`)]),
  ) as Record<Locale, string>

  return {
    canonical: localizedUrls[currentLocale],
    languages: localizedUrls,
  }
}

export function articleJsonLd(article: Article, locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[locale],
    description: article.seo.description[locale],
    datePublished: article.publishedAt,
    image: absoluteUrl(article.image.src),
    publisher: {
      '@type': 'Organization',
      name: 'Becoming Chinese',
      url: getSiteUrl(),
    },
  } as const
}
