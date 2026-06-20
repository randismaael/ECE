module.exports = {
  layout: "layouts/topic.njk",
  // Auto-derive a clean URL from the filename, e.g. switches.md -> /switches/
  // Contributors don't need to set `permalink` manually.
  eleventyComputed: {
    permalink: (data) => `/${data.page.fileSlug}/`,
    slug: (data) => data.page.fileSlug,
    simPath: (data) => `/content/foundations/${data.page.fileSlug}.sim.js`,
  },
};
