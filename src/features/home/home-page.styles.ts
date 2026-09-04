import { css } from '@panda/css';

export const viewport = css({
    position: 'relative',
    height: '100dvh',
    overflow: 'hidden',
    touchAction: 'none',
});

export const panelContainer = css({
    position: 'relative',
    userSelect: 'none',
    transition: 'transform 800ms ease',
});

export const panel = css({
    position: 'relative',
    display: 'flex',
    width: '100vw',
    height: '100dvh',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
});

export const splash = css({ bg: 'smoke' });

export const splashContent = css({
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '-10vh',
});

export const splashTitle = css({
    m: 0,
    fontSize: 'clamp(2rem, 6vw, 4rem)',
    fontWeight: 200,
    textShadow: '2px 2px 0 {colors.purple}, 4px 4px 0 {colors.accent}',
});

export const separator = css({ letterSpacing: '2px' });

export const scrollIndicator = css({
    position: 'absolute',
    bottom: '15vh',
    width: '1.6rem',
    height: '1.6rem',
    color: 'soft',
    fill: 'none',
    stroke: 'currentcolor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 2,
    animation: 'home-bounce 1s ease-in infinite',
});

export const mintPanel = css({ bg: 'cyan' });
export const yellowPanel = css({ bg: '#fff8b2' });
