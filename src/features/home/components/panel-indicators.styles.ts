import { css, cva } from '@panda/css';

export const indicators = css({
    position: 'fixed',
    top: '50vh',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translateY(-50%)',
});

export const indicatorButton = css({
    display: 'block',
    p: '0.3rem 0',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '0.45rem',
    bg: 'transparent',
});

export const indicatorDot = cva({
    base: {
        display: 'block',
        width: '1rem',
        height: '1rem',
        fill: 'none',
        stroke: 'black',
        strokeWidth: 2,
        transition: 'width 200ms ease, height 200ms ease',
    },
    variants: {
        active: {
            true: { width: '1.25rem', height: '1.25rem' },
        },
    },
});
