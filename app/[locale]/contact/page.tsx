import { notFound } from 'next/navigation'

import { DemoForm } from '@/components/forms/demo-form'
import { getFixedPage } from '@/content/pages'
import { isLocale, LOCALES } from '@/lib/i18n'
import styles from '@/styles/forms.module.css'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function ContactPage({ params }: Readonly<{
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const page = getFixedPage('contact')!

  return (
    <article className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>{page.title[locale]}</h1>
        <p>{page.description[locale]}</p>
      </header>
      {page.sections.map((section) => (
        <section className={styles.section} key={section.id}>
          <h2>{section.heading[locale]}</h2>
          {section.paragraphs.map((paragraph) => <p key={paragraph.en}>{paragraph[locale]}</p>)}
        </section>
      ))}
      <DemoForm locale={locale} variant="contact" />
    </article>
  )
}
