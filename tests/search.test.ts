import { describe, expect, it } from 'vitest'

import { buildSearchIndex, searchArticles } from '../lib/search'

describe('article search', () => {
  it('finds localized text across indexed fields', () => {
    const index = buildSearchIndex('en')

    expect(searchArticles('tea', index).map((item) => item.slug)).toContain(
      'tea-is-never-just-a-drink',
    )
    expect(searchArticles('  TEA  ', index).map((item) => item.slug)).toContain(
      'tea-is-never-just-a-drink',
    )
    expect(searchArticles('not-a-real-topic', index)).toEqual([])
  })

  it('returns the complete index for an empty query', () => {
    const index = buildSearchIndex('zh')

    expect(searchArticles('   ', index)).toEqual(index)
  })

  it('projects only body-free search document fields', () => {
    const index = buildSearchIndex('en')
    const tea = index.find((item) => item.slug === 'tea-is-never-just-a-drink')

    expect(tea).toEqual({
      slug: 'tea-is-never-just-a-drink',
      title: 'Tea Is Never Just a Drink',
      summary: expect.any(String),
      category: 'Chinese Lifestyle',
      tags: expect.arrayContaining(['tea']),
    })
    expect(Object.keys(tea ?? {}).sort()).toEqual(
      ['category', 'slug', 'summary', 'tags', 'title'].sort(),
    )
    expect(tea).not.toHaveProperty('sections')
  })
})
