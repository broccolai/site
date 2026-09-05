import './lotus-fonts.css';
import { createSignal, onSettled } from 'solid-js';
import { LotusChangelog } from './components/lotus-changelog';
import { LotusPreview } from './components/lotus-preview';
import {
    downloadLink,
    lotusBrand,
    lotusCopy,
    lotusDemo,
    lotusFooter,
    lotusFooterButton,
    lotusFooterLink,
    lotusFooterLinks,
    lotusHeader,
    lotusHeadline,
    lotusInvitation,
    lotusMiddle,
    lotusPage,
    lotusPanel,
    lotusPanelContent,
    lotusShell,
    lotusStage,
    lotusTrack,
} from './lotus-page.styles';
import { createLatestRelease, createRecentReleases, repositoryUrl } from './release';

export default function LotusPage() {
    const release = createLatestRelease();
    const releases = createRecentReleases();
    const [activePanel, setActivePanel] = createSignal(1);
    let container: HTMLDivElement | undefined;
    let header: HTMLElement | undefined;
    let footer: HTMLElement | undefined;
    onSettled(() => {
        const updateSize = () => {
            container?.style.setProperty('--lotus-header-height', `${header?.offsetHeight ?? 0}px`);
            container?.style.setProperty('--lotus-footer-height', `${footer?.offsetHeight ?? 0}px`);
        };
        const onScroll = () => {
            const element = container;
            if (!element?.clientHeight) return;
            setActivePanel(Math.min(2, Math.max(1, Math.round(element.scrollTop / element.clientHeight) + 1)));
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
            if (event.target instanceof Element) {
                if (event.target.closest('a, button, input, select, textarea, [contenteditable="true"]')) return;
                for (let element: Element | null = event.target; element && element !== container; element = element.parentElement) {
                    if (element.scrollHeight > element.clientHeight && /auto|scroll/.test(getComputedStyle(element).overflowY)) return;
                }
            }
            if (event.key === 'ArrowDown' || event.key === 'PageDown') {
                event.preventDefault();
                container?.scrollTo({
                    top: container.clientHeight,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                });
            } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
                event.preventDefault();
                container?.scrollTo({
                    top: 0,
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                });
            }
        };
        const observer = new ResizeObserver(updateSize);
        window.addEventListener('keydown', onKeyDown);
        container?.addEventListener('scroll', onScroll, { passive: true });
        if (header) observer.observe(header);
        if (footer) observer.observe(footer);
        updateSize();
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            container?.removeEventListener('scroll', onScroll);
            observer.disconnect();
        };
    });

    return (
        <main class={lotusPage}>
            <header ref={(element) => (header = element)} class={[lotusShell, lotusHeader]}>
                <a class={lotusBrand} href='/lotus'>
                    <img src='/lotus/lotus.png' alt='' width='28' height='28' />
                    lotus
                </a>
                <a class={downloadLink} href={release().installerUrl}>
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>
                        <path d='M12 3v12m0 0 4-4m-4 4-4-4M5 21h14' />
                    </svg>
                    Download
                </a>
            </header>
            <div class={lotusMiddle} ref={(element) => (container = element)}>
                <div class={lotusTrack}>
                    <section class={lotusPanel} inert={activePanel() === 2}>
                        <div class={lotusPanelContent}>
                            <div class={lotusStage}>
                                <div class={lotusCopy}>
                                    <h1 class={lotusHeadline}>Dock, Search, Alt-Tab Replacement</h1>
                                    <p class={lotusInvitation}>Skip the pitch. Try the demo.</p>
                                </div>
                                <div class={lotusDemo}>
                                    <LotusPreview />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class={lotusPanel} inert={activePanel() === 1}>
                        <LotusChangelog releases={releases().length ? releases() : [release()]} />
                    </section>
                </div>
            </div>
            <footer ref={(element) => (footer = element)} class={[lotusShell, lotusFooter]}>
                <button
                    class={lotusFooterButton}
                    type='button'
                    onClick={() =>
                        container?.scrollTo({
                            top: activePanel() === 1 ? container.clientHeight : 0,
                            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                        })
                    }
                >
                    {activePanel() === 1 ? `${release().version} · what’s new ↓` : 'back to demo ↑'}
                </button>
                <nav class={lotusFooterLinks}>
                    <a class={lotusFooterLink} href={repositoryUrl}>
                        GitHub
                    </a>
                </nav>
            </footer>
        </main>
    );
}
