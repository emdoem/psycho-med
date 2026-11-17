# kurs-psychoterapii - working plan

Working plan for the course site (`kurs-psychoterapii/`). Pick items by ID across
sessions. Tick `[x]` when the acceptance criterion is met and verified.

Legend:
- **Owner:** `dev` = developer can do it alone; `owner-decision` = needs a decision or input from the site owner first.
- **Status:** `open`, `blocked` (waits on another ID), `deferred` (owner said not now), `done`.
- Source notes: `BOUNDARIES.md` (content rules), `README.md` (commands, layout), `docs/` in the main project is NOT edited from here.

---

## 1. Status snapshot (2026-11-07)

**Stack**
- Eleventy 3.x (`@11ty/eleventy` ^3.1.7; build run with v3.1.7). Input `src/`, output `_site/`.
- Templates: Nunjucks (`src/_includes/base.njk`, `page.njk`, `header.njk`, `footer.njk`; `src/index.njk`). Navigation and foundation data in `src/_data/`.
- Output: plain static HTML/CSS in `_site/`. No client-side framework.
- Decap CMS 3.17.1, pinned in `src/admin/index.html` with an SRI hash. Backend config in `src/admin/config.yml` (repo is `emdoem/kurs-psychoterapii-content`, to be confirmed in K-72; login model still open, K-41).
- Passthrough copy: `src/admin`, `src/assets/css`, `src/assets/img`, `src/assets/files`.

**Migrated content**
- Home page: light hero, announcements list and index (`src/index.njk`). Header, footer and inner-page layout (`page.njk`) are built from `src/_data/nav.js` (2026-11-17).
- 8 evergreen pages in `src/pages/` (permalink `/<slug>/`).
- 8 editions in `src/editions/` (permalink `/edycje/<slug>/`), including the Lublin edition (moved from `src/pages/` to `src/editions/`, year still unknown).
- 1 announcement in `src/announcements/` (`/aktualnosci/...`) plus 3 downloadable recruitment files in `src/assets/files/` (`ankieta_rekrutacja.doc`, `.docx`, `.zip`). The brief counted "3 announcement/asset files"; the actual count is 1 announcement + 3 files.
- Live archive of the 16 old routes: `legacy/kurs-psychoterapii/live/` (16 HTML files) plus the home page (`Strona powitalna _ KURS PSYCHOTERAPII.htm`).

**Build**
- `npm run build` passes (exit 0, clean `_site/`, 19 HTML pages written).
- Remaining `#TODO-route` placeholders: 3 links in 3 files (see K-26).

**Not yet decided**
- Header and footer labels (D-03), design tokens (D-04), home sections (D-05), URL scheme and server type (K-04, D-01, D-02), Decap repo and auth, dates and years (section 8).

---

## 2. Phase 1 - Structure and layout (CURRENT FOCUS)

Owner has put Phase 1 first. Items K-01 to K-07 are the active list.

- [x] **K-01** Header nav labels decided and rendered in `src/_includes/header.njk`
  - Status: done 2026-11-17. Labels are verbatim from the live menus and come from one list, `src/_data/nav.js`. Owner to confirm them (D-03).
  - Acceptance: header renders the decided nav labels from one list; the `TODO` comment is removed. Met.
  - Note: label conflicts are listed in K-14 and D-07 ("Rekrutacja 2025/26" vs "Rekrutacja 2026/27").

- [x] **K-02** Footer text decided and rendered in `src/_includes/footer.njk`
  - Status: done 2026-11-17. Three columns as in fundacja. Foundation data is in `src/_data/org.json`, copied from the fundacja footer. Owner to confirm (D-03). No analytics.
  - Acceptance: footer contains the decided text; no `TODO` comment; no cookie or analytics code. Met.

