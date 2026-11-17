# ADR 0001: Build the site as plain HTML and CSS with no build step

- Status: accepted
- Scope: the main site (`fundacja/`) only. The kurs-psychoterapii site is built with Eleventy under [ADR 0009](0009-static-site-generator-for-kurs-psychoterapii.md), which is proposed, and this ADR does not apply to it.
- Date: 2026-10-10

## Context

The legacy site ran on WordPress: a PHP process, a MySQL database, a theme
(Twenty Eleven), a plugin (bbPress), and a feed of `?cat=N` and `?p=N`
URLs. Everything the site actually publishes is four pages of Polish prose and
a set of contact details. Maintaining a server-side stack to publish two
paragraphs of text is cost with no return.

The realistic options were:

1. **Keep WordPress.** Full CMS, but requires PHP, database, updates, backups
   and a patching obligation on a site nobody logs into.
2. **A static site generator** (Astro, Eleventy, Hugo). Nice templating, but
   adds Node or a Go toolchain, a config file, and a build step to every edit.
   The content is four pages — there is no cross-cutting metadata to justify
   it, and a maintainer who edits a page should not need `npm run build`.
3. **A single self-contained HTML file per page** with inline styles. Nothing
   to install at all, but every page repeats the whole stylesheet, and a colour
   change means editing four files.
4. **Plain HTML per page plus one shared stylesheet.** No build, no toolchain,
   no runtime, and shared styling lives in exactly one place.

## Decision

The site is plain HTML files plus a single `assets/css/style.css`. There is no
build step, no package manager, no framework, and no JavaScript required to
read any page.

The header and footer markup — site title, "PSYCHOMED" subtitle, the main
navigation and the footer with the identity and contact details — are repeated
by hand in each page. This is deliberate duplication, accepted because the
shared block is short enough to review by eye and the alternative is a
templating step.

If the duplication ever becomes the dominant cost of an edit, that is a signal
to revisit this ADR, not to add a build tool quietly.

## Alternatives considered

- **Keep WordPress.** Rejected: a database and a PHP process for four static
  pages, plus an ongoing security-update obligation for a site with no dynamic
  behaviour and no authors.
- **Astro / Eleventy / Hugo.** Rejected: the entire benefit is templating and
  content collections, and the site has four pages with no repeated metadata.
  The cost is a toolchain that the person maintaining the foundation's site
  should not have to learn.
- **Inline styles per page.** Rejected: no shared stylesheet means a branding
  change touches every file, and there is no cacheable asset.
- **A headless CMS with an API-rendered front end.** Rejected: completely
  disproportionate to four pages of unchanging text.

## Consequences

- Editing a page is editing a text file. Publishing is copying a file.
- Any static host works, including the cheapest tiers, because there is nothing
  to execute.
- Nothing can be broken by a dependency update, because there are no
  dependencies in the repository.
- The cost is manual duplication of the header/footer: a change to the
  navigation must be made in four files. This is accepted.
- No automated link checking, sitemap generation or image optimisation. Those
  are done by hand, or not at all — see [ADR 0006](0006-seo-metadata-and-analytics.md),
  where they are handled without a generator.
