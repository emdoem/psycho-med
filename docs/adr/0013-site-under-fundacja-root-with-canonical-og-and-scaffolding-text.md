# ADR 0013: Build the site under fundacja/ with the domain http://fundacja-psychoterapia.pl, canonical and Open Graph tags, and the archived scaffolding text

- Status: accepted (decision 1 on root-absolute paths superseded by ADR 0014)
- Date: 2026-10-26
- Note (2026-10-26): local links are relative per [ADR 0014](0014-relative-paths-for-local-links-and-assets.md).
- Note (2026-10-26): decision 1 is superseded for local links by [ADR 0014](0014-relative-paths-for-local-links-and-assets.md).
- Note (2026-10-26): the last Consequences bullet is out of date. `fundacja/` now has canonical and Open Graph tags on every page except `404.html`, plus `robots.txt` and `sitemap.xml`.
- Amends: [ADR 0006](0006-seo-metadata-and-analytics.md) (no `og:image`, for now)
  and [ADR 0010](0010-adopt-option-c-bold-poster.md) (alt text for the hero photograph)

## Context

The site is built under `fundacja/`. An independent review ran on the build and
its fixes are applied in this ADR and in `fundacja/`. The review covered the
canonical domain, Open Graph tags, the 404 page, and text that is not in the
archive.

The domain `fundacja-psychoterapia.pl` is the client's existing domain, so a
new domain is not needed. Internal links are root-absolute (`/index.html`,
`/assets/...`), as set by [ADR 0002](0002-site-information-architecture.md).
Relative links were rejected there.

## Decision

1. **Deploy root.** The site files live in `fundacja/`, which is the deploy
   root. Links are root-absolute, so the site must be served from the domain
   root.
2. **Canonical base.** The canonical URL base is `http://fundacja-psychoterapia.pl`.
   HTTPS is not decided yet and is recorded as open in the plan.
3. **Canonical and Open Graph.** Every page except `404.html` has a canonical
   link and the Open Graph tags `og:type`, `og:title`, `og:description`,
   `og:url` and `og:locale` (`pl_PL`). No `og:image` is set, because the hero
   photograph is decorative and the site has no Open Graph image.
4. **404 page.** `404.html` is `noindex`.
5. **Crawling.** `robots.txt` allows all crawling and points at `sitemap.xml`.
   `sitemap.xml` lists the four pages.
6. **Scaffolding text.** The following text is not in the archive and is
   accepted as non-archive text:
   - the 404 title and heading, and the sentence `Nie znaleziono strony o podanym adresie.`;
   - the skip link `Przeskocz do treści`;
   - the labels `Program kursu` and `Cele statutowe`;
   - the hero eyebrow, the facts captions, and the composed attribution strings;
   - the meta descriptions, which are composed from archive fragments, and the
     accepted wording of the meta descriptions.
7. **Hero photograph.** The hero photograph is a decorative CSS background. It
   carries no alt text. This corrects the alt-text expectation in
   [ADR 0010](0010-adopt-option-c-bold-poster.md).
8. **Hosting.** Hosting is not chosen. See [ADR 0005](0005-hosting-and-deployment.md).

## Alternatives considered

- **A new dedicated domain.** Rejected: the client's domain is already in use
  and carries the archive's search history.
- **Relative links.** Rejected by [ADR 0002](0002-site-information-architecture.md).
  Root-absolute links were chosen there, and this ADR depends on them.

## Consequences

- The site is correct only when it is deployed at the domain root. A subfolder
  deployment breaks the root-absolute links.
- The canonical tags, `robots.txt` and `sitemap.xml` use `http://`. They must
  be changed if HTTPS is adopted. See plan risk 12.
- The legacy `?cat=` and `?p=` URLs cannot be redirected by static hosting. The
  risk in [ADR 0002](0002-site-information-architecture.md) is unchanged.
- At the time of writing, `fundacja/` has no canonical or Open Graph tags,
  and no `robots.txt` or `sitemap.xml`. These are decided here and still to be
  added.
