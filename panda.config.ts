import { defineConfig } from '@pandacss/dev';

export default defineConfig({
    eject: false,
    preflight: false,
    hash: true,
    include: ['./src/**/*.{ts,tsx}'],
    outdir: './.panda',

    theme: {
        keyframes: {
            'home-bounce': {
                from: { transform: 'translateY(0)' },
                to: { transform: 'translateY(0.4rem)' },
            },
        },
        tokens: {
            colors: {
                smoke: { value: '#f5f5f5' },
                black: { value: '#1C1E20' },
                soft: { value: '#474747' },
                cyan: { value: '#B4F2E2' },
                purple: { value: '#7b1fa2' },
                accent: { value: '#f5a5a5' },
            },
        },
    },
});
