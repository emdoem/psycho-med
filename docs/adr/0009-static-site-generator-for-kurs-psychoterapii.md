# ADR 0009: Static site generator for the kurs-psychoterapii site

- Status: proposed
- Date: 2026-10-18
- Revised: 2026-11-24 (Decap login decision recorded in Consequences and Open
  questions; status unchanged)

## Context

The repository holds a second website, kurs-psychoterapii, a Polish-language
course and training site. It is a Drupal 10 site, snapshotted at
`legacy/kurs-psychoterapii/`, and is being rebuilt. Its content is almost
entirely prose and links, and much of it is time-specific: announcements, course
schedules and recruitment that change every year.

The client edits text only and is not a developer. Any structural change goes
through a developer. The client prefers to keep the existing server for hosting.
The two sites stay separate, but they share a client, a server, and an eventual
visual consistency. Neither site needs forms, authentication or payments.

[ADR 0001](0001-plain-html-css.md) forbids a templating step and hand-duplicated
header and footer for the main site. That constraint does not apply here.

## Decision

Generate the kurs-psychoterapii site with Eleventy (11ty). Content is Markdown,
and layouts are Nunjucks templates. This applies to this site only.

Decap CMS serves a git-based admin UI at `/admin`, so the client can edit the
Markdown collections in a browser. Decap commits its changes to git.

Visual consistency with the main site comes from a shared CSS design-token file,
not from shared tooling. The main site keeps its plain HTML approach unchanged.

## Alternatives considered

- **Hugo** — a single binary with Go templates. Fair option, but less familiar
  to the people maintaining the site.
- **Astro** — a component framework. Capable, but it is more than prose pages
  need.
- **Jekyll** — mature, but older and slower to build.
- **Plain HTML, as on the main site** — rejected. Header and footer would be
  duplicated by hand across many time-specific pages, which is not acceptable
  for how often this content changes.

## Consequences

- Node.js and npm become build dependencies of this site only.
- A build step runs before deployment. Its output is plain static files in
  `_site/`, which can be uploaded to the existing server.
- Decap needs a git backend. **Owner decision (2026-11-24):** the client agrees
  to have a GitHub account, so the Decap GitHub backend is used directly for
  login. The OAuth proxy is not needed for login itself.
- **Open infrastructure item, not resolved:** on a host that is not Netlify, the
  GitHub backend still needs an OAuth app and a handler to complete login. Server
  details are pending from the owner.
- [ADR 0001](0001-plain-html-css.md) is superseded for this site only. Its
  constraints remain in force for the main site.
- The main site's plan rule "no build toolchain" must be scoped to the main
  site. This is a required follow-up to `docs/plan.md`.

## Open questions

- Decap login: the GitHub backend is chosen (decided 2026-11-24, client has a
  GitHub account). Still open: the OAuth app and handler needed to complete login
  on a non-Netlify host, pending the owner's server details.
- Can the existing server run a deploy step, or does it only accept uploads?
