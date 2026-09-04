import '@/app/styles/global.css';
import { onSettled } from 'solid-js';
import { matchRoute } from '@/app/routes';
import { PageShell } from '@/shared/ui/page-shell';

export default function App() {
    const route = matchRoute(window.location.pathname);

    onSettled(() => {
        document.title = route.metadata.title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', route.metadata.description);
    });

    return <PageShell>{route.page()}</PageShell>;
}
