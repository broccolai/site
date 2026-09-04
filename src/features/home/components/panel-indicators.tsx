import { For } from 'solid-js';
import { indicatorButton, indicatorDot, indicators } from './panel-indicators.styles';

interface PanelIndicatorsProps {
    activeIndex: number;
    count: number;
    onSelect: (panel: number) => void;
}

const PanelIndicators = (props: PanelIndicatorsProps) => {
    const panels = () => Array.from({ length: props.count }, (_, index) => index + 1);

    return (
        <nav class={indicators}>
            <For each={panels()}>
                {(panel) => (
                    <button type='button' class={indicatorButton} onClick={() => props.onSelect(panel)}>
                        <svg class={indicatorDot({ active: panel === props.activeIndex })} viewBox='0 0 16 16'>
                            <circle cx='8' cy='8' r='6' />
                        </svg>
                    </button>
                )}
            </For>
        </nav>
    );
};

export default PanelIndicators;
