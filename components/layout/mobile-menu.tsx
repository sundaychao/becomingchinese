'use client'

import Link from 'next/link'
import { useId, useState } from 'react'

import type { Locale } from '@/lib/i18n'
import styles from '@/styles/layout.module.css'

import { LanguageSwitcher } from './language-switcher'

const links = [
  { label: 'Learn', path: '/category/chinese-language' },
  { label: 'Lifestyle', path: '/category/chinese-lifestyle' },
  { label: 'Culture', path: '/category/chinese-culture-tradition' },
  { label: 'Stories', path: '/articles' },
  { label: 'Tools', path: '/tools' },
] as const

export function MobileMenu({ locale }: Readonly<{ locale: Locale }>) {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <div className={styles.mobileMenu}>
      <button
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.menuIcon} aria-hidden="true"><span /><span /></span>
      </button>

      {isOpen ? (
        <div className={styles.mobilePanel} id={menuId}>
          <nav aria-label="Mobile navigation">
            <ul className={styles.mobileNavList}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={`/${locale}${link.path}`} onClick={closeMenu}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.mobileLanguage}><LanguageSwitcher /></div>
        </div>
      ) : null}
    </div>
  )
}
