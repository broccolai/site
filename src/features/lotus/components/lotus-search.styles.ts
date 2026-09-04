import { css } from '@panda/css';
export const searchPanel = css({ width: '100%', maxWidth: '560px', paddingTop: '12px' });
export const searchQuery = css({
    marginInline: '12px',
    minHeight: '50px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '13px',
    background: 'rgba(255,255,255,.055)',
    border: '1px solid var(--preview-border)',
    borderRadius: '5px',
    fontSize: '1.125rem',
    lineHeight: '1.5',
    transition: 'border-color 120ms ease',
    _focusWithin: { borderColor: 'rgba(255,255,255,.24)' },
    overflowWrap: 'anywhere',
});
export const searchGlyph = css({
    flexShrink: '0',
    width: '17px',
    height: '17px',
    backgroundColor: 'var(--preview-muted)',
    mask: 'url(/lotus/app-icons/search.svg) center / contain no-repeat',
});
export const inputStyle = css({
    minWidth: '0',
    width: '100%',
    padding: '0',
    border: '0',
    outline: 'none',
    background: 'transparent',
    color: 'inherit',
    font: 'inherit',
    caretColor: 'var(--preview-accent)',
    _placeholder: { color: 'var(--preview-muted)' },
});
export const resultList = css({ display: 'flex', flexDirection: 'column', listStyle: 'none', margin: '6px 0 0', padding: '0 12px 10px' });
export const resultRow = css({
    width: '100%',
    textAlign: 'left',
    color: 'inherit',
    font: 'inherit',
    background: 'transparent',
    minHeight: '54px',
    marginBlock: '2px',
    padding: '5px 12px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid transparent',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover:not([data-selected=true])': { background: 'rgba(255,255,255,.085)' },
    '&[data-selected=true]': { background: 'var(--preview-selected)', borderColor: 'rgba(255,255,255,.14)' },
});
export const iconColumn = css({ display: 'flex', alignItems: 'center', width: '38px', flexShrink: '0' });
export const resultName = css({ fontSize: '0.90625rem', lineHeight: '1.5', overflowWrap: 'anywhere' });
export const emptyResults = css({
    minHeight: '58px',
    display: 'grid',
    placeItems: 'center',
    color: 'var(--preview-muted)',
    fontSize: '0.875rem',
});
export const searchFooter = css({
    marginInline: '12px',
    minHeight: '38px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    borderTop: '1px solid var(--preview-border)',
    fontSize: '0.78125rem',
    color: 'var(--preview-muted)',
});
export const footerLabel = css({ color: 'var(--preview-accent)', fontWeight: '600' });
export const clock = css({ fontVariantNumeric: 'tabular-nums' });
