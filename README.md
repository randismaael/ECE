# ECE Reference

Interactive, layer-by-layer reference for the Georgia Tech ECE stack —
ideal switches up through a working CPU. Built with [Eleventy](https://www.11ty.dev/).

**Live site:** (add your GitHub Pages URL here once deployed)

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:8080` with live reload — edit any `.md` file
in `content/` and the browser updates automatically.

## Building for production

```bash
npm run build
```

Outputs the static site to `_site/`.

## Contributing

Want to add a topic, fix an explanation, or build a new simulator? See
[CONTRIBUTING.md](./CONTRIBUTING.md) — content lives in plain Markdown
files, no need to touch the site's layout or navigation code.

## Project structure

See the bottom of [CONTRIBUTING.md](./CONTRIBUTING.md) for the full layout.
The short version: `content/foundations/*.md` is the main chain (switches →
CMOS → gates → combinational → sequential), `content/math/*.md` is the
reference math section, and `_data/chain.js` controls ordering and the
side-rail navigation.

## Deployment

Pushing to `main` triggers `.github/workflows/build.yml`, which builds the
site and deploys it to GitHub Pages automatically. Pull requests get a
build check (does it compile?) without deploying.

To enable: repo Settings → Pages → Source → "GitHub Actions".


Hey Testing