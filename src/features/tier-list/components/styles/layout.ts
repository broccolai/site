import { styled } from '@panda/jsx';
import { PAGE_BANNER_HEIGHT } from '@/shared/ui/layout';
import { MONO_FONT_FAMILY, UI_FONT_FAMILY } from '@/shared/ui/primitives';

export const Page = styled('main', {
    base: {
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: '#f3f0e8',
        color: '#090b10',
        overflowX: 'hidden',
        overflowY: 'visible',
    },
});

export const PageTexture = styled('div', {
    base: {
        position: 'absolute',
        inset: '0',
        backgroundImage:
            'radial-gradient(rgba(9, 11, 16, 0.05) 0.6px, transparent 0.8px), radial-gradient(rgba(245, 165, 165, 0.18) 0.6px, transparent 0.8px)',
        backgroundSize: '11px 11px, 16px 16px',
        backgroundPosition: '0 0, 4px 6px',
        opacity: '0.18',
        pointerEvents: 'none',
    },
});

export const AppShell = styled('div', {
    base: {
        position: 'relative',
        zIndex: '1',
        width: 'min(1180px, calc(100vw - 2.5rem))',
        margin: '0 auto',
        paddingTop: `max(calc(${PAGE_BANNER_HEIGHT} + 2rem), 5.5rem)`,
        paddingBottom: '2.5rem',
        '@media (max-width: 900px)': {
            width: 'calc(100vw - 1.5rem)',
            paddingTop: `max(calc(${PAGE_BANNER_HEIGHT} + 1.5rem), 4.5rem)`,
            paddingBottom: '1.5rem',
        },
    },
});

export const ManualSheet = styled('section', {
    base: {
        position: 'relative',
        overflow: 'visible',
        borderRadius: '0',
        background: 'transparent',
        marginTop: '2.3rem',
        paddingInline: 'clamp(1.15rem, 2.6vw, 2rem)',
        paddingBlock: 'clamp(1.2rem, 2.4vw, 1.9rem)',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        gap: 'clamp(0.95rem, 2.1vh, 1.5rem)',
        '@media (max-width: 900px)': {
            marginTop: '1.6rem',
            paddingInline: '1rem',
            paddingBlock: '0.95rem',
            gap: '0.8rem',
        },
    },
});

export const ManualSheetTexture = styled('div', {
    base: {
        position: 'absolute',
        inset: '0',
        backgroundImage:
            'radial-gradient(rgba(9, 11, 16, 0.08) 0.6px, transparent 0.8px), radial-gradient(rgba(245, 165, 165, 0.22) 0.6px, transparent 0.8px)',
        backgroundSize: '11px 11px, 16px 16px',
        backgroundPosition: '0 0, 4px 6px',
        maskImage:
            'radial-gradient(circle at 18% 25%, rgba(0, 0, 0, 0.85), transparent 24%), radial-gradient(circle at 72% 34%, rgba(0, 0, 0, 0.85), transparent 26%), radial-gradient(circle at 52% 74%, rgba(0, 0, 0, 0.82), transparent 28%), radial-gradient(circle at 32% 82%, rgba(0, 0, 0, 0.78), transparent 22%)',
        opacity: '0.24',
        pointerEvents: 'none',
    },
});

export const SheetBody = styled('div', {
    base: {
        position: 'relative',
        zIndex: '1',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.3rem',
        alignItems: 'start',
    },
});

export const HeaderArea = styled('div', {
    base: {
        position: 'relative',
        zIndex: '1',
        display: 'grid',
        gap: '0.2rem',
        justifyItems: 'center',
        alignItems: 'start',
    },
});

export const HeaderText = styled('div', {
    base: {
        display: 'grid',
        gap: '0',
        justifyItems: 'center',
        textAlign: 'center',
    },
});

export const Eyebrow = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.52rem',
        lineHeight: '1.2',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.72)',
    },
});

export const HeaderTitle = styled('h1', {
    base: {
        margin: '0',
        fontFamily: UI_FONT_FAMILY,
        fontSize: 'clamp(3rem, 6vw, 5.6rem)',
        lineHeight: '0.86',
        letterSpacing: '-0.07em',
        textTransform: 'uppercase',
        color: '#090b10',
    },
});

export const SheetFooterStrip = styled('div', {
    base: {
        position: 'relative',
        zIndex: '1',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        gap: '1rem',
        alignItems: 'end',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.58rem',
        lineHeight: '1.3',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.56)',
    },
});

export const FooterCenteredText = styled('span', {
    base: {
        textAlign: 'center',
    },
});

export const FooterRightText = styled('span', {
    base: {
        textAlign: 'right',
    },
});

export const StatusLine = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.5rem',
        lineHeight: '1.32',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        textAlign: 'right',
        color: 'rgba(9, 11, 16, 0.78)',
        '@media (max-width: 980px)': {
            textAlign: 'left',
        },
    },
    variants: {
        tone: {
            neutral: {},
            success: {
                color: '#47693d',
            },
            error: {
                color: '#8d3131',
            },
        },
    },
    defaultVariants: {
        tone: 'neutral',
    },
});

export const HiddenInput = styled('input', {
    base: {
        display: 'none',
    },
});
