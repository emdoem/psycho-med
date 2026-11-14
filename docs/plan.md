# Psycho-med — general plan

_Last updated: 2026-11-14_

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
  [ADR 0010](adr/0010-adopt-option-c-bold-poster.md). The landing page is
  redesigned; the three article pages are ported with the same tokens and no
  further styling of their own.
- Migrating the legacy URLs (`?cat=6`, `?p=32`, …) — those served a WordPress
  site that is going away.

## Scope by page

| Page | Source in `legacy/` | Content |
| ---- | ------------------- | ------- |
| `index.html` — Strona główna | `Fundacja … PSYCHOMED.html` | Identity block (name, patron) in the hero, one verbatim lead sentence, one card per article carrying one verbatim sentence from that article, chosen by the editor ([ADR 0011](adr/0011-home-card-body-any-verbatim-sentence.md)), contact e-mail, bank account. No article prose, per [ADR 0008](adr/0008-home-page-as-entry-point.md) |
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
| [0002](adr/0002-site-information-architecture.md) | Site information architecture | accepted (URL form superseded for local links by [ADR 0014](adr/0014-relative-paths-for-local-links-and-assets.md)) |
| [0003](adr/0003-content-fidelity.md) | Content fidelity and single source of truth | accepted |
| [0004](adr/0004-styling-and-accessibility.md) | Styling follows the legacy text-only branding, made responsive and accessible; replaced by [0007](adr/0007-warm-slate-typography-redesign.md) | rejected |
| [0005](adr/0005-hosting-and-deployment.md) | Hosting and deployment | proposed |
| [0006](adr/0006-seo-metadata-and-analytics.md) | SEO, metadata and analytics | proposed |
| [0007](adr/0007-warm-slate-typography-redesign.md) | Warm slate and sand palette, typography-led layout | superseded by [ADR 0010](adr/0010-adopt-option-c-bold-poster.md) |
| [0008](adr/0008-home-page-as-entry-point.md) | Home page as an entry point linking to the articles | accepted, card body rule superseded by [ADR 0011](adr/0011-home-card-body-any-verbatim-sentence.md) |
| [0009](adr/0009-static-site-generator-for-kurs-psychoterapii.md) | Static site generator for the kurs-psychoterapii site | proposed |
| [0010](adr/0010-adopt-option-c-bold-poster.md) | Bold poster direction (option C) with a placeholder hero photograph | accepted (hero treatment under review in [ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md)) |
| [0011](adr/0011-home-card-body-any-verbatim-sentence.md) | Home page cards may quote any verbatim sentence from the article | accepted |
| [0012](adr/0012-email-shown-obfuscated-as-text.md) | E-mail shown obfuscated as text, real address only in `mailto:` | accepted |
| [0013](adr/0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md) | Site under `fundacja/` on `http://fundacja-psychoterapia.pl`, canonical and Open Graph tags, archived scaffolding text | accepted (decision 1 on root-absolute paths superseded by [ADR 0014](adr/0014-relative-paths-for-local-links-and-assets.md)) |
| [0014](adr/0014-relative-paths-for-local-links-and-assets.md) | Relative paths for all local links and assets | accepted |
| [0015](adr/0015-accept-archived-titles-and-labels-as-scaffolding-text.md) | Archived page titles and link labels accepted as scaffolding text | accepted |
| [0016](adr/0016-light-hero-with-white-translucent-mask.md) | Light hero with a white translucent mask and dark type on the landing page, amending the hero treatment of ADR 0010 | proposed (implementation drift open, risk 18) |

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

The site lives under `fundacja/`, which is the deploy root. Local links and assets are
relative ([ADR 0014](adr/0014-relative-paths-for-local-links-and-assets.md)), so the site works opened from disk and when deployed, as long as all pages stay in `fundacja/`. Canonical, `og:url`, `robots.txt` and `sitemap.xml` use the domain
([ADR 0013](adr/0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md)).

