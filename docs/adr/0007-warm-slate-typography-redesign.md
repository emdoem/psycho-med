# ADR 0007: Restyle the site in a warm slate and sand palette with a typography-led layout

- Status: superseded by ADR 0010
- Date: 2026-10-11
- Replaces: [ADR 0004](0004-styling-and-accessibility.md), which is marked
  rejected

Three mock-ups now exist under `mockup/`: `option-a.html` (this document),
`option-b.html` (light, ruled, institutional blue, left rail) and `option-c.html`
(bold poster, vermilion, monospaced labels). This ADR describes option A, which
is the leading recommendation, not a settled palette. The decision stays
`proposed` until the client picks an option, at which point a fresh ADR records
the choice and this one is marked `accepted` or `rejected`. The decision to
redesign at all, against ADR 0004, is settled; only which palette wins is open.

## Context

The legacy visual identity is a Twenty Eleven theme with a handful of custom
rules: a `#e2e2e2` canvas, a `#0000FF`-to-`#00008B` gradient nav bar, a white
canvas, 16px bold black headings, and a page 80% of the viewport wide. [ADR
0004](0004-styling-and-accessibility.md) proposed to keep that branding and fix
only the layout. The current owner asked for something more modern, which
reverses that proposal and the plan's non-goal of "any visual redesign".
ADR 0004 is marked rejected accordingly; its accessibility and responsiveness
rules are carried forward here unchanged.

The archive contains no logo, no image and no colour specification beyond the
theme defaults. The blue gradient was a WordPress default, not a brand
decision, and nothing in the corpus depends on it. At the same time nothing may
be invented to replace it — no logo, no photo, no icon — so the new look has to
be built from type, colour, spacing and CSS gradients alone.

## Decision

- **Palette.** Warm neutral rather than the legacy grey. Canvas `#f7f4ef`,
  surface `#ffffff`, ink `#1b2029` with `#4c5666` and `#68717f` as the two
  softer steps, hairlines `#e3ddd3` and `#d6cec1`. The hero and footer sit on
  a deep slate band, `#2b3648` to `#1f2836`, lit by two low-opacity sand radial
  gradients and crossed by a `repeating-linear-gradient` hairline texture.
  Sand `#e8dcc8` and `#f1e9db` are the accent steps; `#8a5a17` is the accent
  for eyebrows on light surfaces and `#7a5316` the body link colour.
- **Typography.** The legacy system sans stack is kept — no webfont, no
  download, no FOIT — but it is scaled properly: body 17px at 1.7, headings
  from `1.22rem` to `3.05rem` via `clamp()` with `-0.03em` tracking on the
  largest sizes. Headings are no longer 16px bold black throughout.
- **Layout.** A centred 1120px grid with fluid inline padding, replacing both
  the legacy `max-width: 80%` and ADR 0004's single readable column. The hero
  is a two-column band (title block and a facts panel) that collapses to one
  column below 62rem. Cards are white surfaces on warm hairlines with a 14px
  radius and a soft shadow, two across above 48rem and stacked below it.
  Prose measures are capped at 54ch inside cards, 36ch for the hero lead.
- **No imagery.** The visual anchor is typography and gradients. No image is
  referenced, no logo is invented, and the favicon stays a text wordmark as
  ADR 0006 requires.
- **Accessibility, carried forward from ADR 0004.** WCAG 2.1 AA, a visible
  focus indicator (sand on the dark band, `#8a5a17` elsewhere), a skip link,
  `header`/`nav`/`main`/`footer` landmarks, one `h1` per page, and a
  `prefers-reduced-motion` block that disables the hover and button
  transitions.
- **Responsiveness, carried forward from ADR 0004.** One stylesheet for all
  four pages. The navigation wraps onto a second line on narrow viewports
  rather than collapsing to a hamburger, which would need JavaScript and is
  excluded by [ADR 0001](0001-plain-html-css.md).

Every colour pair in use was computed against WCAG 2.1 relative luminance and
all of them clear AA for normal text. The lowest ratio on the page is 5.38:1
(`--accent` on the canvas), and the light-on-dark pairs range from 6.76:1
(`#c9c0b1`, the footer's lowest line) to 10.96:1 (sand on the deepest slate).
`--ink` on white is 16.34:1, `--ink-soft` on white 7.42:1, `--link` on white
6.83:1, `--accent` on white 5.91:1, sand on `#2b3648` 8.99:1 and `#1f2836` on
sand 10.96:1.

The ratios are computed, not asserted, and they stop being correct the moment a
colour is edited. `assets/css/style.css` carries the same custom properties as
the mock-up, so the same check has to be re-run there and is on the review
checklist in [`plan.md`](../plan.md) rather than enforced by a linter.

## Alternatives considered

- **Keep the legacy grey canvas and blue gradient bar.** Rejected: this is the
  decision being overturned, and the gradient was a theme default rather than a
  brand asset.
- **A cold blue-white palette closer to the legacy accent.** Rejected: it is
  the only legitimate claim the legacy design had to being a brand, and it
  lands back in 2005 visual territory.
- **Load a webfont** (Inter, Source Sans). Rejected: it is a third-party
  request, which [ADR 0006](0006-seo-metadata-and-analytics.md) forbids, and a
  blocking font CDN call is a poor trade for a system stack that is adequate.
- **Adopt a CSS framework** (Bootstrap, Tailwind). Rejected for the same reason
  as in ADR 0004: a handful of custom properties covers this site, and a
  framework is the build dependency [ADR 0001](0001-plain-html-css.md) excludes.
- **Ship a logo or header image.** Rejected: none exists in the archive, and
  inventing one fabricates a brand asset.
- **A dark theme.** Rejected: the slate band is a dark section on a light page
  and that is as far as the evidence goes.

## Consequences

- The site no longer resembles the legacy site, which is the point of the
  change, but it also discards the one element a returning visitor might have
  recognised: the blue nav bar.
- Palette, radius, shadow and type scale live in custom properties in the one
  shared stylesheet, so a further colour or type change remains a one-file
  edit under [ADR 0001](0001-plain-html-css.md).
- Contrast is still checked by hand. The ratios above stop being correct the
  moment a colour is edited, so the review pass in
  [`plan.md`](../plan.md) must recompute them.
- The hero and footer are the only dark surfaces. If a future page needs a
  dark section, it should reuse the same two slate stops rather than introduce
  a second dark colour.
