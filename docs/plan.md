# Psycho-med — general plan

_Last updated: 2026-10-11_

## Overview

A rebuild of the website of **Fundacja dla Celów Rozwoju Podejścia
Psychobiospołecznego w Medycynie PSYCHOMED** as a static website.

The existing site is a WordPress installation (Twenty Eleven theme,
`fundacja-psychoterapia.pl`) that has been snapshotted into
`legacy/psycho-med/`. The archive contains three pages, every stylesheet the
site used, and no images or scripts of its own. The content is small and
stable: three articles of substance plus contact, legal and bank details.

The new site must carry that content forward, unchanged, in a form that is
cheap to host, trivial to maintain, and readable on a phone. Publishing a page
must not require a database, a PHP process or a build toolchain.

## Goals

- Reproduce the legacy content faithfully, in Polish, byte for byte where it is
  text. The home page carries fragments only, per
  [ADR 0008](adr/0008-home-page-as-entry-point.md).
- Serve the site as plain HTML and CSS from any static host.
- Keep maintenance possible for someone with no front-end toolchain: edit a
  file, commit, done.
- Hold up on mobile: the legacy layout was `max-width: 80%` of the viewport and
  does not survive a phone.
- Make the foundation's contact, legal and bank details available without any
  of them being typed twice.

## Non-goals

- WordPress parity. Themes, plugins, feeds, REST API and the bbPress forum are
  not ported.
- Comments, contact forms, newsletters, search, logins, or any server-side
  behaviour.
- Any JavaScript requirement for reading the site.
- A translation layer or locale switching.
- A visual redesign of the archive pages beyond the palette and layout of
  [ADR 0007](adr/0007-warm-slate-typography-redesign.md). The landing page is
  redesigned; the three article pages are ported with the same tokens and no
  further styling of their own.
- Migrating the legacy URLs (`?cat=6`, `?p=32`, …) — those served a WordPress
  site that is going away.

## Scope by page

| Page | Source in `legacy/` | Content |
| ---- | ------------------- | ------- |
| `index.html` — Strona główna | `Fundacja … PSYCHOMED.html` | Identity block (name, patron) in the hero, one verbatim lead sentence, one card per article carrying that article's first sentence, contact e-mail, bank account. No article prose, per [ADR 0008](adr/0008-home-page-as-entry-point.md) |
| `na-temat-fundacji.html` — Na temat fundacji | `Na temat fundacji _ ….html` | The six paragraphs describing the foundation's statutory activity |
| `kursy-doskonalace.html` — Kursy doskonalące | `Kursy doskonalące _ ….html` | Course programme, admission criteria, enrolment |
| `warto-odwiedzic.html` — Warto odwiedzić | `?page_id=44`, **not archived** | The five external links currently in the menu sub-menu |

The legacy home page is a WordPress category archive that flattens every post
into one feed, mixing the course articles between the identity, contact and
bank-account posts. That interleaving is an artifact of the archive query, not
an editorial order. See [ADR 0003](adr/0003-content-fidelity.md).

## Tech stack

Details and reasoning live in the ADRs:

| ADR | Decision | Status |
| --- | -------- | ------ |
| [0001](adr/0001-plain-html-css.md) | Plain HTML + CSS, no build step | accepted |
| [0002](adr/0002-site-information-architecture.md) | Site information architecture | accepted |
| [0003](adr/0003-content-fidelity.md) | Content fidelity and single source of truth | accepted |
| [0004](adr/0004-styling-and-accessibility.md) | Styling follows the legacy text-only branding, made responsive and accessible | rejected by [0007](adr/0007-warm-slate-typography-redesign.md) |
| [0005](adr/0005-hosting-and-deployment.md) | Hosting and deployment | accepted |
| [0006](adr/0006-seo-metadata-and-analytics.md) | SEO, metadata and analytics | accepted |
| [0007](adr/0007-warm-slate-typography-redesign.md) | Warm slate and sand palette, typography-led layout | accepted |
| [0008](adr/0008-home-page-as-entry-point.md) | Home page as an entry point linking to the articles | accepted |

## Content source of truth

All copy comes from `legacy/psycho-med/`. Nothing is translated, nothing is
paraphrased, and nothing is invented. Where the archive disagrees with itself,
the archived text wins.

