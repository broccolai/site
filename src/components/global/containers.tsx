import { styled } from '@panda/jsx';
import { TITLE_FONTS } from './typography.tsx';

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
        fontFamily: TITLE_FONTS,
        alignContent: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        padding: '4px',
        height: '5vh',
        width: '95vw',
        maxWidth: '800px',
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

export const ChildFlexSection = styled(FlexSection, {
    base: {
        alignItems: 'stretch !important',
        borderRadius: '2rem 2rem 0 0',
        justifyContent: 'space-evenly !important',
        marginTop: '-5rem',
        position: 'relative',
    },
});

export const FullPageContent = styled(FlexSection, {
    base: {
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
    },
});
