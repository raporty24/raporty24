// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // KLUCZOWE DLA SEO: Adres Twojej domeny
  site: 'https://raporty24.pl',

  // Integracje Astro
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://raporty24.pl/thanks/'
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});