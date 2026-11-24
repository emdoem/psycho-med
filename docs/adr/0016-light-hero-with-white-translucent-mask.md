# ADR 0016: Use a light hero with a white translucent mask and dark type on the landing page

- Status: proposed
- Date: 2026-11-13
- Revised: 2026-11-14 (title clamp updated to the working copy, a second time;
  wrap crossover corrected to about 295px; hierarchy note added; implementation
  drift line references refreshed; decision text otherwise unchanged)
- Revised: 2026-11-14, third revision (mobile hero spacing and button sizes
  added; word-fit threshold moved to about 288px with the 1rem gutter; the
  site-wide mobile spacing is in [ADR 0018](0018-mobile-spacing-and-shared-gutter.md))
- Revised: 2026-11-14, fourth revision (hero facts block compacted below 40rem,
  with fluid fact values kept at or below the title; large-text note added to
  the contrast section and the drift note)
- Amends: [ADR 0010](0010-adopt-option-c-bold-poster.md) (hero treatment only;
  the rest of option C stands). ADR 0010 stays `accepted` until this ADR is
  confirmed.

## Context

The landing page follows option C ([ADR 0010](0010-adopt-option-c-bold-poster.md)),
which places one decorative photograph in the hero. The hero was previously
dark: an ink overlay over the photograph, cream text and the lifted accent
`#ea580c` for the brand word and fact values. No ADR recorded that treatment.

The client asked for an experiment: a lighter background photograph with a white
translucent mask, and typography in black or dark colours. The change is made in
`fundacja/assets/css/style.css`. The coder did not render it in a browser, and
the client has not yet confirmed that they want to keep it.

During review the client changed the mask themselves from `.85` to `.65`. The
reviewer approved the result with no blockers. The contrast figures below are
computed for the worst case: a black photograph pixel under a 65% white mask,
which composites to `#a6a6a6`. An earlier version of this ADR used `#d9d9d9`
for the 85% mask; those figures are superseded.

## Decision

On the landing page, the hero uses a light treatment:

- **Background.** A white translucent mask, `rgba(255,255,255,.65)`, over the
  decorative photograph, with `--paper` as the fallback colour. About 35% of the
  photograph shows through. The photograph is still the decorative CSS
  background described in
  [ADR 0013](0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md).
- **Text.** All hero text is dark and uses `--ink` `#14110e`. This covers the
  headings, the lead, the patron line, the eyebrow and the facts labels.
  `--ink-soft` is not used for hero text, because it fails AA on the worst-case
  background (see the table below).
- **Brand word and fact values.** These use a hero-scoped custom property,
  `--accent-deep` `#6b2410`, declared on `.hero`. It replaces `--accent-ink`
  `#9a3412`, which has no contrast margin on the worst-case background. The
  `:root` value of `--accent-ink` is unchanged and still used on the other pages.
- **Accent-lift.** `#ea580c` (`--accent-lift`) is not used for hero text on the
  light background, because it fails WCAG AA there.
- **Controls.** The ghost button is dark with an ink fill on hover, using paper
  text. Focus outlines inside the hero are ink. The facts-row rules are
  `--ink-soft`, which is a non-text colour.
