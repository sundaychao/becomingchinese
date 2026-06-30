# Becoming Chinese 官网 MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个可运行、可演示、SEO 友好的 Becoming Chinese 中英双语官网 MVP，包含内容浏览、搜索、地区语言识别与中文名生成器。

**Architecture:** 使用 Next.js App Router 与 TypeScript 构建静态优先网站，公开内容来自类型化本地数据。`proxy.ts` 只负责首次语言重定向，页面组件通过稳定内容 ID 在 `/en` 与 `/zh` 间保持语义路径；客户端 JavaScript 仅用于搜索、筛选、表单状态和中文名生成器。

**Tech Stack:** Next.js 当前稳定版（使用 `proxy.ts` 文件约定）、React、TypeScript、CSS Modules、Vitest、Testing Library、ESLint、浏览器插件验收。

## Global Constraints

- 支持且只支持 `en` 与 `zh` 两种语言。
- 语言优先级必须是：`bc-locale` Cookie → 部署平台国家代码 → 浏览器语言 → 英文。
- 中国大陆国家代码 `CN` 映射为 `zh`，其他国家映射为 `en`。
- 视觉方向固定为 B「现代学习平台」；主色为朱砂红、墨黑、米白、浅茶和低饱和鼠尾草绿。
- 桌面正文不得小于 16px，移动正文不得小于 14px，辅助文字不得小于 12px。
- MVP 不引入数据库、CMS、登录、真实社区、支付、邮件发送或生成式 AI 接口。
- Newsletter 与 Contact 必须明确标注演示状态，不得暗示数据已真实送达。
- 公开内容静态生成；首页首屏不得依赖第三方请求。
- 每个任务遵循测试先行，并在通过相关检查后创建独立提交。

## Planned File Structure

```text
app/
  [locale]/
    about/page.tsx
    articles/[slug]/page.tsx
    articles/page.tsx
    category/[slug]/page.tsx
    contact/page.tsx
    disclaimer/page.tsx
    layout.tsx
    not-found.tsx
    page.tsx
    privacy/page.tsx
    terms/page.tsx
    tools/chinese-name-generator/page.tsx
    tools/page.tsx
  globals.css
  layout.tsx
  robots.ts
  sitemap.ts
components/
  content/article-card.tsx
  content/article-layout.tsx
  content/category-card.tsx
  forms/demo-form.tsx
  home/category-grid.tsx
  home/hero.tsx
  home/home-page.tsx
  home/story-grid.tsx
  home/tool-strip.tsx
  layout/language-switcher.tsx
  layout/mobile-menu.tsx
  layout/site-footer.tsx
  layout/site-header.tsx
  search/search-panel.tsx
  tools/name-generator.tsx
content/
  articles.ts
  categories.ts
  pages.ts
  translations.ts
lib/
  content.ts
  i18n.ts
  locale-path.ts
  name-generator.ts
  search.ts
public/images/
  home/
  articles/
styles/
  article.module.css
  cards.module.css
  forms.module.css
  home.module.css
  layout.module.css
  tools.module.css
tests/
  content.test.ts
  demo-form.test.tsx
  i18n.test.ts
  locale-path.test.ts
  name-generator.test.ts
  name-generator-ui.test.tsx
  search-panel.test.tsx
  search.test.ts
proxy.ts
vitest.config.ts
vitest.setup.ts
```

---

### Task 1: Production visual concept and asset contract

**Files:**
- Create: `docs/design/becoming-chinese/home-hero-concept.png`
- Create: `docs/design/becoming-chinese/home-categories-concept.png`
- Create: `docs/design/becoming-chinese/home-stories-concept.png`
- Create: `docs/design/becoming-chinese/home-tools-concept.png`
- Create: `docs/design/becoming-chinese/home-community-concept.png`
- Create: `docs/design/becoming-chinese/home-newsletter-concept.png`
- Create: `docs/design/becoming-chinese/fidelity-ledger.md`

**Interfaces:**
- Consumes: approved B-direction wireframe and `docs/superpowers/specs/2026-06-30-becoming-chinese-mvp-design.md`.
- Produces: accepted section-level visual references and a written token/asset contract used by every UI task.

- [ ] **Step 1: Generate six coordinated section concepts**

