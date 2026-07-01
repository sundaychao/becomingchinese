import { describe, expect, it } from 'vitest'
import { resolveLocale } from '@/lib/i18n'

describe('resolveLocale', () => {
  it('prioritizes cookie over country and browser language', () => {
    expect(resolveLocale({ cookie: 'en', country: 'CN', acceptLanguage: 'zh-CN' })).toBe('en')
  })

  it('maps mainland China to Chinese and other known countries to English', () => {
    expect(resolveLocale({ country: 'CN' })).toBe('zh')
    expect(resolveLocale({ country: 'SG', acceptLanguage: 'zh-CN' })).toBe('en')
  })

  it('uses browser language only when country is unavailable', () => {
    expect(resolveLocale({ acceptLanguage: 'zh-TW,zh;q=0.9' })).toBe('zh')
    expect(resolveLocale({ acceptLanguage: 'fr-FR' })).toBe('en')
  })
})
