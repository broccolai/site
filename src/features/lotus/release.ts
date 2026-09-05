import { createMemo } from 'solid-js';

export const repositoryUrl = 'https://github.com/broccolai/lotus';
const latestReleaseUrl = `${repositoryUrl}/releases/latest`;
const fallbackRelease = {
    version: 'Latest release',
    releaseUrl: latestReleaseUrl,
    installerUrl: latestReleaseUrl,
    body: '',
    publishedAt: '',
};

interface GitHubRelease {
    tag_name: string;
    html_url: string;
    body: string | null;
    published_at: string | null;
    draft: boolean;
    prerelease: boolean;
    assets: { name: string; browser_download_url: string }[];
}

export interface Release {
    version: string;
    releaseUrl: string;
    installerUrl: string;
    body: string;
    publishedAt: string;
}

function mapRelease(release: GitHubRelease): Release {
    const installer = release.assets.find((asset) => asset.name.endsWith('-windows-x86_64-setup.exe'));
    return {
        version: release.tag_name,
        releaseUrl: release.html_url,
        installerUrl: installer?.browser_download_url ?? release.html_url,
        body: release.body ?? '',
        publishedAt: release.published_at ?? '',
    };
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
                return mapRelease(latest);
            } catch {
                return fallbackRelease;
            }
        },
        { loadingValue: fallbackRelease, ssrSource: 'client' },
    );
}

export function createRecentReleases() {
    return createMemo(
        async () => {
            try {
                const response = await fetch('https://api.github.com/repos/broccolai/lotus/releases?per_page=30', {
                    headers: { Accept: 'application/vnd.github+json' },
                });
                if (!response.ok) return [];

                const releases: GitHubRelease[] = await response.json();
                return releases
                    .filter((release) => !release.draft && !release.prerelease && Number(release.tag_name.match(/^v?(\d+)\./)?.[1]) >= 1)
                    .sort((left, right) => (right.published_at ?? '').localeCompare(left.published_at ?? ''))
                    .slice(0, 10)
                    .map(mapRelease);
            } catch {
                return [];
            }
        },
        { loadingValue: [], ssrSource: 'client' },
    );
}
