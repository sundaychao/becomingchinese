import Link from 'next/link'

import type { Locale } from '@/lib/i18n'
import styles from '@/styles/home.module.css'

const tools = {
  en: [
    ['Chinese name generator', 'Find a thoughtful starting point for a Chinese name.', '/tools/chinese-name-generator'],
    ['Phrasebook builder', 'Collect practical phrases for the moments ahead.', '/tools'],
    ['Travel checklist', 'Prepare the everyday details before you arrive.', '/tools'],
  ],
  zh: [
    ['中文名生成器', '找到一个有意义的中文名字起点。', '/tools/chinese-name-generator'],
    ['实用短语本', '为接下来的生活场景收集常用表达。', '/tools'],
    ['旅行清单', '出发前准备好日常生活所需。', '/tools'],
  ],
} as const

export function ToolStrip({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <section className={`${styles.section} ${styles.toolSection}`} aria-labelledby="tools-heading">
      <div className={styles.sectionHeading}>
        <p>{locale === 'en' ? 'Free tools' : '免费工具'}</p>
        <h2 id="tools-heading">
          {locale === 'en' ? 'Useful from your first day.' : '从第一天就能派上用场。'}
        </h2>
      </div>
      <div className={styles.toolList}>
        {tools[locale].map(([title, description, path], index) => (
          <Link href={`/${locale}${path}`} key={title}>
            <span className={styles.toolNumber}>0{index + 1}</span>
            <span>
              <strong>{title}</strong>
              <small>{description}</small>
            </span>
            <span className={styles.toolArrow} aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
