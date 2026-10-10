---
name: project-docs
description: >-
  Use when writing, revising or reviewing anything in this repository's /docs
  folder — the general project plan, an ADR (architecture decision record), or
  the ADR index. Triggers on "/docs", "docs", "plan", "project plan", "ADR",
  "architecture decision", "decision record", "document the decision",
  "update the plan", "write an ADR". Use ONLY for /docs in this repo, not for
  README files, code comments or inline docs.
---

# Project documentation (psycho-med)

This skill owns everything under `/docs` in this repository. It covers two
artifacts:

- **`docs/plan.md`** — the general plan. One living document; the current
  truth about what we are building and where it stands.
- **`docs/adr/NNNN-slug.md`** — Architecture Decision Records. A short,
  numbered, immutable log of the decisions behind the plan.

## 1. Folder layout

```
docs/
├── plan.md               # general plan (living document)
└── adr/
    ├── README.md         # index table of all ADRs
    └── 0001-slug.md      # one file per decision
```

Do not create other files under `/docs` without adding a line to `plan.md`
explaining what it is. Do not document code in `/docs` — code comments stay in
the code.

## 2. Naming & numbering

- ADR files: `NNNN-kebab-case-slug.md`, e.g. `0003-content-fidelity.md`.
- `NNNN` is zero-padded to 4 digits and allocated sequentially. The next number
  is `(highest existing number) + 1`. If two ADRs are started in the same
  session, allocate both numbers up front so they do not collide.
- Numbers are never reused, never renumbered and never removed. If a decision
  dies, mark it `rejected`.
- The slug states the decision, not the problem: `0005-hosting.md`, not
  `0005-where-do-we-host.md`.

## 3. ADR template

Copy verbatim into every new ADR and fill in every section:

```markdown
# ADR NNNN: <decision, phrased as a statement>

- Status: proposed | accepted | superseded by ADR NNNN | deprecated | rejected
- Date: YYYY-MM-DD

## Context

What forces are in play? What problem are we solving, and what alternatives
were on the table? Two or three short paragraphs at most.

## Decision

The decision in one or two sentences, then the rules that follow from it.

## Alternatives considered

- **<option>** — why it lost. Be fair; do not straw-man it.

## Consequences

What becomes easier, what becomes harder, and what we are explicitly not doing
because of this.
```

Rules:

- One decision per ADR. If it needs the word "and" in the title, split it.
- Statuses: `proposed` (undecided or awaiting the client), `accepted`
  (in force), `superseded by ADR NNNN`, `deprecated`, `rejected`.
- Never edit the body of an `accepted` ADR to change what was decided. Write a
  new ADR and mark the old one `superseded by ADR NNNN`. Typos and format fixes
  are fine.
- An ADR is written when a decision is made, not retrofitted months later.
- ADRs are dated with today's date in `YYYY-MM-DD`.

## 4. `docs/plan.md` template

```markdown
# Psycho-med — general plan

_Last updated: YYYY-MM-DD_

## Overview

What this project is, who it is for, and what problem it solves.

## Goals

- ...

## Non-goals

Explicitly out of scope, so nobody builds them by accident.

## Scope by page

| Page | Source | Content |
| ---- | ------ | ------- |

## Tech stack

Summary only; details live in the ADRs. Link each one.

## Content source of truth

Where content comes from and which legacy file maps to which page.

## Structure

The intended file layout of the site.

## Milestones

Ordered, checkable steps.

## Risks and open questions

Unknowns, blockers, and anything awaiting a client decision.

## ADR index

| ADR | Title | Status |
| --- | ----- | ------ |
```

## 5. Writing rules

- **English.** All docs prose is English. Polish site copy is reproduced
  verbatim in Polish, never translated.
- Present tense, third person, no "we should" hedging — the plan states what
  *is*.
- Short. If a section is past a page, it belongs in an ADR.
- Never invent content. If a fact is unknown, put it under "Risks and open
  questions" instead of guessing.
- No secrets, no credentials, no tokens anywhere under `/docs`.
- Cross-link aggressively: `plan.md` links every ADR, `docs/adr/README.md`
  links every ADR, and ADRs may link each other. A broken cross-link is a bug.

## 6. Project facts (fixed reference)

These come from the archived legacy site in `legacy/psycho-med/`. Treat them as
the source of truth; do not re-derive or "correct" them without an ADR.

### Identity

