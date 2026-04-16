import { css } from '@panda/css';
import { styled } from '@panda/jsx';
import { For } from 'solid-js';
import { MONO_FONT_FAMILY } from '@/shared/ui/primitives';

const navigationStyle = css({
    position: 'fixed',
    right: '24px',
    top: '50vh',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.35rem',
});

const IndicatorButton = styled('button', {
    base: {
        background: 'transparent',
        border: '1px solid transparent',
        borderRadius: '0.45rem',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '0.5rem auto',
        alignItems: 'center',
        gap: '0.45rem',
        minWidth: '3.5rem',
        padding: '0.36rem 0.55rem 0.34rem 0.42rem',
        transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease, opacity 180ms ease',
        opacity: '0.52',
        color: 'rgba(9, 11, 16, 0.64)',
        _hover: {
            opacity: '0.8',
            color: '#090b10',
        },
    },
    variants: {
        state: {
            true: {
                background: '#090b10',
                borderColor: '#090b10',
                opacity: '1',
                color: '#f3f0e8',
            },
        },
    },
});

const IndicatorRule = styled('span', {
    base: {
        display: 'block',
        width: '0.4rem',
        height: '1px',
        background: 'currentColor',
        opacity: '0.7',
    },
    variants: {
        state: {
            true: {
                width: '0.7rem',
                opacity: '1',
            },
        },
    },
});

const IndicatorIndex = styled('span', {
    base: {
        display: 'block',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.62rem',
        lineHeight: '1',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
    },
});

export interface PanelIndicatorsProps {
    count: number;
    activeIndex: number;
    onSelect: (panel: number) => void;
}

const PanelIndicators = (props: PanelIndicatorsProps) => {
    const pages = () => Array.from({ length: props.count }, (_, index) => index + 1);

    return (
        <div class={navigationStyle}>
            <For each={pages()}>
                {(page) => (
                    <IndicatorButton
                        type='button'
                        state={page === props.activeIndex}
                        aria-label={`Go to section ${page}`}
                        onClick={() => props.onSelect(page)}
                    >
                        <IndicatorRule state={page === props.activeIndex} />
                        <IndicatorIndex>{String(page).padStart(2, '0')}</IndicatorIndex>
                    </IndicatorButton>
                )}
            </For>
        </div>
    );
};

export default PanelIndicators;
