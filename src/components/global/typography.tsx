import { styled } from '@panda/jsx';

export const TITLE_FONTS =
    'PT Mono, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

export const REGULAR_FONTS =
    'Open Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

export const H2 = styled('h1', {
    base: {
        fontFamily: TITLE_FONTS,
        fontSize: 'clamp(1.4rem, 4vw, 2.4rem)',
        margin: '0',

        textAlign: 'center',
    },
});

export const H3 = styled('h3', {
    base: {
        color: 'white',
        fontFamily: TITLE_FONTS,
        fontSize: 'clamp(1rem, 8vw, 1.8rem)',
        letterSpacing: '4px',
        margin: '0',
        textAlign: 'center',
    },
});

export const H4 = styled('h4', {
    base: {
        fontFamily: REGULAR_FONTS,
        fontSize: 'clamp(1rem, 5vw, 2rem)',
        fontWeight: '600',
        margin: '0',

        textAlign: 'center',
    },
});

export const Bold = styled('b', {
    base: {
        fontFamily: REGULAR_FONTS,
        lineHeight: 3,
    },
});

export const Text = styled('p', {
    base: {
        fontFamily: REGULAR_FONTS,
        lineHeight: 1.6,
        margin: 0,
    },
});

export const FooterText = styled('p', {
    base: {
        bottom: '0',
        color: 'soft',
        fontFamily: REGULAR_FONTS,
        fontSize: '0.8rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
        lineHeight: 1,
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
    },
});
