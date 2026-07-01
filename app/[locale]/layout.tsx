import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { isLocale } from '@/lib/i18n'
import { getSiteUrl, localizedAlternates } from '@/lib/seo'
import styles from '@/styles/layout.module.css'

type LocaleLayoutProps = Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>

const metadataCopy = {
  en: {
    title: 'Becoming Chinese | Language, Culture & Life in China',
    description: 'Practical bilingual guides to Chinese language, culture and everyday life.',
    openGraphLocale: 'en_US',
    alternateLocale: 'zh_CN',
  },
  zh: {
    title: 'Becoming Chinese｜中文、文化与中国生活',
    description: '探索中文、中国文化与日常生活的实用双语指南。',
    openGraphLocale: 'zh_CN',
    alternateLocale: 'en_US',
  },
} as const

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const copy = metadataCopy[locale]
  const alternates = localizedAlternates(`/${locale}`)

  return {
    metadataBase: new URL(getSiteUrl()),
    title: copy.title,
    description: copy.description,
    alternates,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: alternates.canonical,
      siteName: 'Becoming Chinese',
      locale: copy.openGraphLocale,
      alternateLocale: copy.alternateLocale,
      type: 'website',
    },
  }
}

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
