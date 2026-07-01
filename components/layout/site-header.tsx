import Link from 'next/link'

import type { Locale } from '@/lib/i18n'
import styles from '@/styles/layout.module.css'

import { LanguageSwitcher } from './language-switcher'
import { MobileMenu } from './mobile-menu'

const navigation = [
  { label: 'Learn', path: '/category/chinese-language' },
  { label: 'Lifestyle', path: '/category/chinese-lifestyle' },
  { label: 'Culture', path: '/category/chinese-culture-tradition' },
  { label: 'Stories', path: '/articles' },
  { label: 'Tools', path: '/tools' },
] as const

export function SiteHeader({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href={`/${locale}`} aria-label="Becoming Chinese home">
          <span className={styles.brandMark} aria-hidden="true">成</span>
          <span>Becoming Chinese</span>
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <ul>
            {navigation.map((item) => (
              <li key={item.label}><Link href={`/${locale}${item.path}`}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className={styles.desktopLanguage}><LanguageSwitcher /></div>
        <MobileMenu locale={locale} />
      </div>
    </header>
  )
}
