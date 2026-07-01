import Link from 'next/link'
import { notFound } from 'next/navigation'

import { NameGenerator } from '@/components/tools/name-generator'
import { isLocale, LOCALES } from '@/lib/i18n'
import styles from '@/styles/tools.module.css'

const pageCopy = {
  en: {
    back: 'All tools',
    eyebrow: 'Chinese name generator',
    title: 'Find a name with a story behind it.',
    intro: 'Share a little about yourself. We will suggest three thoughtful starting points, created here in your browser.',
  },
  zh: {
    back: '全部工具',
    eyebrow: '中文名生成器',
    title: '找到一个有故事的中文名。',
    intro: '告诉我们一点关于你的信息，我们会直接在浏览器中为你提供三个用心的名字灵感。',
  },
} as const

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function ChineseNameGeneratorPage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const text = pageCopy[locale]

  return (
    <div className={styles.page}>
      <Link className={styles.backLink} href={`/${locale}/tools`}>← {text.back}</Link>
      <header className={styles.generatorHeader}>
        <p>{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <span>{text.intro}</span>
      </header>
      <NameGenerator locale={locale} />
    </div>
  )
}
