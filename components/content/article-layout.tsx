import Image from 'next/image'
import Link from 'next/link'

import { ArticleCard } from '@/components/content/article-card'
import type { Article } from '@/content/articles'
import type { Category } from '@/content/categories'
import type { Locale } from '@/lib/i18n'
import styles from '@/styles/article.module.css'

type ArticleLayoutProps = Readonly<{
  article: Article
  category: Category
  locale: Locale
  relatedArticles: Article[]
}>

const copy = {
  en: {
    articles: 'Articles',
    contents: 'Table of contents',
    related: 'Keep exploring',
    relatedIntro: 'More practical context from the same topic.',
    minutes: (value: number) => `${value} min read`,
  },
  zh: {
    articles: '文章',
    contents: '目录',
    related: '继续探索',
    relatedIntro: '阅读同一主题下的更多实用内容。',
    minutes: (value: number) => `阅读约 ${value} 分钟`,
  },
} as const

export function ArticleLayout({ article, category, locale, relatedArticles }: ArticleLayoutProps) {
  const text = copy[locale]
  const secondaryLocale: Locale = locale === 'en' ? 'zh' : 'en'

  return (
    <article>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <nav className={styles.breadcrumbs} aria-label={locale === 'en' ? 'Breadcrumb' : '面包屑导航'}>
            <Link href={`/${locale}/articles`}>{text.articles}</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${locale}/category/${category.slug}`}>{category.title[locale]}</Link>
          </nav>
          <p className={styles.eyebrow}>{category.title[locale]}</p>
          <h1>{article.title[locale]}</h1>
          <p className={styles.summary}>{article.summary[locale]}</p>
          <div className={styles.meta}>
            <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{text.minutes(article.readingMinutes)}</span>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            alt={article.image.alt[locale]}
            fill
            priority
            sizes="(max-width: 62rem) 100vw, 48vw"
            src={article.image.src}
          />
        </div>
      </header>

      <div className={styles.articleGrid}>
        <nav className={styles.toc} aria-label={text.contents}>
          <p>{text.contents}</p>
          <ol>
            {article.sections.map((section) => (
              <li key={section.id}><a href={`#${section.id}`}>{section.heading[locale]}</a></li>
            ))}
          </ol>
        </nav>
        <div className={styles.body}>
          {article.sections.map((section) => (
            <section id={section.id} key={section.id}>
              <h2>{section.heading[locale]}</h2>
              {section.paragraphs.map((paragraph) => (
                <div className={styles.bilingualBlock} key={paragraph.en}>
                  <p lang={locale === 'zh' ? 'zh-CN' : 'en'}>{paragraph[locale]}</p>
                  <p className={styles.translation} lang={secondaryLocale === 'zh' ? 'zh-CN' : 'en'}>
                    {paragraph[secondaryLocale]}
                  </p>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>

      {relatedArticles.length > 0 ? (
        <section className={styles.related} aria-labelledby="related-heading">
          <div className={styles.relatedHeading}>
            <p>{text.relatedIntro}</p>
            <h2 id="related-heading">{text.related}</h2>
          </div>
          <div className={styles.relatedGrid}>
            {relatedArticles.map((relatedArticle) => (
              <div data-testid="related-article" key={relatedArticle.slug}>
                <ArticleCard article={relatedArticle} locale={locale} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