Use the `frontend-app-builder` and `imagegen` skills with the shared prompt below. Append one of the six exact section descriptions after the final sentence `Exact section:` and generate one fresh image per description.

```text
Create a large, readable desktop website section concept for “Becoming Chinese”, an English-first Chinese culture and lifestyle learning platform. Direction: modern learning platform with restrained contemporary Chinese character. Palette: cinnabar red #A43C2E, ink #252622, rice paper #F5F1E9, pale tea #D8CFBE, muted sage #6C796E. Modern sans-serif English, warm Song-style Chinese display text. Open whitespace, crisp hierarchy, no decorative pill above the hero, no glassmorphism, no purple gradient, no generic dashboard cards. All UI text must be readable and code-native in the eventual implementation. 1440px-wide composition. Exact section:
```

Section descriptions, in order:

```text
1. Header, hero search, “Your practical guide to everyday China.”, abstract mountain/sun artwork.
2. Six learning entry points using 说、食、礼、节、居、艺 as visual anchors.
3. Featured editorial stories with one lead story and two secondary stories.
4. Three free-tool entries led by Chinese name generator.
5. Community quotation and contributor attribution.
6. Dark ink newsletter band and structured footer.
```

- [ ] **Step 2: Review concepts against the accepted wireframe**

Record at least these rows in `docs/design/becoming-chinese/fidelity-ledger.md`:

```markdown
| Check | Required evidence | Accepted result |
|---|---|---|
| Copy | Hero headline and section labels match the specification | Record exact screenshot and any deviation |
| Layout | Hero → categories → stories → tools → community → newsletter | Record exact screenshot and any deviation |
| Typography | Desktop body ≥16px, supporting text ≥12px | Record measured sizes and any deviation |
| Palette | Cinnabar, ink, rice paper, tea, sage only | Record sampled colors and any deviation |
| Container | Open sections; cards only for actual selectable content | Record exact screenshot and any deviation |
| Mobile intent | Primary controls and content hierarchy remain visible | Record responsive decision and any deviation |
```

- [ ] **Step 3: Obtain design acceptance before implementation**

Show the six concepts together, list any intentional differences from the wireframe, and continue only after the complete visual direction is accepted.

- [ ] **Step 4: Commit the accepted design contract**

Run:

```bash
git add docs/design/becoming-chinese
git commit -m "design: add Becoming Chinese visual concept"
```

Expected: one commit containing the six accepted concept images and completed fidelity ledger.

### Task 2: Next.js foundation and test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/[locale]/layout.tsx`
- Create: `tests/i18n.test.ts`
- Create: `lib/i18n.ts`

**Interfaces:**
- Produces: `Locale`, `LOCALES`, `isLocale(value)`, `resolveLocale(input)` and the global app/test foundation.

- [ ] **Step 1: Create package and tool configuration**

Create scripts with these exact names:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Install runtime dependencies with `npm install next@latest react@latest react-dom@latest` and development dependencies with `npm install -D typescript @types/node @types/react @types/react-dom eslint eslint-config-next vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event`.

- [ ] **Step 2: Write the failing locale resolver test**

Create `tests/i18n.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { resolveLocale } from '@/lib/i18n'

describe('resolveLocale', () => {
  it('prioritizes cookie over country and browser language', () => {
    expect(resolveLocale({ cookie: 'en', country: 'CN', acceptLanguage: 'zh-CN' })).toBe('en')
  })

  it('maps mainland China to Chinese and other known countries to English', () => {
    expect(resolveLocale({ country: 'CN' })).toBe('zh')
    expect(resolveLocale({ country: 'SG', acceptLanguage: 'zh-CN' })).toBe('en')
  })

  it('uses browser language only when country is unavailable', () => {
    expect(resolveLocale({ acceptLanguage: 'zh-TW,zh;q=0.9' })).toBe('zh')
    expect(resolveLocale({ acceptLanguage: 'fr-FR' })).toBe('en')
  })
})
```

- [ ] **Step 3: Run the test and confirm failure**

Run: `npm test -- tests/i18n.test.ts`

Expected: FAIL because `@/lib/i18n` does not exist.

- [ ] **Step 4: Implement the locale domain**

Create `lib/i18n.ts` with:

