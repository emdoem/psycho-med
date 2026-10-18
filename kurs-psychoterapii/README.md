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
- `src/_includes/` - layouts and header/footer (Nunjucks)
- `src/pages/` - evergreen pages
- `src/announcements/` - time-specific announcements (`/aktualnosci/`)
- `src/editions/` - course editions and schedules (`/edycje/`)
- `src/assets/css/` - `tokens.css` (design tokens, shared with the main site) and `site.css`
- `src/assets/img/` - images (uploaded through the CMS)
- `src/admin/` - Decap CMS admin UI (`/admin/`) and `config.yml`

## Client editing

The client edits content in a browser at `/admin/`. Changes are saved to git
through Decap CMS (editorial workflow). The client needs a GitHub account with
write access to the repository, unless an OAuth proxy is set up (open decision).

## Placeholders to set

1. **Decap repository** in `src/admin/config.yml`: replace `REPLACE_ME/REPLACE_ME`
   under `backend.repo` with the GitHub `owner/repo`.
2. **Decap base URL** in `src/admin/config.yml`: only needed if an OAuth proxy is
   used; set `backend.base_url` (commented out by default).

Header and footer content (`src/_includes/header.njk`, `footer.njk`) and home
page content (`src/index.njk`) are empty and marked with `TODO` comments.
