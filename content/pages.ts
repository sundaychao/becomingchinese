import type { LocalizedText } from './categories'

export type FixedPage = {
  slug: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer'
  title: LocalizedText
  description: LocalizedText
  sections: Array<{
    id: string
    heading: LocalizedText
    paragraphs: LocalizedText[]
  }>
}

export const fixedPages: FixedPage[] = [
  {
    slug: 'about',
    title: { en: 'About Becoming Chinese', zh: '关于 Becoming Chinese' },
    description: {
      en: 'A practical bilingual guide to language, culture and everyday life in China.',
      zh: '一份介绍中文、中国文化与日常生活的实用双语指南。',
    },
    sections: [
      {
        id: 'purpose',
        heading: { en: 'What we make', zh: '我们提供什么' },
        paragraphs: [
          {
            en: 'We create clear, original introductions for curious readers who want useful context before a conversation, trip or new experience.',
            zh: '我们为好奇的读者创作清晰原创的入门内容，帮助大家在交流、旅行或体验新事物前获得实用背景。',
          },
        ],
      },
    ],
  },
  {
    slug: 'contact',
    title: { en: 'Contact', zh: '联系我们' },
    description: {
      en: 'Use the demonstration form to preview how contacting the editorial team works.',
      zh: '使用演示表单预览联系编辑团队的流程。',
    },
    sections: [
      {
        id: 'demo-contact',
        heading: { en: 'Demonstration only', zh: '仅供演示' },
        paragraphs: [
          {
            en: 'The MVP contact form validates entries locally. It does not transmit, deliver or store any message.',
            zh: 'MVP 联系表单仅在本地验证输入，不会传输、发送或存储任何消息。',
          },
        ],
      },
    ],
  },
  {
    slug: 'privacy',
    title: { en: 'Privacy', zh: '隐私说明' },
    description: {
      en: 'How this demonstration site handles language preferences and form data.',
      zh: '本演示网站如何处理语言偏好与表单数据。',
    },
    sections: [
      {
        id: 'data',
        heading: { en: 'Data in this MVP', zh: 'MVP 中的数据' },
        paragraphs: [
          {
            en: 'A language-preference cookie may be stored after you choose a language. Demonstration form entries remain in the browser and are cleared after a successful preview.',
            zh: '选择语言后，网站可能保存语言偏好 Cookie。演示表单内容仅留在浏览器中，并会在成功预览后清除。',
          },
        ],
      },
    ],
  },
  {
    slug: 'terms',
    title: { en: 'Terms of Use', zh: '使用条款' },
    description: {
      en: 'Straightforward terms for using the Becoming Chinese demonstration.',
      zh: 'Becoming Chinese 演示网站的简明使用条款。',
    },
    sections: [
      {
        id: 'use',
        heading: { en: 'Using the site', zh: '网站使用' },
        paragraphs: [
          {
            en: 'You may read and share links to this educational demonstration. Do not present its original text or visual identity as your own work.',
            zh: '您可以阅读并分享本教育演示网站的链接，但请勿将其中的原创文字或视觉识别冒充为自己的作品。',
          },
        ],
      },
    ],
  },
  {
    slug: 'disclaimer',
    title: { en: 'Disclaimer', zh: '免责声明' },
    description: {
      en: 'Important context for general cultural and practical information.',
      zh: '关于一般文化与生活信息的重要说明。',
    },
    sections: [
      {
        id: 'general-information',
        heading: { en: 'General information', zh: '一般信息' },
        paragraphs: [
          {
            en: 'Articles offer general educational context, not professional advice. Details can vary by region, venue and personal circumstances, so confirm time-sensitive arrangements with the relevant provider.',
            zh: '文章仅提供一般教育信息，并非专业建议。具体情况可能因地区、场所与个人情形而异，请向相关服务方确认具有时效性的安排。',
          },
        ],
      },
    ],
  },
]

export const fixedPageSlugs = fixedPages.map((page) => page.slug)

export function getFixedPage(slug: string): FixedPage | undefined {
  return fixedPages.find((page) => page.slug === slug)
}
