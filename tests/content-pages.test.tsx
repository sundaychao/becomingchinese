import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

import { ArticleLayout } from '@/components/content/article-layout'
import { articles } from '@/content/articles'
import { categories } from '@/content/categories'
import { getArticle, getCategory, listArticles } from '@/lib/content'
import { LOCALES } from '@/lib/i18n'
import { render, screen, within } from '@testing-library/react'

import { generateStaticParams as generateArticleParams } from '../app/[locale]/articles/[slug]/page'
import { generateStaticParams as generateArticleListParams } from '../app/[locale]/articles/page'
import { generateStaticParams as generateCategoryParams } from '../app/[locale]/category/[slug]/page'

describe('content pages', () => {
  it('provides category, article list, article detail, and article layout modules', () => {
    const projectRoot = resolve(__dirname, '..')
    const expectedFiles = [
      'app/[locale]/category/[slug]/page.tsx',
      'app/[locale]/articles/page.tsx',
      'app/[locale]/articles/[slug]/page.tsx',
      'components/content/article-layout.tsx',
      'styles/article.module.css',
    ]

    expect(expectedFiles.filter((file) => !existsSync(resolve(projectRoot, file)))).toEqual([])
  })

  it('generates every localized category and article route', () => {
    expect(generateCategoryParams()).toHaveLength(LOCALES.length * categories.length)
    expect(generateArticleParams()).toHaveLength(LOCALES.length * articles.length)
    expect(generateArticleListParams()).toEqual(LOCALES.map((locale) => ({ locale })))

    expect(generateCategoryParams()).toContainEqual({
      locale: 'zh',
      slug: 'chinese-language',
    })
    expect(generateArticleParams()).toContainEqual({
      locale: 'en',
      slug: 'tea-is-never-just-a-drink',
    })
  })

  it('renders article semantics, stable section links, bilingual copy, and three related stories', () => {
    const article = getArticle('tea-is-never-just-a-drink')!
    const category = getCategory(article.category)!
    const related = listArticles(article.category).filter(({ slug }) => slug !== article.slug).slice(0, 3)

    render(
      <ArticleLayout
        article={article}
        category={category}
        locale="en"
        relatedArticles={related}
      />,
    )

    expect(screen.getByRole('heading', { level: 1, name: article.title.en })).toBeInTheDocument()
    expect(screen.getByText(`${article.readingMinutes} min read`)).toBeInTheDocument()
    expect(screen.getByText(article.publishedAt)).toHaveAttribute('datetime', article.publishedAt)

    const tableOfContents = screen.getByRole('navigation', { name: 'Table of contents' })
    expect(within(tableOfContents).getByRole('link', { name: article.sections[0].heading.en })).toHaveAttribute(
      'href',
      `#${article.sections[0].id}`,
    )
    expect(document.getElementById(article.sections[0].id)).toBeInTheDocument()
    expect(screen.getByText(article.sections[0].paragraphs[0].zh)).toBeInTheDocument()
    expect(screen.getAllByTestId('related-article')).toHaveLength(related.length)
    expect(related.every(({ category: relatedCategory }) => relatedCategory === article.category)).toBe(true)
  })
})
