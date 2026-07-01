import type { LocalizedText } from './categories'

export type SiteTranslations = {
  siteName: LocalizedText
  tagline: LocalizedText
  navigation: Record<
    'learn' | 'lifestyle' | 'culture' | 'stories' | 'tools',
    LocalizedText
  >
  actions: Record<
    'search' | 'readArticle' | 'exploreAll' | 'changeLanguage' | 'backHome',
    LocalizedText
  >
  states: Record<'noResults' | 'notFound' | 'demoOnly', LocalizedText>
}

export const translations: SiteTranslations = {
  siteName: { en: 'Becoming Chinese', zh: '成为中国通' },
  tagline: {
    en: 'Your practical guide to everyday China.',
    zh: '你的中国日常实用指南。',
  },
  navigation: {
    learn: { en: 'Learn', zh: '学中文' },
    lifestyle: { en: 'Lifestyle', zh: '生活' },
    culture: { en: 'Culture', zh: '文化' },
    stories: { en: 'Stories', zh: '故事' },
    tools: { en: 'Tools', zh: '工具' },
  },
  actions: {
    search: { en: 'Search', zh: '搜索' },
    readArticle: { en: 'Read article', zh: '阅读文章' },
    exploreAll: { en: 'Explore all', zh: '查看全部' },
    changeLanguage: { en: 'Change language', zh: '切换语言' },
    backHome: { en: 'Back to home', zh: '返回首页' },
  },
  states: {
    noResults: {
      en: 'No articles matched your search.',
      zh: '没有找到符合搜索条件的文章。',
    },
    notFound: { en: 'Page not found', zh: '未找到页面' },
    demoOnly: {
      en: 'Demonstration only — no data will be sent.',
      zh: '仅供演示——不会发送任何数据。',
    },
  },
}
