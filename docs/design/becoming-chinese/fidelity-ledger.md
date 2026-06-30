# Becoming Chinese Visual Fidelity Ledger

Status: Accepted by the user on 2026-07-01; binding visual reference for implementation.

## Accepted concept set

| Section | Concept file | Implementation contract |
|---|---|---|
| Hero | `home-hero-concept.png` | Use the navigation, headline, supporting copy, search composition, mountain/sun treatment, color and spacing. The visible preview below the hero is superseded by the dedicated categories concept. |
| Categories | `home-categories-concept.png` | Use the six-column desktop family, Chinese character anchors, concise descriptions, imagery and `Explore all` link. |
| Stories | `home-stories-concept.png` | Use one dominant lead story and two secondary stories. The newsletter teaser inside this image is superseded by the dedicated newsletter concept. |
| Tools | `home-tools-concept.png` | Use the open rail/list treatment, primary name generator, supporting tools and still-life image area. |
| Community | `home-community-concept.png` | Use the split quote/image composition and attribution hierarchy. |
| Newsletter/Footer | `home-newsletter-concept.png` | Use the dark newsletter band, light structured footer, language control and legal link row. Footer labels will follow the approved information architecture rather than invented image text. |

## Review checks

| Check | Concept evidence | Implementation requirement |
|---|---|---|
| Copy | Hero and section concepts render the approved primary headings and article/tool names. | Code-native text must use approved copy; generated incidental text is not authoritative. |
| Layout | Hero → categories → stories → tools → community → newsletter/footer. | Preserve this exact section order and first-viewport balance. |
| Typography | Concepts show large display type, readable body copy and deliberate control text. | Desktop body ≥16px, mobile body ≥14px, supporting text ≥12px. |
| Palette | Cinnabar, ink, rice paper, pale tea and muted sage dominate every concept. | Use the locked tokens without introducing purple, neon or unrelated gradients. |
| Container | Hero is open; categories are a selectable family; stories use editorial frames; tools use rails. | Do not convert open bands or rails into generic card grids. |
| Asset treatment | Ink mountains, editorial photography and still-life imagery blend into each section. | Use generated or licensed project assets with matching crop, lighting and background integration. |
| Mobile intent | Primary content and controls have clear hierarchy that can collapse vertically. | Keep navigation, search, section links and language control visible at 390px. |

## Intentional concept reconciliation

- The hero image's lower preview is not a separate approved section; the dedicated categories concept governs the next section.
- The stories image's internal newsletter teaser is omitted because the dedicated newsletter/footer concept governs newsletter placement.
- Footer navigation uses the product specification's six areas and fixed pages; small generated sublink text is visual texture, not locked information architecture.
- All production UI copy, icons and controls remain code-native; the concept images are never shipped as static UI screenshots.
