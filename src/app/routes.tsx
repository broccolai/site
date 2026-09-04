import type { JSX } from '@solidjs/web';
import { HomePage } from '@/features/home';
import { LotusPage } from '@/features/lotus';
import { centeredPage } from '@/shared/ui/page-shell';

export interface PageMetadata {
    description: string;
    title: string;
}

interface SiteRoute {
    metadata: PageMetadata;
    path: string;
    page: () => JSX.Element;
}

const unavailablePage = (title: string, message: string) => () => (
    <main class={centeredPage}>
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    </main>
);

const routes: SiteRoute[] = [
    {
        path: '/',
        metadata: { title: 'broccol.ai', description: "broccolai's personal page" },
        page: HomePage,
    },
    {
        path: '/lotus',
        metadata: { title: 'Lotus | broccol.ai', description: 'Lotus dock and app search demo.' },
        page: LotusPage,
    },
];

const notFoundRoute: SiteRoute = {
    path: '',
    metadata: { title: 'Page not found | broccol.ai', description: 'The requested page could not be found.' },
    page: unavailablePage('Page not found', 'The requested page could not be found.'),
};

const normalizePath = (path: string): string => {
    if (path === '/') return path;

    return path.replace(/\/+$/, '');
};

export const matchRoute = (path: string): SiteRoute => routes.find((route) => route.path === normalizePath(path)) ?? notFoundRoute;
