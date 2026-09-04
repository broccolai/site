import { css } from '@panda/css';

export const banner = css({
    position: 'fixed',
    zIndex: 100,
    display: 'flex',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
});

export const header = css({ top: 0 });

export const bannerContent = css({
    display: 'grid',
    width: 'min(95vw, 800px)',
    minHeight: '3rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignItems: 'center',
    p: '4px',
});

export const headerTitle = css({ transition: 'opacity 0s ease-out 100ms' });
