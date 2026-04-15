import { styled } from '@panda/jsx';
import { MONO_FONT_FAMILY } from '@/shared/ui/primitives/typography';

export const PAGE_BANNER_HEIGHT = '3rem';

export const PageBanner = styled('section', {
    base: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        zIndex: '100',
    },
});

export const PageBannerContent = styled('section', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        alignItems: 'center',
        boxSizing: 'border-box',
        minHeight: PAGE_BANNER_HEIGHT,
        height: PAGE_BANNER_HEIGHT,
        padding: '4px',
        width: 'min(95vw, 800px)',
    },
});

export const FlexSection = styled('section', {
    base: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
