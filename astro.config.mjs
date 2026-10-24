// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site: https://thejuanrojasr.github.io/portfolio/
// If the repository is renamed, update `base` to match the new repo name.
export default defineConfig({
  site: 'https://thejuanrojasr.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  devToolbar: {
    enabled: false
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});