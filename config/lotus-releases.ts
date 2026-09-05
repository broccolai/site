import type { Plugin } from 'vite';
import { GET } from '../api/lotus/releases';

export function lotusReleases(): Plugin {
    return {
        name: 'lotus-releases-api',
        apply: 'serve',
        configureServer(server) {
            server.middlewares.use('/api/lotus/releases', async (request, response, next) => {
                if (request.method !== 'GET') {
                    return next();
                }
                const result = await GET();
                result.headers.forEach((value, key) => response.setHeader(key, value));
                response.writeHead(result.status);
                response.end(await result.text());
            });
        },
    };
}
