import { articles, type Article } from '../content/articles'
import { categories, type Category } from '../content/categories'

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function listArticles(category?: string): Article[] {
  if (!category) return articles

  return articles.filter((article) => article.category === category)
}
