# ADR 0011: Home page cards may quote any verbatim sentence from the article

- Status: accepted
- Date: 2026-10-26
- Supersedes: the card-body rule of [ADR 0008](0008-home-page-as-entry-point.md).
  The rest of ADR 0008 stays in force.

## Context

[ADR 0008](0008-home-page-as-entry-point.md) requires each home page card to
carry the article's own first sentence, copied verbatim. Review found that
this rule fails for post 28, the foundation profile. Its first sentence repeats
the hero lead, so the foundation card and the hero say the same thing.

Other sentences in the article are better card bodies. The rule must therefore
let the editor choose the sentence, while keeping the verbatim requirement of
[ADR 0003](0003-content-fidelity.md).

## Decision

A card body is one sentence copied verbatim from its article. The editor
chooses the sentence for each card. It must not be cut, joined or reworded.

The foundation card uses the second paragraph of post 28:

> Działalność fundacji obejmuje wspieranie aktywności osób i instytucji przyczyniających się do rozpowszechniania modelu psychobiospołecznego w medycynie.

The other rules of ADR 0008 stay in force: no article prose on the home page,
one card per article, and the card heading is the archived article title.

## Alternatives considered

- **Repeat the hero lead in the foundation card.** Rejected: the card would
  repeat the hero on the same page without adding information.
- **Keep the first-sentence rule.** Rejected: it gives the repeated sentence
  for post 28, which is the problem found in review.

## Consequences

- The choice of card sentence is an editorial decision made for each card. It
  must still be quoted verbatim, so each card stays checkable against
  `legacy/psycho-med/`.
- ADR 0008 is otherwise unchanged, so the rest of its rules still apply.
- The chosen sentence is not stored in this ADR. The card text in
  `fundacja/index.html` is the record.
