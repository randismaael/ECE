module.exports = {
  layout: "layouts/topic.njk",
  // Auto-derive a clean URL from the filename, e.g. switches.md -> /switches/
  // Contributors don't need to set `permalink` manually.
  eleventyComputed: {
    permalink: (data) => `/${data.page.fileSlug}/`,
    slug: (data) => data.page.fileSlug,
    // Uses the same PATH_PREFIX env var as .eleventy.js so this stays correct
    // whether built for local dev (root) or GitHub Pages (e.g. /ECE/).
    simPath: (data) => `${(process.env.PATH_PREFIX || "/").replace(/\/$/, "")}/content/foundations/${data.page.fileSlug}.sim.js`,
  },
};