- [x] **K-03** Base layout finished in `src/_includes/base.njk`
  - Status: done 2026-11-17. `base.njk` (skip link, header, `<main id="main">`, footer) with `page.njk` for pages, editions and announcements. `lang="pl-PL"` as fundacja. Canonical and Open Graph left as a TODO (K-61).
  - Acceptance: every page uses the layout with header and footer; `<title>` and `<meta description>` are set; one `<h1>` per page. Checked on 19 HTML outputs. HTML5 validator not run.
  - Dependencies: K-01, K-02 for final content.

- [ ] **K-04** URL scheme decided (see section 5, D-01 and D-02)
  - Status: open. Owner: owner-decision.
  - Acceptance: owner picks option A, B or C in writing and names the server type; the choice is recorded in this file (section 5) and the next items are unblocked.

- [ ] **K-05** Navigation design (structure, active state, mobile behaviour)
  - Status: structure and mobile menu built 2026-11-17 (`src/_data/nav.js`, CSS-only menu per ADR 0017). Still blocked by K-04 for the URL scheme. Owner review and a browser check at 375px and 1280px are open.
  - Acceptance: nav structure is in `src/_data/nav.js` and matches the chosen URL scheme; each nav link resolves to a `200` page in `_site/`. The build fails on a missing target (checked by breaking one entry).

- [ ] **K-06** Design tokens final (`src/assets/css/tokens.css`)
  - Status: open. Owner: owner-decision (brand values). 2026-11-17: tokens are now fundacja's set (same names and values, `tokens.css` header says so). ADR 0007 is proposed in the main project and not accepted yet.
  - Acceptance: tokens.css values are final, or ADR 0007 is accepted and the file references it; `site.css` uses only tokens (no hard-coded colours or fonts). Met for `site.css` on 2026-11-17: no hard-coded colours or font stacks, only tokens.
  - Note: tokens.css is a copy of `fundacja/assets/css/style.css` lines 1 to 15, not a shared file. A token change in fundacja must be copied here in the same change (ADR 0019). Nothing checks this automatically.

- [x] **K-07** Home page layout (`src/index.njk`)
  - Status: done 2026-11-17. Light hero (ADR 0016) with the C1 lead and its link, three buttons, announcements list, four-card index (Program, Kadra, Rekrutacja, Harmonogram). C4 is not rendered (D-05 still asks the owner to confirm). The landing link target is K-40.
  - Acceptance: the home page has the decided sections; C1 intro is kept. Met for C1; C4 is pending per owner.

Phase 1 follow-ups (left open by the 2026-11-17 build):

- [ ] **K-60** Heading for the home announcements block
  - Status: open. Owner: owner-decision. The source has no verbatim label, so none is shown (TODO in `src/index.njk`).
  - Acceptance: a verbatim label is chosen, or the block stays unlabelled and the TODO is removed.

- [ ] **K-61** Canonical link and Open Graph tags in `src/_includes/base.njk`
  - Status: blocked by K-04 (URL scheme and domain). Owner: owner-decision, then dev.
  - Acceptance: every page has a canonical link and `og:` tags; the TODO comment is removed.

- [ ] **K-62** Hero photograph
  - Status: open. Owner: owner-decision (supply a photograph of at least about 1200 px wide). The current `KatedraPsychoterapiiUJCM_2QOY.jpg` is 441 x 332 px, so the hero has no background image. The inline image was removed from the home page.
  - Acceptance: a licensed image of at least about 1200 px is supplied, or the hero stays on paper and the decision is recorded.

- [ ] **K-63** Kadra card body on the home page
  - Status: open. Owner: owner-decision (ADR 0011). The body is "Kierownik szkolenia: Dr Krzysztof Tokarz", a fragment joined from two lines of the Kadra page, because the page has no full verbatim sentence.
  - Acceptance: the owner picks a verbatim sentence, or accepts the fragment.

- [x] **K-64** Skip-link wording
  - Status: done 2026-11-17. Both sites read "Przeskocz do treści" (checked by decoding `fundacja/index.html` as UTF-8).
  - Acceptance: both sites use the same wording. Met.