```ts
export const LOCALES = ['en', 'zh'] as const
export type Locale = (typeof LOCALES)[number]

export type LocaleSignals = {
  cookie?: string | null
  country?: string | null
  acceptLanguage?: string | null
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'en' || value === 'zh'
}

export function resolveLocale(signals: LocaleSignals): Locale {
  if (isLocale(signals.cookie)) return signals.cookie
  if (signals.country) return signals.country.toUpperCase() === 'CN' ? 'zh' : 'en'
  return signals.acceptLanguage?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}
```

Create minimal root and locale layouts with `app/layout.tsx` returning `<html><body>{children}</body></html>` and `app/[locale]/layout.tsx` validating `params.locale` through `isLocale` before rendering children.

- [ ] **Step 5: Run foundation checks**

Run: `npm test -- tests/i18n.test.ts && npm run typecheck && npm run lint`

Expected: locale tests pass; typecheck and lint exit 0.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts eslint.config.mjs vitest.config.ts vitest.setup.ts app lib tests
git commit -m "chore: scaffold Next.js application"
```

### Task 3: Locale routing, country detection, and semantic switching

**Files:**
- Create: `tests/locale-path.test.ts`
- Create: `lib/locale-path.ts`
- Create: `proxy.ts`
- Create: `components/layout/language-switcher.tsx`
- Create: `styles/layout.module.css`

**Interfaces:**
- Consumes: `Locale`, `isLocale`, `resolveLocale` from `lib/i18n.ts`.
- Produces: `replaceLocale(pathname, locale): string`, locale redirect behavior, and a switcher that writes `bc-locale`.

- [ ] **Step 1: Write path replacement tests**

```ts
import { describe, expect, it } from 'vitest'
import { replaceLocale } from '@/lib/locale-path'

describe('replaceLocale', () => {
  it('preserves the semantic path while replacing locale', () => {
    expect(replaceLocale('/en/articles/tea-is-never-just-a-drink', 'zh'))
      .toBe('/zh/articles/tea-is-never-just-a-drink')
  })

  it('prefixes unlocalized paths', () => {
    expect(replaceLocale('/tools', 'en')).toBe('/en/tools')
  })
})
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npm test -- tests/locale-path.test.ts`

Expected: FAIL because `replaceLocale` is not defined.

- [ ] **Step 3: Implement path replacement and Proxy**

Implement `replaceLocale` by splitting the pathname, removing a leading supported locale, and returning `/${locale}/${remaining}` without a trailing slash. Implement root `proxy.ts` so localized routes pass through, while unlocalized routes redirect using Cookie `bc-locale`, country headers `x-vercel-ip-country` then `cf-ipcountry`, and `accept-language`:

```ts
import { NextResponse, type NextRequest } from 'next/server'
import { isLocale, resolveLocale } from '@/lib/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const maybeLocale = pathname.split('/')[1]
  if (isLocale(maybeLocale)) return NextResponse.next()

  const locale = resolveLocale({
    cookie: request.cookies.get('bc-locale')?.value,
    country:
      request.headers.get('x-vercel-ip-country') ??
      request.headers.get('cf-ipcountry'),
    acceptLanguage: request.headers.get('accept-language'),
  })

  const target = request.nextUrl.clone()
  target.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(target)
}
```

Use this matcher:

```ts
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)'],
}
```

- [ ] **Step 4: Implement the language switcher**

The client component must derive the target URL and navigate with this exact handler:

```ts
function switchLocale(locale: Locale) {
  const target = replaceLocale(pathname, locale)
  document.cookie = `bc-locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`
  router.push(target)
}
```

- [ ] **Step 5: Verify and commit**

Run: `npm test -- tests/i18n.test.ts tests/locale-path.test.ts && npm run typecheck && npm run lint`

Expected: all listed checks pass.

```bash
git add proxy.ts lib/locale-path.ts components/layout/language-switcher.tsx styles/layout.module.css tests/locale-path.test.ts
git commit -m "feat: add locale routing and switching"
```

### Task 4: Typed bilingual content and search domain

**Files:**
- Create: `content/categories.ts`
- Create: `content/articles.ts`
- Create: `content/pages.ts`
- Create: `content/translations.ts`
- Create: `lib/content.ts`
- Create: `lib/search.ts`
- Create: `tests/content.test.ts`
- Create: `tests/search.test.ts`

**Interfaces:**
- Produces: `Category`, `Article`, `LocalizedText`, `SearchDocument`, `getCategory`, `getArticle`, `listArticles`, `buildSearchIndex`, `searchArticles`.

- [ ] **Step 1: Write content integrity and search tests**

Tests must assert:

```ts
expect(categories).toHaveLength(6)
expect(articles.length).toBeGreaterThanOrEqual(6)
expect(articles.every((article) => article.title.en && article.title.zh)).toBe(true)
expect(new Set(articles.map((article) => article.slug)).size).toBe(articles.length)
const index = buildSearchIndex('en')
expect(searchArticles('tea', index).map((item) => item.slug)).toContain('tea-is-never-just-a-drink')
expect(searchArticles('not-a-real-topic', index)).toEqual([])
```

- [ ] **Step 2: Run tests and confirm failure**

Run: `npm test -- tests/content.test.ts tests/search.test.ts`

Expected: FAIL because content modules do not exist.

- [ ] **Step 3: Implement types and six categories**

Define:

```ts
export type LocalizedText = { en: string; zh: string }
export type Category = {
  slug: string
  character: string
  title: LocalizedText
  description: LocalizedText
  subcategories: Array<{ slug: string; title: LocalizedText }>
}
export type ArticleSection = { id: string; heading: LocalizedText; paragraphs: LocalizedText[] }
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
```

Create the six specified category records and at least these six complete article records: tea culture, daily Mandarin phrases, hanfu beginner guide, Chinese festival etiquette, living-in-China essentials, and wuxia culture.

- [ ] **Step 4: Implement data access and search**

Define `SearchDocument` as `{ slug: string; title: string; summary: string; category: string; tags: string[] }`. `buildSearchIndex(locale)` projects only those fields from articles; it must not include sections or article bodies. `searchArticles(query, index)` normalizes with `trim().toLocaleLowerCase()`, searches title, summary, category and tags, and returns the full index for an empty query.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- tests/content.test.ts tests/search.test.ts && npm run typecheck`

