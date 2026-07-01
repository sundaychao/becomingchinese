import { describe, expect, it } from 'vitest'

import { articles } from '../content/articles'
import { categories } from '../content/categories'
import { fixedPages } from '../content/pages'
import { translations } from '../content/translations'
import { getArticle, getCategory, listArticles } from '../lib/content'

describe('bilingual content', () => {
  it('defines the six approved content categories', () => {
    expect(categories).toHaveLength(6)
    expect(
      categories.map(({ slug, title }) => ({ slug, title })),
    ).toEqual([
      {
        slug: 'chinese-language',
        title: { en: 'Chinese Language', zh: '中文语言' },
      },
      {
        slug: 'chinese-lifestyle',
        title: { en: 'Chinese Lifestyle', zh: '中国生活' },
      },
      {
        slug: 'chinese-culture-tradition',
        title: { en: 'Chinese Culture & Tradition', zh: '中国文化与传统' },
      },
      {
        slug: 'chinese-entertainment',
        title: { en: 'Chinese Entertainment', zh: '华语娱乐' },
      },
      {
        slug: 'community-stories',
        title: { en: 'Community Stories', zh: '同行故事' },
      },
      {
        slug: 'free-tools-resources',
        title: { en: 'Free Tools & Resources', zh: '免费工具与资源' },
      },
    ])
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
    const subcategorySlugs = categories.flatMap((category) =>
      category.subcategories.map((subcategory) => subcategory.slug),
    )
    expect(new Set(subcategorySlugs).size).toBe(subcategorySlugs.length)
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

  it('keeps article metadata complete and routable', () => {
    const approvedCategories = new Set(categories.map((category) => category.slug))

    expect(
      articles.every(
        (article) =>
          approvedCategories.has(article.category) &&
          article.tags.length > 0 &&
          article.tags.every((tag) => tag.en && tag.zh) &&
          article.image.alt.en &&
          article.image.alt.zh &&
          article.seo.title.en &&
          article.seo.title.zh &&
          article.seo.description.en &&
          article.seo.description.zh &&
          /^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt) &&
          !Number.isNaN(Date.parse(`${article.publishedAt}T00:00:00Z`)) &&
          new Date(`${article.publishedAt}T00:00:00Z`)
            .toISOString()
            .slice(0, 10) === article.publishedAt &&
          article.readingMinutes > 0,
      ),
    ).toBe(true)
  })

  it('keeps section ids unique within each article and section copy paired', () => {
    expect(
      articles.every((article) => {
        const sectionIds = article.sections.map((section) => section.id)

        return (
          sectionIds.every(Boolean) &&
          new Set(sectionIds).size === sectionIds.length &&
          article.sections.every(
            (section) =>
              section.heading.en &&
              section.heading.zh &&
              section.paragraphs.length > 0 &&
              section.paragraphs.every(
                (paragraph) => paragraph.en && paragraph.zh,
              ),
          )
        )
      }),
    ).toBe(true)
  })

  it('uses the approved canonical tea title in both locales', () => {
    expect(getArticle('tea-is-never-just-a-drink')?.title).toEqual({
      en: 'Why tea is never just a drink',
      zh: '为什么茶从来不只是一杯饮料',
    })
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
