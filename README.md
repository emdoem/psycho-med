# Psycho-med

Repository for two websites of the PSYCHOMED foundation (Fundacja dla Celów
Rozwoju Podejścia Psychobiospołecznego w Medycynie). The main site is a rebuild
of the foundation's WordPress site as plain static HTML and CSS. The second site,
kurs-psychoterapii, is a psychotherapy course site being rebuilt with Eleventy
(a static site generator) and Decap CMS for client editing. This repository also
holds the project plan, architecture decision records (ADRs), archived snapshots
of the original sites, and design mockups.

## Crucial entry points

- [`docs/plan.md`](docs/plan.md) - the general project plan: goals, scope,
  milestones and risks for the main site rebuild.
- [`docs/adr/README.md`](docs/adr/README.md) - the ADR index with the status of
  every decision (0001-0009).
- [`docs/adr/0009-static-site-generator-for-kurs-psychoterapii.md`](docs/adr/0009-static-site-generator-for-kurs-psychoterapii.md) -
  the proposed decision to generate kurs-psychoterapii with Eleventy and Decap CMS.
- [`kurs-psychoterapii/README.md`](kurs-psychoterapii/README.md) - usage of the
  kurs-psychoterapii site: requirements, commands, layout, placeholders to set.
- [`kurs-psychoterapii/BOUNDARIES.md`](kurs-psychoterapii/BOUNDARIES.md) - which
  content is developer-only and which the client may edit or delete in Decap.
- [`kurs-psychoterapii/.eleventy.js`](kurs-psychoterapii/.eleventy.js) - Eleventy
  configuration: input `src`, output `_site`, and passthrough copies.
- [`kurs-psychoterapii/src/`](kurs-psychoterapii/src/) - the content root:
  templates, Markdown content, CSS, images and the Decap admin UI.
- [`kurs-psychoterapii/package.json`](kurs-psychoterapii/package.json) - npm
  scripts (`build`, `start`) and the Eleventy dependency.

## Repository layout

```
psycho-med/
├── docs/            Project plan and architecture decision records (ADRs)
├── kurs-psychoterapii/  Eleventy site for the psychotherapy course
├── legacy/          Archived snapshots of the original sites (not built)
├── mockup/          Design exploration (option-a/b/c.html)
└── .opencode/       opencode configuration and project skills
```

## Quick start: kurs-psychoterapii site

Prerequisite: Node.js (LTS) and npm. Run the commands from the
`kurs-psychoterapii/` directory:

```sh
cd kurs-psychoterapii
npm install       # install dependencies
npm start         # dev server with live reload (eleventy --serve)
npm run build     # build static site into _site/
```

`_site/` is the build output and is gitignored.

## Archive and mockups

- `legacy/` holds archived snapshots of the original WordPress site and the
  Drupal 10 course site (HTML plus their assets). It is reference material only
  and is not built.
- `mockup/` holds self-contained design mockups (`option-a.html`,
  `option-b.html`, `option-c.html`). They explore design options and are not
  part of any build.
