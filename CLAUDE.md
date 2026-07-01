# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Becoming Chinese is a bilingual (English / 简体中文) Chinese culture and lifestyle learning platform. The MVP is a static-first, SEO-friendly marketing website built with Next.js App Router and TypeScript. The site introduces Chinese language, lifestyle, culture, entertainment, community stories, and free tools through six content categories.

**Current state:** Pre-implementation. Design specs and a detailed 11-task implementation plan exist in `docs/`. No code has been written yet.

## Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build (static generation)
npm start            # Serve production build
npm run lint         # ESLint across the project
npm run typecheck    # tsc --noEmit
npm test             # Vitest run (unit + component tests)
npm run test:watch   # Vitest in watch mode
```

## Tech Stack

- **Framework:** Next.js (stable, App Router) with `proxy.ts` middleware for locale routing
- **Language:** TypeScript (strict)
- **Styling:** CSS Modules with global design tokens in `app/globals.css`
- **Testing:** Vitest + Testing Library + jsdom
- **Linting:** ESLint with `eslint-config-next`

## Architecture

### Routing

All public pages live under `/[locale]` where `locale` is `en` or `zh`. The root `proxy.ts` middleware handles locale detection and redirect for unlocalized paths. Locale priority: `bc-locale` cookie → deployment country header (`x-vercel-ip-country` / `cf-ipcountry`) → `accept-language` header → `en` default.

### Module Boundaries

- **`app/[locale]/`** — Language-scoped pages: home, category, articles, tools, about, contact, privacy, terms, disclaimer, not-found
- **`components/layout/`** — Site shell: header, footer, mobile menu, language switcher
- **`components/content/`** — Reusable content display: article cards, category cards, article layout with bilingual explanation blocks
- **`components/tools/`** — Interactive tools: Chinese name generator form
- **`content/`** — Typed bilingual data: categories (6), articles (≥6 complete), fixed pages, UI translations. This is the single source of truth — no database or CMS in MVP
- **`lib/i18n.ts`** — `Locale` type, `LOCALES`, `isLocale()`, `resolveLocale()`
- **`lib/locale-path.ts`** — `replaceLocale(pathname, locale)` for semantic language switching
- **`lib/content.ts`** — Typed content accessors (`getCategory`, `getArticle`, `listArticles`)
- **`lib/search.ts`** — Client-side search index builder and query function (title/summary/category/tags only, not article bodies)
- **`lib/name-generator.ts`** — Deterministic Chinese name generation from curated character tables (no AI/API)
- **`lib/seo.ts`** — Canonical URLs, hreflang alternates, Article JSON-LD

### Critical Constraints

- **Two locales only:** `en` and `zh`. No other languages.
- **Static-first:** Public content is statically generated. No server-side data fetching at runtime.
- **No backend:** No database, CMS, auth, payments, mailing, or generative AI APIs. Newsletter and contact forms validate UI but do not transmit data — they must clearly state "Demo submitted — no data was sent."
- **China country code:** `CN` maps to `zh` locale; all other countries map to `en`.
- **Visual direction:** Modern learning platform aesthetic. Palette: cinnabar red `#A43C2E`, ink `#252622`, rice paper `#F5F1E9`, pale tea `#D8CFBE`, muted sage `#6C796E`.
- **Typography:** Desktop body ≥16px, mobile body ≥14px, supporting text ≥12px. WCAG AA contrast.
- **Search:** Client-side only. Index excludes article body text — only title, summary, category, and tags.
- **Name generator:** Deterministic — same input produces same 3 results per session. Accepts only letters, spaces, apostrophes, hyphens (1–50 chars).
- **Images:** All must be original, generated, or explicitly licensed for commercial use. Accurate alt text required.

### Content Types

```ts
type LocalizedText = { en: string; zh: string }
type Category = { slug, character, title: LocalizedText, description: LocalizedText, subcategories: { slug, title: LocalizedText }[] }
type Article = { id, slug, category, tags: LocalizedText[], title: LocalizedText, summary: LocalizedText, publishedAt, readingMinutes, image: { src, alt: LocalizedText }, sections: ArticleSection[], seo: { title, description: LocalizedText } }
```

Same article across locales shares a stable `id` — language switching preserves the current article context.

## Implementation Plan

The full MVP implementation plan is in `docs/superpowers/plans/2026-06-30-becoming-chinese-mvp.md` (11 tasks). The design specification is in `docs/superpowers/specs/2026-06-30-becoming-chinese-mvp-design.md`. Visual concept work starts with Task 1 before any code.
