import { css } from '@panda/css';
import { styled } from '@panda/jsx';
import { For } from 'solid-js';
import circle from '@/assets/circle.svg';

const navigationStyle = css({
    position: 'fixed',
    right: '20px',
    top: '50vh',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const IndicatorButton = styled('button', {
    base: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'block',
        padding: '0.3rem 0',
        transition: 'all 200ms ease',
    },
    variants: {
        state: {
            true: {
                padding: '0.35rem 0',
            },
        },
    },
});

const IndicatorDot = styled('img', {
    base: {
        display: 'block',
        height: '1rem',
        width: '1rem',
    },
    variants: {
        state: {
            true: {
                height: '1.25rem',
                width: '1.25rem',
            },
        },
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
                        <IndicatorDot src={circle.src} state={page === props.activeIndex} />
                    </IndicatorButton>
                )}
            </For>
        </div>
    );
};

export default PanelIndicators;
