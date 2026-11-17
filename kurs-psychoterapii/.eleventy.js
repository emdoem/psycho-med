const nav = require("./src/_data/nav.js");

module.exports = function (eleventyConfig) {
  // Decap CMS admin UI and static assets are copied as-is.
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/assets/css");
  eleventyConfig.addPassthroughCopy("src/assets/img");
  eleventyConfig.addPassthroughCopy("src/assets/files");

  // Newest first. Announcements without a date sort last (no "Invalid Date").
  eleventyConfig.addCollection("announcements", (api) => {
    const time = (item) => {
      const d = item.data.date;
      const t = d instanceof Date ? d.getTime() : NaN;
      return Number.isNaN(t) ? -Infinity : t;
    };
    return api
      .getFilteredByGlob("src/announcements/*.md")
      .sort((a, b) => time(b) - time(a));
  });

  // Build fails if a nav URL is not an output page (nav.js already fails on missing files).
  eleventyConfig.addCollection("navCheck", (api) => {
    const built = new Set(api.getAll().map((item) => item.url));
    for (const url of nav.internalUrls) {
      if (!built.has(url)) {
        throw new Error(`nav: ${url} is listed in src/_data/nav.js but no page is built at that URL`);
      }
    }
    return [];
  });

  // Build-time HTML fixes for prose (no JavaScript ships to the public pages).
  // 1. An <iframe> without a title gets the page title (the verbatim h1 text, already on the page).
  // 2. A <table> not yet wrapped gets a keyboard-focusable region named after the nearest preceding
  //    heading in the same document (the page title if there is none). Styles: .table-scroll in site.css.
  eleventyConfig.addTransform("prose-a11y", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    const headingRe = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g;
    const textOf = (html) => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().replace(/"/g, "&quot;");
    const pageTitle = content.match(/<h1 id="page-title">([\s\S]*?)<\/h1>/);

    let out = content;

    if (/<iframe\b(?![^>]*\stitle=)/i.test(out)) {
      if (!pageTitle) throw new Error(`${outputPath}: iframe without title, and no page title to copy`);
      const title = textOf(pageTitle[1]);
      out = out.replace(/<iframe\b(?![^>]*\stitle=)/gi, `<iframe title="${title}"`);
    }

    out = out.replace(/<table\b[\s\S]*?<\/table>/g, (table, offset, whole) => {
      const before = whole.slice(0, offset);
      if (/<div class="table-scroll"[^>]*>\s*$/.test(before)) return table;

      let label = pageTitle ? textOf(pageTitle[1]) : null;
      for (const h of before.matchAll(headingRe)) label = textOf(h[2]);
      if (!label) throw new Error(`${outputPath}: table without a heading or page title for its label`);

      return `<div class="table-scroll" role="region" tabindex="0" aria-label="${label}">${table}</div>`;
    });

    return out;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
