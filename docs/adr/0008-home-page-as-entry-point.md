# ADR 0008: Make the home page an entry point that links to the articles instead of printing them

- Status: accepted
- Date: 2026-10-11

## Context

The legacy home page is a WordPress category archive that flattened seven
posts into one feed. The archived home page prints the full course text, the
full foundation profile and the identity, contact and bank-account posts, in
archive order, with the course articles interleaved between the contact blocks.
The plan's "Scope by page" still lists that content for `index.html`, and
[ADR 0002](0002-site-information-architecture.md) allows the home page to carry
the foundation profile "except as a short summary".

With the landing page redesigned under
[ADR 0007](0007-warm-slate-typography-redesign.md), carrying the whole archive
text into it would rebuild the wall of text the redesign exists to replace:
about 1,400 words of course programme plus six paragraphs of foundation profile
under a hero. It would also duplicate content that [ADR 0002](0002-site-information-architecture.md)
already places once, on its page of record.

The tension is with [ADR 0003](0003-content-fidelity.md), which reproduces the
Polish text verbatim and admits no rewriting. A summary is by definition new
prose, and new prose about the foundation's work is exactly what ADR 0003
refuses.

## Decision

The home page carries no article prose. It carries:

- the identity block — full name and patron — in the hero;
- one verbatim sentence lifted from the archive as the hero lead;
- one card per article, whose heading is the archived article title and whose
  body is that article's own first sentence, copied verbatim;
- the contact e-mail and the bank account, which are data, not prose;
- the shared footer with the full identity, NIP and KRS.

All article text lives on its page of record: the three course articles on
`kursy-doskonalace.html`, the foundation profile on `na-temat-fundacji.html`.
Those pages are the porting milestones 3 and 4 in [`plan.md`](../plan.md) and
are unchanged by this ADR.

The only strings on the home page that are not in the archive are labels
derived from it, and they are listed here so they are reviewable: the hero
eyebrow `Fundacja · Kraków`, and the three facts-panel captions
(`rok rozpoczęcia działalności fundacji`, `sesji weekendowych rocznie`,
`lata kształcenia na kursie`), which number the values 1992, 10 and 4. Each
caption uses words already in the archive. Everything else on the page is
either verbatim archive text or a navigation label that ADR 0002 already
defines.

The hero facts panel is a `dl`: the number is the term, the caption the
definition, so the pairing survives a screen reader.

## Alternatives considered

- **Print the full course and foundation text on the home page.** Rejected: it
  is the legacy archive shape, and it makes the redesigned landing page
  unreadable.
- **Hand-written marketing summaries.** Rejected: new copy about the
  foundation's activity needs the foundation's approval and creates the second
  version of the truth ADR 0003 exists to prevent.
- **Excerpts cut mid-sentence.** Rejected: truncation produces broken Polish
  that reads as our typo, which is the problem ADR 0003 already tracks for the
  legacy's own misspellings.
- **A home page of navigation only, with no content at all.** Rejected: the
  page is what a search lands on, and a visitor needs one sentence of what the
  foundation is before choosing where to go.

## Consequences

- The home page becomes short — a hero, four cards and a footer — and every
  prose sentence on it is checkable against `legacy/psycho-med/`.
- `kursy-doskonalace.html` and `na-temat-fundacji.html` become the only places
  their text appears, which strengthens ADR 0002's rule that duplicated
  content is placed once.
- The course page needs the anchors `#program`, `#kryteria` and `#zapisy` for
  the hero card's three links, and `na-temat-fundacji.html` needs to exist
  before the home page is anything other than a set of dead links.
- The fragments read slightly less fluently than a purpose-written intro. That
  is the cost of fidelity, and it is accepted.
- Adding an article later means adding a card with its title and first
  sentence, not moving prose between pages.
