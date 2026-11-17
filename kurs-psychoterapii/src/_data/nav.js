/*
 * Single source for the header, section navs and footer columns.
 *
 * Labels are copied verbatim from the live Drupal menus
 * (legacy/kurs-psychoterapii/Strona powitalna _ KURS PSYCHOTERAPII.htm, "Menu glowne",
 * "Warto wiedziec", "Warto odwiedzic") unless noted in PLAN.md.
 *
 * Internal entries name the source file (`file`). The URL is derived from that file
 * with the same rule as pages.json and editions.json, and the build fails if the
 * file does not exist. .eleventy.js also checks each URL against the built pages.
 * External entries give `href` and are kept as they are.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");

const P = (slug) => `src/pages/${slug}.md`;
const E = (slug) => `src/editions/${slug}.md`;

function urlFor(label, file) {
  if (!fs.existsSync(path.join(ROOT, file))) {
    throw new Error(`nav: "${label}" points to ${file}, which does not exist`);
  }
  if (file === "src/index.njk") return "/";
  const slug = path.basename(file, ".md");
  if (file.startsWith("src/pages/")) return `/${slug}/`;
  if (file.startsWith("src/editions/")) return `/edycje/${slug}/`;
  throw new Error(`nav: "${label}" points to ${file}, which has no permalink rule`);
}

function internal(label, file) {
  return { label, url: urlFor(label, file), file };
}

function external(label, href) {
  return { label, url: href, external: true };
}

// Brand: the wordmark text lives in site.json; this entry only gives the home URL.
const home = internal("KURS PSYCHOTERAPII", "src/index.njk");

// Top-level header items. `key` is the stable id other templates use (nav.byKey);
// `group` names the section that opens under the item.
const header = [
  {
    ...internal("Program i opis szkolenia", P("informacje__informacje-podstawowe-i-program-ksztalcenia")),
    key: "program",
    group: "informacje",
  },
  { ...internal("Kadra", P("informacje__kadra")), key: "kadra" },
  { ...internal("Rekrutacja 2026/27", E("rekrutacja_2026_27")), key: "rekrutacja" },
  // Live parent pointed to the 2023/24 page; this build points to the 2026/27 harmonogram.
  { ...internal("Harmonogram", E("informacje__harmonogram")), key: "harmonogram", group: "harmonogram" },
];

const groups = {
  informacje: [
    { ...internal("Co nas wyróżnia", P("co_nas_wyroznia")), key: "co-nas-wyroznia" },
    internal("Kraków - całościowy kurs psychoterapii", P("informacje__krakow-calosciowy-kurs-psychoterapii")),
    internal("Lublin - całościowy kurs psychoterapii", E("informacje__lublin-calosciowy-kurs-psychoterapii")),
    internal("Zgrupowanie dydaktyczno-treningowe", E("zgrupowanie")),
    internal("Superwizja, terapia własna, grupa Balinta", P("informacje__superwizja-i-terapia-wlasna")),
    internal("Staże kliniczne", P("informacje__akredytowane-osrodki-stazowe")),
  ],
  harmonogram: [
    internal("2026/27", E("informacje__harmonogram")),
    internal("2025/26", E("harmonogram_2025_26")),
    internal("Archiwum", E("krakow_2024_25")),
    // Nav label: verbatim visible h2 of the live edition page (legacy/kurs-psychoterapii/live, ADR 0015).
    internal("Krak\u00f3w - 2023/24 - ca\u0142o\u015bciowy kurs psychoterapii", E("informacje__krakow-202324-calosciowy-kurs-psychoterapii")),
    internal("Rekrutacja (archiwum)", E("informacje__krakow-calosciowy-czteroletni-kurs-psychoterapii-edycja-2025")),
  ],
};

// Footer columns, in order: "Warto wiedzieć" and "Warto odwiedzić".
const footer = [
  {
    title: "Warto wiedzieć",
    items: [
      internal("Zalecana literatura", P("informacje__zalecana-literatura")),
      internal("Czasopisma specjalistyczne", P("informacje__czasopisma-specjalistyczne")),
      external("Akredytowane ośrodki stażowe", "https://sekcjanaukowapsychoterapii.org/akredytowane-osrodki-stazowe/"),
      internal("Lista certyfikowanych psychoterapeutów oraz superwizorów PTP", P("informacje__superwizja-i-terapia-wlasna")),
      external("Zasady uzyskiwania certyfikatu psychoterapeuty PTP", "https://sekcjanaukowapsychoterapii.org/jak-uzyskac-certyfikat-psychoterapeuty/"),
    ],
  },
  {
    title: "Warto odwiedzić",
    items: [
      external("Polskie Towarzystwo Psychiatryczne", "http://psychiatria.org.pl/"),
      external("Sekcja Naukowa Psychoterapii PTP", "https://sekcjanaukowapsychoterapii.org/"),
      external("Oddział Krakowski Polskiego Towarzystwa Psychiatrycznego", "http://ptp.malopolska.pl/"),
      external("Wydawnictwo Uniwersytetu Jagiellońskiego", "http://www.wuj.pl/"),
      external("Klinika Psychoterapii Katedry Psychiatrii i Psychoterapii UJ CM", "https://psychoterapia.wl.cm.uj.edu.pl/pl/"),
    ],
  },
];

// Link from the live "Menu dodatkowe" to the foundation site; shown in the footer.
const foundation = external('Fundacja "Psychomed"', "http://fundacja-psychoterapia.pl/");

// Section data per page URL: the label used for the page-head mono line, and the
// sibling items for the section nav (empty means no section nav).
const sectionFor = {};

// `key` is set only for header sections, so header.njk can mark the open section by key.
function addSection(label, items, key) {
  const section = key ? { key, label, items } : { label, items };
  for (const item of items) {
    if (!item.external && !sectionFor[item.url]) sectionFor[item.url] = section;
  }
  return section;
}

for (const h of header) {
  let items = [];
  if (h.group) {
    items = groups[h.group].slice();
    // Parent page first, unless it is already the first child (Harmonogram).
    if (!items.some((i) => i.url === h.url)) {
      items.unshift({ label: h.label, url: h.url, file: h.file });
    }
  }
  const section = addSection(h.label, items, h.key);
  if (!sectionFor[h.url]) sectionFor[h.url] = section;
}

for (const col of footer) {
  addSection(col.title, col.items);
}

// Stable lookup for templates: nav.byKey.program, nav.byKey.kadra, ...
const byKey = {};
for (const item of [...header, ...groups.informacje]) {
  if (item.key) byKey[item.key] = item;
}

const internalUrls = [
  ...new Set(
    [home, ...header, ...Object.values(groups).flat(), ...footer.flatMap((c) => c.items)]
      .filter((i) => !i.external)
      .map((i) => i.url)
  ),
];

module.exports = {
  home,
  header,
  byKey,
  groups,
  footer,
  foundation,
  sectionFor,
  internalUrls,
};
