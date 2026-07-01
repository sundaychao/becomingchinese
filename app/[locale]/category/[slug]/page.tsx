import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArticleCard } from '@/components/content/article-card'
import { categories } from '@/content/categories'
import { getCategory, listArticles } from '@/lib/content'
import { isLocale, LOCALES } from '@/lib/i18n'
import styles from '@/styles/article.module.css'

type CategoryPageProps = Readonly<{
  params: Promise<{ locale: string; slug: string }>
}>

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => categories.map(({ slug }) => ({ locale, slug })))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const category = getCategory(slug)
  if (!isLocale(locale) || !category) return {}

  return {
    title: category.title[locale],
    description: category.description[locale],
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale, slug } = await params
  const category = getCategory(slug)
  if (!isLocale(locale) || !category) notFound()

  const categoryArticles = listArticles(category.slug)
  const [featuredArticle, ...latestArticles] = categoryArticles
  const text = locale === 'en'
    ? { topics: 'Explore this topic', featured: 'Featured story', latest: 'Latest content', empty: 'New stories are on the way.' }
    : { topics: '探索这一主题', featured: '精选文章', latest: '最新内容', empty: '新文章正在准备中。' }

  return (
    <div className={styles.listPage}>
      <header className={styles.listHero}>
        <p className={styles.categoryCharacter} aria-hidden="true">{category.character}</p>
        <div>
          <p className={styles.eyebrow}>{locale === 'en' ? 'Topic guide' : '主题指南'}</p>
          <h1>{category.title[locale]}</h1>
          <p>{category.description[locale]}</p>
        </div>
      </header>

      <section className={styles.filters} aria-labelledby="subcategory-heading">
        <h2 id="subcategory-heading">{text.topics}</h2>
        <div>
          {category.subcategories.map((subcategory) => (
            <Link href={`/${locale}/category/${category.slug}#${subcategory.slug}`} key={subcategory.slug}>
              {subcategory.title[locale]}
            </Link>
          ))}
        </div>
      </section>

      {featuredArticle ? (
        <section className={styles.featureSection} aria-labelledby="featured-heading">
          <p className={styles.eyebrow} id="featured-heading">{text.featured}</p>
          <ArticleCard article={featuredArticle} featured locale={locale} />
        </section>
      ) : <p className={styles.emptyState}>{text.empty}</p>}

      {latestArticles.length > 0 ? (
        <section className={styles.latestSection} aria-labelledby="latest-heading">
          <h2 id="latest-heading">{text.latest}</h2>
          <div className={styles.cardGrid}>
            {latestArticles.map((article) => <ArticleCard article={article} key={article.slug} locale={locale} />)}
          </div>
        </section>
      ) : null}
    </div>
  )
}
