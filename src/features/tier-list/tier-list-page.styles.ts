import { css } from '@panda/css';

const accent = '#f5a5a5';
const paper = '#ffffff';
const ink = '#1c1e20';
const mono = '"PT Mono", monospace';
const serif = 'Georgia, "Times New Roman", serif';
const rule = `1px solid ${ink}`;

export const page = css({
    minHeight: '100dvh',
    overflowX: 'clip',
    padding: '.75rem',
    color: ink,
    background: accent,
    fontFamily: mono,
});
export const sheet = css({
    width: 'min(1240px, 100%)',
    minHeight: 'calc(100dvh - 1.5rem)',
    marginInline: 'auto',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
    background: paper,
    border: rule,
});
export const header = css({
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gap: '.75rem',
    padding: '1rem 1.5rem',
    color: ink,
    background: accent,
    boxShadow: `0 4px 0 ${ink}`,
    overflow: 'hidden',
    _after: {
        content: '""',
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.2,
        backgroundImage: `radial-gradient(${paper} 1px, transparent 1px)`,
        backgroundSize: '6px 6px',
    },
});
export const heroNav = css({
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '.35rem',
    fontSize: '.62rem',
    lineHeight: 1.4,
    letterSpacing: '.04em',
    '& span': { padding: '.25rem .45rem', border: rule },
    '& span:last-child': { marginInlineStart: { base: '0', sm: 'auto' } },
});
export const title = css({
    position: 'relative',
    zIndex: 1,
    m: 0,
    color: ink,
    fontFamily: serif,
    fontSize: 'clamp(3.5rem, 9dvh, 5rem)',
    fontWeight: '900',
    lineHeight: '.8',
    letterSpacing: '-.09em',
});
export const headerMeta = css({
    position: 'relative',
    zIndex: 1,
    maxWidth: '30rem',
    fontSize: '.72rem',
    lineHeight: 1.5,
    textTransform: 'lowercase',
});
export const body = css({
    display: 'grid',
    gap: 0,
    padding: '0 1.5rem',
    color: ink,
    background: paper,
    '@media (min-width: 48rem)': { gridTemplateColumns: 'minmax(0, 1fr) 17rem', columnGap: '1.5rem' },
    '@media (min-width: 72rem)': { gridTemplateColumns: 'minmax(0, 1fr) 20rem' },
});
export const ranking = css({ minWidth: 0 });
export const rows = css({ display: 'grid', minHeight: '100%', gridTemplateRows: 'repeat(7, minmax(3.5rem, auto))' });
export const row = css({
    display: 'grid',
    gridTemplateColumns: '3.5rem minmax(0, 1fr) auto',
    gap: { base: '.5rem', md: '1rem' },
    minHeight: '3.5rem',
    borderBottom: rule,
    transition: 'background-color 120ms',
    '&:last-child': { borderBottom: 0 },
});
export const label = css({
    display: 'grid',
    placeItems: 'center',
    color: ink,
    fontFamily: serif,
    fontSize: '2rem',
    fontWeight: '900',
    lineHeight: 0.8,
    letterSpacing: '-.1em',
});
export const rowMeta = css({
    display: 'block',
    alignSelf: 'center',
    minWidth: '1.5rem',
    fontSize: '.72rem',
    lineHeight: 1.5,
    textAlign: 'right',
});
export const dropzone = css({
    minWidth: 0,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    gap: { base: '.5rem', md: '1rem' },
    paddingBlock: '.5rem',
    transition: 'background-color 120ms',
});
export const activeDrop = css({ background: 'rgba(245, 165, 165, .28)' });
export const entryTarget = css({ display: 'inline-flex', maxWidth: '100%' });
export const card = css({
    width: 'fit-content',
    minWidth: 'min(8.5rem, 100%)',
    maxWidth: 'min(16rem, 100%)',
    minHeight: '2rem',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem .65rem',
    border: rule,
    borderLeft: `4px solid ${accent}`,
    borderRadius: 0,
    color: ink,
    background: paper,
    fontSize: '.72rem',
    lineHeight: 1.45,
    overflowWrap: 'anywhere',
    textTransform: 'lowercase',
    userSelect: 'none',
    touchAction: 'none',
    cursor: 'grab',
    transition: 'background-color 120ms, border-color 120ms',
    _hover: { background: accent, borderColor: accent },
    _active: { cursor: 'grabbing', background: accent },
});
export const ghost = css({ opacity: 0, pointerEvents: 'none' });
export const placeholder = css({
    display: 'grid',
    placeItems: 'center',
    width: '8.5rem',
    maxWidth: '100%',
    minHeight: '2rem',
    border: `1px dashed ${ink}`,
    color: ink,
    fontSize: '.62rem',
    lineHeight: 1.4,
    opacity: 0.7,
    pointerEvents: 'none',
});
export const sidebar = css({
    display: 'grid',
    gridTemplateRows: 'minmax(min-content, 1fr) auto auto',
    minWidth: 0,
    paddingBlock: '1.5rem',
    gap: '.75rem',
    '@media (min-width: 48rem)': { borderLeft: rule, paddingInlineStart: '1.5rem' },
});
export const panel = css({ minWidth: 0, paddingBottom: '.75rem', borderBottom: `1px dashed ${ink}` });
export const poolPanel = css({ display: 'grid', gridTemplateRows: 'auto auto 1fr' });
export const utilityPanel = css({ borderBottom: 0, paddingBottom: 0 });
export const sectionHeading = css({
    m: 0,
    color: ink,
    fontFamily: serif,
    fontSize: '1.15rem',
    fontWeight: '700',
    lineHeight: 1.2,
    textTransform: 'lowercase',
});
export const hint = css({ margin: '.25rem 0 .5rem', fontSize: '.68rem', lineHeight: 1.5, opacity: 0.75 });
export const intakeContent = css({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 5rem',
    minWidth: 0,
    border: rule,
    '& textarea': { border: 0 },
    '& button': {
        width: '100%',
        height: '100%',
        paddingInline: '.75rem',
        textAlign: 'center',
        background: accent,
        border: 0,
        borderLeft: rule,
        _hover: { borderColor: accent },
    },
});
export const textarea = css({
    width: '100%',
    minHeight: '5rem',
    boxSizing: 'border-box',
    padding: '.75rem',
    resize: 'none',
    border: rule,
    borderRadius: 0,
    outline: 'none',
    color: ink,
    background: paper,
    fontFamily: mono,
    fontSize: '.72rem',
    lineHeight: 1.55,
    _focusVisible: { outline: `1px solid ${accent}`, outlineOffset: '3px' },
    '&::placeholder': { color: ink, opacity: 0.55 },
});
export const actionButton = css({
    width: 'fit-content',
    minHeight: '2rem',
    appearance: 'none',
    padding: '.45rem .7rem',
    border: rule,
    borderRadius: 0,
    color: ink,
    background: 'transparent',
    fontFamily: mono,
    fontSize: '.68rem',
    lineHeight: 1.4,
    textAlign: 'left',
    cursor: 'pointer',
    _hover: { color: ink, background: accent, borderColor: accent },
    _focusVisible: { outline: `1px solid ${ink}`, outlineOffset: '3px' },
});
export const poolContent = css({
    minWidth: 0,
    display: 'grid',
    '& [data-drop-kind=end]': { padding: 0, alignContent: 'start', minHeight: '4rem' },
});
export const utilityContent = css({ display: 'grid', gap: '.75rem', minWidth: 0 });
export const actionGrid = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '.5rem',
    '& button': { width: '100%', textAlign: 'center' },
});
export const voidBox = css({
    width: '100%',
    minHeight: '4.5rem',
    boxSizing: 'border-box',
    display: 'grid',
    placeItems: 'center',
    padding: '1rem',
    border: rule,
    color: ink,
    background: `radial-gradient(${paper} 1px, transparent 1px), ${accent}`,
    backgroundSize: '6px 6px',
    fontSize: '.68rem',
    lineHeight: 1.5,
    transition: 'background-color 120ms, color 120ms',
    '& span': { padding: '.25rem .5rem', border: rule, background: paper },
});
export const activeVoid = css({
    background: ink,
    borderColor: ink,
    '& span': { color: ink, background: accent, borderColor: accent },
});
export const status = css({ paddingTop: '.25rem', fontSize: '.58rem', lineHeight: 1.45, overflowWrap: 'anywhere' });
export const footer = css({
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: '.75rem',
    minHeight: '2.75rem',
    alignItems: 'center',
    padding: '.75rem 1.5rem',
    borderTop: rule,
    fontSize: '.62rem',
    lineHeight: 1.4,
});
export const footerCenter = css({ textAlign: 'center' });
export const footerRight = css({ textAlign: 'right' });
export const hiddenInput = css({ display: 'none' });
export const overlay = css({ position: 'fixed', zIndex: 1000, pointerEvents: 'none', boxSizing: 'border-box', cursor: 'grabbing' });
