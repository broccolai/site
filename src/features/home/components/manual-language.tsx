import { styled } from '@panda/jsx';
import { ConstructionGrid, DocumentSurface, HomePanel, MetaText } from '@/features/home/components/styles';
import { MONO_FONT_FAMILY, UI_FONT_FAMILY } from '@/shared/ui/primitives';

export const ManualPanel = HomePanel;

export const ManualGrid = ConstructionGrid;

export const ManualSurface = styled(DocumentSurface, {
    base: {
        background:
            'radial-gradient(circle at 22% 28%, rgba(245, 165, 165, 0.18), transparent 20%), radial-gradient(circle at 68% 38%, rgba(245, 165, 165, 0.14), transparent 22%), radial-gradient(circle at 54% 72%, rgba(245, 165, 165, 0.16), transparent 24%), #fcfbf7',
        border: 'none',
        boxShadow: 'none',
        gridTemplateRows: 'auto minmax(0, 1fr) auto',
        rowGap: 'clamp(1.35rem, 3vh, 2.4rem)',
        padding: 'clamp(1.5rem, 2.8vw, 2.4rem)',
        overflow: 'hidden',
        '@media (min-width: 960px)': {
            paddingInline: 'clamp(1.8rem, 3vw, 2.8rem)',
        },
    },
});

export const ManualTextureField = styled('div', {
    base: {
        position: 'absolute',
        inset: '0',
        backgroundImage:
            'radial-gradient(rgba(9, 11, 16, 0.08) 0.6px, transparent 0.8px), radial-gradient(rgba(245, 165, 165, 0.22) 0.6px, transparent 0.8px)',
        backgroundSize: '11px 11px, 16px 16px',
        backgroundPosition: '0 0, 4px 6px',
        maskImage:
            'radial-gradient(circle at 18% 25%, rgba(0, 0, 0, 0.85), transparent 24%), radial-gradient(circle at 72% 34%, rgba(0, 0, 0, 0.85), transparent 26%), radial-gradient(circle at 52% 74%, rgba(0, 0, 0, 0.82), transparent 28%), radial-gradient(circle at 32% 82%, rgba(0, 0, 0, 0.78), transparent 22%)',
        opacity: '0.34',
        pointerEvents: 'none',
    },
});

export const ManualTopStrip = styled(MetaText, {
    base: {
        position: 'relative',
        zIndex: '1',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '1rem',
        alignItems: 'start',
    },
});

export const ManualFooterStrip = styled(MetaText, {
    base: {
        position: 'relative',
        zIndex: '1',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '1rem',
        alignItems: 'end',
        color: 'rgba(9, 11, 16, 0.56)',
    },
});

export const ManualField = styled('div', {
    base: {
        position: 'relative',
        zIndex: '1',
        minHeight: '0',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(12, minmax(0, 1fr))',
        columnGap: 'clamp(0.35rem, 0.9vw, 0.8rem)',
        rowGap: 'clamp(0.35rem, 0.9vw, 0.8rem)',
    },
});

export const ManualMicroCode = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.56rem',
        lineHeight: '1.2',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.54)',
        userSelect: 'none',
    },
});

export const ManualTinyRule = styled('div', {
    base: {
        height: '1px',
        background: 'rgba(9, 11, 16, 0.26)',
        userSelect: 'none',
    },
});

export const ManualCornerMark = styled('div', {
    base: {
        width: '0.65rem',
        height: '0.65rem',
        borderTop: '1px solid rgba(9, 11, 16, 0.4)',
        borderLeft: '1px solid rgba(9, 11, 16, 0.4)',
        userSelect: 'none',
    },
});

export const ManualDiagonalMark = styled('div', {
    base: {
        width: 'min(8rem, 14vw)',
        height: 'min(5rem, 9vw)',
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(9, 11, 16, 0.72) 0 2px, transparent 2px 12px)',
        opacity: '0.72',
        userSelect: 'none',
    },
});

export const ManualGlyph = styled('div', {
    base: {
        fontFamily: UI_FONT_FAMILY,
        fontWeight: '700',
        fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
        lineHeight: '1',
        textTransform: 'uppercase',
        color: '#090b10',
        userSelect: 'none',
    },
});

export const ManualHeroName = styled('h1', {
    base: {
        margin: '0',
        fontFamily: UI_FONT_FAMILY,
        fontWeight: '700',
        fontSize: 'clamp(3rem, 7.2vw, 5.8rem)',
        lineHeight: '0.92',
        letterSpacing: '0.02em',
        textTransform: 'uppercase',
        color: '#251f22',
    },
});

export const ManualReadableLine = styled('p', {
    base: {
        margin: '0',
        maxWidth: '20ch',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.62rem',
        lineHeight: '1.28',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.74)',
    },
});
