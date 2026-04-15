export const SITE = {
    name: 'broccol.ai',
    description: "broccolai's personal page",
    preconnectOrigins: ['https://tickets.broccol.ai'],
} as const;

export const PAGE_CHROME = {
    home: {
        headerTitle: 'josh',
        alwaysShowHeader: false,
        panelCount: 3,
    },
    tierList: {
        headerTitle: '// tier list',
        alwaysShowHeader: true,
    },
} as const;

export type PageChromeKey = keyof typeof PAGE_CHROME;

export const getPageChrome = <T extends PageChromeKey>(key: T) => PAGE_CHROME[key];
