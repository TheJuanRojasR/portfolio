# dev-portfolio

Personal developer portfolio of Juan Manuel Rojas Rojas, built with Astro, TypeScript, and Tailwind CSS.

## Stack

- Astro 7
- TypeScript
- Tailwind CSS v4
- Lenis
- pnpm

## Development

```bash
pnpm install
pnpm dev
```

The site uses the GitHub Pages base path, so the local preview is available at:

```text
http://localhost:4321/portfolio/
```

## Build

```bash
pnpm build
pnpm preview
```

## Deploy

The site is configured for a GitHub Pages project site:

- Repository: `TheJuanRojasR/portfolio`
- Site URL: `https://thejuanrojasr.github.io/portfolio/`
- Astro `site`: `https://thejuanrojasr.github.io`
- Astro `base`: `/portfolio`

The workflow at `.github/workflows/deploy.yml` builds and deploys the site on every push to `main`.

In the GitHub repository, enable Pages with **Settings → Pages → Build and deployment → Source: GitHub Actions**.

If the repository is renamed, update `site` and `base` in `astro.config.mjs` to match the new GitHub Pages URL.
