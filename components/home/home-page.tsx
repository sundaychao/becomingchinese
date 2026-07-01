import type { Article } from '@/content/articles'
import type { Category } from '@/content/categories'
import type { Locale } from '@/lib/i18n'
import type { SearchDocument } from '@/lib/search'
import styles from '@/styles/home.module.css'
import { DemoForm } from '@/components/forms/demo-form'

import { CategoryGrid } from './category-grid'
import { Hero } from './hero'
import { StoryGrid } from './story-grid'
import { ToolStrip } from './tool-strip'

type HomePageProps = Readonly<{
  locale: Locale
  categories: Category[]
  articles: Article[]
  searchIndex: SearchDocument[]
}>

export function HomePage({ locale, categories, articles, searchIndex }: HomePageProps) {
  return (
    <>
      <Hero locale={locale} index={searchIndex} />
      <CategoryGrid categories={categories} locale={locale} />
      <StoryGrid articles={articles} locale={locale} />
      <ToolStrip locale={locale} />
      <section className={styles.community} aria-labelledby="community-heading">
        <div className={styles.communityInner}>
          <p className={styles.communityKicker}>{locale === 'en' ? '同行 · Together' : '同行 · 一起走'}</p>
          <blockquote>
            <p id="community-heading">
              {locale === 'en'
                ? '“The more I learned, the less China felt like a puzzle—and the more it felt like a conversation.”'
                : '“了解得越多，中国就越不像一道谜题，而更像一场可以慢慢展开的对话。”'}
            </p>
            <footer>{locale === 'en' ? 'Maya · Community contributor' : 'Maya · 社区作者'}</footer>
          </blockquote>
        </div>
        <div className={styles.communityPortrait} aria-hidden="true">
          <span>人</span>
        </div>
      </section>
      <section className={styles.newsletter} aria-labelledby="newsletter-heading">
        <div>
          <p>{locale === 'en' ? 'A thoughtful note from China' : '一封来自中国的用心来信'}</p>
          <h2 id="newsletter-heading">
            {locale === 'en' ? 'Keep learning, one story at a time.' : '一次读一个故事，继续了解中国。'}
          </h2>
        </div>
        <DemoForm variant="newsletter" locale={locale} />
      </section>
    </>
  )
}
