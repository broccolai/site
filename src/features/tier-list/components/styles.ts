import { styled } from '@panda/jsx';

export const Page = styled('div', {
    base: {
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '1rem',
        paddingTop: '10rem',
        display: 'grid',
        gap: '1rem',
    },
});

export const Grid = styled('div', {
    base: {
        display: 'grid',
        gap: '0.6rem',
    },
});

export const PoolRow = styled('div', {
    base: {
        display: 'grid',
        gridTemplateColumns: '1fr 140px',
        gap: '0.75rem',
        alignItems: 'stretch',
    },
});

export const OverlayWrap = styled('div', {
    base: {
        transform: 'scale(1.015)',
        transition: 'transform 120ms ease, filter 120ms ease',
        filter: 'drop-shadow(0 7px 12px rgba(0,0,0,0.18)) drop-shadow(0 2px 5px rgba(0,0,0,0.12))',
    },
});

export const TierRow = styled('section', {
    base: {
        display: 'grid',
        gridTemplateColumns: '92px 1fr',
        gap: '0.6rem',
        alignItems: 'stretch',
    },
});

export const TierLabel = styled('div', {
    base: {
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'PT Mono, ui-monospace, monospace',
        fontSize: '0.95rem',
        letterSpacing: '2px',
        userSelect: 'none',
    },
});

export const TierDrop = styled('div', {
    base: {
        borderRadius: '14px',
        border: '1px solid token(colors.gray)',
        minHeight: '74px',
        padding: '0.5rem',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        background: 'rgba(255,255,255,0.02)',
        transition: 'box-shadow 120ms ease, border-color 120ms ease',
    },
});

export const Pool = styled('div', {
    base: {
        borderRadius: '16px',
        border: '1px dashed token(colors.gray)',
        padding: '0.75rem',
        minHeight: '50px',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        transition: 'box-shadow 120ms ease, border-color 120ms ease',
    },
});
