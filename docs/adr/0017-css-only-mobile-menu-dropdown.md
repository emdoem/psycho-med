# ADR 0017: Collapse the navigation into a CSS-only dropdown below 40rem

- Status: proposed
- Date: 2026-11-14

## Context

On desktop the header is one row: the brand, then the four navigation links,
each separated by a `/` (`.bar__nav`, a flex row that wraps). Below 40rem
(640px) the links wrapped onto two or three rows. At 320px the header was about
180px tall, and a compaction on 2026-11-14 brought it to about 102px (see
[plan risk 19](../plan.md#risks-and-open-questions)). The client finds even that
wrapped row takes too much vertical space on a phone and asked for a menu.

[ADR 0001](0001-plain-html-css.md) requires that no JavaScript is needed to
read any page, and the plan's non-goals exclude "any JavaScript requirement for
reading the site". [ADR 0004](0004-styling-and-accessibility.md) (rejected) and
[ADR 0007](0007-warm-slate-typography-redesign.md) both ruled out a hamburger
menu because it needed JavaScript. A menu that works without JavaScript is
therefore the constraint to meet.

## Decision

Below 40rem the navigation is hidden behind a "Menu" button. The button opens a
full-width panel under the header. The toggle is a checkbox and a label, with
no JavaScript. At 40rem and above the horizontal navigation is unchanged.

The markup is the same in the header of all five pages (`index.html`,
`na-temat-fundacji.html`, `kursy-doskonalace.html`, `warto-odwiedzic.html`,
`404.html`), as [ADR 0002](0002-site-information-architecture.md) requires for
the navigation. Only `aria-current` differs from page to page:

```html
<header class="bar">
  <div class="bar__inner">
    <a class="bar__brand" href="index.html" rel="home">PSYCHOMED</a>
    <input class="bar__toggle" type="checkbox" id="nav-toggle" autocomplete="off">
    <label class="bar__menu-btn" for="nav-toggle">Menu</label>
    <nav class="bar__menu" aria-label="Główne menu">
      <ul class="bar__nav">
        <li><a href="index.html" aria-current="page">Strona główna</a></li>
        <!-- … -->
      </ul>
    </nav>
  </div>
</header>
```

The rules that follow from it, in `fundacja/assets/css/style.css`:

- **Desktop (40rem and above).** `.bar__toggle` and `.bar__menu-btn` are
  `display: none`. The `.bar__menu` nav is a normal part of the row.
- **Mobile (below 40rem).**
  - The checkbox is visually hidden (1px, clipped) but stays focusable.
  - The label is the button: at least 44px tall, mono uppercase, with a 3px
    ink border. It fills with ink when the box is checked.
  - The focus ring is drawn on the label through
    `#nav-toggle:focus-visible + .bar__menu-btn`. The checkbox's own outline is
    suppressed.
  - `.bar` is `position: relative`. The `.bar__menu` panel is absolutely
    positioned at `top: 100%`, spans the viewport width, sits at `z-index: 10`,
    has a paper background and 3px ink rules top and bottom. It is shown only by
    `#nav-toggle:checked ~ .bar__menu`.
  - Each link row is at least 44px tall, with 1px `--hair` dividers. The current
    page is shown in the accent colour with a 3px inset accent bar. The panel
    uses the paper, ink and accent tokens of
    [ADR 0010](0010-adopt-option-c-bold-poster.md).
  - The closed panel is `display: none`, so its links are out of the tab order.
- Because the panel is part of the shared header, any change to it is made in
  all five files, as [ADR 0001](0001-plain-html-css.md) already requires for
  the header.

## Alternatives considered

- **`<details>` and `<summary>`.** Rejected. Showing the links on desktop needs
  `details::details-content`, which is not universally supported, so the
  desktop row cannot be guaranteed without a fallback.
- **A JavaScript button with `aria-expanded`.** The most accessible option: it
  gives real disclosure semantics, and Escape and clicks outside can close it.
  Rejected for now because it adds a script. That conflicts with
  [ADR 0001](0001-plain-html-css.md) and with the plan's non-goal of any
  JavaScript requirement for reading the site. It is the upgrade path, see
  Consequences.
- **Keep the wrapped row.** Rejected by the client: at 320px it takes too much
  vertical space.
- **One compact row with smaller text.** Rejected: at 320px it would need text
  under 8px to fit the four links on one line.

## Consequences

- **Easier.** The menu needs no JavaScript and nothing can break from a script
  error. The header is about 55px tall at 320, 360 and 390px, against about
  102px before. These are estimates; no browser measurement has been taken yet.
- **Screen readers.** The button is a checkbox, so it is announced as something
  like "Menu, checkbox, not checked". A checkbox cannot carry `aria-expanded`, so
  the expanded state is only conveyed by the checked state. This is expected
  from the markup but has not been checked with a screen reader.
- **Keyboard.** Space toggles the menu; Enter does not. Escape does not close it,
  and neither does a tap outside the panel. The menu closes only when the
  button is pressed again.
- **Browser state.** `autocomplete="off"` stops Firefox from restoring the
  checked state after a reload or a back navigation.
- **Tap targets.** The button and link rows are at least 44px. The brand link
  is about 30px tall, which meets WCAG 2.5.8 (24px minimum) but not 44px.
- **Pre-existing nit, not changed here.** The header and footer navigations
  share the label `Główne menu`. Two navigations with the same name are harder
  to tell apart for screen-reader users.
- **Not done.** No JavaScript, no change to the desktop row, and no
  `aria-expanded`.
- **Upgrade path.** A progressive-enhancement JavaScript button with
  `aria-expanded`, Escape and outside-click handling would need its own ADR
  amending [ADR 0001](0001-plain-html-css.md).
- **Status.** This ADR stays `proposed` until the client has seen the menu
  rendered in a browser and approved it. The browser check is in plan milestone
  9.
