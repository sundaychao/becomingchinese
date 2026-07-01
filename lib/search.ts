import { articles } from '../content/articles'
import { categories } from '../content/categories'
import type { Locale } from './i18n'

export type SearchDocument = {
  slug: string
  title: string
  summary: string
  category: string
  tags: string[]
}

export function buildSearchIndex(locale: Locale): SearchDocument[] {
  const categoryTitles = new Map(
    categories.map((category) => [category.slug, category.title[locale]]),
  )

  return articles.map((article) => ({
    slug: article.slug,
    title: article.title[locale],
    summary: article.summary[locale],
    category: categoryTitles.get(article.category) ?? article.category,
    tags: article.tags.map((tag) => tag[locale]),
  }))
}

export function searchArticles(
  query: string,
  index: SearchDocument[],
): SearchDocument[] {
  const normalizedQuery = query.trim().toLocaleLowerCase()
  if (!normalizedQuery) return index

  return index.filter((document) =>
    [document.title, document.summary, document.category, ...document.tags].some(
      (value) => value.toLocaleLowerCase().includes(normalizedQuery),
    ),
  )
}
