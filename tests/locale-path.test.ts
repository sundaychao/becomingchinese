import { describe, expect, it } from 'vitest'

import { replaceLocale } from '@/lib/locale-path'

describe('replaceLocale', () => {
  it('preserves the semantic path while replacing locale', () => {
    expect(replaceLocale('/en/articles/tea-is-never-just-a-drink', 'zh')).toBe(
      '/zh/articles/tea-is-never-just-a-drink',
    )
  })

  it('prefixes unlocalized paths', () => {
    expect(replaceLocale('/tools', 'en')).toBe('/en/tools')
  })
})
