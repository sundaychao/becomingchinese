'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { isLocale } from '@/lib/i18n'

// 静态导出不能用 middleware，根路径通过客户端组件做语言检测重定向
export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)bc-locale=([^;]+)/)
    const cookieLocale = match?.[1]
    const browserZh = navigator.language.toLowerCase().startsWith('zh')
    const locale = isLocale(cookieLocale) ? cookieLocale : browserZh ? 'zh' : 'en'
    router.replace(`/${locale}`)
  }, [router])

  return null
}
