import { styled } from '@panda/jsx';
import { MONO_FONT_FAMILY, UI_FONT_FAMILY } from '@/shared/ui/primitives';

const TIER_CARD_BLOCK_SIZE = '4.375rem';
const TIER_ROW_PADDING = '0.5rem';
const TIER_ROW_BLOCK_SIZE = `calc(${TIER_CARD_BLOCK_SIZE} + (${TIER_ROW_PADDING} * 2) + 2px)`;

export const CardShell = styled('div', {
    base: {
        position: 'relative',
        boxSizing: 'border-box',
        minWidth: '150px',
        height: TIER_CARD_BLOCK_SIZE,
        minHeight: TIER_CARD_BLOCK_SIZE,
        maxWidth: '230px',
        borderRadius: '0.42rem',
        overflow: 'hidden',
        background: '#fcfbf7',
        boxShadow: 'inset 0 0 0 1px rgba(9, 11, 16, 0.12)',
        display: 'grid',
        userSelect: 'none',
    },
});

export const CardBody = styled('div', {
    base: {
        boxSizing: 'border-box',
        height: '100%',
        padding: '0.62rem 0.8rem 0.68rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const CardText = styled('div', {
    base: {
        width: '100%',
        fontFamily: UI_FONT_FAMILY,
        fontSize: '0.9rem',
        lineHeight: '1',
        letterSpacing: '-0.045em',
        textTransform: 'uppercase',
        color: '#251f22',
        overflowWrap: 'anywhere',
        textAlign: 'center',
    },
});

export const PlaceholderShell = styled(CardShell, {
    base: {
        background: 'rgba(9, 11, 16, 0.04)',
        boxShadow: 'inset 0 0 0 1px rgba(9, 11, 16, 0.1)',
    },
});

export const PlaceholderText = styled('div', {
    base: {
        width: '100%',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.5rem',
        lineHeight: '1.3',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.42)',
        textAlign: 'center',
    },
});

export const TierRowShell = styled('section', {
    base: {
        display: 'grid',
        gridTemplateColumns: '90px minmax(0, 1fr)',
        gap: '0.45rem',
        alignItems: 'stretch',
        '@media (max-width: 720px)': {
            gridTemplateColumns: '1fr',
            gap: '0.45rem',
        },
    },
});

export const TierLabel = styled('div', {
    base: {
        position: 'relative',
        boxSizing: 'border-box',
        borderRadius: '0.45rem',
        minHeight: TIER_ROW_BLOCK_SIZE,
        padding: '0.65rem 0.45rem',
        display: 'grid',
        placeItems: 'center',
        border: '1px solid rgba(9, 11, 16, 0.14)',
        boxShadow: 'none',
        background: 'rgba(255, 255, 255, 0.36)',
        '@media (max-width: 720px)': {
            minHeight: '3.15rem',
        },
    },
});

export const TierLabelRule = styled('div', {
    base: {
        position: 'absolute',
        left: '0.36rem',
        right: '0.36rem',
        bottom: '0.34rem',
        transform: 'none',
        width: 'auto',
        height: '4px',
        background: '#090b10',
        borderRadius: '999px',
    },
});

export const TierLabelLetter = styled('div', {
    base: {
        fontFamily: UI_FONT_FAMILY,
        fontSize: '1.12rem',
        lineHeight: '1',
        letterSpacing: '-0.04em',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#251f22',
    },
});

export const TierDrop = styled('div', {
    base: {
        boxSizing: 'border-box',
        minHeight: TIER_ROW_BLOCK_SIZE,
        borderRadius: '0.45rem',
        border: '1px solid rgba(9, 11, 16, 0.12)',
        background: 'rgba(255, 255, 255, 0.28)',
        padding: TIER_ROW_PADDING,
        display: 'flex',
        gap: '0.4rem',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        transition: 'border-color 120ms ease, background-color 120ms ease',
    },
});

export const OverlayWrap = styled('div', {
    base: {
        position: 'relative',
        zIndex: '2147483647',
        isolation: 'isolate',
        pointerEvents: 'none',
        transform: 'scale(1.015)',
        filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.12)) drop-shadow(0 3px 6px rgba(0,0,0,0.08))',
    },
});
