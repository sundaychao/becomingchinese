'use client'

import { usePathname, useRouter } from 'next/navigation'

import type { Locale } from '@/lib/i18n'
import { replaceLocale } from '@/lib/locale-path'
import styles from '@/styles/layout.module.css'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(locale: Locale) {
    const target = replaceLocale(pathname, locale)
    document.cookie = `bc-locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`
    router.push(target)
  }

  return (
    <div className={styles.languageSwitcher} aria-label="Language">
      <button type="button" onClick={() => switchLocale('en')}>
        EN
      </button>
      <button type="button" onClick={() => switchLocale('zh')}>
        中文
      </button>
    </div>
  )
}
