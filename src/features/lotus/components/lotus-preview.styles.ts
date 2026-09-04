import { css } from '@panda/css';
export const previewLayout = css({
    position: 'relative',
    width: 'max-content',
    maxWidth: '100%',
    minWidth: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'clamp(28px, 5svh, 48px)',
});
export const searchSlot = css({ width: '100%', contain: 'inline-size' });
