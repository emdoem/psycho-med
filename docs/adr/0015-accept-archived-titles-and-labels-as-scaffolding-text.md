# ADR 0015: Accept the archived page titles and link labels as scaffolding text

- Status: accepted
- Date: 2026-10-26

## Context

[ADR 0013](0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md),
section 6, accepts scaffolding text that is not in the archive. The built pages
in `fundacja/` contain more strings of this kind: page titles, link labels,
decorative numerals and composed lines. Each one is an archived title or line,
with a prefix, a label or a separator added.

[ADR 0003](0003-content-fidelity.md) allows no new prose, so each of these
strings needs an explicit decision.

## Decision

The following strings are accepted as scaffolding text. This list extends
[ADR 0013](0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md),
section 6, without changing it:

- the page `<title>` suffix ` | Fundacja PSYCHOMED` after each page name, for
  example `Kursy doskonalące | Fundacja PSYCHOMED`;
- the home page link labels `Kryteria przyjęcia` and `Zapisy`. Both are archived
  article titles without their `Kurs psychoterapii – ` prefix (the archived
  `Kurs psychopterapii – zapisy` keeps its typo on the course page);
- the decorative numerals `01` to `05` and the arrows, marked `aria-hidden="true"`;
- the composed address line (`ul. Cieszyńska 14/11, 30-015 Kraków`) and the
  `NIP 676-100-20-27 · KRS 0000108086` line, in the footer on every page and in
  the home page contact block. Archive lines are joined with a comma or the `·`
  separator;
- the two navigation landmarks labelled `Główne menu`, one in the header and one
  in the footer.

## Alternatives considered

- **Rewrite them as archive text.** Rejected: the titles and separators cannot be
  taken verbatim without breaking the layout.
- **Remove them.** Rejected: the titles and labels are needed for navigation.

## Consequences

- The accepted scaffolding text is the list in
  [ADR 0013](0013-site-under-fundacja-root-with-canonical-og-and-scaffolding-text.md),
  section 6, plus this ADR.
- Future scaffolding text needs a new ADR or an addendum to this one.
