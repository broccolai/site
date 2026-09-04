import { fileURLToPath, URL } from 'node:url';
import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [solid({ start: { app: 'src/app.tsx', document: 'src/document.tsx' } })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@panda': fileURLToPath(new URL('./.panda', import.meta.url)),
        },
    },
    build: {
        outDir: 'dist/client',
    },
    server: {
        port: 4321,
    },
    preview: {
        port: 4321,
    },
});
