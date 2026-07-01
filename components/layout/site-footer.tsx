import Link from 'next/link'

import type { Locale } from '@/lib/i18n'
import styles from '@/styles/layout.module.css'

const footerGroups = [
  { title: 'Language', links: [['Mandarin essentials', '/category/chinese-language'], ['Everyday Chinese', '/category/chinese-language'], ['Pronunciation', '/category/chinese-language']] },
  { title: 'Culture', links: [['Traditions', '/category/chinese-culture-tradition'], ['History', '/category/chinese-culture-tradition'], ['Festivals', '/category/chinese-culture-tradition']] },
  { title: 'Lifestyle', links: [['Food', '/category/chinese-lifestyle'], ['Travel', '/category/chinese-lifestyle'], ['City life', '/category/chinese-lifestyle']] },
  { title: 'Stories', links: [['Essays', '/articles'], ['Interviews', '/articles'], ['Notes from China', '/articles']] },
  { title: 'Learn', links: [['Guides', '/category/chinese-language'], ['Resources', '/tools'], ['Free tools', '/tools']] },
  { title: 'Community', links: [['Learner stories', '/category/community-stories'], ['Reader tips', '/category/community-stories'], ['Contribute', '/contact']] },
] as const

const legalLinks = ['about', 'contact', 'privacy', 'terms', 'disclaimer'] as const

export function SiteFooter({ locale }: Readonly<{ locale: Locale }>) {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link className={styles.brand} href={`/${locale}`} aria-label="Becoming Chinese home">
            <span className={styles.brandMark} aria-hidden="true">成</span>
            <span>Becoming Chinese</span>
          </Link>
          <p>English-first learning for Chinese culture and lifestyle.</p>
        </div>
        {footerGroups.map((group) => (
          <nav className={styles.footerGroup} aria-label={group.title} key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map(([label, path]) => (
                <li key={label}><Link href={`/${locale}${path}`}>{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={styles.legalRow}>
        <div>
          {legalLinks.map((slug) => (
            <Link href={`/${locale}/${slug}`} key={slug}>{slug[0].toUpperCase() + slug.slice(1)}</Link>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Becoming Chinese</p>
      </div>
    </footer>
  )
}
