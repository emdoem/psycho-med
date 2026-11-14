# ADR 0014: Use relative paths for all local links and assets

- Status: accepted
- Date: 2026-10-26

## Context

[ADR 0002](0002-site-information-architecture.md) and
[ADR 0013](0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md)
made local links root-absolute (`/index.html`, `/assets/...`). When a page is
opened from disk, a root-absolute path resolves to the drive root, not to the
site folder. The page then loads without its stylesheet.

All pages of the foundation site sit in one folder, `fundacja/`. Relative paths
resolve correctly from disk and at any deploy path, as long as the pages stay in
that folder.

## Decision

Local links and assets are relative to the file that contains them:

- page links: `href="index.html"`, `href="kursy-doskonalace.html#zapisy"`;
- stylesheet and icon: `href="assets/css/style.css"`, `href="favicon.svg"`;
- CSS images: `url()` is relative to the stylesheet, for example
  `url("../img/hero-lubelska.jpg")` in `assets/css/style.css`.

Absolute URLs on the domain `http://fundacja-psychoterapia.pl` stay absolute.
These are the canonical links, `og:url`, `robots.txt` and `sitemap.xml`.

## Alternatives considered

- **Keep root-absolute paths.** Rejected: pages opened from disk lose their
  stylesheet and images.
- **Absolute URLs everywhere.** Rejected: it breaks local preview and repeats the
  domain in every link.

## Consequences

- Moving a page into a subfolder requires updating the relative paths on that
  page and in the links to it.
- The site stays valid only while all pages share one folder.
- Local preview and the deployed site use the same links.
