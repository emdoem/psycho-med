# ADR 0002: Site information architecture

- Status: accepted (URL form superseded for local links by ADR 0014)
- Date: 2026-10-10
- Note (2026-10-26): local links are relative per [ADR 0014](0014-relative-paths-for-local-links-and-assets.md).

## Context

The legacy site had three published WordPress pages — a category archive as the
home page, a category archive for the foundation, and a category archive for
the courses — plus one real WordPress Page ("Warto odwiedzić") that was reachable
only through the menu. URLs were query strings: `?cat=6`, `?cat=9`, `?cat=10`,
`?page_id=44`, and `?p=N` for individual posts. Those URLs mean nothing to a
visitor and nothing to a search engine.

The menu on every legacy page exposed exactly four destinations plus a
sub-menu of five external links. All of the archive pages duplicated content
that also appeared on the home page.

So the site needs a decision about: which pages exist, what they are called,
what their URLs are, and how they are connected.

## Decision

Four pages, one level deep, no sub-pages.

| Page | URL | Purpose |
| ---- | --- | ------- |
| Strona główna | `/index.html` | Who the foundation is, what it does, how to reach it |
| Na temat fundacji | `/na-temat-fundacji.html` | The foundation's statutory activity |
| Kursy doskonalące | `/kursy-doskonalace.html` | The psychotherapy course, its admission criteria, enrolment |
| Warto odwiedzić | `/warto-odwiedzic.html` | External links to related institutions |

Supporting files: `404.html`, `robots.txt`, `sitemap.xml`.

URLs are clean, lowercase, hyphenated, and Polish (`na-temat-fundacji.html`).
They are not translated into English, matching the content (ADR 0003) and the
audience. The `.html` extension is kept so the site works when opened directly
from a filesystem or from a host with no rewrite rules; the URLs are absolute
from the site root so they survive either deployment layout.

The main navigation lists the four pages, with "Warto odwiedzić" expanding to
the five external links, exactly as the legacy menu did. The current page is
marked in the navigation, and the nav markup is identical on every page so a
visitor always has the same way out.

No breadcrumbs, no nested sections, no post-per-URL structure: every article
lives on its parent page, as it did visually on the legacy site.

## Alternatives considered

- **Keep query-string URLs** (`?cat=9`). Rejected: they are an implementation
  detail of WordPress, they are unreadable, and they cannot be preserved anyway
  once the site is static files.
- **One single-scrolling page** with anchors. Rejected: the four topics are
  independent, and the legacy navigation already treated them as separate
  destinations. Anchors would also break the ability to link directly to the
  courses.
- **A blog with individual post pages** (`/kursy/informacje-podstawowe.html`).
  Rejected: this was never a blog. There are seven posts, frozen since 2014,
  and the value of deep-linking to each one is nil.
- **English slugs** (`/about-the-foundation.html`). Rejected: the content is
  Polish, and mixed-language URLs are harder for the audience to type and
  remember.
- **Extensionless URLs** (`/na-temat-fundacji`). Rejected without a host: they
  need rewrite rules or a host that does it implicitly, which couples the
  decision to hosting (ADR 0005). `.html` works everywhere.

## Consequences

- Redirects from the legacy `?cat=N` and `?p=N` URLs cannot be expressed, since
  query-string paths have no meaningful static equivalent. Old inbound links
  will simply land on `404.html`, which must link back to the home page. This
  is tracked as an open item in the plan and depends on the hosting choice.
- Every page carries the full navigation, so navigation changes are four-file
  edits — accepted under [ADR 0001](0001-plain-html-css.md).
- Content that WordPress duplicated across archives is placed once, on its page
  of record. "Na temat fundacji" appears on `na-temat-fundacji.html` and not on
  the home page, except as a short summary.
- Adding a fifth page later means creating one file and adding one nav item in
  four places.
