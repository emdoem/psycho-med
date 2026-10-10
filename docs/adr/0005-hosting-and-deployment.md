# ADR 0005: Host the site as static files on a static host

- Status: proposed
- Date: 2026-10-10

## Context

The site is four HTML files, one stylesheet, a favicon, `robots.txt` and a
`sitemap.xml` — under a megabyte in total, all of it text. There is no server
code of any kind ([ADR 0001](0001-plain-html-css.md)). It can be served by
anything, which means the choice is about cost, longevity and who can deploy.

The legacy site was hosted on a PHP-capable host, which the foundation no longer
needs. Whoever maintains the site edits files and should be able to publish
without an operations runbook.

## Decision

The site is hosted on a static host. The constraints the choice must satisfy:

- Serves plain files from the repository root with no rewrite rules required
  (the `.html` extensions in [ADR 0002](0002-site-information-architecture.md)
  depend on this).
- Supports HTTPS with a certificate that is renewed automatically.
- Serves `404.html` as the not-found page.
- Costs nothing at this traffic level.
- Deploys by publishing the repository, ideally on push, so a deploy is a
  `git push` and nothing else.

The repository is the deployment artifact: whatever is committed on the default
branch is what is live. There is no separate build, no staging environment and
no release process.

Deploying is out of band with committing — a deploy is triggered by a push to
the default branch, not by any per-change action.

**The specific host is not chosen.** This ADR fixes the constraints above, not
the vendor. Naming one is recorded as an open question in the plan; the likely
candidates — GitHub Pages, Cloudflare Pages, Netlify — all satisfy every
constraint here, and the choice between them does not change any other decision
in this document. Whichever is picked must be written down in a new ADR.

## Alternatives considered

- **Keep the current PHP host.** Rejected: paying for a PHP process to serve
  text files, and inheriting an update obligation for nothing.
- **A VPS with nginx.** Rejected: introduces an operating system, an SSH key
  rotation policy and a deployment procedure, for a site with four pages.
- **Object storage behind a CDN.** Rejected: more moving parts and a billing
  relationship, for the same outcome as a static host at free-tier prices.
- **Self-hosted from the foundation's own premises.** Rejected: uptime and
  certificate renewal become the foundation's problem.

## Consequences

- Publishing is a push. No build, no deploy command, no credentials to rotate.
- HTTPS and `404.html` are host features we get for free but do not control;
  the chosen host must be checked against those two requirements before it is
  adopted.
- Because the repository is the deployment artifact, an accidental commit to the
  default branch is immediately live. Mitigation is code review on the default
  branch, not tooling.
- Legacy `?cat=N` URLs will land on the host's 404 page. Redirects from those
  URLs would need host-level rules, which is another check when choosing the
  vendor and another open item in the plan.
- The hosting decision is deliberately unresolved; it will be closed with an ADR
  that supersedes the constraints here, not by quietly picking a vendor.