```
fundacja/                  # deploy root
├── index.html
├── na-temat-fundacji.html
├── kursy-doskonalace.html
├── warto-odwiedzic.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── favicon.svg            # text wordmark, see ADR 0004
└── assets/
    ├── css/style.css      # single stylesheet for all pages
    └── img/hero-lubelska.jpg   # decorative hero background, see risk 13
```

The hero is a light treatment: a white translucent mask over the photograph,
with dark text. This is proposed in [ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md)
and is not yet confirmed by the client.

`mockup/` holds the landing-page mock-ups, for reference only. Option C was chosen
([ADR 0010](adr/0010-adopt-option-c-bold-poster.md)), and `option-c2.html` is the
reference for the production landing page. It adds a placeholder hero photograph
at `mockup/assets/hero-lenartowicza.jpg`, a copy of
`legacy/lenartowicza-crop-01.jpg` (441x248 px). `option-a.html` (warm slate and
sand, card grid, superseded [ADR 0007](adr/0007-warm-slate-typography-redesign.md))
and `option-b.html` (light, squared, hairline rules, institutional blue, left
rail) are kept for reference only, and `option-c.html` (bold poster, vermilion,
monospaced labels, numbered index) is the same design without the photograph.
They are not part of the deployed site and carry no analytics, no canonical link
and no Open Graph tags, since they hard-code a domain. The production site sets them under [ADR 0013](adr/0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md).
The production hero no longer matches `option-c2.html`: its treatment is the
light one proposed in [ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md).
The mock-ups are not changed.

Shared header and footer are repeated in each page by hand. Each page is small;
the alternative is a templating step, and [ADR 0001](adr/0001-plain-html-css.md)
rejects that.

## Milestones

1. **Mock-up** - `mockup/option-a.html`, `option-b.html` and `option-c.html`,
   each one self-contained file with its own `<style>` and no JavaScript.
   Option C was chosen ([ADR 0010](adr/0010-adopt-option-c-bold-poster.md));
   `mockup/option-c2.html` is the reference and adds the placeholder photograph
    in `mockup/assets/`. [ADR 0007](adr/0007-warm-slate-typography-redesign.md)
    is superseded.

2. [x] **Scaffold** — directory layout, `assets/css/style.css` carrying the chosen
   mock-up's rules, shared header and footer markup for all four pages.
3. [x] **Na temat fundacji** — port the six paragraphs. Smallest page, ported first
   to validate the header/footer and stylesheet.
4. [x] **Kursy doskonalące** — port the three course articles and add the
   `#program`, `#kryteria` and `#zapisy` anchors the home page links to.
5. [x] **Strona główna** — build `index.html` from the approved mock-up: identity
   block, hero lead, the two article blocks, contact e-mail, bank account.
6. [x] **Warto odwiedzić** — build the link list from the menu sub-items.
7. [x] **Chrome** — `404.html`, favicon, page titles and meta
   descriptions, canonical and Open Graph tags, `robots.txt` and `sitemap.xml` exist in `fundacja/`.
8. [x] **Review** — responsive check at 320px, 768px and 1280px; keyboard and
   screen-reader pass; link check against the legacy URLs; recompute the
   contrast ratios in [ADR 0007](adr/0007-warm-slate-typography-redesign.md). An independent review ran twice; the final verdict was PASS WITH NOTES, with fixes applied in [ADR 0013](adr/0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md) and in `fundacja/`.
9. [ ] **Hero confirmation** — the client confirms or rejects the light hero
   ([ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md)), after a visual
    check of `fundacja/index.html` at 320px, 360px, 390px, 768px and 1280px. The
    check covers:
    - the title sizes: about 25.6px at 320px, 27.4px at 360px, 28.8px at 390px,
      45.8px at 768px, and the 51.2px cap from about 889px (risk 17);
    - the title wrapping (the soft-hyphen fix, risk 17): confirm the
      crossover where the long word stops hyphenating and sits whole on its own
      line, estimated at about 431px and not 889px, and confirm
      soft-hyphen behaviour in Chrome, Firefox and Safari, including max-content
      sizing and the U+00AD characters in copied text;
    - the mobile navigation (risk 19): the bar should be a brand line plus two
      nav rows at 320px, 360px and 390px, with a bar height of about 102px;
    - the hero accent colour (risk 18): the brand word and fact values use the
      colour the client chooses;
    and the photograph's file size (risk 15). The agents did not render it in a
    browser.

