import { styled } from '@panda/jsx';
import { PAGE_BANNER_HEIGHT } from '@/shared/ui/layout';
import { DISPLAY_FONT_FAMILY, MONO_FONT_FAMILY, UI_FONT_FAMILY } from '@/shared/ui/primitives';

export const HomePanel = styled('section', {
    base: {
        '--home-panel-horizontal-inset': 'clamp(1.25rem, 3vw, 2.5rem)',
        '--home-panel-vertical-inset': `max(calc(${PAGE_BANNER_HEIGHT} + 0.75rem), 4rem)`,
        position: 'relative',
        minHeight: '100vh',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'grid',
        placeItems: 'center',
        paddingInline: 'var(--home-panel-horizontal-inset)',
        paddingBlock: 'var(--home-panel-vertical-inset)',
        background: '#f3f0e8',
        color: '#090b10',
    },
});

export const ConstructionGrid = styled('div', {
    base: {
        position: 'absolute',
        inset: '0',
        backgroundImage:
            'linear-gradient(rgba(9, 11, 16, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 165, 165, 0.16) 1px, transparent 1px)',
        backgroundSize: '42px 42px',
        opacity: '0.45',
        pointerEvents: 'none',
    },
});

export const DocumentSurface = styled('div', {
    base: {
        position: 'relative',
        width: 'min(1180px, 100%)',
        height: 'min(54rem, calc(100vh - (var(--home-panel-vertical-inset) * 2)))',
        maxHeight: 'calc(100vh - (var(--home-panel-vertical-inset) * 2))',
        padding: 'clamp(1.35rem, 2.2vw, 2rem)',
        background: 'rgba(250, 248, 243, 0.98)',
        border: '1px solid rgba(9, 11, 16, 0.16)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
        display: 'grid',
        gap: '1rem',
        overflow: 'hidden',
    },
});

export const MetaText = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.78rem',
        lineHeight: '1.45',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.76)',
    },
});

export const PageRule = styled('div', {
    base: {
        width: '100%',
        height: '1px',
        background: 'rgba(9, 11, 16, 0.16)',
    },
});

export const SectionLabel = styled('div', {
    base: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.76rem',
        lineHeight: '1.3',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.76)',
    },
});

export const LabelBar = styled('span', {
    base: {
        width: '3rem',
        height: '1px',
        background: '#f5a5a5',
    },
});

export const HeroName = styled('h1', {
    base: {
        margin: '0',
        fontFamily: UI_FONT_FAMILY,
        fontWeight: '700',
        fontSize: 'clamp(3rem, 8vw, 6.3rem)',
        lineHeight: '0.92',
        letterSpacing: '-0.06em',
        textTransform: 'uppercase',
        color: '#090b10',
    },
});

export const DisplayTag = styled('div', {
    base: {
        fontFamily: DISPLAY_FONT_FAMILY,
        fontSize: 'clamp(0.78rem, 1.3vw, 1rem)',
        lineHeight: '1.45',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#090b10',
    },
});
