# Architecture Decision Records

Index of every ADR in this repository. The general plan lives at
[`../plan.md`](../plan.md); conventions for writing these documents live in the
`project-docs` skill.

| ADR | Title | Status |
| --- | ----- | ------ |
| [0001](0001-plain-html-css.md) | Build the site as plain HTML and CSS with no build step | accepted |
| [0002](0002-site-information-architecture.md) | Site information architecture | accepted (URL form superseded for local links by ADR 0014) |
| [0003](0003-content-fidelity.md) | Reproduce the archived content verbatim with a single shared source for contact data | accepted (diacritics exception for the kurs-psychoterapii site, ADR 0020) |
| [0004](0004-styling-and-accessibility.md) | Styling follows the legacy text-only branding, made responsive and accessible | rejected |
| [0005](0005-hosting-and-deployment.md) | Host the site as static files on a static host | proposed |
| [0006](0006-seo-metadata-and-analytics.md) | Minimal, hand-written SEO metadata and no analytics | proposed |
| [0007](0007-warm-slate-typography-redesign.md) | Restyle the site in a warm slate and sand palette with a typography-led layout | superseded by ADR 0010 |
| [0008](0008-home-page-as-entry-point.md) | Make the home page an entry point that links to the articles instead of printing them | accepted, card body rule superseded by ADR 0011 |
| [0009](0009-static-site-generator-for-kurs-psychoterapii.md) | Static site generator for the kurs-psychoterapii site | proposed |
| [0010](0010-adopt-option-c-bold-poster.md) | Adopt the bold poster direction (option C) for the landing page, with a placeholder hero photograph | accepted (hero treatment under review in ADR 0016) |
| [0011](0011-home-card-body-any-verbatim-sentence.md) | Home page cards may quote any verbatim sentence from the article | accepted |
| [0012](0012-email-shown-obfuscated-as-text.md) | Show the e-mail address obfuscated as text, with the real address only in mailto: | accepted |
| [0013](0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md) | Build the site under fundacja/ with the domain http://fundacja-psychoterapia.pl, canonical and Open Graph tags, and the archived scaffolding text | accepted (decision 1 on root-absolute paths superseded by ADR 0014) |
| [0014](0014-relative-paths-for-local-links-and-assets.md) | Use relative paths for all local links and assets | accepted |
| [0015](0015-accept-archived-titles-and-labels-as-scaffolding-text.md) | Accept the archived page titles and link labels as scaffolding text | accepted |
| [0016](0016-light-hero-with-white-translucent-mask.md) | Use a light hero with a white translucent mask and dark type on the landing page (amends the hero treatment of ADR 0010) | proposed |
| [0017](0017-css-only-mobile-menu-dropdown.md) | Collapse the navigation into a CSS-only dropdown below 40rem | proposed |
| [0018](0018-mobile-spacing-and-shared-gutter.md) | Tighten spacing below 40rem with one shared 1rem side gutter | accepted |
| [0019](0019-kurs-site-copies-fundacja-design-tokens.md) | Copy the fundacja design tokens and port its components into kurs-psychoterapii, with a sync rule and data-driven navigation | proposed |
| [0020](0020-restore-polish-diacritics-on-kurs-site.md) | Restore Polish diacritics in the kurs-psychoterapii titles and link text, as an exception to ADR 0003 | accepted |
| [0021](0021-keep-white-mask-with-per-image-contrast-checks.md) | Keep the 65% white mask over photographs and check text contrast per image before it goes live | accepted |

## Numbering

Numbers are zero-padded to four digits and allocated sequentially — the next ADR
is `0022`. Numbers are never reused or renumbered. A superseded decision keeps
its number and is marked `superseded by ADR NNNN`; the replacing ADR is written
fresh.

## Status meanings

| Status | Meaning |
| ------ | ------- |
| `proposed` | Under discussion, not yet in force |
| `accepted` | In force |
| `superseded by ADR NNNN` | Replaced by a later decision; kept for history |
| `deprecated` | Still in force but no longer recommended |
| `rejected` | Considered and deliberately not adopted |