Expected: all tests and typecheck pass.

```bash
git add content lib/content.ts lib/search.ts tests/content.test.ts tests/search.test.ts
git commit -m "feat: add bilingual content domain"
```

### Task 5: Design system, app shell, and responsive navigation

**Files:**
- Modify: `app/globals.css`
- Modify: `app/[locale]/layout.tsx`
- Create: `components/layout/site-header.tsx`
- Create: `components/layout/mobile-menu.tsx`
- Create: `components/layout/site-footer.tsx`
- Modify: `styles/layout.module.css`
- Create: `public/images/home/hero-art.webp`

**Interfaces:**
- Consumes: accepted Task 1 concept, `Locale`, `LanguageSwitcher`.
- Produces: reusable page shell and global design tokens.

- [ ] **Step 1: Create the central hero asset**

Use Image Gen editing from the accepted hero concept to export `public/images/home/hero-art.webp`: abstract contemporary Chinese mountain and cinnabar sun artwork, no UI text, no logo, no lettering, background blended to `#D8CFBE`, 1600×1200 source framing.

- [ ] **Step 2: Implement global tokens**

Define exactly these core tokens in `:root`:

```css
:root {
  --color-ink: #252622;
  --color-muted: #5f5c55;
  --color-paper: #f5f1e9;
  --color-white: #ffffff;
  --color-cinnabar: #a43c2e;
  --color-tea: #d8cfbe;
  --color-sage: #6c796e;
  --container: 1200px;
  --radius-sm: 10px;
  --radius-md: 18px;
  --space-section: clamp(4rem, 8vw, 7.5rem);
}
```

Add global focus visibility, reduced-motion handling, 16px desktop body type and 14px mobile minimum.

- [ ] **Step 3: Implement header, mobile menu, and footer**

Desktop header exposes Learn, Lifestyle, Culture, Stories, Tools and language switcher. Mobile header exposes one uniquely labelled menu button, traps no focus, closes after navigation, and keeps language switching visible inside the menu.

- [ ] **Step 4: Verify shell**

Run: `npm run typecheck && npm run lint && npm run build`

Expected: all checks pass and `/en` plus `/zh` can render inside the shared shell.

