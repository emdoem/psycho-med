# kurs-psychoterapii

Static website for the psychotherapy course, built with
[Eleventy](https://www.11ty.dev/) (v3) from Markdown content and Nunjucks
templates. The build outputs plain static HTML/CSS in `_site/`, which can be
uploaded to any static web server.

This site is separate from the main site in this repository. It is a standalone
project in this folder. See `docs/adr/0009-static-site-generator-for-kurs-psychoterapii.md`.

## Requirements

- Node.js (LTS) and npm

## Commands

```
npm install   # install dependencies (Eleventy only)
npm start     # local dev server with live reload
npm run build # build static site into _site/
```

## Layout

- `src/` - site source (Eleventy input)
- `src/_includes/` - Nunjucks templates:
  - `base.njk` - the HTML shell (skip link, header, `<main id="main">`, footer)
  - `page.njk` - layout for pages, editions and announcements (page head, section nav, prose)
  - `header.njk`, `footer.njk` - built from `src/_data/nav.js`
- `src/_data/` - shared data:
  - `nav.js` - header, section navs and footer columns. Labels are verbatim from the live menus. A missing target file fails the build.
  - `org.json` - foundation name, address, identifiers and e-mail, copied from the main site footer. The e-mail is obfuscated as text.
  - `site.json` - site name, language and default description
- `src/index.njk` - home page
- `src/pages/` - evergreen pages
- `src/announcements/` - time-specific announcements (`/aktualnosci/`)
- `src/editions/` - course editions and schedules (`/edycje/`)
- `src/assets/css/` - `tokens.css` and `site.css`. `tokens.css` is a copy of the custom properties in `fundacja/assets/css/style.css` (lines 1 to 15). Keep it in sync: a token change in the main site must be copied here in the same change. See `docs/adr/0019-kurs-site-copies-fundacja-design-tokens.md`.
- `src/assets/img/` - images (uploaded through the CMS)
- `src/assets/files/` - downloadable files (currently the recruitment questionnaire). These are time-specific and client-replaceable: replace them when the form changes. Decap has no collection for this folder yet.
- `src/admin/` - Decap CMS admin UI (`/admin/`) and `config.yml`

## Client editing

The client edits content in a browser at `/admin/`. Changes are saved to git
through Decap CMS (editorial workflow). The client needs a GitHub account with
write access to the repository, unless an OAuth proxy is set up (open decision).

## Placeholders to set

1. **Decap repository** in `src/admin/config.yml`: `backend.repo` is set to
   `emdoem/kurs-psychoterapii-content`. The owner must confirm this is the intended
   repository. The file still has its PLACEHOLDER comment.
2. **Decap base URL** in `src/admin/config.yml`: only needed if an OAuth proxy is
   used; set `backend.base_url` (commented out by default).

Header and footer labels come from `src/_data/nav.js`, so change them there, not
in the templates. Canonical and Open Graph tags are still a `TODO` in
`src/_includes/base.njk` (see `PLAN.md`, K-61).
