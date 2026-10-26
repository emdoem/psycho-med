# ADR 0006: Minimal, hand-written SEO metadata and no analytics

- Status: proposed
- Date: 2026-10-10

## Context

The site's discoverability matters in exactly one way: someone in Poland
searching for a psychotherapy course in Kraków should be able to find it, and
then find the foundation's address, e-mail and bank details. It is a small
local audience searching for a specific institution, not a content site chasing
rankings.

The legacy site's own SEO was incidental: WordPress emitted titles, feeds and an
RSS route; there was no meta description, no sitemap submitted, no analytics
code and no social cards on any archived page.

## Decision

Search-engine and sharing metadata is hand-written, static, and minimal.

- Every page has a unique `<title>` and a unique meta description, in Polish,
  written from the page's actual content. Titles follow the pattern
  `<Page name> | Fundacja PSYCHOMED`.
- Every page has `lang="pl-PL"`, a canonical link to its absolute URL, and
  Open Graph `og:title`, `og:description`, `og:type`, `og:url` and `og:locale`
  tags. No `og:image`: the foundation site has one decorative CSS background
  photograph ([ADR 0010](0010-adopt-option-c-bold-poster.md),
  [ADR 0013](0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md)),
  and `og:image` is still not used ([ADR 0013](0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md), decision 3).
- `robots.txt` allows crawling and points at `sitemap.xml`.
- `sitemap.xml` lists the four pages with their absolute URLs, written by hand
  and updated when a page is added. A generator would be the only automated
  tooling in the repository, which [ADR 0001](0001-plain-html-css.md)
  excludes.
- `favicon.svg` is a small text-wordmark mark derived from the foundation's
  initials, so the browser tab is identifiable without shipping a raster logo.
- Semantic HTML does the rest of the work: one `h1` per page, headings in
  order, real paragraphs and lists — all of which fall out of
  [ADR 0004](0004-styling-and-accessibility.md) anyway.

**No analytics, no advertising, no third-party embeds.** No Google Analytics,
no tag manager, no cookies, no consent banner, no font CDN, no social widgets.
The site collects nothing.

## Alternatives considered

- **Google Analytics.** Rejected: the audience is a few hundred people,
  findings would not change anything, and it introduces cookies, a consent
  obligation and a third-party script on every page.
- **A privacy-respecting, cookieless analytics tool.** Rejected: still a
  third-party script and still something to explain, for numbers nobody will
  act on.
- **Schema.org structured data for the foundation** (`Organization`, address,
  `contactPoint`). Plausible and cheap; deferred, not rejected. The contact
  data is already in the footer in plain text, and structured data can be added
  later without changing anything else.
- **Server log analysis.** Rejected: depends on the host and gives the same
  non-actionable numbers as analytics.
- **A pre-rendering or SEO plugin equivalent.** Rejected: this is not a
  JavaScript single-page app. Static HTML is already the search-engine-friendly
  output.

## Consequences

- The metadata is small, in the files, and reviewable in a diff. A wrong
  description is visible in code review before it ships.
- `sitemap.xml` and the `robots.txt` entry can drift from the actual pages.
  They are on the review checklist in
  [`/docs/plan.md`](../plan.md) rather than generated.
- Absolute URLs appear in canonical tags, `robots.txt` and `sitemap.xml`, which
  hard-codes the production domain in the repository. It appears only once per
  file and is easy to change, but it must be updated if the domain ever moves.
- No consent banner, no cookie notice, no privacy policy required — the site
  sets nothing and reads nothing.
- Nothing to add later makes this harder: structured data, richer Open Graph
  tags or a sitemap generator can all be added without undoing any part of this
  decision.
