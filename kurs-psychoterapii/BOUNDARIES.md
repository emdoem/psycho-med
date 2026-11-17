# Content boundaries

Which parts of the site are developer-owned, which the client edits in Decap
(`/admin/`), and which the client may delete.

| Category | What it covers | Where it lives | Notes |
|---|---|---|---|
| **STATIC / developer-only** | Layouts (`base.njk`, `page.njk`), header and footer (`header.njk`, `footer.njk`), navigation (`src/_data/nav.js`: labels and links for the header, section navs and footer columns), organisation and site data (`src/_data/org.json`, `src/_data/site.json`), page metadata (`<title>`, description), CSS (`tokens.css` copied from fundacja, `site.css`), Decap config (`src/admin/config.yml`), home page (`src/index.njk`: hero, C1 lead, index list) | `src/_includes/`, `src/_data/`, `src/index.njk`, `src/assets/css/`, `src/admin/` | Nav labels are copied from the live menus. A label or link change is a developer edit; the build fails if a nav entry points to a missing file. Analytics stays an open decision and is not migrated. Cookie remnants are removed, not migrated. |
| **CLIENT-EDITABLE media** (Decap media library) | Images the client may upload or replace via the Decap media library. Currently used: `Kurs_psychoterapii_zaproszenie_Krakow_2QOY.jpg` (recruitment banner, `src/announcements/`). `KatedraPsychoterapiiUJCM_2QOY.jpg` is no longer on any page (441 px wide, too small for a hero background; see `PLAN.md`). | `src/assets/img/` (Decap `media_folder`) | Replacing a file changes the image wherever it is used; check the references above first. |
| **CLIENT-EDITABLE** (Decap collections) | **announcements**: recruitment banners, dates (`src/announcements/`). **editions**: course schedule per year (`src/editions/`, none migrated yet). **pages**: evergreen prose with fixed structure (`src/pages/`, none migrated yet). | Decap collections `announcements`, `editions`, `pages` | Migrated so far: "Rekrutacja 2026/27 - Kraków" banner and link (C2, C5) go to **announcements**. Home intro (C1) is static now; moving it to **pages** is an open decision (needs a route). |
| **DEVELOPER-ONLY** (build and docs) | Build configuration (`.eleventy.js`), dependencies (`package.json`), project documentation (`README.md`) | Repository root | Not edited by the client. |
| **DELETABLE by client** (time-specific, expires) | Recruitment announcements after the recruitment closes; editions for past academic years | `src/announcements/*.md`, `src/editions/*.md` | Rule: to remove an expired item, the client deletes its entry in Decap (editorial workflow publishes the deletion). No developer needed. Do not delete evergreen pages. |

IDs used above (from the source page inventory): C1 = home page intro, C2 = recruitment banner, C4 = duplicate intro, C5 = recruitment banner link. C3 is not referenced here.

**Field note - downloadable files (`src/assets/files/`):** these files (currently the recruitment questionnaire `ankieta_rekrutacja.doc`, `.zip`, `.docx`, linked from `src/editions/rekrutacja_2026_27.md`) are client-replaceable and time-specific: replace them when the form changes. Decap has no media collection for this folder yet (`media_folder` is `src/assets/img`), so replacement is done through the repository until one is added. Each link keeps the original live URL in an HTML comment.

## Open decisions

- **Duplicate intro (C4):** "Studia i kurs całościowy przygotowujący do uzyskania certyfikatu psychoterapeuty Polskiego Towarzystwa Psychiatrycznego" repeats C1. Not migrated; owner to confirm.
- **Route placeholder:** `node/33` (programme page, intro link on the home page) and `node/43` (superwizja page) are resolved. `node/31` (Zgrupowania dydaktyczno-treningowe) and `node/55` (Grupa Balinta) remain open and are being fetched (see `PLAN.md` Phase 2); their links point to `#TODO-route` until then.
- **Announcement date:** the source has no date; the owner must set it in Decap.
- **Banner alt text:** the source has none; the owner must decide (currently `alt=""`).
- **Editorial workflow / OAuth:** see `README.md`; client access to Decap is still open.