- **Typography.** The hero scale is rebalanced so the title sits closer to the
  patron line:
  - `.hero__title` uses
    `font-size: clamp(1.25rem, min(max(.75rem + 2.5vw, 10vw - 1.5rem), .7rem + 4.5vw), 3.2rem)`.
    It was `clamp(2rem, .9rem + 5.8vw, 4rem)` in an earlier draft of this ADR,
    `clamp(2.1rem, 1rem + 6.5vw, 4.4rem)` in ADR 0010, and
    `clamp(1.5rem, .7rem + 4.5vw, 3.2rem)` in the previous user hand edit. The
    current value is a second user hand edit, made on 2026-11-14, that makes
    phones smaller. Below 640px it is smaller than the previous curve, and from
    640px upward it equals that curve exactly. The curve is a 20px floor up to
    320px, the `.75rem + 2.5vw` term to 480px, the `10vw - 1.5rem` term from
    480px to 640px, and then the previous curve up to the 51.2px cap at about
    889px. At 480px the title is 24px, where the previous curve gave 32.8px. It
    is recorded here as the
    current decision; see the [implementation drift](#implementation-drift-open-2026-11-14)
    note.
  - `.hero__patron` uses a fluid `clamp(1rem, .75rem + 1.2vw, 1.5rem)`. It was a
    fixed `.8rem`.

  Computed sizes, in px at 320 / 360 / 390 / 768 / 1280 viewport widths. The
  title reaches its 51.2px cap at about 889px. The title is held at its 20px
  floor below 320px:

  | Element | ADR 0010 | Earlier draft | Previous hand edit | Current |
  | ------- | -------- | ------------- | ------------------ | ------- |
  | Title | 36.8 / 65.9 / 70.4 (at 320 / 768 / 1280) | 32.96 / 58.94 / 64 | 25.6 / 27.4 / 28.8 (at 320 / 360 / 390), 45.8 at 768, 51.2 at 1280 | 20 / 21 / 21.75 (at 320 / 360 / 390), 45.8 at 768, 51.2 at 1280 |
  | Patron | 12.8 (fixed) | 16 / 21.2 / 24 | 16 / 16.3 / 16.7 at 320 / 360 / 390, 21.2 at 768, 24 at 1280 | 16 / 16.3 / 16.7 at 320 / 360 / 390, 21.2 at 768, 24 at 1280 |
  | Title : patron ratio | 2.9 / 5.1 / 5.5 | 2.1 / 2.8 / 2.7 | 1.6 at 320, 2.16 at 768, 2.13 at 1280 | 1.25 at 320, 1.29 at 360, 1.30 at 390, 2.16 at 768, about 2.25 at 900, 2.13 at 1280 |

  From 320px upward the ratio is at least 1.25. It rises to about 2.25 at 900px,
  where the title is near its cap and the patron is still scaling. Below 320px
  the title stays at 20px and the patron at 16px, so the ratio stays at 1.25.
- **Hierarchy note (a design caveat, recorded at the client's request).** At
  320–390px the title (20–21.75px) is only about 1.1–1.2 times the lead text
  (about 18px at those widths). The title therefore relies on its uppercase bold
  weight, not on size, to stand out from the lead. Review this on a device before
  accepting the hero.
- **Mobile spacing and hero buttons (below 40rem only).** The mobile block at the
  end of `style.css` tightens the hero. Its inner padding is 28px (was 40px), and
  the title, lead and actions margins and padding are about 27–33% smaller.
  The facts block is covered in the next bullet. The hero buttons (`.btn`) are smaller: font `.8rem`, letter-spacing
  `.02em`, padding `.5rem`, border 2px, gap 6.4px, `flex: 1 1 auto`, `nowrap`,
  centred text. Each button is about 40.5px tall (was about 52.7px). That is
  above the 24px minimum of WCAG 2.5.8 and below the 44px target.
  - From 388px (24.25rem) upward the two buttons share one row. The CSS comment
    gives 388px as the boundary, because the row keeps 5% spare. The row is about
    338px wide with Arial Bold metrics.
  - Below 388px they wrap into full-width stacked buttons. The reviewer estimated
    that the row fits from about 370px, so the CSS boundary is about 18px higher
    than the estimate. The coder reported that a single row does not fit at 320px
    at `.78rem` or larger.
  - The user has seen the result and accepts this behaviour. The estimates use
    Arial metrics. Helvetica Neue on iOS may wrap earlier.
  - The estimated hero height at 320px falls from about 926px to about 797px
    (about 14%, ±1 line). This is not measured in a browser.
  - The site-wide mobile spacing is in [ADR 0018](0018-mobile-spacing-and-shared-gutter.md).
- **Hero facts block (below 40rem only).** The block is the three-item list
  under the buttons (`.facts`, `.facts__row`, `.facts__value`, `.facts__label`).
  Its rules in the mobile block are:
  - `.facts` margin-top `1rem`. The base rule is `clamp(2.25rem,5vw,3.25rem)`,
    and the previous mobile value was `1.5rem`.
  - `.facts__row` padding `.5rem 0` (base `1.1rem 0`; previous mobile `.8rem 0`)
    and gap `.15rem` (base `.25rem`).
  - `.facts__value` font-size
    `max(calc(.625rem + 2.5vw), calc(6.875vw - .6875rem))` and line-height `1.1`.
    It was a fixed `2.1rem` (33.6px), kept on desktop.
  - `.facts__label` line-height `1.4`.

  The fluid size gives these values, in px, against the hero title at the
  same width (title values computed from the `.hero__title` clamp):

  | Viewport | 320 | 360 | 390 | 480 | 560 | 640 | 641 (desktop) |
  | -------- | --- | --- | --- | --- | --- | --- | ------------- |
  | Facts value | 18 | 19 | 19.75 | 22 | 27.5 | 33 | 33.6 |
  | Title | 20 | 21 | 21.75 | 24 | 32 | 40 | 40.1 |
  | Value : title | 0.90 | 0.90 | 0.91 | 0.92 | 0.86 | 0.83 | 0.84 |

  **Rule:** the facts values are never larger than the hero title, at any
  width. The ratio stays between about 0.83 and 0.92 in the mobile range.
  The value grows with the viewport and does not stay at a fixed size. The
  ratio is a computed result of the two clamps, not a separate rule in the CSS.

  Estimated facts block height at 320px, including the top margin, falls from
  about 334px to about 184px (about −45%). This is an estimate from line-height
  arithmetic with Arial-type metrics and is not rendered in a browser.
- **Unchanged.** The footer stays a dark ink band, and all other pages keep their
  colours and type. Their mobile spacing changed in ADR 0018.

The colour tokens are the ones defined in `:root`, plus the hero-scoped
`--accent-deep`. The overlay opacity is written directly in the `.hero` rule.

### Contrast on the worst-case background

Computed on `#a6a6a6` (black photograph pixel under the 65% mask):

| Pair | Ratio | Result | Use |
| ---- | ----- | ------ | --- |
| `--ink` `#14110e` on `#a6a6a6` | 7.73:1 | passes AA | all hero text |
| `--ink-soft` `#4a443d` on `#a6a6a6` | 3.95:1 | fails AA (4.5:1) | not used for hero text |
| `--accent-ink` `#9a3412` on `#a6a6a6` | 3.00:1 | zero margin | replaced in the hero |
| `--accent-deep` `#6b2410` on `#a6a6a6` | 4.58:1 | passes AA | brand word and fact values |
| `--accent-deep` on a lighter pixel, `#d2d2d2` | about 7.4:1 | passes | reference only |
| `--paper` on `--ink` (ghost button hover) | 18.81:1 | passes | hover state |
| white on `#c2410c` (primary button) | 5.18:1 | unchanged from ADR 0010 | not hero-specific |

`--ink-soft` was first used for hero text and then moved to `--ink`, because it
fails on the worst-case background. `--accent-ink` was replaced because 3.00:1
gives no margin. `--accent-deep` was chosen because it passes AA for normal
text with a small margin. This ADR does not add a rule that depends on the
mask staying at `.65`. If the mask changes, the table must be recomputed.

### Large-text note for the fact values

The fact values are bold (700), and the brand word sits in the `h1`, so it is
always large text. The fact values are large text only from a size of 18.66px
bold (14pt) upward. That is the WCAG 2.x large-scale definition, which needs
3:1 instead of 4.5:1. The fluid size reaches 18.66px at about 346px viewport
width:

- **About 346px and wider (346–390px in the table, values 18.66–19.75px).**
  Large text, 3:1 applies.
- **About 320–345px (values 18–18.66px).** Normal-size text, 4.5:1 applies.
  This is the narrowest range, and the figures for `--accent` and
  `--accent-deep` below apply there.

The 18px value at 320px is the one place where the contrast margin is
smallest. `--accent-deep` passes 4.5:1 on the worst case, with a small margin.
`--accent` fails 4.5:1 there, and on the mid-grey pixel it passes only the 3:1
large-text threshold, which the 18px value does not meet. This is one more
reason to use `--accent-deep` for the fact values. See the
[implementation drift](#implementation-drift-open-2026-11-14) note.

## Implementation drift (open, 2026-11-14)

This section records a gap between the decision above and the working copy. It
does not change the decision. Only the client can resolve it.

- **Decided:** `.hero__brand` and `.hero .facts__value` use `--accent-deep`
  `#6b2410`, declared on `.hero`.
- **Working copy:** `fundacja/assets/css/style.css` sets both selectors to
  `var(--accent)` `#c2410c`, at about lines 153 and 156. This is a user hand
  edit. `--accent-deep` is still declared on `.hero` at about line 131, but no
  rule uses it.

Contrast of `--accent` in the hero, computed for this drift note:

| Pair | Ratio | Result |
| ---- | ----- | ------ |
| `--accent` `#c2410c` on `#a6a6a6` (worst case) | about 2.13:1 | fails AA normal text and the 3:1 large-text threshold |
| `--accent` `#c2410c` on `#d2d2d2` (a mid-grey pixel) | about 3.42:1 | passes 3:1 for large text only, not AA normal text |
| `--accent-deep` `#6b2410` on `#a6a6a6` | 4.58:1 | passes AA (see the table above) |

The brand word is large text, so the 3:1 threshold applies. The fact values are
large text only from about 346px. Below that, at 320–345px, they are 18–18.66px
normal text and need 4.5:1, which `--accent` fails even on the mid-grey pixel
(see [the large-text note](#large-text-note-for-the-fact-values)). Choose one of
two outcomes:

1. Restore `var(--accent-deep)` in the two rules, as decided, or
2. Amend this ADR to accept `--accent`, and record its contrast with the
   worst-case background as a known limitation.

Until the choice is made, the status stays `proposed`.

## Alternatives considered

- **Keep the dark ink overlay.** It gives the strongest contrast margin and the
  bolder poster look of option C. It is the fallback if this ADR is rejected,
  and it was the treatment the client moved away from.
- **Keep the light hero with a lower mask opacity** so the photograph shows more.
  Not evaluated. A lower mask darkens the worst-case background, so `--accent-deep`
  and the other pairs would need a fresh contrast check.
- **Use `--accent-lift` for hero accents on light.** Rejected: it fails AA on
  the light background.
- **Use `--accent-ink` for hero accents.** Rejected: 3.00:1 on the worst-case
  background, with no margin. `--accent-deep` replaces it in the hero only.
- **Remove the photograph entirely** (the photo-free option C in ADR 0010).
  Not chosen for this experiment. It remains a fallback.

## Consequences

- The dark text meets WCAG AA for normal text in the worst case computed above.
  `--ink` has the most margin. `--accent-deep` meets AA with a small margin.
- The photograph is about 35% visible through the mask. Its contribution to the
  design is larger than the earlier 15% estimate, so the resolution and rights
  questions in plan risks 9 and 10 matter more in this treatment. They stay
  open.
- The hero no longer matches `mockup/option-c2.html`, which the plan names as
  the production reference. The mockup is not changed.
- The mask opacity is hard-coded. Any change to it needs a new contrast check.
- **Contrast decision (2026-11-24).** The owner keeps the 65% mask and chose
  per-image contrast checks before each final photograph goes live
  ([ADR 0021](0021-keep-white-mask-with-per-image-contrast-checks.md)). The table
  above is the worst case for the placeholder photograph. It does not show that a
  final image passes. This ADR's status is unchanged.
- The type rebalance and the overflow fix are part of this hero treatment and do
  not need an ADR of their own. They are not a separate decision. The fix is
  described below.
- **Overflow fix (bug fix, not a decision).** The 20-letter word
  `Psychobiospołecznego` in the uppercase bold H1 overflowed its container at
  viewports of about 320–888px, which caused horizontal scrolling. The fix has
  three parts:
  - Soft hyphens in the markup: `Psy&shy;cho&shy;bio&shy;spo&shy;łecz&shy;ne&shy;go`.
  - The word is wrapped in `<span class="hero__word">` in `fundacja/index.html`,
    and `.hero__word { display: inline-block; }` in `fundacja/assets/css/style.css`.
    As an atomic inline box, the word moves to the next line whole. With bare
    soft hyphens, the browser filled the end of a line and split the word even
    at full width.
  - `.hero__title { overflow-wrap: break-word; hyphens: manual; }`, inherited by
    the span, as a safety net.

  The word stays unbroken from about 288px upward. The estimate compares the
  word's width, ≈12.77em × the title size, with the title's content width. Below
  640px the horizontal padding is 1rem on each side (ADR 0018), so the content
  width is viewport − 32px. Below 320px the title is at its 20px floor, so the
  word is about 255px wide (12.77 × 20). The content width reaches 255px at about
  288px viewport width. At 288px there is almost no spare width, so the threshold
  depends on the metrics. The word fills about 95% of the content width at 300px,
  about 89% at 320px (11% spare) and about 84% at 640px. It stays under 90% above
  320px. The estimate depends on font metrics and may vary by about ±25px.
  Above about 288px the word is unbroken and moves to a new line whole whenever
  it does not fit after the preceding words. Below about 288px it hyphenates at
  syllable breaks. This fallback is not verified in a browser. This replaces the
  earlier estimates of about 295px (with 1.25rem gutters) and about 431px (based on the 25.6px title), and the
  estimate of about 889px, which was based on the superseded 4rem title cap.
  The fix is not verified in a browser. Chrome, Firefox and Safari may treat soft
  hyphens as zero-width in max-content sizing, and `overflow-wrap: break-word`
  does not shrink the box below the longest syllable segment. Soft hyphens also
  appear as U+00AD in copied text.
- **Non-breaking space.** The patron line uses `W.&nbsp;Aleksandrowicza`, so the
  initial does not end a line on its own.
- **Lead line length.** A user hand edit comments out `.hero__lead { max-width: 46ch; }`
  in the CSS. The line length of the lead is therefore unbounded at wide
  viewports. The agents did not restore it; see [plan risk 16](../plan.md#risks-and-open-questions).
- **Image file size.** `fundacja/assets/img/hero-lubelska.jpg` grew from about
  320 KB to about 1.5 MB in the working tree. This affects the page's load time
  and LCP. It is an open issue, tracked as [plan risk 15](../plan.md#risks-and-open-questions).
- The coder did not render this in a browser. Before this ADR is accepted, the
  hero should be checked visually at 320px, 768px and 1280px, and the facts
  block at 320px, 360px, 390px, 480px, 560px and 640px, with particular attention
  to the value sizes against the title and to the title wrapping below about 288px, the soft-hyphen crossover, the hero button row and stacking boundary (about 370px to 388px, estimated), and
  to soft-hyphen behaviour in Chrome, Firefox and Safari.
- If the client rejects the treatment, this ADR is marked `rejected`, the dark
  overlay from ADR 0010 is restored, and ADR 0010 is unchanged.
- Not done: no change to colours, type or the photograph file on the other pages
  or the footer (their mobile spacing is in [ADR 0018](0018-mobile-spacing-and-shared-gutter.md)),
  and no fix for the filename discrepancy recorded in [plan risk 13](../plan.md#risks-and-open-questions).
