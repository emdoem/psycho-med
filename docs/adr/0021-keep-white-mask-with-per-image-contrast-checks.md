# ADR 0021: Keep the 65% white mask over photographs and check text contrast per image before it goes live

- Status: accepted
- Date: 2026-11-24

## Context

Both sites put a 65% white translucent mask over a photograph: the fundacja
landing hero ([ADR 0016](0016-light-hero-with-white-translucent-mask.md)) and the
kurs-psychoterapii home hero and section backgrounds
([ADR 0019](0019-kurs-site-copies-fundacja-design-tokens.md)).

In the worst case, a black photograph pixel under the mask composites to
`#a6a6a6`. On that background the accent links `#c2410c` measure about 2.1:1 and
the ink-soft `#4a443d` labels about 3.9:1, both failing WCAG AA. At an average
pixel the accent links measure about 3.6:1. Body text `#14110e` passes at about
7.7:1. These figures are from [plan risk 23](../plan.md#risks-and-open-questions).

The photographs in use are placeholders. The owner has not yet supplied the final
images, so the real worst case is not known.

## Decision

The owner chose to keep the current 65% white mask on both sites. There is no
CSS change now. Each photograph is checked before it goes live:

- Text placed over the masked image is checked against the image: accent links
  `#c2410c`, ink-soft `#4a443d` labels, and body text.
- Normal text needs a contrast ratio of at least 4.5:1. Large text needs at least
  3:1.
- An image that fails is not published as it is. The owner decides the fix, for
  example a stronger mask on that image or a different image.

The check is manual. Its results are recorded in the kurs-psychoterapii plan
(K-79).

## Alternatives considered

- **A stronger mask.** It would give more margin on dark photographs. It would
  also hide more of the photograph, which is the reason for the light hero. Not
  chosen now. It remains the fix for an image that fails the check.
- **A solid light panel behind the text.** It would guarantee contrast on any
  image. It changes the hero design, which the owner did not want to change now.
- **Accept the worst case without a check.** Rejected: the worst case fails AA
  for the accent links and the ink-soft labels.

## Consequences

- No CSS, template or config change. The 65% opacity stays hard-coded in the
  `.hero` rule in fundacja and in the kurs site's hero and section background
  rules.
- The contrast figures in ADR 0016 are for the worst case with the placeholder
  images. They do not prove that a final image passes. Each final image needs its
  own check.
- The check applies to the fundacja hero and to every kurs-psychoterapii photo
  background, home and inner pages.
- A change to the mask opacity is not covered by this ADR. It needs a new contrast
  check and, if the rule changes, a new ADR.
- Plan risk 23 stays open until the per-image checks are done for the final
  images.
- This ADR does not decide the fix for an image that fails. That is an owner
  decision when it happens.

## Related

- [ADR 0016](0016-light-hero-with-white-translucent-mask.md) — light hero and the
  contrast table it records.
- [ADR 0019](0019-kurs-site-copies-fundacja-design-tokens.md) — kurs-psychoterapii
  hero and section backgrounds.
