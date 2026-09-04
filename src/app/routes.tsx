import type { JSX } from '@solidjs/web';
import { HomePage } from '@/features/home';
import { LotusPage } from '@/features/lotus';
import { centeredPage } from '@/shared/ui/page-shell';
import { defaultPageMetadata, type PageMetadata, pageTitle } from './site-metadata';

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
        metadata: defaultPageMetadata,
        page: HomePage,
    },
    {
        path: '/lotus',
        metadata: { title: pageTitle('lotus'), description: 'Lotus dock and app search demo.' },
        page: LotusPage,
    },
];

const notFoundRoute: SiteRoute = {
    path: '',
    metadata: { title: pageTitle('Page not found'), description: 'The requested page could not be found.' },
    page: unavailablePage('Page not found', 'The requested page could not be found.'),
};

const normalizePath = (path: string): string => {
    if (path === '/') return path;

    return path.replace(/\/+$/, '');
};

export const matchRoute = (path: string): SiteRoute => routes.find((route) => route.path === normalizePath(path)) ?? notFoundRoute;
