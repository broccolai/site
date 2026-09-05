import { css } from '@panda/css';

const accent = 'var(--tier-accent)';
const paper = '#ffffff';
const mono = '"PT Mono", monospace';
const serif = '"Instrument Serif", Georgia, serif';

export const page = css({
    '--tier-accent': '#f5a5a5',
    minHeight: '100dvh',
    overflowX: 'clip',
    color: accent,
    background: paper,
    fontFamily: mono,
});
export const sheet = css({
    width: '100%',
    minHeight: '100dvh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    background: paper,
});
export const header = css({
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    color: accent,
    background: paper,
    overflow: 'hidden',
});
export const title = css({
    position: 'relative',
    zIndex: 1,
    m: 0,
    color: accent,
    fontFamily: '"Instrument Serif", serif',
    fontSize: 'clamp(8rem, 23vw, 14rem)',
    fontWeight: '400',
    lineHeight: 0.72,
    transform: 'translateY(.025em)',
    letterSpacing: '-.035em',
    whiteSpace: 'nowrap',
});
export const body = css({
    display: 'grid',
    gap: 0,
    padding: 0,
    color: accent,
    background: paper,
    '@media (min-width: 48rem)': { gridTemplateColumns: 'minmax(0, 1fr) 20rem' },
    '@media (min-width: 72rem)': { gridTemplateColumns: 'minmax(0, 1fr) 22rem' },
});
export const ranking = css({ minWidth: 0 });
export const rows = css({ display: 'grid', minHeight: '100%', gridTemplateRows: 'repeat(7, minmax(3.5rem, auto))' });
export const row = css({
    position: 'relative',
    paddingInline: 0,
    display: 'grid',
    gridTemplateColumns: '5rem minmax(0, 1fr)',
    columnGap: 0,
    minHeight: '3.5rem',
    background: 'var(--row-fill, #fff)',
    transition: 'background-color 120ms',
    _hover: { background: accent, color: paper, '--card-fill': paper, '--card-ink': accent },
});
export const label = css({
    display: 'grid',
    placeItems: 'center',
    alignSelf: 'stretch',
    color: 'inherit',
    background: 'transparent',
    fontFamily: serif,
    fontSize: '3.25rem',
    fontWeight: '400',
    lineHeight: 0.8,
});
export const dropzone = css({
    minWidth: 0,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignContent: 'center',
    gap: { base: '.5rem', md: '1rem' },
    padding: '.75rem 1.5rem',
    transition: 'background-color 120ms',
});
export const activeDrop = css({ '--row-fill': accent, color: paper, '--card-fill': paper, '--card-ink': accent });
export const entryTarget = css({ display: 'inline-flex', maxWidth: '100%' });
export const card = css({
    width: 'fit-content',
    minWidth: 0,
    maxWidth: 'min(16rem, 100%)',
    minHeight: '2.5rem',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem .65rem',
    color: 'var(--card-ink, #fff)',
    background: `var(--card-fill, ${accent})`,
    fontSize: '.75rem',
    lineHeight: 1.45,
    overflowWrap: 'anywhere',
    textTransform: 'lowercase',
    userSelect: 'none',
    touchAction: 'none',
    cursor: 'grab',
    transition: 'background-color 120ms',
    _before: {
        content: '""',
        width: '6px',
        height: '12px',
        flexShrink: 0,
        marginRight: '.5rem',
        backgroundImage: 'radial-gradient(currentColor .8px, transparent .8px)',
        backgroundSize: '3px 4px',
        opacity: 0.45,
    },
    _hover: { background: paper, color: accent },
    _active: { cursor: 'grabbing' },
});
export const ghost = css({ opacity: 0, pointerEvents: 'none' });
export const placeholder = css({
    display: 'grid',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    minHeight: '2.5rem',
    color: 'inherit',
    fontSize: '.72rem',
    lineHeight: 1.4,
    pointerEvents: 'none',
});
export const sidebar = css({
    display: 'grid',
    gridTemplateRows: 'minmax(min-content, 1fr) auto auto',
    background: paper,
    minWidth: 0,
    padding: '1.5rem',
    gap: '1.5rem',
});
export const panel = css({ minWidth: 0 });
export const poolPanel = css({ display: 'grid', gridTemplateRows: 'auto 1fr', gap: '.5rem' });
export const utilityPanel = css({ borderBottom: 0, paddingBottom: 0 });
export const sectionHeading = css({
    m: 0,
    color: accent,
    fontFamily: serif,
    fontSize: '1.6rem',
    fontWeight: '400',
    lineHeight: 1.2,
    textTransform: 'lowercase',
});
export const intakeContent = css({
    marginTop: '.5rem',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 5rem',
    minWidth: 0,
    border: `1px solid ${accent}`,
    '& textarea': { border: 0 },
    '& button': {
        width: '100%',
        height: '100%',
        paddingInline: '.75rem',
        textAlign: 'center',
        background: accent,
        color: paper,
        border: 0,
        _hover: { background: paper, color: accent },
    },
});
export const textarea = css({
    width: '100%',
    minHeight: '5rem',
    boxSizing: 'border-box',
    padding: '.75rem',
    resize: 'none',
    border: 0,
    borderRadius: 0,
    outline: 'none',
    color: accent,
    background: paper,
    fontFamily: mono,
    fontSize: '.72rem',
    lineHeight: 1.55,
    _focusVisible: { outline: `1px solid ${accent}`, outlineOffset: '3px' },
    '&::placeholder': { color: accent, opacity: 1 },
});
export const actionButton = css({
    width: 'fit-content',
    minHeight: '2.5rem',
    appearance: 'none',
    padding: '.45rem .7rem',
    border: 0,
    borderRadius: 0,
    color: accent,
    background: 'transparent',
    fontFamily: mono,
    fontSize: '.75rem',
    lineHeight: 1.4,
    textAlign: 'left',
    cursor: 'pointer',
    _hover: { color: paper, background: accent },
    _focusVisible: { outline: `1px solid ${accent}`, outlineOffset: '3px' },
});
export const poolContent = css({
    minWidth: 0,
    display: 'grid',
    '& [data-drop-kind=end]': { position: 'relative', padding: '.75rem', alignContent: 'start', minHeight: '4rem' },
});
export const activePool = css({
    background: accent,
    '--empty-fill': 'transparent',
    '--empty-ink': paper,
    '--card-fill': paper,
    '--card-ink': accent,
});
export const emptyPool = css({
    position: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    padding: '1rem',
    fontSize: '.75rem',
    lineHeight: 1.5,
    textAlign: 'center',
    color: `var(--empty-ink, ${accent})`,
    background: 'var(--empty-fill, #fff)',
    border: `1px solid ${accent}`,
    pointerEvents: 'none',
});
export const utilityContent = css({ display: 'grid', gap: '.75rem', minWidth: 0 });
export const actionGrid = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '.5rem',
    '& button': { width: '100%', textAlign: 'center' },
    '& button:nth-child(-n + 2)': { background: accent, color: paper, _hover: { background: paper, color: accent } },
});
export const voidBox = css({
    width: '100%',
    minHeight: '4.5rem',
    boxSizing: 'border-box',
    display: 'grid',
    placeItems: 'center',
    padding: '1rem',
    border: 0,
    background: accent,
    color: paper,
    fontSize: '.75rem',
    lineHeight: 1.5,
    transition: 'background-color 120ms, color 120ms',
    '& span': { padding: '.25rem .5rem' },
});
export const activeVoid = css({ background: paper, color: accent });
export const status = css({ paddingTop: '.25rem', fontSize: '.58rem', lineHeight: 1.45, overflowWrap: 'anywhere' });
export const hiddenInput = css({ display: 'none' });
export const overlay = css({ position: 'fixed', zIndex: 1000, pointerEvents: 'none', boxSizing: 'border-box', cursor: 'grabbing' });
