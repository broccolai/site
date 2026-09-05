import { css } from '@panda/css';
export const lotusPage = css({
    position: 'relative',
    isolation: 'isolate',
    width: '100%',
    overflowX: 'clip',
    height: '100dvh',
    paddingTop: 'env(safe-area-inset-top)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr) auto',
    overflow: 'hidden',
    color: '#f7f8fb',
    backgroundColor: '#09101d',
    backgroundImage: 'url("/lotus/main-desktop-wallpaper.avif")',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    fontFamily: '"Segoe UI Variable", "Segoe UI", sans-serif',
    fontSmoothing: 'antialiased',
    textRendering: 'optimizeLegibility',
    '@media (prefers-reduced-motion: reduce)': {
        '& *, & *::before, & *::after': {
            scrollBehavior: 'auto',
            transitionDuration: '0.01ms',
            animationDuration: '0.01ms',
            animationIterationCount: '1',
        },
    },
});
export const lotusShell = css({ width: 'calc(100% - clamp(32px, 6vw, 96px))', marginInline: 'auto' });
export const lotusHeader = css({
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1',
    minHeight: '88px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
});
export const lotusBrand = css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '9px',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '26px',
    fontWeight: '600',
    letterSpacing: '-.02em',
    fontFamily: 'Fraunces, Georgia, serif',
});
export const lotusStage = css({
    display: 'grid',
    gridTemplateColumns: { base: 'minmax(0,1fr)', md: 'minmax(0,1fr) auto' },
    alignItems: 'center',
    justifyItems: 'center',
    gap: { base: '28px', md: 'clamp(48px,8vw,112px)' },
    width: { base: 'calc(100% - 32px)', md: 'min(1440px, calc(100% - 64px))' },
    marginInline: 'auto',
    minWidth: '0',
    minHeight: '100%',
    boxSizing: 'border-box',
    paddingBlock: 'clamp(24px,5svh,64px)',
    '@media (min-width: 1280px)': { width: 'min(1440px,80vw)' },
});
export const lotusMiddle = css({
    position: 'absolute',
    inset: '0',
    overflowY: 'auto',
    scrollSnapType: 'y mandatory',
    overscrollBehaviorY: 'none',
    scrollbarWidth: 'none',
    boxSizing: 'border-box',
    '&::-webkit-scrollbar': { display: 'none' },
});
export const lotusTrack = css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});
export const lotusPanel = css({
    width: '100%',
    height: '100%',
    minHeight: '0',
    flexShrink: 0,
    paddingTop: 'var(--lotus-header-height, 88px)',
    paddingBottom: 'var(--lotus-footer-height, 64px)',
    boxSizing: 'border-box',
    overflow: 'hidden',
    scrollSnapAlign: 'start',
    scrollSnapStop: 'always',
});
export const lotusPanelContent = css({ height: '100%', overflowY: 'auto' });
export const lotusCopy = css({
    position: 'relative',
    isolation: 'isolate',
    maxWidth: 'clamp(380px,34vw,600px)',
    justifySelf: { base: 'center', md: 'start' },
    textAlign: { base: 'center', md: 'left' },
    color: '#fff',
    _before: {
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        inset: '-40px -48px',
        borderRadius: '64px',
        background: 'rgba(9,16,29,.1)',
        filter: 'blur(36px)',
        pointerEvents: 'none',
    },
});
export const lotusHeadline = css({
    margin: '0',
    fontFamily: 'Fraunces, Georgia, serif',
    fontSize: 'clamp(2.25rem,4.5vw,5rem)',
    fontWeight: '500',
    lineHeight: '1.06',
    letterSpacing: '-.045em',
});
export const lotusInvitation = css({
    margin: '20px 0 0',
    paddingInlineStart: { base: '0', md: 'clamp(2px,.25vw,4px)' },
    fontSize: 'clamp(1rem,1.1vw,1.375rem)',
    lineHeight: '1.5',
});
export const lotusDemo = css({
    minWidth: '0',
    maxWidth: '100%',
    '@media (min-width: 1280px) and (min-height: 850px)': { zoom: '1.15' },
    '@media (min-width: 1600px) and (min-height: 950px)': { zoom: '1.25' },
    '@media (min-width: 1920px) and (min-height: 1050px)': { zoom: '1.4' },
    '@media (min-width: 2400px) and (min-height: 1200px)': { zoom: '1.65' },
});
export const lotusFooter = css({
    position: 'absolute',
    left: '0',
    right: '0',
    bottom: '0',
    zIndex: '1',
    minHeight: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    paddingBlock: '16px',
    color: 'rgba(247,248,251,.7)',
    fontSize: '12px',
});
export const lotusFooterLink = css({ color: '#fff', textDecoration: 'none', _hover: { textDecoration: 'underline' } });
export const lotusFooterLinks = css({ display: 'flex', alignItems: 'center', gap: '24px' });
export const lotusFooterButton = css({
    border: '0',
    padding: '0',
    color: '#fff',
    background: 'none',
    font: 'inherit',
    cursor: 'pointer',
    _hover: { textDecoration: 'underline' },
});
export const downloadLink = css({
    minHeight: '48px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    paddingInline: '20px',
    border: '1px solid transparent',
    borderRadius: '12px',
    color: '#3b3033',
    background: '#f5a5a5',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '650',
    transition: 'background 140ms ease, transform 140ms ease',
    _hover: { background: '#ffb3b3', transform: 'translateY(-1px)' },
});