- [ ] **K-65** Relative or root-absolute paths
  - Status: open. Owner: owner-decision. Kurs templates use root-absolute `/assets/...` and `/edycje/...` links. ADR 0014 requires relative paths for fundacja. With nested permalinks (`/edycje/<slug>/`), relative paths would need a depth-aware filter.
  - Acceptance: decision recorded in ADR 0009 or a new ADR; templates match it.

- [ ] **K-66** Visual checks not yet done
  - Status: open. Dev. Screenshots (headless Edge, 375 px and 1280 px) are in `.screens/`. Google Docs iframes stayed blank (no internet), so the harmonogram embeds are not checked. Test on real phones, and check the Lublin and superwizja pages and the 1280 px home page.
  - Acceptance: owner or dev confirms the embeds, the 375 px table scroll and the header menu on a real device.

- [ ] **K-67** Announcement date display
  - Status: blocked by K-42. The date branch in `src/index.njk` is untested with a real date. Sorting puts undated items last, and no "Invalid Date" appears in the current build.
  - Acceptance: once K-42 sets the date, the list shows it as `dd.MM.yyyy` and the output has no `Invalid Date`.

Review follow-ups (2026-11-17 review, no blockers; should-fix items were fixed, see the session log):

- [ ] **K-68** Transliterated titles (8 front-matter titles, owner decision)
  - Status: open. Owner: owner-decision. The titles are ASCII-transliterated, while the nav labels use the live Polish spelling. The visible h1 and the `<title>` come from the front matter, so they show the ASCII form.
  - Files, current → live verbatim:
    - `src/pages/informacje__akredytowane-osrodki-stazowe.md`: "Akredytowane osrodki stazowe" → "Akredytowane ośrodki stażowe"
    - `src/pages/informacje__krakow-calosciowy-kurs-psychoterapii.md`: "Kraków - calosciowy kurs psychoterapii" → "Kraków - całościowy kurs psychoterapii"
    - `src/pages/informacje__superwizja-i-terapia-wlasna.md`: "Superwizja i terapia wlasna" → "Superwizja i terapia własna"
    - `src/editions/informacje__krakow-202324-calosciowy-kurs-psychoterapii.md`: "…calosciowy…" → "…całościowy…"
    - `src/editions/informacje__krakow-calosciowy-czteroletni-kurs-psychoterapii-edycja-2025.md`: "…calosciowy, czteroletni…" → "…całościowy, czteroletni…"
    - `src/editions/informacje__lublin-calosciowy-kurs-psychoterapii.md`: "…calosciowy…" → "…całościowy…"
    - `src/editions/krakow_2024_25.md`: "…calosciowy…" → "…całościowy…"
    - `src/editions/rekrutacja_2026_27.md`: "Calosciowe szkolenie…" → "Całościowe szkolenie…"
  - Also ASCII in body text, not in the 8 titles: link labels such as "Superwizja, terapia wlasna, grupa Balinta" in `src/editions/informacje__krakow-202324-calosciowy-kurs-psychoterapii.md` (line 8). Decide these in the same pass.
  - Acceptance: owner picks the spelling; the 8 titles and any body labels match it; the nav and the titles agree.

- [ ] **K-69** Duplicate table-region names (nit)
  - Status: open. Owner: dev. The `.table-scroll` regions on the harmonogram pages are both labelled "Harmonogram" (from the nearest heading), so two regions share a name.
  - Acceptance: region names are unique on each page, or the label rule is changed in `.eleventy.js`.

- [ ] **K-70** Mobile menu has no `aria-expanded` (nit, CSS-only constraint)
  - Status: open. Owner: owner-decision (accept, or revisit ADR 0017). The checkbox-and-label menu has no expanded state for screen readers. This is the trade-off recorded in `docs/adr/0017`. A script would fix it, but public pages ship no JavaScript.
  - Acceptance: owner accepts the trade-off in writing, or a new ADR allows a small script.

