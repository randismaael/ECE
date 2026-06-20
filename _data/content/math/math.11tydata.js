module.exports = {
  layout: "layouts/topic.njk",
  eleventyComputed: {
    permalink: (data) => `/math/${data.page.fileSlug}/`,
    slug: (data) => data.page.fileSlug,
    simPath: (data) => `${(process.env.PATH_PREFIX || "/").replace(/\/$/, "")}/content/math/${data.page.fileSlug}.sim.js`,
  },
};
