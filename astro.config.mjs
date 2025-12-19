import tailwindcss from "@tailwindcss/vite";
// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://achrafsalimi.me', // Update this to your actual domain later!
  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});