| Field | Value |
| ----- | ----- |
| Full name | Fundacja dla Celów Rozwoju Podejścia Psychobiospołecznego w Medycynie |
| Brand | PSYCHOMED |
| Patron | im Prof. Jerzego W. Aleksandrowicza |
| Address | ul. Cieszyńska 14/11, 30-015 Kraków |
| NIP | 676-100-20-27 |
| KRS | 0000108086 |
| E-mail | biuro.psychomed@gmail.com |
| Bank | Fundacja „PSYCHOMED", PKO BP, 20 1020 2892 0000 5102 0153 0997 |
| Phone | not present in legacy |
| REGON | not present in legacy |
| Legacy domain | fundacja-psychoterapia.pl (WordPress, Twenty Eleven theme) |

### Pages and legacy sources

| New page | Legacy source |
| -------- | ------------- |
| Strona główna (`index.html`) | `Fundacja … PSYCHOMED.html` (home, 7 posts) |
| Na temat fundacji (`na-temat-fundacji.html`) | `Na temat fundacji _ ….html` |
| Kursy doskonalące (`kursy-doskonalace.html`) | `Kursy doskonalące _ ….html` |
| Warto odwiedzić (`warto-odwiedzic.html`) | `?page_id=44`, **not archived** — must be reconstructed from the menu sub-items |

The archived home page interleaves posts that WordPress categorised
separately: the address / contact / bank-account posts (`?p=1`, `?p=10`, `?p=15`,
"Strona główna") sit between the course and foundation posts in the flat
listing. That is a WordPress archive artifact, not an editorial order.

### Legacy menu

- Strona główna → `?cat=6`
- Na temat fundacji → `?cat=9`
- Kursy doskonalące → `?cat=10`
- Warto odwiedzić → `?page_id=44`, with sub-items (all external):
  - Kurs psychoterapii → `http://kurs-psychoterapii.pl/`
  - MCKP UJ – studia psychoterapii → `https://www.mckp.uj.edu.pl/studia/podstawy-psychoterapii/`
  - Katedra Psychoterapii UJ CM → `http://www.psychoterapia.wl.uj.edu.pl/`
  - Oddział Krakowski PTP → `http://ptp.malopolska.pl/`
  - Sekcja Naukowa Psychoterapii PTP → `http://psychiatria.org.pl/strona_zarzadu_sekcji_psychoterapii`

### Legacy branding

- Background `#e2e2e2`, page canvas white, content 80% of viewport width.
- Nav bar gradient `#0000FF` → `#00008B` (top to bottom), light text.
- Wordmark black bold ~20px, "PSYCHOMED" subtitle 16px.
- Body font: system sans stack (`"Helvetica Neue", Helvetica, Arial,
  sans-serif`). Links `#1982d1`. Headings black bold 16px in the legacy
  override.
- **No images and no logo files were ever used** — branding is text only. No
  images exist in `legacy/`, so none may be referenced.
- No forms, no comments, no sidebar, no widgets in the legacy site.

### Do not carry over

- WordPress meta: `Opublikowany … przez mmielim` dates, author lines.
- `Notatka na marginesie` post-format labels.
- `Archiwum kategorii: …` headings.
- `#comments` / `Odpowiedz` links (comments were already unused).
- Empty `<p class="wp-block-paragraph"></p>` Gutenberg artifacts.
- The Gmail-obfuscation markup (`span.gI > span.go` showing
  `biuro.psychomed(at)gmail.com`) — use a plain `mailto:` with the real
  address itemised above.
- bbPress, emoji and Twenty Eleven theme assets.

### Settled decisions

Reference these from ADRs instead of re-arguing them: plain HTML + CSS with no
build step; page set and URL scheme; content reproduced verbatim with a single
shared source for contact data; text-only legacy branding; static hosting; no
tracking.

### Open questions

Hosting provider; whether the e-mail is displayed as a `mailto:` or kept
text-only; treatment of the legacy typos (`Kurs psychopterapii – zapisy`,
`w dziecinie psychoterapii`); whether "Warto odwiedzić" also carries local
descriptions of each link.

## 7. Update workflow

1. Work out whether the change is a **decision** (stack, structure, content
   policy, styling, hosting, SEO) or a **status change**.
2. Decisions: find the next ADR number, copy the template, write it, and add it
   to `docs/adr/README.md`.
3. Edit `docs/plan.md` so it stays accurate, and bump `Last updated`.
4. If an ADR is superseded, edit the old ADR's `Status` line to point at the new
   number, and update the index.

## 8. Pre-flight checklist

Before finishing any change under `/docs`:

- [ ] Every ADR file is listed in `docs/adr/README.md` and in `plan.md`.
- [ ] ADR numbers are sequential with no gaps or duplicates.
- [ ] Every ADR has a valid `Status` and a `Date`.
- [ ] Every relative link resolves to a file that exists.
- [ ] No invented content, no secrets.
- [ ] `plan.md` `Last updated` matches today.
