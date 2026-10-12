# ADR 0004: Styling follows the legacy text-only branding, made responsive and accessible

- Status: rejected
- Date: 2026-10-10
- Superseded by: [ADR 0007](0007-warm-slate-typography-redesign.md), 2026-10-11.
  This decision was proposed and then rejected in favour of ADR 0007; the
  accessibility and responsiveness rules below are carried forward there.

## Context

The legacy site's visual identity is unusually minimal. It used the Twenty
Eleven theme modified with a handful of custom rules: a white page on a
`#e2e2e2` background, a navigation bar with a blue gradient, a black bold text
wordmark with "PSYCHOMED" beneath it, a system sans-serif font, and 16px bold
black headings. There are no images anywhere in the archive — no logo, no
header image, no photos, no icons. The branding is entirely typographic.

The one part of that design that does not survive is the layout: the page was
`max-width: 80%` of the viewport, which on a phone produces a narrow column of
very large text inside a wide grey margin, and a desktop-width text column
elsewhere.

So the question is how much of the legacy look is normative and how much is
inertia, and what to do about the layout.

## Decision

Keep the legacy branding, fix the layout. Specifically:

- **Colour.** Page background `#e2e2e2`, content surface white. Navigation bar
  gradient `#0000FF` to `#00008B` top to bottom with light link text. Body text
  `#373737`, links `#1982d1`. Headings black and bold.
- **Typography.** System sans-serif stack — `"Helvetica Neue", Helvetica,
  Arial, sans-serif` — no webfont download, matching the legacy site.
- **Wordmark.** Foundation name in black bold at roughly 20px, "PSYCHOMED" as
  the subtitle at 16px, text only. A favicon derives from the wordmark.
- **Layout.** Content column with a readable max-width (roughly 70 characters)
  centred on the page, with fluid padding below that on small screens. Full
  width replaces the legacy `80%` rule.
- **Responsive.** One stylesheet. The navigation collapses to a vertical stack
  on narrow viewports rather than a horizontal row or a hamburger that needs
  JavaScript (excluded by [ADR 0001](0001-plain-html-css.md)).
- **Accessibility.** WCAG 2.1 AA is the bar: contrast checked against the
  palette above, a visible focus indicator, a skip link to the main content,
  landmarks (`header`, `nav`, `main`, `footer`) and a single `h1` per page.
  The nav gradient is dark enough that white text passes AA at 16px and above;
  link colour `#1982d1` on white passes AA for body text.

Because there are no images, there is no image strategy, no `alt` text to write
except for the favicon and wordmark, and no lazy-loading or responsive-images
problem to solve. Nothing that does not exist may be referenced.

## Alternatives considered

- **Pixel-exact reproduction of the legacy layout, `80%` width included.**
  Rejected: it is unreadable on a phone, and the site is read on phones.
- **A full redesign with a new brand palette.** Rejected by
  [ADR 0007](0007-warm-slate-typography-redesign.md): the blue gradient was a
  WordPress theme default rather than a brand asset, and the corpus contains no
  image, logo or colour specification that a palette change could violate.
- **Adopt a CSS framework** (Bootstrap, Tailwind). Rejected: a handful of rules
  covers this site, and a framework is exactly the build/toolchain dependency
  [ADR 0001](0001-plain-html-css.md) excludes.
- **Ship a logo image.** Rejected: none exists in the archive. Inventing one
  would be fabricating brand assets.
- **A dark theme.** Rejected: no evidence anyone wants it, and it doubles the
  palette work.

## Consequences

- Zero image requests: the fastest possible static page and no asset hosting
  burden.
- The site looks deliberately plain, and slightly dated next to a modern
  foundation site. That is the cost of fidelity, and it is accepted.
- One stylesheet is shared by all four pages, so any colour or typography
  change is a one-file change.
- No webfont means no privacy question, no blocking request, and no
  Flash-of-invisible-text.
- Accessibility is maintained by hand: there is no automated contrast linter,
  so it has to be checked at review time.