- [ ] **K-71** No print styles (nit)
  - Status: open. Owner: dev. `site.css` has no `@media print` rules.
  - Acceptance: a print preview hides the bar, the section nav and the footer links, and the prose prints in one column.

- [ ] **K-72** Decap repository set to `emdoem/kurs-psychoterapii-content`
  - Status: open. Owner: owner-decision. `src/admin/config.yml` now names this repository, but its PLACEHOLDER comment is still there, and the README still says to set it. The owner confirms this repository is the intended one, and this closes K-41's repository part.
  - Acceptance: owner confirms the repository; the PLACEHOLDER comment is removed or reworded; K-41 is updated.

Section 2 note: the nav as built is in `src/_data/nav.js`. Header: Program i opis szkolenia, Kadra, Rekrutacja 2026/27, Harmonogram. Harmonogram links to the 2026/27 page, not the live 2023/24 page (deviation to confirm).

---

## 3. Phase 2 - Content gaps

- [ ] **K-10** Fetch and migrate two linked pages that are not yet archived
  - Targets:
    - `node/55` -> `/informacje/grupa-balinta` (verified 301 to live page "Grupa Balinta")
    - `node/31` -> `/informacje/zgrupowania-dydaktyczno-treningowe` (verified 301; dated 2025 event)
  - Status: open. Owner: dev.
  - Acceptance: raw HTML saved to `legacy/kurs-psychoterapii/live/` (same naming as the other 16 files); each page exists as a Markdown source in `src/pages/` or `src/editions/`; the two `#TODO-route` links point to the new pages (K-24).
  - Note: the new permalink depends on section 5. Do not write under `legacy/` without the owner's go-ahead for the fetch.

- [ ] **K-11** Expired content: zgrupowanie (Mar-May 2026) and past editions 2023/24, 2024/25, 2025/26
  - Status: deferred per owner until the layout is settled (K-03, K-07). Owner: owner-decision (keep as archive or remove via Decap).
  - Acceptance: owner decides; nothing is deleted before that decision. Editions stay in `src/editions/`; deletion is done through Decap (BOUNDARIES: deletable by client).

- [ ] **K-12** Lublin edition year
  - Status: open. Owner: owner-decision (owner to supply the year).
  - Acceptance: `year` in `src/editions/informacje__lublin-calosciowy-kurs-psychoterapii.md` is set (currently `""`, with a TODO); body text "Ostatnia edycja 2022/24 - 2025/26" checked against it.

- [ ] **K-13** Kraków non-edycja page links to the current recruitment page
  - Page: `src/pages/informacje__krakow-calosciowy-kurs-psychoterapii.md` (link to `/edycje/rekrutacja_2026_27/`).
  - Status: open. Owner: owner-decision. Question: is the link time-specific? If yes, move the recruitment block to editions as was done for Lublin.
  - Acceptance: owner answers; if time-specific, the block is moved and the page keeps only evergreen text.

- [ ] **K-14** Recruitment year conflict (slug vs label vs heading)
  - File: `src/editions/informacje__krakow-calosciowy-czteroletni-kurs-psychoterapii-edycja-2025.md`.
  - Facts: slug says "edycja-2025"; front matter says `year: "2026"` (confirmed on the live page 2026-11-07, visible h2 "edycja 2026"); live nav label "Rekrutacja 2025/26" (node/83) and landing label "Rekrutacja (archiwum)" still say 2025.
  - Status: open. Owner: owner-decision (confirm the year and the label).
  - Acceptance: owner confirms the year; slug, title and nav label match. Note: the live URL is reachable (HTTP 200), so it is not a dead path. Changing the slug changes the URL (see section 5).

---

## 4. Phase 3 - Links and downloads

