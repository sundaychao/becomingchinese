'use client'

import { useState, useTransition, type FormEvent } from 'react'

import type { Locale } from '@/lib/i18n'
import {
  generateChineseNames,
  validateNameInput,
  type GeneratedName,
  type NameInputErrors,
  type NamePreferences,
  type NameStyle,
  type NameTrait,
} from '@/lib/name-generator'
import styles from '@/styles/tools.module.css'

const INITIAL_PREFERENCES: NamePreferences = {
  englishName: '',
  style: 'classic',
  trait: 'calm',
}

const copy = {
  en: {
    nameLabel: 'English name',
    nameHint: 'Letters, spaces, apostrophes, and hyphens; up to 50 characters.',
    namePlaceholder: 'e.g. Maya',
    styleLabel: 'Name style',
    traitLabel: 'Defining trait',
    generate: 'Generate names',
    generating: 'Finding names…',
    results: 'Your name ideas',
    meaning: 'Meaning',
    rationale: 'Why it fits',
    copy: 'Copy',
    copied: 'Copied',
    copyFailed: 'Could not copy. Please try again.',
    nameRequired: 'Enter your English name.',
    nameInvalid: 'Use letters, spaces, apostrophes, or hyphens only (50 characters maximum).',
    styleInvalid: 'Choose a name style.',
    traitInvalid: 'Choose a defining trait.',
    styles: { classic: 'Classic', gentle: 'Gentle', modern: 'Modern', bold: 'Bold' },
    traits: { calm: 'Calm', curious: 'Curious', creative: 'Creative', brave: 'Brave' },
  },
  zh: {
    nameLabel: '英文名',
    nameHint: '可输入英文字母、空格、撇号和连字符，最多 50 个字符。',
    namePlaceholder: '例如 Maya',
    styleLabel: '名字风格',
    traitLabel: '个性特质',
    generate: '生成名字',
    generating: '正在构思…',
    results: '你的中文名灵感',
    meaning: '含义',
    rationale: '推荐理由',
    copy: '复制',
    copied: '已复制',
    copyFailed: '复制失败，请重试。',
    nameRequired: '请输入你的英文名。',
    nameInvalid: '仅可使用英文字母、空格、撇号或连字符，最多 50 个字符。',
    styleInvalid: '请选择名字风格。',
    traitInvalid: '请选择个性特质。',
    styles: { classic: '古典', gentle: '温柔', modern: '现代', bold: '大气' },
    traits: { calm: '沉静', curious: '好奇', creative: '创造力', brave: '勇敢' },
  },
} as const

export function NameGenerator({ locale }: Readonly<{ locale: Locale }>) {
  const text = copy[locale]
  const [preferences, setPreferences] = useState<NamePreferences>(INITIAL_PREFERENCES)
  const [errors, setErrors] = useState<NameInputErrors>({})
  const [results, setResults] = useState<GeneratedName[]>([])
  const [copyStatus, setCopyStatus] = useState('')
  const [isPending, startTransition] = useTransition()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateNameInput(preferences)
    setErrors(nextErrors)
    setCopyStatus('')

    if (Object.keys(nextErrors).length > 0) {
      setResults([])
      return
    }

    startTransition(() => setResults(generateChineseNames(preferences)))
  }

  async function copyName(name: GeneratedName) {
    try {
      await navigator.clipboard.writeText(`${name.hanzi} — ${name.pinyin}`)
      setCopyStatus(`${text.copied}: ${name.hanzi}`)
    } catch {
      setCopyStatus(text.copyFailed)
    }
  }

  const nameError = errors.englishName
    ? preferences.englishName.trim().length === 0
      ? text.nameRequired
      : text.nameInvalid
    : undefined

  return (
    <div className={styles.generatorShell}>
      <form className={styles.generatorForm} onSubmit={submit} noValidate>
        <div className={styles.fieldGroup}>
          <label htmlFor="english-name">{text.nameLabel}</label>
          <input
            aria-describedby={`english-name-hint${nameError ? ' english-name-error' : ''}`}
            aria-invalid={Boolean(nameError)}
            autoComplete="name"
            id="english-name"
            maxLength={51}
            onChange={(event) =>
              setPreferences((current) => ({ ...current, englishName: event.target.value }))
            }
            placeholder={text.namePlaceholder}
            value={preferences.englishName}
          />
          <small id="english-name-hint">{text.nameHint}</small>
          {nameError ? <p className={styles.fieldError} id="english-name-error">{nameError}</p> : null}
        </div>

        <div className={styles.selectRow}>
          <div className={styles.fieldGroup}>
            <label htmlFor="name-style">{text.styleLabel}</label>
            <select
              aria-invalid={Boolean(errors.style)}
              id="name-style"
              onChange={(event) =>
                setPreferences((current) => ({
                  ...current,
                  style: event.target.value as NameStyle,
                }))
              }
              value={preferences.style}
            >
              {Object.entries(text.styles).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {errors.style ? <p className={styles.fieldError}>{text.styleInvalid}</p> : null}
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="name-trait">{text.traitLabel}</label>
            <select
              aria-invalid={Boolean(errors.trait)}
              id="name-trait"
              onChange={(event) =>
                setPreferences((current) => ({
                  ...current,
                  trait: event.target.value as NameTrait,
                }))
              }
              value={preferences.trait}
            >
              {Object.entries(text.traits).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {errors.trait ? <p className={styles.fieldError}>{text.traitInvalid}</p> : null}
          </div>
        </div>

        <button className={styles.primaryButton} disabled={isPending} type="submit">
          {isPending ? text.generating : text.generate}
        </button>
      </form>

      <section className={styles.results} aria-live="polite" aria-busy={isPending}>
        {results.length > 0 ? <h2>{text.results}</h2> : null}
        <div className={styles.resultGrid}>
          {results.map((name) => (
            <article className={styles.resultCard} data-testid="name-result" key={name.hanzi}>
              <p className={styles.hanzi}>{name.hanzi}</p>
              <p className={styles.pinyin}>{name.pinyin}</p>
              <dl>
                <div>
                  <dt>{text.meaning}</dt>
                  <dd>{name.meaning[locale]}</dd>
                </div>
                <div>
                  <dt>{text.rationale}</dt>
                  <dd>{name.rationale[locale]}</dd>
                </div>
              </dl>
              <button
                className={styles.copyButton}
                onClick={() => void copyName(name)}
                type="button"
                aria-label={`${text.copy} ${name.hanzi}`}
              >
                {text.copy}
              </button>
            </article>
          ))}
        </div>
      </section>
      <p className={styles.copyStatus} role="status" aria-live="polite">{copyStatus}</p>
    </div>
  )
}