- [ ] **Step 5: Commit**

```bash
git add app components/layout styles/layout.module.css public/images/home/hero-art.webp
git commit -m "feat: add responsive site shell"
```

### Task 6: Homepage composition and search interaction

**Files:**
- Create: `components/home/home-page.tsx`
- Create: `components/home/hero.tsx`
- Create: `components/home/category-grid.tsx`
- Create: `components/home/story-grid.tsx`
- Create: `components/home/tool-strip.tsx`
- Create: `components/content/category-card.tsx`
- Create: `components/content/article-card.tsx`
- Create: `components/search/search-panel.tsx`
- Create: `styles/home.module.css`
- Create: `styles/cards.module.css`
- Modify: `app/[locale]/page.tsx`
- Create: `tests/search-panel.test.tsx`

**Interfaces:**
- Consumes: typed categories/articles, `buildSearchIndex`, `searchArticles`, site shell, accepted six-section concepts.
- Produces: full homepage and reusable article/category cards.

- [ ] **Step 1: Write the failing search panel test**

```tsx
it('filters articles and shows a recovery state', async () => {
  const user = userEvent.setup()
  const index = buildSearchIndex('en')
  render(<SearchPanel locale="en" index={index} />)
  await user.type(screen.getByRole('searchbox', { name: 'Search Becoming Chinese' }), 'tea')
  expect(screen.getByText('Why tea is never just a drink')).toBeInTheDocument()
  await user.clear(screen.getByRole('searchbox', { name: 'Search Becoming Chinese' }))
  await user.type(screen.getByRole('searchbox', { name: 'Search Becoming Chinese' }), 'not-a-real-topic')
  expect(screen.getByText('No stories found')).toBeInTheDocument()
  expect(screen.getByRole('link', { name: 'Explore all topics' })).toHaveAttribute('href', '/en/articles')
})
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `npm test -- tests/search-panel.test.tsx`

Expected: FAIL because `SearchPanel` does not exist.

- [ ] **Step 3: Implement homepage sections in accepted order**

Compose only: header → hero/search → six categories → featured stories → free tools → community quote → newsletter → footer. Preserve exact hero headline “Your practical guide to everyday China.” in English and its approved Chinese translation. Do not add a hero pill or unapproved section.

- [ ] **Step 4: Implement search panel state**

Use controlled input state, `useDeferredValue` for the query, and `searchArticles(deferredQuery, index)` for derived results. Pass only `buildSearchIndex(locale)` from the server page; do not serialize article sections into the client component and do not copy query results into effect-driven state.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- tests/search-panel.test.tsx tests/search.test.ts && npm run typecheck && npm run lint`

Expected: all checks pass.

```bash
git add app/[locale]/page.tsx components/home components/content components/search styles/home.module.css styles/cards.module.css tests/search-panel.test.tsx
git commit -m "feat: build bilingual homepage"
```

### Task 7: Category, article list, and article detail pages

**Files:**
- Create: `app/[locale]/category/[slug]/page.tsx`
- Create: `app/[locale]/articles/page.tsx`
- Create: `app/[locale]/articles/[slug]/page.tsx`
- Create: `components/content/article-layout.tsx`
- Create: `styles/article.module.css`

**Interfaces:**
- Consumes: `getCategory`, `getArticle`, `listArticles`, article/category cards.
- Produces: statically generated category and article routes with localized metadata.

- [ ] **Step 1: Add static route parameter generation**

Each dynamic page must return all locale/slug combinations through `generateStaticParams`. Missing category/article values call `notFound()`.

- [ ] **Step 2: Implement category and list pages**

Category pages include localized introduction, subcategory filters, featured article and latest content. Article list shows all entries and reuses the search panel without loading article bodies into the client component.

- [ ] **Step 3: Implement article layout**

Render breadcrumb, localized title, ISO date through `<time>`, reading minutes, table of contents linked to stable section IDs, bilingual explanation blocks, and three related articles from the same category.

- [ ] **Step 4: Verify static rendering and commit**

Run: `npm run typecheck && npm run lint && npm run build`

Expected: every category and article path appears in build output without dynamic-fetch warnings.

```bash
git add app/[locale]/category app/[locale]/articles components/content/article-layout.tsx styles/article.module.css
git commit -m "feat: add category and article pages"
```

