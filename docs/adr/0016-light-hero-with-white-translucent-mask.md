# ADR 0016: Use a light hero with a white translucent mask and dark type on the landing page

- Status: proposed
- Date: 2026-11-13
- Revised: 2026-11-14 (title clamp updated to the working copy; wrap crossover
  corrected to about 431px; implementation drift recorded; decision text otherwise
  unchanged)
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
  - `.hero__title` uses `font-size: clamp(1.5rem, .7rem + 4.5vw, 3.2rem)`. It was
    `clamp(2rem, .9rem + 5.8vw, 4rem)` in an earlier draft of this ADR, and
    `clamp(2.1rem, 1rem + 6.5vw, 4.4rem)` in ADR 0010. The current value is a
    user hand edit made on 2026-11-14 because the title was too large on
    phones. It is recorded here as the current decision; see the
    [implementation drift](#implementation-drift-open-2026-11-14) note.
  - `.hero__patron` uses a fluid `clamp(1rem, .75rem + 1.2vw, 1.5rem)`. It was a
    fixed `.8rem`.

  Computed sizes, in px at 320 / 360 / 390 / 768 / 1280 viewport widths. The
  title reaches its 51.2px cap at about 889px:

  | Element | ADR 0010 | Earlier draft | Current |
  | ------- | -------- | ------------- | ------- |
  | Title | 36.8 / 65.9 / 70.4 (at 320 / 768 / 1280) | 32.96 / 58.94 / 64 | 25.6 / 27.4 / 28.8 (at 320 / 360 / 390), 45.8 at 768, 51.2 at 1280 |
  | Patron | 12.8 (fixed) | 16 / 21.2 / 24 | 16 / 16.3 / 16.7 at 320 / 360 / 390, 21.2 at 768, 24 at 1280 |
  | Title : patron ratio | 2.9 / 5.1 / 5.5 | 2.1 / 2.8 / 2.7 | 1.6 at 320, 2.16 at 768, 2.13 at 1280 |

  The ratio is at least 1.6 from 320px upward. Below 320px the title keeps
  falling toward its 24px floor, which applies below about 284px, while the
  patron stays at 16px. At 300px the ratio is about 1.5.
- **Unchanged.** The footer stays a dark ink band, and all other pages keep their
  styling.

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

## Implementation drift (open, 2026-11-14)

This section records a gap between the decision above and the working copy. It
does not change the decision. Only the client can resolve it.

- **Decided:** `.hero__brand` and `.hero .facts__value` use `--accent-deep`
  `#6b2410`, declared on `.hero`.
- **Working copy:** `fundacja/assets/css/style.css` sets both selectors to
  `var(--accent)` `#c2410c`, at about lines 100 and 103. This is a user hand
  edit. `--accent-deep` is still declared on `.hero` at about line 78, but no
  rule uses it.

Contrast of `--accent` in the hero, computed for this drift note:

| Pair | Ratio | Result |
| ---- | ----- | ------ |
| `--accent` `#c2410c` on `#a6a6a6` (worst case) | about 2.13:1 | fails AA normal text and the 3:1 large-text threshold |
| `--accent` `#c2410c` on `#d2d2d2` (a mid-grey pixel) | about 3.42:1 | passes 3:1 for large text only, not AA normal text |
| `--accent-deep` `#6b2410` on `#a6a6a6` | 4.58:1 | passes AA (see the table above) |

The brand word and fact values are large text at the sizes used, so the 3:1
threshold applies. Choose one of two outcomes:

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

  The word stays unbroken from about 431px upward. The estimate compares the
  word's width, ≈12.77em × the title size, with the title's content width. Below
  500px the horizontal padding is 1.25rem on each side, so the content width is
  viewport − 40px. At 431px the title is about 30.6px, the word is about 391px
  wide, and the content width is 391px. The estimate depends on font metrics and
  may vary by about ±25px. Above about 431px the word is unbroken and moves to a
  new line whole whenever it does not fit after the preceding words. Below about
  431px it hyphenates at syllable breaks, for example `PSY-CHO-BIO-…` at 320px.
  The longest segment after the fix is about 62px, against 280px available at 320px.
  This replaces the earlier estimate of about 889px, which was based on the
  superseded 4rem title cap.
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
  hero should be checked visually at 320px, 768px and 1280px, with particular
  attention to the title wrapping below about 431px, the soft-hyphen crossover, and
  to soft-hyphen behaviour in Chrome, Firefox and Safari.
- If the client rejects the treatment, this ADR is marked `rejected`, the dark
  overlay from ADR 0010 is restored, and ADR 0010 is unchanged.
- Not done: no change to the other pages, the footer, the photograph file, or the
  filename discrepancy recorded in [plan risk 13](../plan.md#risks-and-open-questions).
