import Link from 'next/link'

import type { Category } from '@/content/categories'
import type { Locale } from '@/lib/i18n'
import styles from '@/styles/cards.module.css'

type CategoryCardProps = Readonly<{
  category: Category
  locale: Locale
}>

export function CategoryCard({ category, locale }: CategoryCardProps) {
  return (
    <Link className={styles.categoryCard} href={`/${locale}/category/${category.slug}`}>
      <span className={styles.character} aria-hidden="true">{category.character}</span>
      <div>
        <h3>{category.title[locale]}</h3>
        <p>{category.description[locale]}</p>
        <span className={styles.arrow} aria-hidden="true">↗</span>
      </div>
    </Link>
  )
}
