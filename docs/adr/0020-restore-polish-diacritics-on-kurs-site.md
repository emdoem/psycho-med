# ADR 0020: Restore Polish diacritics on the kurs-psychoterapii site as an exception to ADR 0003

- Status: accepted
- Date: 2026-11-24

## Context

The kurs-psychoterapii content was migrated from the live Drupal site. Eight
front-matter titles and one body link label had Polish words written without
diacritics, for example `calosciowy`, `wlasna` and `osrodki stazowe`. The
navigation labels already used the live spelling, so the visible h1 and
`<title>` of those pages disagreed with the navigation.

[ADR 0003](0003-content-fidelity.md) requires Polish text to be reproduced
verbatim. Restoring the diacritics changes characters in the archived text,
so it needs a recorded decision. The owner made that decision on 2026-11-24.

## Decision

On the kurs-psychoterapii site only, ASCII-transliterated Polish words in
migrated content are restored to their correct diacritics. The scope is:

- the 8 front-matter titles, for example `Akredytowane ośrodki stażowe`,
  `Superwizja i terapia własna` and `Kraków - całościowy kurs psychoterapii`;
- one body link label, `Superwizja, terapia własna, grupa Balinta`.

The rule covers diacritics only. The following stay unchanged:

- wording and punctuation;
- typos, including `szkleniem` in `src/editions/rekrutacja_2026_27.md` and
  `Psychotrapia` in the harmonogram table (`src/editions/informacje__harmonogram.md`);
- URLs, permalink slugs and file names.

The fundacja site is not affected. ADR 0003 stays in force for everything else.

## Alternatives considered

- **Keep the transliterated spelling.** Rejected: the titles would keep
  disagreeing with the navigation and the live site, and the ASCII form reads
  as an error to Polish visitors.
- **Correct the typos at the same time.** Rejected for this decision: the owner
  limited the change to diacritics. Typos stay a client decision under
  [ADR 0003](0003-content-fidelity.md).
- **Supersede ADR 0003.** Rejected: the exception is narrow, and ADR 0003 still
  governs the verbatim rule for the rest of the content and for the fundacja site.
- **Edit the body of ADR 0003.** Rejected: an accepted ADR's decision is not
  changed in place. The status line of ADR 0003 points here instead.

## Consequences

- The titles and body label on the kurs site match the navigation and the live
  site's spelling.
- URLs do not change. Slugs keep their ASCII form, for example
  `informacje__krakow-calosciowy-kurs-psychoterapii`, so the visible title and
  the URL differ in diacritics only.
- Any further diacritics fix on the kurs site needs the owner's approval. If it
  widens the scope, it is recorded in a new ADR.
- Typos stay visible to Polish readers until the owner decides them.
- The kurs-psychoterapii session log and `kurs-psychoterapii/PLAN.md` (K-68)
  record the restoration.
</content>
