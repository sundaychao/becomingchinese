'use client'

import Link from 'next/link'
import { useDeferredValue, useState } from 'react'

import type { Locale } from '@/lib/i18n'
import { searchArticles, type SearchDocument } from '@/lib/search'
import styles from '@/styles/home.module.css'

type SearchPanelProps = Readonly<{
  locale: Locale
  index: SearchDocument[]
}>

const copy = {
  en: {
    label: 'Search Becoming Chinese',
    placeholder: 'What do you want to understand?',
    noResults: 'No stories found',
    recovery: 'Try another phrase or browse every topic.',
    explore: 'Explore all topics',
  },
  zh: {
    label: '搜索 Becoming Chinese',
    placeholder: '你想了解什么？',
    noResults: '没有找到相关故事',
    recovery: '换个关键词，或浏览全部主题。',
    explore: '探索全部主题',
  },
} as const

export function SearchPanel({ locale, index }: SearchPanelProps) {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const results = searchArticles(deferredQuery, index)
  const text = copy[locale]
  const hasQuery = deferredQuery.trim().length > 0

  return (
    <div className={styles.searchPanel} role="search">
      <label className={styles.visuallyHidden} htmlFor="home-search">
        {text.label}
      </label>
      <span className={styles.searchIcon} aria-hidden="true">⌕</span>
      <input
        id="home-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={text.placeholder}
      />
      {hasQuery ? (
        <div className={styles.searchResults} aria-live="polite">
          {results.length > 0 ? (
            <ul>
              {results.slice(0, 4).map((result) => (
                <li key={result.slug}>
                  <Link href={`/${locale}/articles/${result.slug}`}>
                    <strong>{result.title}</strong>
                    <span>{result.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptySearch}>
              <strong>{text.noResults}</strong>
              <p>{text.recovery}</p>
              <Link href={`/${locale}/articles`}>{text.explore}</Link>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
