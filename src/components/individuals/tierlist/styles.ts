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

export const headerRow = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingTop: '5rem',
    gap: '0.75rem',
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

export const hint = css({
    fontFamily: 'Open Sans, system-ui, sans-serif',
    color: 'token(colors.soft)',
    fontSize: '0.9rem',
    lineHeight: 1.4,
    maxWidth: '900px',
});

export const spacer = css({ marginTop: '0.5rem' });

export const poolTitle = css({
    fontFamily: 'PT Mono, ui-monospace, monospace',
    letterSpacing: '2px',
    marginBottom: '0.4rem',
});

export const emptyText = css({
    color: 'token(colors.soft)',
    fontFamily: 'PT Mono, ui-monospace, monospace',
    padding: '0.35rem 0.5rem',
});

export const TextArea = styled('textarea', {
    base: {
        width: 'min(560px, 90vw)',
        minHeight: '92px',
        padding: '0.75rem',
        borderRadius: '12px',
        border: '1px solid token(colors.gray)',
        fontFamily: 'Open Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        resize: 'vertical',
        outline: 'none',
        _focus: {
            borderColor: 'token(colors.purple)',
            boxShadow: '0 0 0 3px rgba(123, 31, 162, 0.2)',
        },
    },
});

export const Button = styled('button', {
    base: {
        padding: '0.6rem 0.9rem',
        borderRadius: '999px',
        border: '1px solid token(colors.gray)',
        background: 'token(colors.smoke)',
        cursor: 'pointer',
        fontFamily: 'PT Mono, ui-monospace, monospace',
        letterSpacing: '1px',
        _hover: { transform: 'translateY(-1px)' },
        _active: { transform: 'translateY(0px)' },
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

export const Card = styled('div', {
    base: {
        borderRadius: '14px',
        color: 'rgba(0,0,0,0.92)',
        padding: '0.75rem 0.85rem',
        minWidth: '160px',
        minHeight: '64px',
        cursor: 'grab',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        _active: { cursor: 'grabbing' },
    },
});

export const Name = styled('div', {
    base: {
        fontFamily: 'PT Mono, ui-monospace, monospace',
        letterSpacing: '1px',
        fontSize: '0.95rem',
        lineHeight: 1.15,
        // don't force lowercase; keep whatever user typed
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '260px',
    },
});
