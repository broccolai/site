import { css } from '@panda/css';

export const changelogSurface = css({
    width: 'min(800px, calc(100% - 32px))',
    height: '100%',
    minHeight: '0',
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    overflow: 'hidden',
    marginInline: 'auto',
    padding: 'clamp(24px, 5vw, 48px)',
});
export const changelogTitle = css({
    margin: '0 0 28px',
    fontFamily: 'Fraunces, Georgia, serif',
    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
    fontWeight: '500',
    letterSpacing: '-.045em',
});
export const changelogReleaseHeader = css({
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: '16px',
    marginBottom: '18px',
});
export const changelogDate = css({ color: 'var(--preview-muted)', fontSize: '12px', whiteSpace: 'nowrap' });
export const changelogRelease = css({
    margin: '0 0 28px',
    paddingBottom: '28px',
    borderBottom: '1px solid var(--preview-border)',
    '&:last-child': { marginBottom: '0', paddingBottom: '0', borderBottom: '0' },
});
export const changelogReleaseTitle = css({ margin: '0', fontSize: '15px', fontWeight: '600' });
export const changelogContent = css({
    minHeight: '0',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(245, 165, 165, .4) transparent',
    scrollbarGutter: 'stable',
    paddingRight: '16px',
    fontSize: '14px',
    lineHeight: '1.55',
    overflowWrap: 'anywhere',
});
export const changelogParagraph = css({ margin: '0 0 14px', whiteSpace: 'pre-wrap', '&:last-child': { marginBottom: '0' } });
export const changelogItem = css({
    display: 'grid',
    gridTemplateColumns: '64px minmax(0, 1fr)',
    alignItems: 'baseline',
    gap: '12px',
    margin: '0 0 12px',
    whiteSpace: 'pre-wrap',
    '&:last-child': { marginBottom: '0' },
});
export const changelogBadge = css({
    padding: '2px 6px',
    borderRadius: '4px',
    color: '#f8c3c3',
    background: 'rgba(245, 165, 165, .14)',
    fontSize: '10px',
    lineHeight: '1.2',
    letterSpacing: '.02em',
    justifySelf: 'start',
});
export const changelogItemUnprefixed = css({ gridTemplateColumns: 'minmax(0, 1fr)' });
export const changelogFallback = css({ margin: '0', color: 'var(--preview-muted)' });
