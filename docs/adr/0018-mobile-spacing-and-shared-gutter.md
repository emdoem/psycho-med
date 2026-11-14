# ADR 0018: Tighten spacing below 40rem with one shared 1rem side gutter

- Status: accepted
- Date: 2026-11-14

## Context

On phones the site used the desktop spacing scale. Section, index, strip,
footer and page-head gaps came from `clamp()` minimums sized for wider screens,
so a 320px screen had a tall page and a narrow text column. The side gutters
already used the same `clamp(1.25rem, 4vw, 2.5rem)` in the header, content and
footer. They matched only because all three sit at the 20px floor below about
500px, so any change had to keep them matching.

The hero needed its own treatment, because its title and buttons form the first
screen. That is recorded in [ADR 0016](0016-light-hero-with-white-translucent-mask.md).
This ADR covers the rest of the site.

The tightening is one block at the end of `fundacja/assets/css/style.css`,
inside `@media (max-width:40rem)`. It overrides the base rules and changes no
base rule. The user has seen it in a browser and accepts it. The reviewer found
no blockers in the cascade or scope. It has not been checked on real devices;
see [plan milestone 9](../plan.md#milestones).

## Decision

Below 40rem (640px), one block tightens the spacing of every page, and all side
gutters use one value, `1rem` (16px):

- **Side gutter.** `.content`, `.bar__inner`, `.bar__nav a`, `.footer__inner`
  and `.footer__bottom` use `padding-inline: 1rem`, so the header, body and
  footer edges line up.
- **Vertical rhythm.** `.section`, `.index`, `.index__link`, `.strip`,
  `.strip__cell`, `.footer`, `.page-head` and `.prose ul` have smaller gaps and
  padding, about 20–37% less. The index number column is 48px (was 56px).
- **Contact e-mail.** `.strip__val a` has `overflow-wrap: anywhere`, so the
  address breaks inside its cell instead of overflowing at 320px.
- **Hero.** Covered by ADR 0016, not by this ADR.
- **Unchanged.** Desktop and tablet (640px and above), font sizes, colours,
  and the `clamp()` values of the base rules.

The rules that follow:

- Any new side padding below 40rem uses `1rem`, so the edges stay aligned.
- The mobile block stays after the base rules. Moving it changes the result.

## Alternatives considered

- **Change only the hero.** Rejected: the header, index and footer would keep a
  20px gutter while the hero moved to 16px, and the edges would no longer line
  up.
- **Keep the base spacing.** Rejected: at 320px the base values leave a narrow
  text column and, with the hero, a first screen of about 926px (estimate, see
  ADR 0016). The tightening was made to shorten that.
- **Rewrite the base `clamp()` values.** Not chosen: they also set the desktop
  and tablet spacing. A single override below 40rem leaves those sizes as they
  were, and the change is one block that is easy to find and revert.

## Consequences

- **Easier.** One block controls mobile spacing. The gutters are one value, so
  the header, body and footer edges align at 16px.
- **Harder.** The mobile block works by source order and overrides. A change to
  a base rule has to be checked at widths below 640px as well.
- **Narrower margins.** At 320px the text sits 16px from each edge, not 20px.
  Whether that reads well on real devices is checked in plan milestone 9.
- **Not done.** No change at 640px and above, no font or colour change, no
  change to the `.prose` measure or size, no JavaScript.
</content>
