import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleLayout } from '@/components/content/article-layout'
import { articles } from '@/content/articles'
import { getArticle, getCategory, listArticles } from '@/lib/content'
import { isLocale, LOCALES } from '@/lib/i18n'

type ArticlePageProps = Readonly<{
  params: Promise<{ locale: string; slug: string }>
}>

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => articles.map(({ slug }) => ({ locale, slug })))
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const article = getArticle(slug)
  if (!isLocale(locale) || !article) return {}

  return {
    title: article.seo.title[locale],
    description: article.seo.description[locale],
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale, slug } = await params
  const article = getArticle(slug)
  if (!isLocale(locale) || !article) notFound()
  const category = getCategory(article.category)
  if (!category) notFound()

  const relatedArticles = listArticles(article.category)
    .filter((candidate) => candidate.slug !== article.slug)
    .slice(0, 3)

  return (
    <ArticleLayout
      article={article}
      category={category}
      locale={locale}
      relatedArticles={relatedArticles}
    />
  )
}