| Data | Page(s) | Source |
| ---- | ------- | ------ |
| Full name, patron, address, NIP, KRS | all pages (footer) | `?p=1` |
| E-mail | all pages (footer) | `?p=10` |
| Bank account | Strona główna | `?p=15` |
| Foundation profile | Strona główna, Na temat fundacji | `?p=28` |
| Course programme | Strona główna, Kursy doskonalące | `?p=32` |
| Admission criteria | Strona główna, Kursy doskonalące | `?p=35` |
| Enrolment | Strona główna, Kursy doskonalące | `?p=39` |
| External links | Warto odwiedzić | menu markup, all three pages |

## Structure

```
/
├── index.html
├── na-temat-fundacji.html
├── kursy-doskonalace.html
├── warto-odwiedzic.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── favicon.svg            # text wordmark, see ADR 0004
└── assets/
    └── css/style.css      # single stylesheet for all pages
```

`mockup/landing.html` holds the landing-page mock-up: one self-contained file
that carries its own `<style>`, needs no asset to open, and is the approved
visual reference for `index.html` and `assets/css/style.css`. It is not part of
the deployed site and carries no analytics, no canonical link and no Open Graph
tags, since those hard-code a domain that is not chosen yet
([ADR 0006](adr/0006-seo-metadata-and-analytics.md), risk 1).

Shared header and footer are repeated in each page by hand. Each page is small;
the alternative is a templating step, and [ADR 0001](adr/0001-plain-html-css.md)
rejects that.

## Milestones

1. **Mock-up** — `mockup/landing.html`, one self-contained file with its own
   `<style>`, no assets, no JavaScript. Shows the palette, the hero, the cards
   and the footer as they will ship. Takes the client's sign-off before any
   production page is written.
2. **Scaffold** — directory layout, `assets/css/style.css` carrying the mock-up
   rules, shared header and footer markup for all four pages.
2. **Na temat fundacji** — port the six paragraphs. Smallest page, ported first
   to validate the header/footer and stylesheet.
3. **Kursy doskonalące** — port the three course articles and add the
   `#program`, `#kryteria` and `#zapisy` anchors the home page links to.
4. **Strona główna** — build `index.html` from the approved mock-up: identity
   block, hero lead, the two article cards, contact e-mail, bank account.
5. **Warto odwiedzić** — build the link list from the menu sub-items.
6. **Chrome** — `404.html`, `robots.txt`, `sitemap.xml`, favicon, page titles
   and meta descriptions.
7. **Review** — responsive check at 320px, 768px and 1280px; keyboard and
   screen-reader pass; link check against the legacy URLs; recompute the
   contrast ratios in [ADR 0007](adr/0007-warm-slate-typography-redesign.md).

## Risks and open questions

| # | Item | Status |
| - | ---- | ------ |
| 1 | Hosting provider is not chosen. [ADR 0005](adr/0005-hosting-and-deployment.md) records the constraints but not the host. | open |
| 2 | The legacy e-mail is stored obfuscated as `biuro.psychomed(at)gmail.com`, but the real `mailto:` is `biuro.psychomed@gmail.com`. Publishing the real address invites more spam; keeping it text-only is less usable. | open, see [ADR 0003](adr/0003-content-fidelity.md) |
| 3 | Legacy typos: page title `Kurs psychopterapii – zapisy`, and `w dziecinie psychoterapii` in the foundation profile. Fixing them is correct Polish but changes the archived text. | open, see [ADR 0003](adr/0003-content-fidelity.md) |
| 4 | `Warto odwiedzić` is not archived; only its five menu sub-items are known. Each link may want a local description, which would be new content. | open, needs client input |
| 5 | No phone number or REGON exists anywhere in the archive. Do not add placeholders for them. | resolved: omit |
| 6 | WordPress permalinks will break. Redirects depend on the hosting choice (item 1). | blocked by item 1 |
| 7 | The landing page carries the hero lead and the card blurbs as verbatim fragments, plus six labels derived from archive words (`Fundacja · Kraków`, the three facts captions, the two card eyebrows). They read slightly less fluently than purpose-written copy. | open, see [ADR 0008](adr/0008-home-page-as-entry-point.md) |
| 8 | `Kurs psychoterapii – kryteria przyjęcia` and `Kurs psychopterapii – zapisy` are the archive titles behind the home page's `#kryteria` and `#zapisy` links. The link labels use `Kryteria przyjęcia` and `Zapisy`; the archived titles, typo included, stay on the course page. | resolved: labels only |

## ADR index

Maintained in full at [docs/adr/README.md](adr/README.md).
