'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { isLocale } from '@/lib/i18n'
import styles from '@/styles/forms.module.css'

const copy = {
  en: {
    title: '404 — Page not found',
    description: 'The page may have moved or the address may be incomplete.',
    home: 'Return home',
    articles: 'Browse articles',
    tools: 'Explore tools',
  },
  zh: {
    title: '404 — 未找到页面',
    description: '此页面可能已移动，或者网址不完整。',
    home: '返回首页',
    articles: '浏览文章',
    tools: '探索工具',
  },
} as const

export default function LocalizedNotFound() {
  const params = useParams<{ locale?: string }>()
  const locale = isLocale(params.locale) ? params.locale : 'en'
  const text = copy[locale]

  return (
    <article className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>{text.title}</h1>
        <p>{text.description}</p>
      </header>
      <nav aria-label={locale === 'zh' ? '页面恢复选项' : 'Page recovery options'}>
        <ul className={styles.recoveryLinks}>
          <li><Link href={`/${locale}`}>{text.home}</Link></li>
          <li><Link href={`/${locale}/articles`}>{text.articles}</Link></li>
          <li><Link href={`/${locale}/tools`}>{text.tools}</Link></li>
        </ul>
      </nav>
    </article>
  )
}