### Task 8: Chinese name generator domain and UI

**Files:**
- Create: `lib/name-generator.ts`
- Create: `tests/name-generator.test.ts`
- Create: `components/tools/name-generator.tsx`
- Create: `tests/name-generator-ui.test.tsx`
- Create: `styles/tools.module.css`
- Create: `app/[locale]/tools/page.tsx`
- Create: `app/[locale]/tools/chinese-name-generator/page.tsx`

**Interfaces:**
- Produces: `NamePreferences`, `GeneratedName`, `validateNameInput`, `generateChineseNames` and a complete form interaction.

- [ ] **Step 1: Write failing deterministic domain tests**

```ts
it('returns three stable names with hanzi, pinyin, meaning, and rationale', () => {
  const input = { englishName: 'Maya', style: 'gentle', trait: 'curious' } as const
  const first = generateChineseNames(input)
  expect(first).toHaveLength(3)
  expect(first).toEqual(generateChineseNames(input))
  expect(first.every((name) => name.hanzi && name.pinyin && name.meaning.en && name.rationale.en)).toBe(true)
})

it('rejects empty and overlong names', () => {
  expect(validateNameInput({ englishName: '', style: 'classic', trait: 'calm' })).toHaveProperty('englishName')
  expect(validateNameInput({ englishName: 'a'.repeat(51), style: 'classic', trait: 'calm' })).toHaveProperty('englishName')
})
```

- [ ] **Step 2: Run domain tests and confirm failure**

Run: `npm test -- tests/name-generator.test.ts`

Expected: FAIL because generator functions do not exist.

- [ ] **Step 3: Implement local deterministic generation**

Use curated arrays of surnames and given-name characters with bilingual meanings and style/trait tags. Hash normalized input with a small pure string hash, choose unique entries by modular index, and return exactly three candidates. Accept only letters, spaces, apostrophes and hyphens; trim input; enforce 1–50 characters.

- [ ] **Step 4: Write and run the failing UI test**

The test fills the English name, selects style and trait, submits, verifies three result cards, clicks the uniquely named copy button for the first result, and expects a localized “Copied” status. Mock `navigator.clipboard.writeText` and assert it receives the Hanzi and Pinyin.

Run: `npm test -- tests/name-generator-ui.test.tsx`

Expected: FAIL before the component is implemented.

- [ ] **Step 5: Implement tools pages and UI**

The tools index contains the working name generator plus three visibly disabled “Coming soon” tools. The generator uses field-level errors, submitting state, an `aria-live` results region, copy feedback, and no network calls.

- [ ] **Step 6: Verify and commit**

Run: `npm test -- tests/name-generator.test.ts tests/name-generator-ui.test.tsx && npm run typecheck && npm run lint`

Expected: all checks pass.

```bash
git add lib/name-generator.ts components/tools app/[locale]/tools styles/tools.module.css tests/name-generator.test.ts tests/name-generator-ui.test.tsx
git commit -m "feat: add Chinese name generator"
```

### Task 9: Fixed pages, demo forms, and recovery states

**Files:**
- Create: `components/forms/demo-form.tsx`
- Create: `tests/demo-form.test.tsx`
- Create: `styles/forms.module.css`
- Modify: `components/home/home-page.tsx`
- Create: `app/[locale]/about/page.tsx`
- Create: `app/[locale]/contact/page.tsx`
- Create: `app/[locale]/privacy/page.tsx`
- Create: `app/[locale]/terms/page.tsx`
- Create: `app/[locale]/disclaimer/page.tsx`
- Create: `app/[locale]/not-found.tsx`

**Interfaces:**
- Consumes: localized fixed-page data from `content/pages.ts`.
- Produces: all compliance routes, contact/newsletter demo interaction, and localized 404 recovery.

- [ ] **Step 1: Write failing demo form tests**

Test invalid email exposes a field-level message, valid submission shows “Demo submitted — no data was sent.”, and no `fetch` call occurs.

- [ ] **Step 2: Run test and confirm failure**

Run: `npm test -- tests/demo-form.test.tsx`

Expected: FAIL because `DemoForm` does not exist.

- [ ] **Step 3: Implement fixed pages and demo forms**

