import { createMemo } from 'solid-js';
import type { Release, ReleasesResponse } from '@/shared/lotus-release';

export const repositoryUrl = 'https://github.com/broccolai/lotus';
const latestReleaseUrl = `${repositoryUrl}/releases/latest`;
export interface ReleaseState extends ReleasesResponse {
    status: 'loading' | 'ready' | 'error';
}

export const fallbackRelease: Release = {
    version: 'Latest release',
    releaseUrl: latestReleaseUrl,
    installerUrl: latestReleaseUrl,
    body: '',
    publishedAt: '',
};

export function createReleases() {
    const loadingValue: ReleaseState = { latest: fallbackRelease, releases: [], status: 'loading' };
    return createMemo(
        async (): Promise<ReleaseState> => {
            try {
                const response = await fetch('/api/lotus/releases');
                if (!response.ok) {
                    return { latest: fallbackRelease, releases: [], status: 'error' };
                }
                const data: ReleasesResponse = await response.json();
                return { ...data, status: 'ready' };
            } catch {
                return { latest: fallbackRelease, releases: [], status: 'error' };
            }
        },
        { loadingValue, ssrSource: 'client' },
    );
}
