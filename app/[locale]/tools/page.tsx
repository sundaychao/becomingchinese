import Link from 'next/link'
import { notFound } from 'next/navigation'

import { isLocale, LOCALES } from '@/lib/i18n'
import styles from '@/styles/tools.module.css'

const pageCopy = {
  en: {
    eyebrow: 'Free tools',
    title: 'Practical companions for life in China.',
    intro: 'Small, thoughtful tools to help you communicate, prepare, and feel more at home.',
    open: 'Open tool',
    soon: 'Coming soon',
    tools: [
      ['Chinese name generator', 'Explore three meaningful Chinese names shaped by your style and character.'],
      ['Phrasebook builder', 'Gather useful phrases for the conversations ahead.'],
      ['Travel checklist', 'Prepare the everyday details before you arrive.'],
      ['Tone practice', 'Build confidence hearing and speaking Mandarin tones.'],
    ],
  },
  zh: {
    eyebrow: '免费工具',
    title: '陪你在中国生活的实用小工具。',
    intro: '从沟通到准备，用简单而贴心的工具帮你更快融入日常。',
    open: '打开工具',
    soon: '即将推出',
    tools: [
      ['中文名生成器', '根据你的风格与个性，探索三个富有含义的中文名。'],
      ['实用短语本', '为接下来的真实对话收集常用表达。'],
      ['旅行清单', '出发前准备好日常生活所需。'],
      ['声调练习', '练习辨听与说出普通话声调。'],
    ],
  },
} as const

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export default async function ToolsPage({ params }: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const text = pageCopy[locale]

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <p>{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <span>{text.intro}</span>
      </header>
      <section className={styles.toolGrid} aria-label={text.eyebrow}>
        {text.tools.map(([title, description], index) => (
          <article className={`${styles.toolCard} ${index > 0 ? styles.disabledTool : ''}`} key={title}>
            <span className={styles.toolNumber}>0{index + 1}</span>
            <h2>{title}</h2>
            <p>{description}</p>
            {index === 0 ? (
              <Link href={`/${locale}/tools/chinese-name-generator`}>{text.open} <span aria-hidden="true">→</span></Link>
            ) : (
              <span className={styles.comingSoon} aria-disabled="true">{text.soon}</span>
            )}
          </article>
        ))}
      </section>
    </div>
  )
}
