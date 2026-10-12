# Architecture Decision Records

Index of every ADR in this repository. The general plan lives at
[`../plan.md`](../plan.md); conventions for writing these documents live in the
`project-docs` skill.

| ADR | Title | Status |
| --- | ----- | ------ |
| [0001](0001-plain-html-css.md) | Build the site as plain HTML and CSS with no build step | accepted |
| [0002](0002-site-information-architecture.md) | Site information architecture | accepted |
| [0003](0003-content-fidelity.md) | Reproduce the archived content verbatim with a single shared source for contact data | accepted |
| [0004](0004-styling-and-accessibility.md) | Styling follows the legacy text-only branding, made responsive and accessible | rejected by 0007 |
| [0005](0005-hosting-and-deployment.md) | Host the site as static files on a static host | accepted |
| [0006](0006-seo-metadata-and-analytics.md) | Minimal, hand-written SEO metadata and no analytics | accepted |
| [0007](0007-warm-slate-typography-redesign.md) | Restyle the site in a warm slate and sand palette with a typography-led layout | accepted |
| [0008](0008-home-page-as-entry-point.md) | Make the home page an entry point that links to the articles instead of printing them | accepted |

## Numbering

Numbers are zero-padded to four digits and allocated sequentially — the next ADR
is `0007`. Numbers are never reused or renumbered. A superseded decision keeps
its number and is marked `superseded by ADR NNNN`; the replacing ADR is written
fresh.

## Status meanings

| Status | Meaning |
| ------ | ------- |
| `proposed` | Under discussion, not yet in force |
| `accepted` | In force |
| `superseded by ADR NNNN` | Replaced by a later decision; kept for history |
| `deprecated` | Still in force but no longer recommended |
| `rejected` | Considered and deliberately not adopted |
