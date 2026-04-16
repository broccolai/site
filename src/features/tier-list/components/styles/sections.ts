import { styled } from '@panda/jsx';
import { MONO_FONT_FAMILY, UI_FONT_FAMILY } from '@/shared/ui/primitives';

export const BoardSection = styled('section', {
    base: {
        position: 'relative',
        display: 'grid',
        gap: '0.95rem',
        alignContent: 'start',
        zIndex: '1',
        padding: '0',
        border: 'none',
        background: 'transparent',
    },
});

export const BoardRows = styled('div', {
    base: {
        display: 'grid',
        gap: '0.55rem',
    },
});

export const SideColumn = styled('div', {
    base: {
        display: 'grid',
        gridTemplateColumns: 'minmax(15rem, 18rem) minmax(0, 1fr) minmax(14rem, 16rem)',
        gap: '0.8rem',
        alignItems: 'stretch',
        '@media (max-width: 980px)': {
            gridTemplateColumns: '1fr',
        },
    },
});

export const SectionBlock = styled('section', {
    base: {
        position: 'relative',
        display: 'grid',
        height: '100%',
        minHeight: '0',
        gridTemplateRows: 'auto minmax(0, 1fr)',
        gap: '0.6rem',
        alignContent: 'stretch',
        padding: '0.2rem 0',
        borderRadius: '0',
        border: 'none',
        background: 'transparent',
        boxShadow: 'none',
    },
});

export const SectionForm = styled('form', {
    base: {
        position: 'relative',
        display: 'grid',
        height: '100%',
        minHeight: '0',
        gridTemplateRows: 'auto minmax(0, 1fr)',
        gap: '0.6rem',
        alignContent: 'stretch',
        padding: '0.2rem 0',
        borderRadius: '0',
        border: 'none',
        background: 'transparent',
        boxShadow: 'none',
    },
});

export const UtilitySectionBlock = styled(SectionBlock, {
    base: {},
});

export const SectionHeader = styled('div', {
    base: {
        display: 'grid',
        gap: '0.04rem',
    },
});

export const SectionTitle = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.56rem',
        lineHeight: '1',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.62)',
    },
});

export const ActionButton = styled('button', {
    base: {
        appearance: 'none',
        border: '1px solid rgba(9, 11, 16, 0.12)',
        background: 'rgba(255, 255, 255, 0.36)',
        borderRadius: '0.4rem',
        padding: '0.52rem 0.62rem 0.48rem',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.5rem',
        lineHeight: '1',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#090b10',
        cursor: 'pointer',
        transition: 'background-color 120ms ease, color 120ms ease, border-color 120ms ease',
        _hover: {
            background: '#090b10',
            color: '#fcfbf7',
        },
    },
    variants: {
        tone: {
            neutral: {},
            primary: {
                background: '#090b10',
                color: '#fcfbf7',
                borderColor: '#090b10',
                _hover: {
                    background: '#1b1f28',
                },
            },
            danger: {
                background: 'rgba(245, 165, 165, 0.18)',
                color: '#8d3131',
                borderColor: 'rgba(245, 165, 165, 0.28)',
                _hover: {
                    background: 'rgba(245, 165, 165, 0.28)',
                    color: '#7b1e1e',
                },
            },
        },
    },
    defaultVariants: {
        tone: 'neutral',
    },
});

export const FullWidthActionButton = styled(ActionButton, {
    base: {
        width: '100%',
    },
});

export const ActionGrid = styled('div', {
    base: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '0.3rem',
        '@media (max-width: 520px)': {
            gridTemplateColumns: '1fr',
        },
    },
});

export const IntakeField = styled('textarea', {
    base: {
        width: '100%',
        height: '100%',
        minHeight: '9.4rem',
        resize: 'vertical',
        borderRadius: '0.45rem',
        border: '1px solid rgba(9, 11, 16, 0.14)',
        background: 'rgba(255, 255, 255, 0.42)',
        padding: '0.82rem',
        outline: 'none',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.62rem',
        lineHeight: '1.45',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#090b10',
        _focusVisible: {
            borderColor: 'rgba(9, 11, 16, 0.34)',
            background: '#ffffff',
        },
    },
});

export const IntakeBody = styled('div', {
    base: {
        display: 'grid',
        height: '100%',
        minHeight: '0',
        gap: '0.42rem',
        gridTemplateRows: 'minmax(0, 1fr) auto',
    },
});

export const UtilityBody = styled('div', {
    base: {
        display: 'grid',
        height: '100%',
        minHeight: '0',
        gap: '0.35rem',
        gridTemplateRows: 'minmax(0, 1fr) auto auto',
    },
});

export const FillGrid = styled('div', {
    base: {
        display: 'grid',
    },
});

export const EmptyHint = styled('div', {
    base: {
        alignSelf: 'center',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.44rem',
        lineHeight: '1.25',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.42)',
        padding: '0.35rem',
    },
});

export const PoolCards = styled('div', {
    base: {
        minWidth: '0',
        minHeight: '7rem',
        height: '100%',
        borderRadius: '0.45rem',
        border: '1px solid rgba(9, 11, 16, 0.12)',
        background: 'rgba(255, 255, 255, 0.28)',
        padding: '0.5rem',
        display: 'flex',
        gap: '0.4rem',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        transition: 'background-color 120ms ease, border-color 120ms ease',
    },
});

export const PoolHint = styled(EmptyHint, {
    base: {
        color: 'rgba(9, 11, 16, 0.46)',
    },
});

export const TrashBox = styled('div', {
    base: {
        height: '100%',
        alignSelf: 'stretch',
        minHeight: '5rem',
        borderRadius: '0.45rem',
        border: '1px solid rgba(245, 165, 165, 0.28)',
        background: 'rgba(245, 165, 165, 0.08)',
        padding: '0.7rem',
        display: 'grid',
        gap: '0.3rem',
        alignContent: 'center',
        justifyItems: 'center',
        textAlign: 'center',
        transition: 'background-color 120ms ease, color 120ms ease, border-color 120ms ease',
    },
});

export const TrashTitle = styled('div', {
    base: {
        fontFamily: UI_FONT_FAMILY,
        fontSize: '0.98rem',
        lineHeight: '1',
        letterSpacing: '-0.04em',
        textTransform: 'uppercase',
        color: '#7b1e1e',
    },
});
