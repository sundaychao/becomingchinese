import Link from 'next/link'

import type { Article } from '@/content/articles'
import type { Locale } from '@/lib/i18n'
import styles from '@/styles/home.module.css'

import { ArticleCard } from '../content/article-card'

export function StoryGrid({ articles, locale }: Readonly<{
  articles: Article[]
  locale: Locale
}>) {
  const [lead, ...secondary] = articles.slice(0, 3)

  if (!lead) return null

  return (
    <section className={`${styles.section} ${styles.storySection}`} aria-labelledby="stories-heading">
      <div className={styles.headingRow}>
        <div className={styles.sectionHeading}>
          <p>{locale === 'en' ? 'Featured stories' : '精选故事'}</p>
          <h2 id="stories-heading">
            {locale === 'en' ? 'Go beyond the first impression.' : '看见第一印象之外的中国。'}
          </h2>
        </div>
        <Link href={`/${locale}/articles`}>
          {locale === 'en' ? 'View all stories' : '查看全部故事'} <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className={styles.storyGrid}>
        <ArticleCard article={lead} locale={locale} featured />
        <div className={styles.secondaryStories}>
          {secondary.map((article) => (
            <ArticleCard article={article} locale={locale} key={article.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
