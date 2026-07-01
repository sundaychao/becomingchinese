import { describe, expect, it } from 'vitest'

import { articles } from '../content/articles'
import { categories } from '../content/categories'
import { fixedPages } from '../content/pages'
import { translations } from '../content/translations'
import { getArticle, getCategory, listArticles } from '../lib/content'

describe('bilingual content', () => {
  it('defines the six approved content categories', () => {
    expect(categories).toHaveLength(6)
    expect(new Set(categories.map((category) => category.slug)).size).toBe(6)
    expect(
      categories.every(
        (category) =>
          category.character &&
          category.title.en &&
          category.title.zh &&
          category.description.en &&
          category.description.zh &&
          category.subcategories.length > 0,
      ),
    ).toBe(true)
  })

  it('provides at least six complete, uniquely addressed bilingual articles', () => {
    expect(articles.length).toBeGreaterThanOrEqual(6)
    expect(articles.every((article) => article.title.en && article.title.zh)).toBe(
      true,
    )
    expect(new Set(articles.map((article) => article.slug)).size).toBe(
      articles.length,
    )
    expect(new Set(articles.map((article) => article.id)).size).toBe(
      articles.length,
    )
    expect(
      articles.every(
        (article) =>
          article.summary.en &&
          article.summary.zh &&
          article.sections.length >= 2 &&
          article.sections.every(
            (section) =>
              section.heading.en &&
              section.heading.zh &&
              section.paragraphs.length > 0 &&
              section.paragraphs.every(
                (paragraph) => paragraph.en && paragraph.zh,
              ),
          ),
      ),
    ).toBe(true)
  })

  it('resolves categories and articles and filters article lists', () => {
    expect(getCategory('chinese-language')?.title.en).toBe('Chinese Language')
    expect(getCategory('missing')).toBeUndefined()
    expect(getArticle('tea-is-never-just-a-drink')?.id).toBe('article-tea-001')
    expect(getArticle('missing')).toBeUndefined()
    expect(listArticles('chinese-lifestyle').length).toBeGreaterThan(0)
    expect(listArticles('missing')).toEqual([])
    expect(listArticles()).toEqual(articles)
  })

  it('includes bilingual data for every fixed page and shared interface label', () => {
    expect(fixedPages.map((page) => page.slug)).toEqual([
      'about',
      'contact',
      'privacy',
      'terms',
      'disclaimer',
    ])
    expect(
      fixedPages.every(
        (page) =>
          page.title.en &&
          page.title.zh &&
          page.description.en &&
          page.description.zh &&
          page.sections.every(
            (section) =>
              section.heading.en &&
              section.heading.zh &&
              section.paragraphs.every(
                (paragraph) => paragraph.en && paragraph.zh,
              ),
          ),
      ),
    ).toBe(true)
    expect(translations.siteName.en).toBe('Becoming Chinese')
    expect(translations.siteName.zh).toBe('成为中国通')
    expect(
      Object.values(translations.navigation).every((label) => label.en && label.zh),
    ).toBe(true)
  })
})
