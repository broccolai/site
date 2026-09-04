import { createMemo } from 'solid-js';

export const repositoryUrl = 'https://github.com/broccolai/lotus';
const latestReleaseUrl = `${repositoryUrl}/releases/latest`;
const fallbackRelease = {
    version: 'Latest release',
    releaseUrl: latestReleaseUrl,
    installerUrl: latestReleaseUrl,
};

interface GitHubRelease {
    tag_name: string;
    html_url: string;
    assets: { name: string; browser_download_url: string }[];
}

export function createLatestRelease() {
    return createMemo(
        async () => {
            try {
                const response = await fetch('https://api.github.com/repos/broccolai/lotus/releases/latest', {
                    headers: { Accept: 'application/vnd.github+json' },
                });
                if (!response.ok) return fallbackRelease;

                const latest: GitHubRelease = await response.json();
                const installer = latest.assets.find((asset) => asset.name.endsWith('-windows-x86_64-setup.exe'));
                return {
                    version: latest.tag_name,
                    releaseUrl: latest.html_url,
                    installerUrl: installer?.browser_download_url ?? latest.html_url,
                };
            } catch {
                return fallbackRelease;
            }
        },
        { loadingValue: fallbackRelease, ssrSource: 'client' },
    );
}