Use semantic article markup for legal pages. Contact fields are name, email and message. Newsletter field is email only. Both submit locally, clear sensitive values after success, and state that no data was transmitted. Replace the homepage newsletter presentation from Task 6 with `<DemoForm variant="newsletter" locale={locale} />`.

- [ ] **Step 4: Implement localized not-found recovery**

Render a clear 404 title plus links to localized home, articles and tools. Do not rely on browser back navigation as the only recovery action.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- tests/demo-form.test.tsx && npm run typecheck && npm run lint`

Expected: all checks pass.

```bash
git add app/[locale]/about app/[locale]/contact app/[locale]/privacy app/[locale]/terms app/[locale]/disclaimer app/[locale]/not-found.tsx components/forms components/home/home-page.tsx styles/forms.module.css tests/demo-form.test.tsx
git commit -m "feat: add fixed pages and demo forms"
```

### Task 10: SEO metadata, structured data, sitemap, and robots

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/[locale]/articles/[slug]/page.tsx`
- Create: `lib/seo.ts`

**Interfaces:**
- Consumes: locales, categories, articles and fixed route list.
- Produces: canonical URLs, `hreflang`, localized metadata, Article JSON-LD, sitemap and robots output.

- [ ] **Step 1: Implement metadata helpers**

Create `localizedAlternates(path)` returning canonical English/Chinese URLs and a language map with `en` and `zh`. `articleJsonLd(article, locale)` returns `@type: "Article"`, localized headline/description, datePublished, image and publisher.

- [ ] **Step 2: Wire route metadata**

Each category, article, tool and fixed page supplies localized title/description and alternates. Article pages render JSON-LD with `<script type="application/ld+json">` using serialized trusted local data.

- [ ] **Step 3: Add sitemap and robots**

Sitemap enumerates both locales for home, all categories, all articles, tools and fixed pages. Robots allows `/` and points to the canonical sitemap URL from `NEXT_PUBLIC_SITE_URL`, falling back to `https://becomingchinese.com`.

- [ ] **Step 4: Verify and commit**

Run: `npm run typecheck && npm run lint && npm run build`

Expected: build succeeds and emits metadata routes for `/sitemap.xml` and `/robots.txt`.

```bash
git add app/sitemap.ts app/robots.ts app/[locale]/layout.tsx app/[locale]/articles/[slug]/page.tsx lib/seo.ts
git commit -m "feat: add international SEO metadata"
```

### Task 11: Full verification and visual fidelity closure

**Files:**
- Modify: `docs/design/becoming-chinese/fidelity-ledger.md`
- Modify: only files required to repair verified defects.

**Interfaces:**
- Consumes: accepted section concepts and completed MVP.
- Produces: verified production build with documented concept-to-render parity.

- [ ] **Step 1: Run automated checks**

Run:

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

Expected: every command exits 0 with no failing test or type error.

- [ ] **Step 2: Start the production app and define the browser flow**

Run `npm start` after build. Browser flow:

```text
/ → locale redirect → homepage renders → search filters → category opens → article opens → language switch preserves article → tools opens → name generator returns and copies a result → contact demo validates → unknown route recovers.
```

- [ ] **Step 3: Verify desktop and mobile in the Browser plugin**

Check 1440px desktop, current desktop viewport and 390px mobile. For each, verify page identity, meaningful DOM, no framework overlay, console health, screenshot evidence and the complete interaction flow. Confirm no horizontal overflow, clipped navigation, unreadable text or inert control.

- [ ] **Step 4: Compare implementation to every accepted concept**

Use `view_image` on all six accepted concept images and the latest desktop/mobile screenshots in the same QA pass. Complete the fidelity ledger with at least these points: copy, section order, container model, typography, palette, hero asset treatment, responsive collapse and interactions. Fix every non-intentional mismatch and rerun the relevant checks.

- [ ] **Step 5: Run the above-the-fold copy diff**

Allowed visible hero copy is limited to the accepted navigation labels, Chinese line `入境 · 入心 · 入生活`, hero headline, hero supporting sentence, search placeholder and language switcher. Remove or document any additional visible copy.

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "test: verify Becoming Chinese MVP"
```

Expected: clean worktree, completed fidelity ledger, passing automated checks, and verified desktop/mobile browser flow.
