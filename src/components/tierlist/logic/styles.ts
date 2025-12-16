import { css } from '@panda/css';
import { styled } from '@panda/jsx';

export const page = css({
    width: '100%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '1rem',
    display: 'grid',
    gap: '1rem',
});

export const title = css({
    fontFamily: 'PT Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    fontSize: '1.2rem',
});

export const controls = css({
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
});

export const grid = css({
    display: 'grid',
    gap: '0.6rem',
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