- [x] **K-20** node/33 resolved. Home intro link now points to `/informacje__informacje-podstawowe-i-program-ksztalcenia/` (verified in `_site/index.html` build output).
- [x] **K-21** node/43 resolved. Link in `src/editions/krakow_2024_25.md` and `informacje__krakow-202324-...md` now points to `/informacje__superwizja-i-terapia-wlasna/`.
- [x] **K-22** Recruitment-announcement link rewritten to `/edycje/rekrutacja_2026_27/` (`src/announcements/rekrutacja-2026-27-krakow.md`).
- [x] **K-23** Ankieta files copied to `src/assets/files/` (time-specific, client-replaceable). Each link keeps the original live URL in an HTML comment.
- [ ] **K-24** node/31 and node/55 targets (blocked by K-10)
  - Status: blocked by K-10. Owner: dev.
  - Acceptance: both `#TODO-route` links point to the migrated pages; no `#TODO-route` in `src/`.
- [ ] **K-25** Who replaces the recruitment files in `src/assets/files/`?
  - Context: Decap has no collection for this folder (`media_folder` is `src/assets/img`).
  - Status: open. Owner: owner-decision (owner, or developer through the repo).
  - Acceptance: owner picks one; if the owner, a Decap collection for files is added (dev) or the process is written in README.
- [ ] **K-26** Remaining `#TODO-route` placeholders (3 links in 3 files, checked in build output)
  - `src/pages/informacje__superwizja-i-terapia-wlasna.md`: "Grupa Balinta (Kraków)" -> node/55 (K-10).
  - `src/editions/krakow_2024_25.md`: "Zgrupowania dydaktyczno-treningowe" -> node/31 (K-10).
  - `src/editions/informacje__krakow-202324-calosciowy-kurs-psychoterapii.md`: "Zgrupowania dydaktyczno-treningowe" -> node/31 (K-10).
  - Status: open. Owner: dev (after K-10).
  - Acceptance: `grep "#TODO-route" _site` returns nothing.

---

## 5. Phase 4 - URLs and redirects (decision needed)

**Current state.** The permalinks changed from the live site:
- Pages: `/{slug}/` at root, so `/informacje/kadra` becomes `/informacje__kadra/` (double underscore from the slug).
- Editions: `/edycje/{slug}/`, so `/zgrupowanie` becomes `/edycje/zgrupowanie/`.
- Only `/co_nas_wyroznia` keeps its path.
- Result: **15 of 16 old route paths would 404** without redirects. The old `node/N` aliases have no route at all.

**Options**
- **(A) Change the permalinks to the old live paths** (for example `/informacje/kadra/` via a nested directory or a `permalink` in front matter / `pages.json`). No redirects needed. Strongest preservation: the Google index and external links use these URLs.
- **(B) Keep the new clean slugs and add a redirect map on the server.** Format depends on the server, which is not known. The repo has no `_redirects`, `.htaccess`, or Netlify/Vercel config.
- **(C) Mixed**: some paths via permalinks, the rest via redirects.

**Recommendation to evaluate:** (A), if the existing server cannot run redirect rules. The owner must choose and state the server type (Apache, Nginx, IIS, shared-hosting panel, other).

- [ ] **K-30** Owner chooses A, B or C and names the server type
  - Status: open. Owner: owner-decision. (Decision D-01, D-02.)
  - Acceptance: decision recorded in this section; server type written down.
- [ ] **K-31** Implement the chosen option
  - Status: blocked by K-30. Owner: dev.
  - Acceptance (A): `_site` contains a file at each of the 15 old paths (the old canonical paths in the appendix). Acceptance (B): redirect map file exists in the format the server needs; every old path returns 301 to the new path in a local test.
- [ ] **K-32** `node/N` aliases handled (node/5, node/33, node/43, node/55, node/31, node/96; node/83 is a nav label only)
  - Status: blocked by K-30 and K-10. Owner: dev.
  - Acceptance: each alias in the appendix returns 301 (or 200) to its final page; node/31 and node/55 map to the pages created in K-10.
