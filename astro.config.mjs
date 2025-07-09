// @ts-check
import { defineConfig } from 'astro/config';

import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import compressor from 'astro-compressor';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    resolve: {
    alias: {
        '@': '/src',
        '@components': '/src/components',
        '@types': '/src/types',
        '@layouts': '/src/layouts',
        },
    },
  },
  site: 'https://stargazers.club',
  integrations: [robotsTxt(), sitemap(), partytown(), compressor()],
  adapter: vercel(),
});