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
| [0017](adr/0017-css-only-mobile-menu-dropdown.md) | CSS-only dropdown menu for the navigation below 40rem, with no JavaScript | proposed |
| [0018](adr/0018-mobile-spacing-and-shared-gutter.md) | Below 40rem, tighter site-wide spacing with one shared 1rem side gutter; hero specifics in ADR 0016 | accepted |

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
9. [ ] **Hero and navigation confirmation** — the client confirms or rejects the
   light hero ([ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md)) and
   the CSS-only mobile menu ([ADR 0017](adr/0017-css-only-mobile-menu-dropdown.md)),
   after a visual check of `fundacja/index.html` at 320px, 360px, 390px, 768px
   and 1280px. The check covers:
    - the title sizes: about 20px at 320px, 21px at 360px, 21.75px at 390px,
      45.8px at 768px, and the 51.2px cap from about 889px (risk 17);
     - the title wrapping (the soft-hyphen fix, risk 17): confirm that the word
       sits whole on its own line from about 288px upward (estimate, ±25px), and
       that it does not overflow at 300px (about 95% of the 268px content width,
       computed), 320px (about 89% of 288px) or 640px (about 84% of 608px). Confirm soft-hyphen
      behaviour in Chrome, Firefox and Safari, including max-content sizing and
      the U+00AD characters in copied text;
    - the mobile navigation (risk 19, ADR 0017): the header is a brand line and a
      Menu button, about 55px tall at 320px, 360px and 390px. Check with touch
      that Menu opens and closes the full-width panel under the bar. Check with
      the keyboard that Tab reaches the button, Space toggles it, and the closed
      links are skipped. Check that the panel spans the viewport width, that no
      focus ring shows on the closed state, and that the current page is marked.
      Measure the brand link's tap height;
     - the hero buttons (ADR 0016): one row from 388px and stacked full-width
       below. Measure the boundary on real devices, including iOS Safari with
       Helvetica Neue, where it may sit higher than the Arial estimate (about
       370px). Check the button height (about 40.5px) and that the labels do not
       wrap in the stacked state;
      - the hero height at 320px (ADR 0016): about 797px, down from about 926px
        (estimate, ±1 line);
      - the hero facts block (ADR 0016): at 320, 360, 390, 480, 560 and 640px the
        fact values measure about 18, 19, 19.75, 22, 27.5 and 33px, and they are
        never larger than the title (20, 21, 21.75, 24, 32 and 40px). From 641px
        the value is 33.6px. The block is about 184px tall at 320px, down from
        about 334px (estimate, not rendered). Check that the labels and values do
        not wrap or overflow, and that the value line sits within the row;
     - the mobile gutters (ADR 0018): the header brand, the content and the
       footer text start at the same 16px inset at 320px, 360px and 390px;
     - the e-mail in the contact strip at 320px (ADR 0018): it wraps inside its
       cell, about 250px of text width, with no horizontal scroll;
     - the contact strip and the footer (ADR 0018): the two strip cells stack
       below 52rem with 16px sides, and the footer columns and bottom line keep
       the same 16px sides;
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
| 17 | The hero title overflowed on phones because the 20-letter word `Psychobiospołecznego` could not wrap. It is fixed with soft hyphens in `fundacja/index.html`, wrapped in `<span class="hero__word">` with `.hero__word { display: inline-block }` in `fundacja/assets/css/style.css`, plus `overflow-wrap: break-word` and `hyphens: manual` on `.hero__title`. The title size was changed again on 2026-11-14 by a user hand edit to `clamp(1.25rem, min(max(.75rem + 2.5vw, 10vw - 1.5rem), .7rem + 4.5vw), 3.2rem)`: about 20px at 320px, 21px at 360px, 21.75px at 390px, 45.8px at 768px, and the 51.2px cap from about 889px. Below 640px it is smaller than the previous curve, `clamp(1.5rem, .7rem + 4.5vw, 3.2rem)` (25.6px at 320px). From 640px up the two are equal. The title-to-patron ratio is about 1.25 at 320px and about 2.25 at 900px. The word stays whole on its own line from about 288px upward (estimate, ±25px). The mobile gutter is 1rem (16px), so the content width is viewport − 32px. At 288px that is 256px against a word of about 255px (12.77em × 20px), so the margin at the threshold is close to zero. Earlier estimates were about 295px (with 1.25rem gutters) and 431px (with the 25.6px title). Below about 288px the word hyphenates at syllables, for example `PSY-CHO-BIO-…`. That fallback is unverified in a browser. At 320px the word is about 255px wide in a 288px content width, about 11% spare. The title clamp is a 20px floor to 320px, then `.75rem + 2.5vw` to 480px, then `10vw − 1.5rem` to 640px, then the previous curve to the 51.2px cap at about 889px. From 411px to 640px the title is smaller than word-fit needs: at 480px it is 24px, where word-fit alone would allow about 35px. The reduction is deliberate and was requested by the user. Design caveat, recorded in [ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md): at 320–390px the title is only about 1.1–1.2 times the lead text, so the hierarchy relies on the uppercase bold weight. Chrome, Firefox and Safari may treat soft hyphens as zero-width in max-content sizing. Soft hyphens appear as U+00AD in copied text. Covered by milestone 9; see [ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md). | fixed in code, unverified in browser |
| 18 | **OPEN, needs a client decision: implementation drift in the hero accent colour.** [ADR 0016](adr/0016-light-hero-with-white-translucent-mask.md) decides that `.hero__brand` and `.hero .facts__value` use `--accent-deep` `#6b2410` (4.58:1 on the worst-case `#a6a6a6`). The working copy uses `var(--accent)` `#c2410c` instead, at about lines 153 and 156 of `style.css`, apparently a user hand edit. `--accent-deep` is declared on `.hero` but not used. `--accent` on `#a6a6a6` is about 2.13:1, which fails AA and the 3:1 large-text threshold. On `#d2d2d2` it is about 3.42:1. Choose one: restore `--accent-deep` as decided, or amend ADR 0016 to accept `--accent` and its contrast. Status stays `proposed` until then. Additional reason for `--accent-deep`, from the 2026-11-14 facts compaction (ADR 0016): the fact values now run from 18px at 320px to 33px at 640px. Below about 346px they are normal text, not large text, and need 4.5:1. `--accent-deep` gives 4.58:1 on the worst case, which passes; `--accent` gives 2.13:1, and on the mid-grey pixel it passes only the 3:1 large-text threshold. | open, needs client decision |
| 19 | The mobile navigation is now a CSS-only dropdown below 40rem, decided in [ADR 0017](adr/0017-css-only-mobile-menu-dropdown.md). The links sit behind a "Menu" button (a checkbox and a label, no JavaScript), and the panel is a full-width overlay under the bar. The header is about 55px tall at 320px, 360px and 390px (estimate, not measured in a browser), down from about 102px after the 2026-11-14 wrap compaction. That compaction is removed. Desktop is unchanged. Trade-offs, recorded in ADR 0017: screen readers announce a checkbox with no expanded state; Space toggles and Enter does not; Escape and tap-outside do not close the panel; the brand link is about 30px tall, below the 44px target. The earlier nits no longer apply in the same form: below 40rem the `/` separators are removed, and the focus ring is on the button. Both are re-checked in milestone 9. | open, proposed with ADR 0017, verify in milestone 9 |
| 20 | The hero button row boundary is estimated with Arial Bold metrics. The row fits from about 370px, and the CSS puts it on one row from 388px (`style.css` line 376). The CSS comment says 388px keeps 5% spare, which is why it overstates the boundary. This is a comment nit in the code, not changed here. Helvetica Neue on iOS may wrap earlier than either figure. ADR 0016 records the behaviour. | open, verify in milestone 9 |

## ADR index

Maintained in full at [docs/adr/README.md](adr/README.md).
