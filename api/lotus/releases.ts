import type { Release } from '../../src/shared/lotus-release';

interface GitHubRelease {
    tag_name: string;
    html_url: string;
    body: string | null;
    published_at: string | null;
    draft: boolean;
    prerelease: boolean;
    assets: { name: string; browser_download_url: string }[];
}

const upstreamHeaders = () => {
    const token = process.env.LOTUS_GITHUB_TOKEN;
    return { Accept: 'application/vnd.github+json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

const mapRelease = (release: GitHubRelease): Release => {
    const installer = release.assets.find((asset) => asset.name.endsWith('-windows-x86_64-setup.exe'));
    return {
        version: release.tag_name,
        releaseUrl: release.html_url,
        installerUrl: installer?.browser_download_url ?? release.html_url,
        body: release.body ?? '',
        publishedAt: release.published_at ?? '',
    };
};

export async function GET() {
    const headers = upstreamHeaders();
    const signal = AbortSignal.timeout(8000);
    try {
        const [latestResponse, listResponse] = await Promise.all([
            fetch('https://api.github.com/repos/broccolai/lotus/releases/latest', { headers, signal }),
            fetch('https://api.github.com/repos/broccolai/lotus/releases?per_page=30', { headers, signal }),
        ]);
        if (!latestResponse.ok || !listResponse.ok) {
            throw new Error('GitHub request failed');
        }
        const [latest, releases] = (await Promise.all([latestResponse.json(), listResponse.json()])) as [GitHubRelease, GitHubRelease[]];
        const stable = releases
            .filter((release) => !release.draft && !release.prerelease && Number(release.tag_name.match(/^v?(\d+)\./)?.[1]) >= 1)
            .sort((left, right) => (right.published_at ?? '').localeCompare(left.published_at ?? ''))
            .slice(0, 10)
            .map(mapRelease);
        return Response.json(
            { latest: mapRelease(latest), releases: stable },
            {
                headers: {
                    'Cache-Control': 'public, max-age=0, must-revalidate',
                    'Vercel-CDN-Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
                },
            },
        );
    } catch {
        return Response.json({ error: 'Release information is unavailable.' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    }
}
