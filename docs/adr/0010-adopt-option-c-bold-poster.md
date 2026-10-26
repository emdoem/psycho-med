# ADR 0010: Adopt the bold poster direction (option C) for the landing page, with a placeholder hero photograph

- Status: accepted
- Date: 2026-10-26
- Supersedes: [ADR 0007](0007-warm-slate-typography-redesign.md) (palette and
  layout), which is marked superseded

## Context

Three mock-ups were reviewed: `mockup/option-a.html` (warm card grid),
`mockup/option-b.html` (clinical left rail) and `mockup/option-c.html` (bold
poster). Option C is chosen. Afterwards a placeholder hero photograph was added
as `mockup/option-c2.html`, using `mockup/assets/hero-lenartowicza.jpg`, a copy
of `legacy/lenartowicza-crop-01.jpg` (441x248 px).

This contradicts [ADR 0004](0004-styling-and-accessibility.md),
[ADR 0007](0007-warm-slate-typography-redesign.md) and the plan, which all state
that the design uses no images. The archive also no longer has no images: it
now contains image files under `legacy/` (`lenartowicza-crop-01.jpg` and the
`legacy/kurs-psychoterapii/` folder). The photograph's author and licence are
unknown, and it is not known whether it shows the foundation's building at
ul. Cieszyńska 14/11.

## Decision

- **Palette and type.** The landing page follows option C: paper `#ffffff`, ink
  `#14110e`, cream `#f5f1e8`, accent vermilion `#c2410c` with hover `#9a3412`,
  and `#ea580c` for accent text and rules on the ink footer. Display type is
  oversized and uppercase. Labels use the monospaced system stack
  (`ui-monospace, Cascadia Mono, Segoe UI Mono, Consolas, Courier New`), with
  3px rules, zero border radius, a numbered article index and an ink footer.
  `text-transform: uppercase` renders the foundation name and labels in
  capitals, while the underlying text stays verbatim.
- **Photograph.** The hero may carry one photograph. The current one is a
  placeholder until a licensed, higher-resolution image is supplied. It must be
  local, with no external image hosts, per [ADR 0006](0006-seo-metadata-and-analytics.md),
  and it must carry descriptive alt text.
- **Reference.** `mockup/option-c2.html` is the reference for `docs/` and for
  the production `index.html` and `assets/css/style.css`.

## Alternatives considered

- **Option A, warm card grid.** Rejected: softer and less distinct.
- **Option B, clinical left rail.** Rejected: its blue thread back to the
  legacy site was not enough to win.
- **Option C without a photograph.** Kept as the fallback. The photograph is a
  placeholder and can be removed without changing the rest of the design.
- **A full-bleed photograph.** Rejected: the 441 px source would be badly
  upscaled.
- **Stock photography.** Rejected: rights are unknown, and the image may be an
  invented brand asset.
- **A webfont for the display face.** Rejected by [ADR 0006](0006-seo-metadata-and-analytics.md).

## Consequences

- A photograph adds a rights and resolution dependency that must be cleared
  before launch.
- Uppercase rendering and the monospaced stack vary by operating system.
- The no-`og:image` rule in ADR 0006 is revisited once a final image exists.
- Contrast pairs from option C were computed and all pass WCAG AA for their
  intended use: ink on paper 18.81:1, accent on paper 5.18:1, accent-lift on
  ink 5.29:1, cream on ink 16.69:1, accent on cream 4.59:1.
