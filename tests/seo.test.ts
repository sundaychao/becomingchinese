import { afterEach, describe, expect, it } from 'vitest'

import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { generateMetadata } from '@/app/[locale]/layout'
import { generateMetadata as generateArticleMetadata } from '@/app/[locale]/articles/[slug]/page'
import { articles } from '@/content/articles'
import { categories } from '@/content/categories'
import { fixedPages } from '@/content/pages'
import { articleJsonLd, localizedAlternates } from '@/lib/seo'

describe('localizedAlternates', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  it('uses the current localized path as canonical and links both locales', () => {
    expect(localizedAlternates('/zh/articles/example')).toEqual({
      canonical: 'https://becomingchinese.com/zh/articles/example',
      languages: {
        en: 'https://becomingchinese.com/en/articles/example',
        zh: 'https://becomingchinese.com/zh/articles/example',
      },
    })
  })

  it('normalizes a configured site URL', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://preview.example/'

    expect(localizedAlternates('/en')).toEqual({
      canonical: 'https://preview.example/en',
      languages: {
        en: 'https://preview.example/en',
        zh: 'https://preview.example/zh',
      },
    })
  })
})

describe('articleJsonLd', () => {
  it('localizes article data and emits absolute image and publisher URLs', () => {
    expect(articleJsonLd(articles[0], 'en')).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: articles[0].title.en,
      description: articles[0].seo.description.en,
      datePublished: articles[0].publishedAt,
      image: `https://becomingchinese.com${articles[0].image.src}`,
      publisher: {
        '@type': 'Organization',
        name: 'Becoming Chinese',
        url: 'https://becomingchinese.com',
      },
    })
  })
})

describe('article route metadata', () => {
  it('adds localized canonical and language alternates', async () => {
    const article = articles[0]
    const metadata = await generateArticleMetadata({
      params: Promise.resolve({ locale: 'zh', slug: article.slug }),
    })

    expect(metadata.alternates).toEqual({
      canonical: `https://becomingchinese.com/zh/articles/${article.slug}`,
      languages: {
        en: `https://becomingchinese.com/en/articles/${article.slug}`,
        zh: `https://becomingchinese.com/zh/articles/${article.slug}`,
      },
    })
  })
})

describe('metadata routes', () => {
  it('lists each public content route in both locales', () => {
    const entries = sitemap()
    const expectedPerLocale = 1 + 1 + categories.length + articles.length + 2 + fixedPages.length

    expect(entries).toHaveLength(expectedPerLocale * 2)
    expect(new Set(entries.map(({ url }) => url)).size).toBe(entries.length)
    expect(entries).toContainEqual(expect.objectContaining({
      url: 'https://becomingchinese.com/en/tools/chinese-name-generator',
    }))
    expect(entries).toContainEqual(expect.objectContaining({
      url: `https://becomingchinese.com/zh/articles/${articles[0].slug}`,
    }))
  })

  it('allows the site and advertises its sitemap', () => {
    expect(robots()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://becomingchinese.com/sitemap.xml',
    })
  })
})

describe('locale layout metadata', () => {
  it('returns localized copy, canonical URL, and language alternates', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'zh' }) })

    expect(metadata).toMatchObject({
      title: 'Becoming Chinese｜中文、文化与中国生活',
      description: '探索中文、中国文化与日常生活的实用双语指南。',
      alternates: {
        canonical: 'https://becomingchinese.com/zh',
        languages: {
          en: 'https://becomingchinese.com/en',
          zh: 'https://becomingchinese.com/zh',
        },
      },
      openGraph: {
        locale: 'zh_CN',
        type: 'website',
      },
    })
  })
})
