module.exports = function (eleventyConfig) {
  // Static passthrough — CSS and client-side JS copy as-is
  eleventyConfig.addPassthroughCopy("assets");

  // Sim scripts stay alongside their source markdown (content/foundations/, content/math/)
  // so a contributor adding a topic keeps the .md and .sim.js together in one place.
  eleventyConfig.addPassthroughCopy("content/foundations/*.sim.js");
  eleventyConfig.addPassthroughCopy("content/math/*.sim.js");

  // Watch assets for live reload (CSS/JS changes)
  eleventyConfig.addWatchTarget("assets/");

  // Serve passthrough files from source during dev — prevents passthrough globs from
  // pre-marking content subdirectories in chokidar before the template glob runs,
  // which would cause .md files to be silently skipped by the file watcher.
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

  // JSON dump filter — used to embed frontmatter data as inline JS objects in <script> tags
  eleventyConfig.addFilter("dump", (obj) => JSON.stringify(obj ?? null));

  // Don't template repo docs (README, CONTRIBUTING, CLAUDE) as site pages
  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("CONTRIBUTING.md");
  eleventyConfig.ignores.add("CLAUDE.md");

  // Collections: all foundation topics, sorted by their chain "order" frontmatter field
  eleventyConfig.addCollection("foundations", (api) => {
    return api.getFilteredByGlob("content/foundations/*.md").sort(
      (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0)
    );
  });

  eleventyConfig.addCollection("mathTopics", (api) => {
    return api.getFilteredByGlob("content/math/*.md");
  });

  // Filter: get prev/next within the foundations chain by order, using the static chain.js structure
  eleventyConfig.addFilter("chainAdjacent", (chainArr, currentOrder) => {
    const sorted = [...chainArr].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((p) => p.order === currentOrder);
    return {
      prev: idx > 0 ? sorted[idx - 1] : null,
      next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
      index: idx,
      total: sorted.length,
    };
  });

  return {
    pathPrefix: process.env.PATH_PREFIX || "/",
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
