# ADR 0019: Copy the fundacja design tokens and port its components into kurs-psychoterapii

- Status: proposed
- Date: 2026-11-17

## Context

[ADR 0009](0009-static-site-generator-for-kurs-psychoterapii.md) builds the
kurs-psychoterapii site with Eleventy and says that visual consistency with the
main site comes from a shared CSS design-token file. The main site's visual
system is set by [ADR 0010](0010-adopt-option-c-bold-poster.md) (option C, the
bold poster direction). Its CSS lives in `fundacja/assets/css/style.css`, and
that file is the only copy of the rules.

The two sites are deployed separately, and the main site has no build step
([ADR 0001](0001-plain-html-css.md)). Nothing outside `fundacja/` can import its
stylesheet without changing how the main site is deployed. The kurs site now has
its own UI, built to mirror the main site's visual language. Its conventions are
set by [ADR 0011](0011-home-card-body-any-verbatim-sentence.md) to
[ADR 0018](0018-mobile-spacing-and-shared-gutter.md).

## Decision

The kurs site adopts the fundacja design system by copying, not by sharing a file:

- **Tokens.** `kurs-psychoterapii/src/assets/css/tokens.css` is a copy of the
  `:root` custom properties in `fundacja/assets/css/style.css` lines 1 to 15.
  Names and values are identical.
- **Sync rule.** The fundacja `style.css` is the source of truth for tokens. Any
  token change made in fundacja is copied to `tokens.css` in the same change.
  No automated check enforces this; it is a review rule.
- **Components.** Component rules are ported into
  `kurs-psychoterapii/src/assets/css/site.css` with the same class names as
  fundacja (bar, mobile menu, light hero, buttons, index list, footer,
  page-head, prose, mobile gutter). Site-specific rules are not shared.
- **Kurs-only components.** `site.css` adds components in the same visual
  language, which fundacja does not need: a section-nav aside (two columns from
  52rem, placed after the h1 on phones), scrollable table regions
  (`.table-scroll`, focusable, labelled from the nearest heading), responsive
  iframes with titles, labels for `/assets/files/` downloads, and `hyphens: auto`.
  The table-region and iframe-title fixes run at build time in `.eleventy.js`;
  the download labels are pure CSS. Public pages ship no JavaScript.
- **Navigation.** Header, section navs and footer columns are generated from one
  data file, `kurs-psychoterapii/src/_data/nav.js`. Labels are copied verbatim
  from the live Drupal menus. Templates reference entries by stable key
  (`nav.byKey`). The build fails if an internal entry names a missing source file,
  and it also fails if a listed URL is not built as a page.
- **Contact data.** `kurs-psychoterapii/src/_data/org.json` is copied from the
  fundacja footer and keeps the ADR 0012 obfuscation for the e-mail address.
- **Known deviation: root-absolute links.** The kurs site writes local links and
  assets as root-absolute paths (`/assets/...`, `/edycje/...`). This departs from
  [ADR 0014](0014-relative-paths-for-local-links-and-assets.md), which requires
  relative paths for fundacja. Relative paths would need a depth-aware filter,
  because nested permalinks such as `/edycje/<slug>/` sit at different depths.
  This deviation applies to the kurs site only, and it stays until the owner
  decides it in K-65 (see `kurs-psychoterapii/PLAN.md`). ADR 0014 is not changed.

## Alternatives considered

- **A shared CSS file served from one place.** Rejected for now. The two sites
  are deployed separately, so one of them would depend on the other's hosting.
  The fundacja site also has no build step, so it has no way to pull in a file
  from elsewhere. A shared file would be the better option if the two sites are
  later deployed from one place.
- **A shared npm package.** Rejected as overkill. It would add a publish step and
  a version pin for about fifteen custom properties and a stylesheet, and the
  main site would still need a build step to consume it.
- **Writing the kurs site's own design.** Rejected by
  [ADR 0009](0009-static-site-generator-for-kurs-psychoterapii.md)'s intent of
  visual consistency with the main site.

## Consequences

- A token change in fundacja needs a second edit in kurs. Forgetting it causes
  silent drift. The review rule is the only guard, so reviewers check it.
- The kurs site can change its own components without touching the main site,
  and fundacja needs no build step.
- The nav data file is the only place to change a header or footer label, and a
  broken entry fails the build instead of producing a dead link.
- The root-absolute links are a known deviation from ADR 0014 while K-65 is open.
- This ADR refines the phrase "shared CSS design-token file" in ADR 0009. The
  mechanism is a copy, and the tokens are not shared between the two sites.
- Not done: no shared stylesheet, no shared package, no automated token sync check,
  and no print styles.
</content>