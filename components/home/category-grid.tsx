import type { Category } from '@/content/categories'
import type { Locale } from '@/lib/i18n'
import styles from '@/styles/home.module.css'

import { CategoryCard } from '../content/category-card'

export function CategoryGrid({ categories, locale }: Readonly<{
  categories: Category[]
  locale: Locale
}>) {
  return (
    <section className={styles.section} aria-labelledby="category-heading">
      <div className={styles.sectionHeading}>
        <p>{locale === 'en' ? 'Choose a path' : '选择一条路径'}</p>
        <h2 id="category-heading">
          {locale === 'en' ? 'Start with what matters to you.' : '从你关心的事情开始。'}
        </h2>
      </div>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <CategoryCard category={category} locale={locale} key={category.slug} />
        ))}
      </div>
    </section>
  )
}