## Risks and open questions

| # | Item | Status |
| - | ---- | ------ |
| 1 | Hosting provider is not chosen. [ADR 0005](adr/0005-hosting-and-deployment.md) records the constraints but not the host. | open |
| 2 | The legacy e-mail is stored obfuscated as `biuro.psychomed(at)gmail.com`, but the real `mailto:` is `biuro.psychomed@gmail.com`. Publishing the real address invites more spam; keeping it text-only is less usable. | resolved, see [ADR 0012](adr/0012-email-shown-obfuscated-as-text.md) |
| 3 | Legacy typos: page title `Kurs psychopterapii – zapisy`, and `w dziecinie psychoterapii` in the foundation profile. Fixing them is correct Polish but changes the archived text. | open, see [ADR 0003](adr/0003-content-fidelity.md) |
| 4 | `Warto odwiedzić` is not archived; only its five menu sub-items are known. Each link may want a local description, which would be new content. | open, needs client input |
| 5 | No phone number or REGON exists anywhere in the archive. Do not add placeholders for them. | resolved: omit |
| 6 | WordPress permalinks will break. Redirects depend on the hosting choice (item 1). | blocked by item 1 |
| 7 | The landing page carries the hero lead and the card blurbs as verbatim fragments, plus six labels derived from archive words (`Fundacja · Kraków`, the three facts captions, the two card eyebrows). They read slightly less fluently than purpose-written copy. | open, see [ADR 0008](adr/0008-home-page-as-entry-point.md) |
| 8 | `Kurs psychoterapii – kryteria przyjęcia` and `Kurs psychopterapii – zapisy` are the archive titles behind the home page's `#kryteria` and `#zapisy` links. The link labels use `Kryteria przyjęcia` and `Zapisy`; the archived titles, typo included, stay on the course page. | resolved: labels only |
| 9 | The hero photograph (mockup/assets/hero-lenartowicza.jpg, from legacy/lenartowicza-crop-01.jpg) has an unknown author and licence and may not show the foundation's building. Confirm with the client before launch. | open, see [ADR 0010](adr/0010-adopt-option-c-bold-poster.md) and [ADR 0013](adr/0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md) |
| 10 | The photograph is 441x248 px, too small for a full-width hero on high-density screens. Obtain a larger licensed image. | open, see [ADR 0010](adr/0010-adopt-option-c-bold-poster.md) |
| 11 | The archive now contains image files. The project-docs skill (section 6) has been updated on 2026-10-26. [ADR 0006](adr/0006-seo-metadata-and-analytics.md) is updated (its no-`og:image` statement cites the decorative CSS photo and [ADR 0013](adr/0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md)). | resolved for the skill; ADR 0006 still proposed, to be finalised with the hosting decision |
| 12 | HTTPS for the canonical domain is undecided; canonical and sitemap use `http://` ([ADR 0013](adr/0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md)). | open |
| 13 | Filename mismatch, found 2026-11-12 and not fixed. `fundacja/assets/css/style.css` loads `url("../img/hero-lubelska.jpg")`, and `fundacja/assets/img/hero-lubelska.jpg` is the file that exists. The docs name `hero-lenartowicza.jpg`: this plan's structure tree, [ADR 0014](adr/0014-relative-paths-for-local-links-and-assets.md) (decision example), the `project-docs` skill (section 6), and the mock-up `mockup/assets/hero-lenartowicza.jpg`. The source and licence of `hero-lubelska.jpg` are not recorded in the docs, so risk 9 may apply to it too. Decide which name is correct, then align the CSS, the file and the docs in one change. | open, needs a decision |
| 14 | The light hero ([ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md)) was applied by a user-requested experiment. It is not yet confirmed by the client, and it has not been rendered in a browser. The client changed the mask from 85% to 65% opacity in the CSS, hard-coded in the `.hero` rule, so about 35% of the photograph shows. The worst case is a black photograph pixel, which composites to `#a6a6a6`. On that background, `--ink` passes at 7.73:1 and is used for all hero text. `--ink-soft` fails at 3.95:1, so it is not used for hero text. `--accent-ink` gives 3.00:1, so the decision is `--accent-deep` `#6b2410` at 4.58:1 instead. The `:root` `--accent-ink` is unchanged for other pages. The working copy does not use `--accent-deep` for the brand word and fact values; see risk 18. | open, awaiting client decision |
| 15 | `fundacja/assets/img/hero-lubelska.jpg` grew from about 320 KB to about 1.5 MB in the working tree, found in review. Its size and LCP impact are unchecked. Confirm the change is intentional, or recompress it. The source and licence are still unknown, as in risk 13. | open, needs decision |
| 16 | The `.hero__lead` `max-width: 46ch` rule is commented out in `fundacja/assets/css/style.css`. This is a user hand edit that the agents did not restore, so the lead's line length is unbounded at wide viewports. Restore it or accept the change. | open, needs decision |
| 17 | The hero title overflowed on phones because the 20-letter word `Psychobiospołecznego` could not wrap. It is fixed with soft hyphens in `fundacja/index.html`, wrapped in `<span class="hero__word">` with `.hero__word { display: inline-block }` in `fundacja/assets/css/style.css`, plus `overflow-wrap: break-word` and `hyphens: manual` on `.hero__title`. The title size was reduced on 2026-11-14 by a user hand edit to `clamp(1.5rem, .7rem + 4.5vw, 3.2rem)`: about 25.6px at 320px, 28.8px at 390px, 45.8px at 768px, and the 51.2px cap from about 889px. The smaller title means the word stays whole from about 431px upward (estimate, ±25px), not 889px. Below that it hyphenates at syllables, for example `PSY-CHO-BIO-…` at 320px, with its longest segment about 62px against 280px available. Unverified in a browser. Chrome, Firefox and Safari may treat soft hyphens as zero-width in max-content sizing. Soft hyphens appear as U+00AD in copied text. Covered by milestone 9; see [ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md). | fixed in code, unverified in browser |
| 18 | **OPEN, needs a client decision: implementation drift in the hero accent colour.** [ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md) decides that `.hero__brand` and `.hero .facts__value` use `--accent-deep` `#6b2410` (4.58:1 on the worst-case `#a6a6a6`). The working copy uses `var(--accent)` `#c2410c` instead, at about lines 100 and 103 of `style.css`, apparently a user hand edit. `--accent-deep` is declared on `.hero` but not used. `--accent` on `#a6a6a6` is about 2.13:1, which fails AA and the 3:1 large-text threshold. On `#d2d2d2` it is about 3.42:1. Choose one: restore `--accent-deep` as decided, or amend ADR 0016 to accept `--accent` and its contrast. Status stays `proposed` until then. | open, needs client decision |
| 19 | The mobile navigation was compacted on 2026-11-14 in a `@media (max-width: 40rem)` block in `style.css`: nav links 13.6px, brand 14.4px with `.12em` letter-spacing, tighter bar padding and gaps, and a `-.2rem` margin offset on the link padding so that the tap targets are about 28px tall (WCAG 2.5.8 minimum 24px) without changing the layout. At 320px, 360px and 390px the header is a brand line plus two nav rows, down from four rows at 320px, and the bar is about 102px tall (estimate, from about 180px at 320px and 121px at 360–390px). Desktop is unchanged, there is no HTML or JS change, and there is no hamburger, because a single row would need text under 8px. Open nits: the focus outline crowds the adjacent row by about 3px, and a dangling `/` separator appears at the end of row 1. Verify in milestone 9. This is a responsive tweak, not a decision, so it has no ADR; [ADR 0004](adr/0004-styling-and-accessibility.md) (rejected), which describes a vertical stack, is not the reference. | open, low priority (nits), verify in milestone 9 |

## ADR index

Maintained in full at [docs/adr/README.md](adr/README.md).
