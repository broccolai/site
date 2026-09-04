import './lotus-fonts.css';
import { LotusPreview } from './components/lotus-preview';
import {
    downloadLink,
    lotusBrand,
    lotusCopy,
    lotusDemo,
    lotusFooter,
    lotusFooterLink,
    lotusFooterLinks,
    lotusHeader,
    lotusHeadline,
    lotusInvitation,
    lotusPage,
    lotusShell,
    lotusStage,
} from './lotus-page.styles';

import { createLatestRelease, repositoryUrl } from './release';

export default function LotusPage() {
    const release = createLatestRelease();

    return (
        <main class={lotusPage}>
            <header class={[lotusShell, lotusHeader]}>
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
            <section class={lotusStage}>
                <div class={lotusCopy}>
                    <h1 class={lotusHeadline}>Dock, Search, Alt-Tab Replacement</h1>
                    <p class={lotusInvitation}>Skip the pitch. Try the demo.</p>
                </div>
                <div class={lotusDemo}>
                    <LotusPreview />
                </div>
            </section>
            <footer class={[lotusShell, lotusFooter]}>
                <a class={lotusFooterLink} href={release().releaseUrl}>
                    {release().version}
                </a>
                <nav class={lotusFooterLinks}>
                    <a class={lotusFooterLink} href={repositoryUrl}>
                        GitHub
                    </a>
                </nav>
            </footer>
        </main>
    );
}
