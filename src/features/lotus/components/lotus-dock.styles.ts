import { css } from '@panda/css';
export const dock = css({ display: 'flex', alignItems: 'center', width: 'max-content', padding: '8px 12px' });
export const dockApps = css({ display: 'flex', listStyle: 'none', margin: '0', padding: '0' });
export const dockItem = css({ position: 'relative', display: 'flex', flexShrink: '0' });
export const dockButton = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    border: '0',
    borderRadius: '5px',
    background: 'transparent',
    color: 'inherit',
    cursor: 'pointer',
    width: '54px',
    height: '38px',
    '& > span': {
        pointerEvents: 'none',
        transform: 'translateY(0) scale(1)',
        transition: 'transform 145ms cubic-bezier(.333,1,.667,1), opacity 80ms cubic-bezier(.333,1,.667,1)',
    },
    '@media (hover: hover)': { '&:hover:where(:not(:active)) > span': { transform: 'translateY(-2.5px)' } },
    '&:active > span': { transform: 'translateY(1px) scale(.95)', opacity: '.9', transitionDuration: '80ms' },
    '@media (prefers-reduced-motion: reduce)': { '& > span, &:hover > span, &:active > span': { transition: 'none', transform: 'none' } },
    '@media (max-width: 400px)': { width: '40px', paddingInline: '1px' },
});
export const dockDivider = css({ width: '2px', height: '18px', marginInline: '8px', background: 'rgba(255,255,255,.105)' });
export const runningIndicator = css({
    position: 'absolute',
    left: 'calc(50% - 4px)',
    bottom: '-8px',
    width: '8px',
    height: '2px',
    borderRadius: '1px',
    opacity: '.72',
    background: 'var(--preview-accent)',
});
