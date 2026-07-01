import type { MetadataRoute } from 'next'

import { articles } from '@/content/articles'
import { categories } from '@/content/categories'
import { fixedPages } from '@/content/pages'
import { LOCALES } from '@/lib/i18n'
import { localizedAlternates } from '@/lib/seo'

const staticPaths = [
  '',
  '/articles',
  ...categories.map(({ slug }) => `/category/${slug}`),
  '/tools',
  '/tools/chinese-name-generator',
  ...fixedPages.map(({ slug }) => `/${slug}`),
]

const contentPaths = [
  ...staticPaths.map((path) => ({ path, lastModified: undefined })),
  ...articles.map(({ slug, publishedAt }) => ({
    path: `/articles/${slug}`,
    lastModified: publishedAt,
  })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  return contentPaths.flatMap(({ path, lastModified }) =>
    LOCALES.map((locale) => {
      const alternates = localizedAlternates(`/${locale}${path}`)

      return {
        url: alternates.canonical,
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages: alternates.languages },
      }
    }),
  )
}
