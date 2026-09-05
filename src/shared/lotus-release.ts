export interface Release {
    version: string;
    releaseUrl: string;
    installerUrl: string;
    body: string;
    publishedAt: string;
}

export interface ReleasesResponse {
    latest: Release;
    releases: Release[];
}
