# ADR 0003: Reproduce the archived content verbatim with a single shared source for contact data

- Status: accepted
- Date: 2026-10-10
- Note (2026-10-26): Open question on visible e-mail display resolved by [ADR 0012](0012-email-shown-obfuscated-as-text.md) (visible text obfuscated, real address only in `mailto:`).

## Context

`legacy/psycho-med/` holds the entire corpus: three pages of archived HTML. The
site's actual output is Polish prose about psychotherapy training and the
foundation's activity. It has not changed materially since 2014 and there is no
editorial process to update it.

Any decision to "improve" the text would create a second version of the truth
with no authority behind it. At the same time, the archived markup carries
things that must not be published: obfuscated e-mail markup, duplicated
contact blocks, and empty paragraph artifacts.

Separately, the identity data (name, patron, address, NIP, KRS), the e-mail and
the bank account number appear once each in the archive, but the new site needs
them on every page.

## Decision

The Polish text is reproduced verbatim from `legacy/psycho-med/`. Not
translated, not summarised, not rewritten. Paragraph structure and lists are
preserved as they appear in the archive.

Markup is not reproduced. The following are dropped:

- WordPress metadata — publication dates, `Opublikowany … przez mmielim`,
  author links.
- `Notatka na marginesie` post-format labels.
- `Archiwum kategorii: …` headings.
- Comment links (`Odpowiedz`, `Dodaj komentarz`) and the `#comments` anchor.
- Empty `<p class="wp-block-paragraph"></p>` artifacts.
- Twenty Eleven and bbPress stylesheets, the emoji loader.

The identity and contact data is stored once, in the shared footer, and reused
by every page: full foundation name, the patronage line, address, NIP, KRS, and
the e-mail address. The bank account lives only on Strona główna, as it does in
the archive.

No placeholder is invented for data the archive does not contain — there is no
phone number and no REGON in the legacy site, so the new site has no phone
number and no REGON field.

Two items are deliberately left open rather than decided here, because they
change the text itself:

- The legacy e-mail is stored obfuscated
  (`biuro.psychomed(at)gmail.com`, wrapped in `span.gI > span.go`) while the
  real address is `biuro.psychomed@gmail.com`. The real address goes into the
  `mailto:`; whether it is also displayed visibly is an open question in the
  plan.
- The legacy page title `Kurs psychopterapii – zapisy` is misspelled, as is
  `w dziecinie psychoterapii` in the foundation profile. Correcting them edits
  the archived text, so they stay as archived until the client rules.

## Alternatives considered

- **Rewrite the copy in modern marketing language.** Rejected: no one at the
  foundation would have written or approved it, and the current copy is
  accurate and specific.
- **Translate the site into English as well.** Rejected: the audience is Polish
  mental-health professionals, and maintaining two copies of frozen text is pure
  cost.
- **Keep the obfuscated e-mail text.** Rejected: it defeats the purpose of
  publishing a contact address, and it is a Gmail copy-paste artifact rather
  than a decision anyone made.
- **Copy the contact block into every page by hand.** Rejected: it multiplies
  into four places where an NIP or account number can be typed wrong, and a
  typo in a bank account number is a real-world failure.

## Consequences

- Polish text is authoritative and checkable against the archive. Anyone can
  diff a page against its legacy source and expect it to match.
- Dropping WordPress metadata strips the site's only indication of authorship
  and date. That is acceptable for a foundation profile and a course
  description, but it does mean the archived pages are no longer citable by
  date. The plan records this trade-off.
- Because the contact data is defined in one place per page, a change to the
  bank account number still requires an edit to four files — accepted under
  [ADR 0001](0001-plain-html-css.md) precisely so this data is never
  fetched or generated.
- The retained typos are visible to Polish-speaking visitors and will look like
  our mistake rather than the archive's. Resolving this is a client decision,
  not an editorial one.
