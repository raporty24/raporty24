// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // KLUCZOWE DLA SEO: Adres Twojej domeny
  // Niezbędny do generowania poprawnych linków w rss.xml oraz sitemap-index.xml
  site: 'https://raporty24.pl',
  
  // Integracje Astro
  integrations: [
    sitemap(), // Automatycznie generuje mapę strony przy każdym "build"
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});