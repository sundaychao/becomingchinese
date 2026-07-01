import type { LocalizedText } from './categories'

export type ArticleSection = {
  id: string
  heading: LocalizedText
  paragraphs: LocalizedText[]
}

export type Article = {
  id: string
  slug: string
  category: string
  tags: LocalizedText[]
  title: LocalizedText
  summary: LocalizedText
  publishedAt: string
  readingMinutes: number
  image: { src: string; alt: LocalizedText }
  sections: ArticleSection[]
  seo: { title: LocalizedText; description: LocalizedText }
}

export const articles: Article[] = [
  {
    id: 'article-tea-001',
    slug: 'tea-is-never-just-a-drink',
    category: 'chinese-lifestyle',
    tags: [
      { en: 'tea', zh: '茶' },
      { en: 'hospitality', zh: '待客' },
      { en: 'daily life', zh: '日常生活' },
    ],
    title: { en: 'Tea Is Never Just a Drink', zh: '茶，从来不只是一杯饮料' },
    summary: {
      en: 'A practical introduction to sharing tea, reading the pace of the table and enjoying the moment without ceremony anxiety.',
      zh: '从实用角度了解如何一起喝茶、读懂茶桌节奏，并在不拘泥仪式的情况下享受当下。',
    },
    publishedAt: '2026-06-18',
    readingMinutes: 6,
    image: {
      src: '/images/articles/tea-table.webp',
      alt: {
        en: 'Small cups and a teapot arranged on a warm wooden tea table',
        zh: '温暖木质茶桌上摆放着茶壶与小茶杯',
      },
    },
    sections: [
      {
        id: 'shared-pause',
        heading: { en: 'Tea creates a shared pause', zh: '茶让人共享片刻闲暇' },
        paragraphs: [
          {
            en: 'At a family visit, studio or small shop, tea often gives everyone something easy to do while conversation finds its rhythm. The offer may be simple rather than ceremonial: a cup appears, it is refilled, and the talk continues.',
            zh: '在走亲访友、工作室或小店里，茶常常让大家在谈话进入节奏前有一件轻松自然的事可做。待茶未必讲究仪式：杯子端上来，续上水，聊天继续。',
          },
          {
            en: 'Accepting a cup does not commit you to expert tasting. A sincere “谢谢” (xièxie, thank you) and an interested sip are enough.',
            zh: '接过一杯茶并不意味着你必须懂得专业品鉴。真诚地说一声“谢谢”，再用心尝一口，就足够了。',
          },
        ],
      },
      {
        id: 'table-rhythm',
        heading: { en: 'Follow the rhythm of the table', zh: '跟随茶桌的节奏' },
        paragraphs: [
          {
            en: 'Small cups are designed for repeated pours, so an empty cup is not a problem. Let the host set the pace, and feel free to leave a little tea when you have had enough.',
            zh: '小茶杯本就适合多次冲泡，所以杯子空了并不失礼。让主人掌握添茶节奏；喝够之后，杯中留一点茶也可以自然表达心意。',
          },
          {
            en: 'In parts of southern China, people may tap two bent fingers lightly on the table to acknowledge a refill. It is a friendly regional habit, not a rule you must perform everywhere.',
            zh: '在中国南方一些地区，人们可能会用弯曲的两根手指轻叩桌面，对添茶表示感谢。这是一种亲切的地方习惯，并非到处都必须遵守的规则。',
          },
        ],
      },
      {
        id: 'order-with-confidence',
        heading: { en: 'Order with curiosity', zh: '带着好奇心点茶' },
        paragraphs: [
          {
            en: 'If a menu feels unfamiliar, ask “这个茶是什么味道？” (Zhège chá shì shénme wèidào? — What does this tea taste like?). Words such as 清香 (qīngxiāng, fresh fragrance) and 浓 (nóng, strong) can guide a simple choice.',
            zh: '如果茶单看起来陌生，可以问：“这个茶是什么味道？”“清香”和“浓”这样的描述，就能帮助你做出简单选择。',
          },
          {
            en: 'The most useful habit is to notice what the people around you enjoy. Tea knowledge grows cup by cup, through attention rather than performance.',
            zh: '最实用的习惯，是留意身边人喜欢喝什么。茶的知识是一杯一杯积累的，靠的是用心，而不是表现。',
          },
        ],
      },
    ],
    seo: {
      title: {
        en: 'Chinese Tea Culture: A Practical Beginner Guide',
        zh: '中国茶文化实用入门指南',
      },
      description: {
        en: 'Learn how tea fits into everyday hospitality, refills and relaxed conversation in China.',
        zh: '了解茶如何融入中国日常待客、续杯与轻松交流。',
      },
    },
  },
  {
    id: 'article-mandarin-001',
    slug: 'mandarin-phrases-for-everyday-moments',
    category: 'chinese-language',
    tags: [
      { en: 'Mandarin', zh: '普通话' },
      { en: 'phrases', zh: '常用语' },
      { en: 'conversation', zh: '会话' },
    ],
    title: {
      en: 'Mandarin Phrases for Everyday Moments',
      zh: '日常时刻都能用上的普通话',
    },
    summary: {
      en: 'Six flexible phrases that help you greet people, ask for clarification and handle ordinary errands with confidence.',
      zh: '六句灵活实用的话，帮助你自信地打招呼、请求说明并处理日常小事。',
    },
    publishedAt: '2026-06-14',
    readingMinutes: 7,
    image: {
      src: '/images/articles/daily-mandarin.webp',
      alt: {
        en: 'Two friends chatting beside a neighborhood café counter',
        zh: '两位朋友在社区咖啡店柜台旁聊天',
      },
    },
    sections: [
      {
        id: 'open-conversations',
        heading: { en: 'Open conversations naturally', zh: '自然地开始对话' },
        paragraphs: [
          {
            en: '你好 (nǐ hǎo) is useful, but in a shop you can also begin with “你好，请问……” (Nǐ hǎo, qǐngwèn… — Hello, may I ask…). 请问 signals that a question is coming and softens the approach.',
            zh: '“你好”很实用；在商店里，你也可以用“你好，请问……”开头。“请问”表示接下来要提问，也让语气更自然礼貌。',
          },
          {
            en: 'When someone helps, “谢谢，麻烦你了” (Xièxie, máfan nǐ le — Thank you for the trouble) warmly acknowledges their effort without sounding formal.',
            zh: '别人帮忙后，说“谢谢，麻烦你了”，既能真诚表达对对方付出的感谢，又不会显得过于正式。',
          },
        ],
      },
      {
        id: 'clarify',
        heading: { en: 'Ask for the missing piece', zh: '请对方补充你没听懂的部分' },
        paragraphs: [
          {
            en: 'Use “请再说一遍” (Qǐng zài shuō yí biàn — Please say that again) when you need a repeat. Add “慢一点” (màn yìdiǎn — a little slower) when speed is the difficulty.',
            zh: '需要对方重复时，可以说“请再说一遍”。如果主要是语速太快，再加一句“慢一点”。',
          },
          {
            en: 'For an unfamiliar object or dish, point gently and ask “这个叫什么？” (Zhège jiào shénme? — What is this called?). The answer gives you vocabulary tied to a real memory.',
            zh: '遇到不认识的物品或菜肴时，可以轻轻指一下，问“这个叫什么？”答案会让新词和真实记忆联系起来。',
          },
        ],
      },
      {
        id: 'errands',
        heading: { en: 'Handle simple errands', zh: '应对简单的日常事务' },
        paragraphs: [
          {
            en: '“我想要这个” (Wǒ xiǎng yào zhège — I would like this) works in bakeries, markets and casual counters. Follow with “多少钱？” (Duōshao qián? — How much is it?) when the price is not displayed.',
            zh: '在面包店、市场或便民柜台，“我想要这个”都很好用。如果没有标价，可以接着问“多少钱？”',
          },
          {
            en: 'Fluency grows through small successful exchanges. Choose two phrases, use them repeatedly for a week, then add more.',
            zh: '流利来自一次次顺利的小交流。先挑两句话，连续用一周，再逐步增加。',
          },
        ],
      },
    ],
    seo: {
      title: { en: 'Useful Daily Mandarin Phrases', zh: '实用普通话日常用语' },
      description: {
        en: 'Practice flexible Mandarin phrases for greetings, clarification, shopping and everyday help.',
        zh: '练习可用于问候、确认、购物与日常求助的灵活普通话。',
      },
    },
  },
  {
    id: 'article-hanfu-001',
    slug: 'a-beginners-guide-to-hanfu',
    category: 'chinese-culture-tradition',
    tags: [
      { en: 'hanfu', zh: '汉服' },
      { en: 'clothing', zh: '服饰' },
      { en: 'craft', zh: '工艺' },
    ],
    title: { en: "A Beginner's Guide to Hanfu", zh: '汉服入门指南' },
    summary: {
      en: 'How to explore hanfu through shape, fabric and occasion while keeping comfort and curiosity at the center.',
      zh: '从形制、面料与场合认识汉服，同时把舒适与好奇心放在首位。',
    },
    publishedAt: '2026-06-10',
    readingMinutes: 8,
    image: {
      src: '/images/articles/hanfu-guide.webp',
      alt: {
        en: 'A folded pale green hanfu outfit with a woven sash',
        zh: '叠放整齐的浅绿色汉服与织纹腰带',
      },
    },
    sections: [
      {
        id: 'what-hanfu-means',
        heading: { en: 'Start with a broad definition', zh: '从宽泛的定义开始' },
        paragraphs: [
          {
            en: 'Hanfu is a modern umbrella term for clothing traditions associated with Han Chinese history. It includes many silhouettes that changed across centuries, rather than one fixed costume.',
            zh: '“汉服”是现代常用的概括性称呼，指与汉族历史相关的服饰传统。它包含多个世纪中不断变化的众多形制，并不是一套固定不变的服装。',
          },
          {
            en: 'A museum label, maker or experienced wearer can help identify a specific form. Beginners do not need to memorize every dynasty before appreciating construction and movement.',
            zh: '博物馆说明、制作者或有经验的穿着者，都能帮助你辨认具体形制。初学者不必先背完所有朝代，也可以欣赏服装的结构与动态。',
          },
        ],
      },
      {
        id: 'choose-first-outfit',
        heading: { en: 'Choose for comfort and context', zh: '根据舒适度与场合来选择' },
        paragraphs: [
          {
            en: 'For a first try, prioritize a breathable fabric, secure closures and a hem you can walk in safely. Ask the shop how the layers fasten and whether assistance is included.',
            zh: '第一次尝试时，应优先考虑透气面料、牢固系带，以及方便安全行走的衣长。可以询问店家各层如何穿系，是否提供穿衣协助。',
          },
          {
            en: 'A photo studio, cultural event and relaxed park visit have different needs. Check venue rules and weather, and avoid letting long sleeves or accessories obstruct shared paths.',
            zh: '摄影棚、文化活动和轻松逛公园的需求各不相同。提前确认场地规则与天气，并注意不要让长袖或配饰妨碍公共通道。',
          },
        ],
      },
      {
        id: 'learn-through-details',
        heading: { en: 'Let details lead your learning', zh: '从细节继续探索' },
        paragraphs: [
          {
            en: 'Notice collar direction, sleeve shape, woven patterns and how a garment creates volume without modern tailoring. Each detail offers a path into textile history and craft.',
            zh: '留意衣领方向、袖形、织纹，以及服装如何在没有现代剪裁的情况下形成体量。每个细节都能带你走进纺织史与工艺。',
          },
          {
            en: 'Buy slowly and ask makers about materials and care. A well-understood, comfortable piece is a better beginning than a large wardrobe chosen in haste.',
            zh: '购买时不妨放慢速度，向制作者询问面料与保养。与其匆忙添置一大柜衣服，不如先从一件真正了解且穿着舒适的衣服开始。',
          },
        ],
      },
    ],
    seo: {
      title: { en: "Hanfu Beginner's Guide: Forms and Fit", zh: '汉服入门：形制、穿着与选择' },
      description: {
        en: 'Explore what hanfu means and how beginners can choose, wear and appreciate it thoughtfully.',
        zh: '了解汉服的含义，以及初学者如何用心选择、穿着与欣赏汉服。',
      },
    },
  },
  {
    id: 'article-festival-001',
    slug: 'festival-etiquette-without-the-guesswork',
    category: 'chinese-culture-tradition',
    tags: [
      { en: 'festivals', zh: '节日' },
      { en: 'etiquette', zh: '礼仪' },
      { en: 'visiting', zh: '做客' },
    ],
    title: {
      en: 'Festival Etiquette Without the Guesswork',
      zh: '不慌不忙的节日礼仪指南',
    },
    summary: {
      en: 'Simple habits for visiting, giving gifts and joining family celebrations with warmth and consideration.',
      zh: '用简单习惯，在拜访、送礼和参与家庭节庆时表达温暖与体贴。',
    },
    publishedAt: '2026-06-05',
    readingMinutes: 6,
    image: {
      src: '/images/articles/festival-visit.webp',
      alt: {
        en: 'Seasonal fruit and wrapped gifts prepared for a family visit',
        zh: '为家庭拜访准备的时令水果与包装礼物',
      },
    },
    sections: [
      {
        id: 'ask-first',
        heading: { en: 'Ask about the household plan', zh: '先了解主人家的安排' },
        paragraphs: [
          {
            en: 'Festival customs vary between families and regions. Ask what time to arrive, whether the meal is casual and if you can bring anything. This is more useful than trying to guess a universal rule.',
            zh: '节日习惯会因家庭和地区而不同。提前询问到达时间、聚餐是否随意，以及是否需要带东西，比猜测一条“通用规则”更实用。',
          },
          {
            en: 'Busy travel periods can affect plans, so confirm close to the day and share delays early. Reliability is itself a form of courtesy.',
            zh: '节日期间出行繁忙，安排可能变化，因此临近日期最好再次确认；如有延误，也要尽早告知。守信本身就是一种礼貌。',
          },
        ],
      },
      {
        id: 'simple-gifts',
        heading: { en: 'Keep gifts simple and shareable', zh: '礼物简单、方便分享即可' },
        paragraphs: [
          {
            en: 'Fruit, tea or a specialty from your home region can be easy to share. Choose tidy packaging, keep the value comfortable for the relationship and mention any dietary ingredients.',
            zh: '水果、茶叶或家乡特产都便于分享。包装整洁即可，价值应符合彼此关系，也别忘了说明可能涉及的食材。',
          },
          {
            en: 'If a host initially declines, a warm “一点心意” (yìdiǎn xīnyì — a small token) explains your intention. Avoid turning the exchange into a contest of insistence.',
            zh: '如果主人起初推辞，可以温和地说“一点心意”，说明自己的用意。无需把礼物往来变成反复坚持的拉锯。',
          },
        ],
      },
      {
        id: 'join-in',
        heading: { en: 'Join in with attention', zh: '用心参与' },
        paragraphs: [
          {
            en: 'Follow the host when seating and serving are unfamiliar. Offer help once, accept the answer, and notice practical ways to contribute such as carrying dishes or keeping children company.',
            zh: '如果不熟悉座位或上菜安排，跟随主人即可。主动提出一次帮忙并尊重回答，也可以留意端菜、陪伴孩子等实际可做的小事。',
          },
          {
            en: 'A message the next day thanking the host for one specific moment feels genuine and completes the visit gracefully.',
            zh: '第二天发一条消息，具体感谢聚会中的某个片刻，会显得真诚，也为这次拜访画上圆满句号。',
          },
        ],
      },
    ],
    seo: {
      title: { en: 'Practical Chinese Festival Etiquette', zh: '中国节日礼仪实用指南' },
      description: {
        en: 'Prepare for festival visits with considerate timing, simple gifts and relaxed participation.',
        zh: '从体贴的时间安排、简单礼物与轻松参与开始，做好节日拜访准备。',
      },
    },
  },
  {
    id: 'article-living-001',
    slug: 'living-in-china-first-week-essentials',
    category: 'chinese-lifestyle',
    tags: [
      { en: 'daily essentials', zh: '生活必备' },
      { en: 'transport', zh: '交通' },
      { en: 'settling in', zh: '安顿' },
    ],
    title: {
      en: 'Living in China: First-Week Essentials',
      zh: '在中国生活：第一周必备指南',
    },
    summary: {
      en: 'A calm checklist for addresses, transport, payments and the small routines that make a new neighborhood feel manageable.',
      zh: '一份从容的清单，涵盖地址、交通、支付与帮助你适应新社区的日常小习惯。',
    },
    publishedAt: '2026-05-29',
    readingMinutes: 8,
    image: {
      src: '/images/articles/first-week.webp',
      alt: {
        en: 'A notebook, transit card and reusable bottle packed for a day out',
        zh: '为外出一天准备的笔记本、交通卡与可重复使用水瓶',
      },
    },
    sections: [
      {
        id: 'save-addresses',
        heading: { en: 'Save important addresses in Chinese', zh: '用中文保存重要地址' },
        paragraphs: [
          {
            en: 'Keep your accommodation, workplace and one trusted contact written in Chinese characters. A screenshot remains available when reception is weak and is easy to show to a driver or station employee.',
            zh: '把住处、工作地点和一位可信联系人的信息用汉字保存下来。截图在信号不好时仍可查看，也方便向司机或车站工作人员出示。',
          },
          {
            en: 'Add the nearest recognizable landmark and building entrance instructions. Large residential compounds may have several gates that are far apart.',
            zh: '再记下最近的明显地标与楼栋入口说明。大型小区可能有多个相距很远的出入口。',
          },
        ],
      },
      {
        id: 'build-backups',
        heading: { en: 'Build one backup into each routine', zh: '为每项日常安排准备一个备用方案' },
        paragraphs: [
          {
            en: 'Payment and transport options differ by city and visitor status. Before relying on one app, check current onboarding requirements and carry a modest alternative accepted by your destination.',
            zh: '不同城市及不同访客身份可用的支付和交通方式会有所不同。在完全依赖某个应用前，请确认最新开通要求，并携带目的地可接受的适量备用支付方式。',
          },
          {
            en: 'Learn the name of your nearest metro or bus stop and try the route once without a deadline. A low-pressure practice journey turns an unfamiliar map into a usable routine.',
            zh: '记住离你最近的地铁站或公交站名称，在没有赶时间压力时先走一遍路线。一次轻松的练习，就能把陌生地图变成可用的日常路线。',
          },
        ],
      },
      {
        id: 'learn-neighborhood',
        heading: { en: 'Learn the neighborhood on foot', zh: '步行认识周边环境' },
        paragraphs: [
          {
            en: 'Locate a convenience store, pharmacy, clinic information desk and a place where you enjoy eating. Save their opening hours, while remembering that holiday schedules may change.',
            zh: '找出附近的便利店、药店、诊所咨询台，以及一家你喜欢的餐馆。保存营业时间，同时留意节假日可能调整。',
          },
          {
            en: 'The goal of the first week is not perfect efficiency. It is to create a few reliable paths, people and phrases that make the next week easier.',
            zh: '第一周的目标不是事事高效，而是建立几条可靠的路线、认识几位可以求助的人，并掌握几句实用表达，让下一周更轻松。',
          },
        ],
      },
    ],
    seo: {
      title: { en: 'Living in China: First-Week Checklist', zh: '在中国生活第一周清单' },
      description: {
        en: 'Organize essential addresses, transport backups and neighborhood routines for your first week in China.',
        zh: '为在中国生活的第一周整理重要地址、交通备用方案与社区日常安排。',
      },
    },
  },
  {
    id: 'article-wuxia-001',
    slug: 'wuxia-a-world-built-on-choices',
    category: 'chinese-entertainment',
    tags: [
      { en: 'wuxia', zh: '武侠' },
      { en: 'storytelling', zh: '叙事' },
      { en: 'film and television', zh: '影视' },
    ],
    title: { en: 'Wuxia: A World Built on Choices', zh: '武侠：一个由选择构成的世界' },
    summary: {
      en: 'An accessible map of wandering heroes, jianghu relationships and the moral choices that give wuxia stories their energy.',
      zh: '轻松认识游侠、江湖关系，以及赋予武侠故事生命力的道德选择。',
    },
    publishedAt: '2026-05-22',
    readingMinutes: 7,
    image: {
      src: '/images/articles/wuxia-world.webp',
      alt: {
        en: 'A lone traveler crossing a misty mountain bridge in an illustrated landscape',
        zh: '插画山水中，一位旅人独自走过雾气缭绕的山间小桥',
      },
    },
    sections: [
      {
        id: 'more-than-fighting',
        heading: { en: 'More than spectacular fighting', zh: '不只是精彩打斗' },
        paragraphs: [
          {
            en: 'Wuxia literally joins the ideas of martial skill and the wandering hero. Swordplay may draw the eye, but a hero is usually defined by choices: whom to protect, which promise to keep and when to walk away.',
            zh: '“武侠”把武艺与侠者联系在一起。剑招或许最先吸引目光，但真正定义侠客的往往是选择：保护谁、信守什么承诺，以及何时转身离开。',
          },
          {
            en: 'Training scenes make inner growth visible. Patience, judgment and responsibility matter alongside physical mastery.',
            zh: '修炼场景把内在成长变得可见。除了武艺精进，耐心、判断与责任同样重要。',
          },
        ],
      },
      {
        id: 'jianghu',
        heading: { en: 'Understanding jianghu', zh: '理解“江湖”' },
        paragraphs: [
          {
            en: '江湖 (jiānghú) names the social world beyond ordinary institutions where travelers, schools, healers, innkeepers and rivals meet. It is less a location on a map than a network of reputation and obligation.',
            zh: '“江湖”指的是日常制度之外的社会世界，旅人、门派、医者、客栈掌柜与对手在这里相遇。它与其说是地图上的地点，不如说是一张由名声与责任织成的关系网。',
          },
          {
            en: 'Knowing this helps a new viewer follow why an old favor, a teacher-student bond or a public promise can redirect the entire plot.',
            zh: '理解这一点，就更容易看懂为什么一份旧恩、师徒关系或公开承诺，能够改变整个故事的走向。',
          },
        ],
      },
      {
        id: 'where-to-start',
        heading: { en: 'Choose an inviting starting point', zh: '选择适合自己的起点' },
        paragraphs: [
          {
            en: 'A film offers a compact introduction to movement and atmosphere; a television series gives relationships more room; a novel lets you linger over motives and world-building. Start with the format you already enjoy.',
            zh: '电影能紧凑呈现动作与氛围，电视剧能充分展开人物关系，小说则让你细读动机与世界构建。先从自己本来就喜欢的媒介开始。',
          },
          {
            en: 'Do not worry about recognizing every school or technique. Track what each character owes, wants and refuses to do—the emotional map will carry you through.',
            zh: '不必担心认不全每个门派或招式。留意每个人亏欠什么、想要什么、拒绝做什么；这张情感地图会带你走进故事。',
          },
        ],
      },
    ],
    seo: {
      title: { en: 'What Is Wuxia? A Beginner Introduction', zh: '什么是武侠？新手入门' },
      description: {
        en: 'Understand wuxia heroes, jianghu and the moral choices at the heart of Chinese martial-arts stories.',
        zh: '认识侠客、江湖，以及中国武侠故事核心的道德选择。',
      },
    },
  },
]