- [ ] **K-33** Old-to-new URL table verified after K-31
  - Status: blocked by K-31. Owner: dev.
  - Acceptance: every row of the appendix has a live result (200 on the new URL, or the redirect or permalink works) in a local test.

---

## 6. Phase 5 - Go-live blockers

- [ ] **K-40** Home-page link to the programme page
  - Status: open. Owner: dev (verify it renders), owner-decision (should the landing link go to the programme page or to the course overview?).
  - Acceptance: link on `_site/index.html` resolves to a `200` page with the programme text; the owner has decided the target.
- [ ] **K-41** Decap repository and login model in `src/admin/config.yml`
  - Status: open. Owner: owner-decision (client needs a GitHub account with write access, or an OAuth proxy; see D-08).
  - Acceptance: `backend.repo` is no longer `REPLACE_ME/REPLACE_ME` (grep returns nothing); login path is decided and documented in README.
- [ ] **K-42** Announcement date (`src/announcements/rekrutacja-2026-27-krakow.md`)
  - Status: open. Owner: owner-decision (date not in source; set it in Decap or in the file).
  - Acceptance: `date:` is set; the TODO comment is removed.
- [ ] **K-43** README and BOUNDARIES consistent with the code
  - Status: partly done on 2026-11-07 (asset list in README now includes `src/assets/files/`; BOUNDARIES route bullet updated to node/33 and node/43 resolved, node/31 and node/55 open). Remaining: README "Placeholders to set" mentions only the Decap repo and base URL; add the header/footer/home placeholders when K-01 to K-07 are done. Owner: dev.
  - Acceptance: a reader of README and BOUNDARIES sees the same status as this file.

---

## 7. Phase 6 - Docs follow-ups in the main project (owner-approved only; NOT done here)

These items are in the main project (`docs/`). They must not be edited from this folder. Each needs the owner's approval.

- [ ] **K-50** `docs/plan.md`: scope "no build toolchain" to the main site, and link ADR 0009 (kurs-psychoterapii uses Eleventy).
  - Status: done 2026-11-17 in the main project (`docs/plan.md`: the no-build rule is scoped to the main site and links ADR 0009). Owner approval given.
  - Acceptance: plan says the no-build rule applies to the main site only and links `docs/adr/0009-...`. Met.
- [x] **K-51** ADR 0001 status wording
  - Status: done 2026-11-17 in the main project. `docs/adr/0001-plain-html-css.md` has a scope line: the main site only, with ADR 0009 for kurs.
  - Acceptance: ADR 0001 says it is superseded for the kurs site only (ADR 0009), not globally. Met.
- [x] **K-52** ADR index numbering
  - Status: done. `docs/adr/README.md` now says the next number is 0020 (after ADR 0019). The "next is 0007" line had already been corrected before 2026-11-17.
  - Acceptance: index says the next free number, with no gaps. Met.

---

## 8. Open decisions (owner, consolidated)

Numbered for reference. Each is linked to the item that needs it.

1. **D-01** URL scheme: option A, B or C (K-04, K-30).
2. **D-02** Server type (Apache, Nginx, IIS, shared-hosting panel, other) (K-30).
3. **D-03** Header nav labels and footer text (K-01, K-02).
4. **D-04** Design tokens and ADR 0007 status (K-06).
5. **D-05** Home page: sections, C4 duplicate intro kept or removed, landing link target (K-07, K-40).
6. **D-06** Expired content: zgrupowanie and past editions (K-11).
7. **D-07** Recruitment year and labels: "edycja 2025" slug vs "edycja 2026" heading vs "Rekrutacja 2025/26" nav (K-14).
8. **D-08** Decap login model: GitHub accounts or OAuth proxy; repo owner/name (K-41).
9. **D-09** Lublin edition year (K-12).
10. **D-10** Kraków non-edycja page: is the recruitment link time-specific (K-13).
11. **D-11** Recruitment file owner: owner or developer (K-25).
12. **D-12** Announcement date (K-42).
13. **D-13** Banner alt text for the recruitment image (currently `alt=""`; see `src/announcements/rekrutacja-2026-27-krakow.md`).
14. **D-14** Approve the fetch of node/31 and node/55 pages into `legacy/` (K-10).
15. **D-15** Approve main-project docs follow-ups (K-50 to K-52). Done 2026-11-17.
16. **D-16** Spelling of the 8 transliterated titles and related body labels (K-68).
17. **D-17** Confirm the Decap repository `emdoem/kurs-psychoterapii-content` (K-72).
18. **D-18** Accept the CSS-only menu's missing `aria-expanded` or allow a script (K-70).

