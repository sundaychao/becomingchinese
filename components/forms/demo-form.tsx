'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

import type { Locale } from '@/lib/i18n'
import styles from '@/styles/forms.module.css'

type DemoFormProps = Readonly<{
  variant: 'contact' | 'newsletter'
  locale: Locale
}>

const copy = {
  en: {
    name: 'Name',
    email: 'Email address',
    message: 'Message',
    contactAction: 'Preview message',
    newsletterAction: 'Preview subscription',
    required: 'This field is required.',
    invalidEmail: 'Enter a valid email address.',
    notice: 'Demonstration only — your entries stay in this browser.',
    success: 'Demo submitted — no data was sent.',
  },
  zh: {
    name: '姓名',
    email: '电子邮箱',
    message: '留言',
    contactAction: '预览留言',
    newsletterAction: '预览订阅',
    required: '请填写此字段。',
    invalidEmail: '请输入有效的电子邮箱地址。',
    notice: '仅供演示——您输入的内容只会保留在此浏览器中。',
    success: '演示已提交——未发送任何数据。',
  },
} as const

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function DemoForm({ variant, locale }: DemoFormProps) {
  const text = copy[locale]
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof values>>({})
  const [submitted, setSubmitted] = useState(false)
  const idPrefix = variant

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(false)

    const nextErrors: Partial<typeof values> = {}
    if (variant === 'contact' && !values.name.trim()) nextErrors.name = text.required
    if (!emailPattern.test(values.email.trim())) nextErrors.email = text.invalidEmail
    if (variant === 'contact' && !values.message.trim()) nextErrors.message = text.required

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setValues({ name: '', email: '', message: '' })
    setSubmitted(true)
  }

  function field(
    key: keyof typeof values,
    label: string,
    multiline = false,
  ) {
    const errorId = `${idPrefix}-${key}-error`
    const fieldId = `${idPrefix}-${key}`
    const shared = {
      id: fieldId,
      name: key,
      value: values[key],
      'aria-invalid': Boolean(errors[key]),
      'aria-describedby': errors[key] ? errorId : undefined,
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValues((current) => ({ ...current, [key]: event.target.value }))
        setErrors((current) => ({ ...current, [key]: undefined }))
        setSubmitted(false)
      },
    }

    return (
      <div className={styles.field}>
        <label htmlFor={fieldId}>{label}</label>
        {multiline ? (
          <textarea {...shared} rows={6} />
        ) : (
          <input {...shared} type={key === 'email' ? 'email' : 'text'} />
        )}
        {errors[key] ? <p className={styles.error} id={errorId}>{errors[key]}</p> : null}
      </div>
    )
  }

  return (
    <form className={styles.form} noValidate onSubmit={submit}>
      <p className={styles.demoNotice}>{text.notice}</p>
      {variant === 'contact' ? field('name', text.name) : null}
      {field('email', text.email)}
      {variant === 'contact' ? field('message', text.message, true) : null}
      <button className={styles.submit} type="submit">
        {variant === 'contact' ? text.contactAction : text.newsletterAction}
      </button>
      {submitted ? <p className={styles.success} role="status">{text.success}</p> : null}
    </form>
  )
}
