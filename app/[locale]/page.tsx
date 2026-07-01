import { notFound } from 'next/navigation'

import { HomePage } from '@/components/home/home-page'
import { articles } from '@/content/articles'
import { categories } from '@/content/categories'
import { isLocale, LOCALES } from '@/lib/i18n'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function LocaleHomePage({ params }: Readonly<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <HomePage
      locale={locale}
      categories={categories}
      articles={articles}
    />
  )
}