---

## 9. Session log

- **2026-11-17 - review fixes.** Applied the should-fix findings of the UI review: footer text uses the muted colour; every iframe has a title (copied from the page h1 at build time); tables are wrapped in keyboard-focusable `.table-scroll` regions named from the nearest heading; `hyphens: auto` on prose; dead CSS removed; the 2023/24 nav label is verbatim from the live menu; landmark names are unique; templates reference nav entries by key (`nav.byKey`); hero padding reduced. Opened K-68 to K-72. Docs: ADR 0019 (new), ADR 0001 scope line, `docs/plan.md` and the ADR index updated (K-50 to K-52 done).
- **2026-11-07 - scaffold.** Created `kurs-psychoterapii/`: Eleventy 3.x, Nunjucks layouts, empty header/footer stubs, `src/index.njk`, `tokens.css` and `site.css` placeholders, Decap admin (3.17.1 pinned, SRI), `.eleventy.js` passthroughs, README and BOUNDARIES.
- **2026-11-07 - migration of 16 routes.** Migrated 8 pages to `src/pages/`, 8 editions to `src/editions/` (Lublin moved from pages to editions), 1 announcement, 3 ankieta files to `src/assets/files/`. Recruitment link rewritten; node/33 and node/43 resolved.
- **2026-11-07 - live audit.** Compared the 16 canonical old paths with the new permalinks (15 of 16 change). Found node/31 and node/55 not yet archived (301s verified). Confirmed the recruitment page is reachable (HTTP 200) and shows "edycja 2026".
- **2026-11-17 - UI build.** Ported the fundacja design (tokens, bar, hero, index, footer, page-head, prose) into `tokens.css` and `site.css`. Added `src/_data/nav.js`, `org.json`, `site.json`, the `page.njk` layout and the home page. Build exit 0, 19 HTML pages. Broke one nav entry on purpose: the build failed with `nav: "Kadra" points to ..., which does not exist`; restored. Screenshots in `.screens/` (gitignored). K-01, K-02, K-03, K-07 done; K-60 to K-67 added.
- **2026-11-07 - session (this plan).** Created this PLAN.md. Updated BOUNDARIES route bullet and README asset list. Removed `_site/` and rebuilt from clean: `npm run build` exit 0, 19 HTML pages, Lublin page only under `/edycje/`. No changes to `docs/`, `legacy/`, or `src/` content beyond the listed files.

---

## Appendix A - Old-to-new URL table

Source: live canonical links in `legacy/kurs-psychoterapii/live/*.html` (the 16 old routes). New paths are the current permalinks from `src/**/*.json` and the file slugs. "Changed" means a request to the old path 404s without a redirect or permalink change (K-31).

