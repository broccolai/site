import { createSignal, onSettled } from 'solid-js';

export const repositoryUrl = 'https://github.com/broccolai/lotus';
const latestReleaseUrl = `${repositoryUrl}/releases/latest`;

interface GitHubRelease {
    tag_name: string;
    html_url: string;
    assets: { name: string; browser_download_url: string }[];
}

export function createLatestRelease() {
    const [release, setRelease] = createSignal({
        version: 'Latest release',
        releaseUrl: latestReleaseUrl,
        installerUrl: latestReleaseUrl,
    });

    onSettled(() => {
        const controller = new AbortController();

        const load = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/broccolai/lotus/releases/latest', {
                    headers: { Accept: 'application/vnd.github+json' },
                    signal: controller.signal,
                });
                if (!response.ok) return;

                const latest: GitHubRelease = await response.json();
                const installer = latest.assets.find((asset) => asset.name.endsWith('-windows-x86_64-setup.exe'));
                if (controller.signal.aborted) return;

                setRelease({
                    version: latest.tag_name,
                    releaseUrl: latest.html_url,
                    installerUrl: installer?.browser_download_url ?? latest.html_url,
                });
            } catch {
                return;
            }
        };

        void load();
        return () => controller.abort();
    });

    return release;
}
