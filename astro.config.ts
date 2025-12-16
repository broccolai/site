import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';
import vercel from '@astrojs/vercel';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
  integrations: [solidJs()],
  build: {
    inlineStylesheets: 'always',
  },
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [
      Icons({
        compiler: 'solid',
      }),
    ],
  },
});