import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { isLocale } from '@/lib/i18n'
import styles from '@/styles/layout.module.css'

type LocaleLayoutProps = Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <div className={styles.siteShell}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <SiteHeader locale={locale} />
      <main className={styles.mainContent} id="main-content">{children}</main>
      <SiteFooter locale={locale} />
    </div>
  )
}
