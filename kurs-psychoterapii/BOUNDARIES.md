# Content boundaries

Which parts of the site are developer-owned, which the client edits in Decap
(`/admin/`), and which the client may delete.

| Category | What it covers | Where it lives | Notes |
|---|---|---|---|
| **STATIC / developer-only** | Layouts (`base.njk`), header and footer (`header.njk`, `footer.njk`; both are empty TODO stubs pending a decision: navigation labels, footer text, and analytics are open decisions, not migrated), page metadata (`<title>`, description), CSS (`tokens.css`, `site.css`), Decap config (`src/admin/config.yml`), home page intro (C1) in `src/index.njk` | `src/_includes/`, `src/index.njk`, `src/assets/css/`, `src/admin/` | Cookie remnants are removed, not migrated. |
| **CLIENT-EDITABLE media** (Decap media library) | Images the client may upload or replace via the Decap media library. Currently used: `KatedraPsychoterapiiUJCM_2QOY.jpg` (home page, `src/index.njk`), `Kurs_psychoterapii_zaproszenie_Krakow_2QOY.jpg` (recruitment banner, `src/announcements/`). | `src/assets/img/` (Decap `media_folder`) | Replacing a file changes the image wherever it is used; check the references above first. |
| **CLIENT-EDITABLE** (Decap collections) | **announcements**: recruitment banners, dates (`src/announcements/`). **editions**: course schedule per year (`src/editions/`, none migrated yet). **pages**: evergreen prose with fixed structure (`src/pages/`, none migrated yet). | Decap collections `announcements`, `editions`, `pages` | Migrated so far: "Rekrutacja 2026/27 - Kraków" banner and link (C2, C5) go to **announcements**. Home intro (C1) is static now; moving it to **pages** is an open decision (needs a route). |
| **DEVELOPER-ONLY** (build and docs) | Build configuration (`.eleventy.js`), dependencies (`package.json`), project documentation (`README.md`) | Repository root | Not edited by the client. |
| **DELETABLE by client** (time-specific, expires) | Recruitment announcements after the recruitment closes; editions for past academic years | `src/announcements/*.md`, `src/editions/*.md` | Rule: to remove an expired item, the client deletes its entry in Decap (editorial workflow publishes the deletion). No developer needed. Do not delete evergreen pages. |

IDs used above (from the source page inventory): C1 = home page intro, C2 = recruitment banner, C4 = duplicate intro, C5 = recruitment banner link. C3 is not referenced here.

## Open decisions

- **Duplicate intro (C4):** "Studia i kurs całościowy przygotowujący do uzyskania certyfikatu psychoterapeuty Polskiego Towarzystwa Psychiatrycznego" repeats C1. Not migrated; owner to confirm.
- **Route placeholder:** the intro link to `/node/33` points to `#TODO-route` until the route is decided.
- **Announcement date:** the source has no date; the owner must set it in Decap.
- **Banner alt text:** the source has none; the owner must decide (currently `alt=""`).
- **Editorial workflow / OAuth:** see `README.md`; client access to Decap is still open.
