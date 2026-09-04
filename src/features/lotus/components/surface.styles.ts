import { css } from '@panda/css';

export const lotusSurface = css({
    '--preview-text': 'rgba(247, 248, 251, 0.96)',
    '--preview-muted': 'rgba(247, 248, 251, 0.80)',
    '--preview-accent': '#f5a5a5',
    '--preview-border': 'rgba(255, 255, 255, 0.085)',
    '--preview-selected': 'rgba(245, 165, 165, 0.14)',
    color: 'var(--preview-text)',
    colorScheme: 'dark',
    fontFamily: '"Segoe UI Variable", "Segoe UI", sans-serif',
    backgroundColor: 'rgba(25, 28, 34, 0.94)',
    backdropFilter: 'blur(24px) saturate(150%)',
    '@supports (backdrop-filter: blur(1px))': { backgroundColor: 'rgba(25, 28, 34, 0.72)' },
    borderRadius: '8px',
    isolation: 'isolate',
});
