# Becoming Chinese Visual Fidelity Ledger

Status: Accepted by the user on 2026-07-01, including the final fresh Stories replacement. These images are visual references only; production UI text remains code-native.

## Final concept inventory

Dimensions were read from the final PNG headers after proportional width normalization. Every file is exactly 1440 px wide; no image was cropped.

| Section | Concept file | Final dimensions | Measurable typography observation at native size | Sampled dominant colors | Visual evidence and deviation record |
|---|---|---:|---|---|---|
| Hero | `home-hero-concept.png` | 1440 x 960 | Modern sans-serif throughout the English UI. Two-line H1 has an approximately 58 px visible capital height and 87 px line advance; supporting copy is approximately 25 px high; nav/control text is approximately 18 px. | `#F8EEE0`, `#FBF8F2`, `#E4D8C7`, `#77675A` | Header, search, headline and mountain/sun composition are intact. The lower categories preview remains incidental and is superseded by the dedicated categories concept. |
| Categories | `home-categories-concept.png` | 1440 x 768 | English H2 is modern sans-serif with approximately 51 px visible capital height and 63 px line advance. Category labels are approximately 19 px; descriptions approximately 14 px. Chinese anchors retain display calligraphy. | `#F8F3ED`, `#8E7763`, `#DFD5CB`, `#F4EFE8` | Six equal desktop entries and all six Chinese anchors remain visible. No crop or compositional change; this section is shorter because its original aspect ratio was preserved. |
| Stories | `home-stories-concept.png` | 1440 x 1027 | English display hierarchy is coordinated modern sans-serif throughout: section H2 approximately 50 px visible capital height; lead headline approximately 45 px with about 64 px line advance; secondary headlines approximately 29-31 px. “A beginner’s guide to hanfu” is natively rendered in the same sans-serif character as the other English headlines. | `#F2ECE7`, `#E6DED6`, `#0C0F0C`, `#1C1914`, `#B9ACA1`, `#56493C` | Accepted by the user on 2026-07-01. One lead story and two secondary stories retain the accepted geometry and imagery roles. The lower-right headline sits directly on a continuous rice-paper/photo field with no patch rectangle, hard boundary or retouch seam. The newsletter teaser remains incidental and is superseded by the dedicated newsletter concept. |
| Tools | `home-tools-concept.png` | 1440 x 1025 | English UI uses modern sans-serif. H2 has approximately 54 px visible capital height; primary tool title approximately 32 px; supporting/tool copy approximately 19 px. Chinese `名` remains a display glyph. | `#F7F2EB`, `#F6F1EA`, `#F5F0E8`, `#DBD2C9` | Open rail/list structure, three tool entries and still-life imagery are unchanged. Serif lettering embedded on photographed book props is imagery, not English UI typography. |
| Community | `home-community-concept.png` | 1440 x 1025 | All English copy is coordinated modern sans-serif. Quote letters have approximately 49 px visible height with roughly 80 px line advance; `understanding` remains cinnabar in the same sans family. Attribution is approximately 26 px; body/link text approximately 17 px. | `#F6F3ED`, `#584C3E`, `#DFD6C8`, `#AFA694` | Split quote/portrait composition, copy, attribution and hierarchy are preserved. Warm Song-style Chinese display text remains in the kicker and bottom band by design. |
| Newsletter / Footer | `home-newsletter-concept.png` | 1440 x 1023 | All English display and footer typography is coordinated modern sans-serif. Newsletter headline has approximately 47 px visible capital height and 75 px line advance; brand wordmark approximately 34 px; footer headings approximately 18 px and links approximately 14 px. | `#151514`, `#F3F0EB`, `#E6E0DA`, `#35302E` | Dark newsletter band, input, structured six-column footer, legal row and language control are preserved. Small generated footer sublinks remain visual texture; approved information architecture is authoritative. Warm Chinese calligraphy remains. |

## Review checks

| Check | Required evidence | Accepted result / deviation |
|---|---|---|
| Copy | Hero headline and section labels match the specification | `home-hero-concept.png` shows “Your practical guide to everyday China.”; the section files retain their original headings and labels. Generated incidental footer sublinks are not authoritative. |
| Layout | Hero -> categories -> stories -> tools -> community -> newsletter | The six files map one-to-one to this order. All are 1440 px wide and retain their source aspect ratios; heights are recorded above. No crop was used. |
| Typography | Desktop body >=16 px, supporting text >=12 px | Native-image measurements show body/supporting text ranges of approximately 14-25 px. Categories descriptions are approximately 14 px, above the 12 px support minimum. Stories, community and newsletter now use modern sans-serif English display typography; Chinese display text remains Song/calligraphic. |
| Palette | Cinnabar, ink, rice paper, tea and sage only | Quantized dominant samples are recorded per file above. The repeated near-whites, charcoal/ink and tea neutrals match the locked family; visible cinnabar and sage accents remain. No purple or unrelated gradient was observed. |
| Container | Open sections; cards only for actual selectable content | Hero and community remain open compositions; categories and stories frame selectable editorial content; tools remain rails; newsletter remains a full-width band. No generic dashboard-card treatment was introduced. |
| Mobile intent | Primary controls and content hierarchy remain visible | Desktop references preserve clear collapse order: nav/search, category entries, lead before secondary stories, tool rails, quote before portrait, newsletter input before footer columns. Production must keep these controls visible at 390 px; no separate mobile raster concept exists. |

## Binding implementation notes

- Preserve exact section order, copy hierarchy, container model, dominant palette and imagery roles shown here.
- Use a modern sans-serif for all production English UI and display text; use warm Song-style Chinese display typography where shown.
- Treat photographed or illustrated text inside raster imagery as asset content, not UI typography.
- Use the dedicated categories and newsletter/footer concepts instead of incidental previews embedded in hero and stories.
- Do not ship these concepts as static UI; navigation, copy, controls and icons remain code-native.

## Final implementation verification — 2026-07-01

- Desktop viewport: 1440 x 1000. Hero copy, search result, palette, readable type, and article layout verified with no horizontal overflow.
- Mobile viewport: 390 x 844. Hero hierarchy, search control, menu control, and artwork verified with no horizontal overflow.
- Interaction flow verified: homepage search, article rendering with JSON-LD, three-result Chinese name generator, contact validation/local demo submission, and localized 404 recovery links.
- Locale routing verified: country header `CN` redirects to `/zh`; an explicit `bc-locale=en` cookie overrides it and redirects to `/en`.
- The in-app Browser backend stalled during navigation, so the same checks were completed with local headless Chrome DevTools automation. Screenshots were kept outside the repository as temporary QA evidence.
