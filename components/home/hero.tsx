import Image from 'next/image'

import { translations } from '@/content/translations'
import type { Locale } from '@/lib/i18n'
import type { SearchDocument } from '@/lib/search'
import styles from '@/styles/home.module.css'

import { SearchPanel } from '../search/search-panel'

type HeroProps = Readonly<{
  locale: Locale
  index: SearchDocument[]
}>

export function Hero({ locale, index }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1>{translations.tagline[locale]}</h1>
          <p>
            {locale === 'en'
              ? 'Language, culture and daily life—explained with clarity, curiosity and care.'
              : '从语言、文化到日常生活，用清晰、好奇与真诚陪你读懂中国。'}
          </p>
          <SearchPanel locale={locale} index={index} />
        </div>
        <div className={styles.heroArtwork}>
          <Image
            src="/images/home/hero-art.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
          />
        </div>
      </div>
    </section>
  )
}
