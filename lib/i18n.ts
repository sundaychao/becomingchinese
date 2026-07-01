export const LOCALES = ['en', 'zh'] as const
export type Locale = (typeof LOCALES)[number]

export type LocaleSignals = {
  cookie?: string | null
  country?: string | null
  acceptLanguage?: string | null
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'en' || value === 'zh'
}

export function resolveLocale(signals: LocaleSignals): Locale {
  if (isLocale(signals.cookie)) return signals.cookie
  if (signals.country) return signals.country.toUpperCase() === 'CN' ? 'zh' : 'en'
  return signals.acceptLanguage?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}