| # | Legacy file | Old path (live canonical) | Current new path | Changed? |
|---|---|---|---|---|
| 1 | `informacje__czasopisma-specjalistyczne.html` | `/informacje/czasopisma-specjalistyczne` | `/informacje__czasopisma-specjalistyczne/` | yes |
| 2 | `co_nas_wyroznia.html` | `/co_nas_wyroznia` | `/co_nas_wyroznia/` | no |
| 3 | `informacje__akredytowane-osrodki-stazowe.html` | `/informacje/akredytowane-osrodki-stazowe` | `/informacje__akredytowane-osrodki-stazowe/` | yes |
| 4 | `harmonogram_2025_26.html` | `/harmonogram_2025_26` | `/edycje/harmonogram_2025_26/` | yes |
| 5 | `informacje__informacje-podstawowe-i-program-ksztalcenia.html` | `/informacje/informacje-podstawowe-i-program-ksztalcenia` | `/informacje__informacje-podstawowe-i-program-ksztalcenia/` | yes |
| 6 | `informacje__harmonogram.html` | `/informacje/harmonogram` | `/edycje/informacje__harmonogram/` | yes |
| 7 | `informacje__kadra.html` | `/informacje/kadra` | `/informacje__kadra/` | yes |
| 8 | `informacje__krakow-calosciowy-czteroletni-kurs-psychoterapii-edycja-2025.html` | `/informacje/krakow-calosciowy-czteroletni-kurs-psychoterapii-edycja-2025` | `/edycje/informacje__krakow-calosciowy-czteroletni-kurs-psychoterapii-edycja-2025/` | yes |
| 9 | `informacje__krakow-calosciowy-kurs-psychoterapii.html` | `/informacje/krakow-calosciowy-kurs-psychoterapii` | `/informacje__krakow-calosciowy-kurs-psychoterapii/` | yes |
| 10 | `informacje__krakow-202324-calosciowy-kurs-psychoterapii.html` | `/informacje/krakow-202324-calosciowy-kurs-psychoterapii` | `/edycje/informacje__krakow-202324-calosciowy-kurs-psychoterapii/` | yes |
| 11 | `informacje__lublin-calosciowy-kurs-psychoterapii.html` | `/informacje/lublin-calosciowy-kurs-psychoterapii` | `/edycje/informacje__lublin-calosciowy-kurs-psychoterapii/` | yes |
| 12 | `informacje__zalecana-literatura.html` | `/informacje/zalecana-literatura` | `/informacje__zalecana-literatura/` | yes |
| 13 | `krakow_2024_25.html` | `/krakow_2024_25` | `/edycje/krakow_2024_25/` | yes |
| 14 | `informacje__superwizja-i-terapia-wlasna.html` | `/informacje/superwizja-i-terapia-wlasna` | `/informacje__superwizja-i-terapia-wlasna/` | yes |
| 15 | `rekrutacja_2026_27.html` | `/rekrutacja_2026_27` | `/edycje/rekrutacja_2026_27/` | yes |
| 16 | `zgrupowanie.html` | `/zgrupowanie` | `/edycje/zgrupowanie/` | yes |

Home page: `Strona powitalna _ KURS PSYCHOTERAPII.htm` at `/` is unchanged (`/` -> `/`).

Count: 16 routes, 15 change, 1 unchanged. Old paths are shown without the `www.kurs-psychoterapii.pl` host.

### node/N aliases

| Old alias | Where it appears (legacy) | Current state | Target |
|---|---|---|---|
| `node/5` | Nav "Kadra" (all live pages) | no route | `/informacje__kadra/` (K-32) |
| `node/96` | Nav "Co nas wyróżnia" | no route | `/co_nas_wyroznia/` (K-32) |
| `node/33` | Home intro (programme link) | resolved in `src/index.njk` | `/informacje__informacje-podstawowe-i-program-ksztalcenia/` |
| `node/43` | `krakow_2024_25`, `informacje__krakow-202324-...` | resolved in editions | `/informacje__superwizja-i-terapia-wlasna/` |
| `node/31` | Zgrupowania link (2 editions) | open (K-10) | new page, path TBD (K-10, K-32) |
| `node/55` | "Grupa Balinta (Kraków)" (superwizja page) | open (K-10) | old target `/informacje/grupa-balinta`; new path TBD (K-10, K-32) |
| `node/83` | Nav "Rekrutacja 2025/26" (label only) | not mapped | owner to confirm (D-07, K-14) |
