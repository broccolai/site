export interface PageMetadata {
    description: string;
    title: string;
}

export const siteName = 'broccoli';
export const pageTitle = (page: string) => `${page} | ${siteName}`;
export const defaultPageMetadata: PageMetadata = {
    title: siteName,
    description: "broccolai's personal page",
};
