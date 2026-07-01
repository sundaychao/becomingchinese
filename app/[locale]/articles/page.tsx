import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticleCard } from '@/components/content/article-card'
import { SearchPanel } from '@/components/search/search-panel'
import { listArticles } from '@/lib/content'
import { isLocale, LOCALES } from '@/lib/i18n'
import { buildSearchIndex } from '@/lib/search'
import styles from '@/styles/article.module.css'

type ArticlesPageProps = Readonly<{ params: Promise<{ locale: string }> }>

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return locale === 'en'
    ? { title: 'Articles', description: 'Practical guides to Chinese language, culture and everyday life.' }
    : { title: '文章', description: '关于中文、中国文化与日常生活的实用指南。' }
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const text = locale === 'en'
    ? { eyebrow: 'The library', title: 'Understand China, one story at a time.', intro: 'Search practical explanations or browse every article in the collection.' }
    : { eyebrow: '文章库', title: '从一篇篇故事开始了解中国。', intro: '搜索实用解读，或浏览文章库中的全部内容。' }

  return (
    <div className={styles.listPage}>
      <header className={styles.articlesHero}>
        <p className={styles.eyebrow}>{text.eyebrow}</p>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <SearchPanel index={buildSearchIndex(locale)} locale={locale} />
      </header>
      <section className={styles.allArticles} aria-label={locale === 'en' ? 'All articles' : '全部文章'}>
        {listArticles().map((article) => <ArticleCard article={article} key={article.slug} locale={locale} />)}
      </section>
    </div>
  )
}
