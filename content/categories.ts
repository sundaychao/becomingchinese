export type LocalizedText = { en: string; zh: string }

export type Category = {
  slug: string
  character: string
  title: LocalizedText
  description: LocalizedText
  subcategories: Array<{ slug: string; title: LocalizedText }>
}

export const categories: Category[] = [
  {
    slug: 'chinese-language',
    character: '言',
    title: { en: 'Chinese Language', zh: '中文语言' },
    description: {
      en: 'Useful Mandarin for conversations, signs and everyday routines.',
      zh: '学习对话、标识与日常生活中真正用得上的普通话。',
    },
    subcategories: [
      { slug: 'daily-phrases', title: { en: 'Daily phrases', zh: '日常用语' } },
      { slug: 'pronunciation', title: { en: 'Pronunciation', zh: '语音发音' } },
      { slug: 'reading', title: { en: 'Reading basics', zh: '阅读基础' } },
    ],
  },
  {
    slug: 'chinese-lifestyle',
    character: '活',
    title: { en: 'Chinese Lifestyle', zh: '中国生活' },
    description: {
      en: 'Practical guidance for food, travel, homes and daily life in China.',
      zh: '了解中国的饮食、出行、居住与日常生活实用知识。',
    },
    subcategories: [
      { slug: 'food-and-drink', title: { en: 'Food and drink', zh: '饮食' } },
      { slug: 'getting-around', title: { en: 'Getting around', zh: '出行' } },
      { slug: 'daily-essentials', title: { en: 'Daily essentials', zh: '生活必备' } },
    ],
  },
  {
    slug: 'chinese-culture-tradition',
    character: '礼',
    title: { en: 'Chinese Culture & Tradition', zh: '中国文化与传统' },
    description: {
      en: 'Approachable context for customs, festivals, clothing and the arts.',
      zh: '轻松了解习俗、节日、服饰与传统艺术的文化背景。',
    },
    subcategories: [
      { slug: 'festivals', title: { en: 'Festivals', zh: '传统节日' } },
      { slug: 'etiquette', title: { en: 'Etiquette', zh: '礼仪习俗' } },
      { slug: 'traditional-arts', title: { en: 'Traditional arts', zh: '传统艺术' } },
    ],
  },
  {
    slug: 'chinese-entertainment',
    character: '艺',
    title: { en: 'Chinese Entertainment', zh: '华语娱乐' },
    description: {
      en: 'Friendly introductions to stories, screen culture, music and games.',
      zh: '从故事、影视、音乐与游戏入门华语流行文化。',
    },
    subcategories: [
      { slug: 'film-and-tv', title: { en: 'Film and television', zh: '影视' } },
      { slug: 'music', title: { en: 'Music', zh: '音乐' } },
      { slug: 'stories-and-games', title: { en: 'Stories and games', zh: '故事与游戏' } },
    ],
  },
  {
    slug: 'community-stories',
    character: '友',
    title: { en: 'Community Stories', zh: '同行故事' },
    description: {
      en: 'Personal learning journeys and practical lessons shared by readers.',
      zh: '阅读学习者分享的亲身经历与实用心得。',
    },
    subcategories: [
      { slug: 'learner-diaries', title: { en: 'Learner diaries', zh: '学习日记' } },
      { slug: 'life-stories', title: { en: 'Life stories', zh: '生活故事' } },
      { slug: 'reader-tips', title: { en: 'Reader tips', zh: '读者心得' } },
    ],
  },
  {
    slug: 'free-tools-resources',
    character: '用',
    title: { en: 'Free Tools & Resources', zh: '免费工具与资源' },
    description: {
      en: 'Simple utilities, checklists and references for learning and travel.',
      zh: '获取语言学习与旅行所需的简易工具、清单和参考资料。',
    },
    subcategories: [
      { slug: 'language-tools', title: { en: 'Language tools', zh: '语言工具' } },
      { slug: 'travel-checklists', title: { en: 'Travel checklists', zh: '旅行清单' } },
      { slug: 'downloads', title: { en: 'Downloads', zh: '资料下载' } },
    ],
  },
]
