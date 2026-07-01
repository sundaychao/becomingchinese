import Link from 'next/link'

import type { Article } from '@/content/articles'
import type { Locale } from '@/lib/i18n'
import styles from '@/styles/cards.module.css'

type ArticleCardProps = Readonly<{
  article: Article
  locale: Locale
  featured?: boolean
}>

export function ArticleCard({ article, locale, featured = false }: ArticleCardProps) {
  const readTime = locale === 'en'
    ? `${article.readingMinutes} min read`
    : `阅读约 ${article.readingMinutes} 分钟`

  return (
    <article className={featured ? styles.featuredArticle : styles.articleCard}>
      <Link href={`/${locale}/articles/${article.slug}`}>
        <div className={styles.articleVisual} aria-hidden="true">
          <span>{article.title[locale].slice(0, 1)}</span>
        </div>
        <div className={styles.articleCopy}>
          <p className={styles.articleMeta}>{readTime}</p>
          <h3>{article.title[locale]}</h3>
          <p>{article.summary[locale]}</p>
          <span className={styles.readLink}>
            {locale === 'en' ? 'Read story' : '阅读故事'} <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
