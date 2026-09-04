import { Repeat } from 'solid-js';
import { indicatorButton, indicatorDot, indicators } from './panel-indicators.styles';

interface PanelIndicatorsProps {
    activeIndex: number;
    count: number;
    onSelect: (panel: number) => void;
}

const PanelIndicators = (props: PanelIndicatorsProps) => {
    return (
        <nav class={indicators}>
            <Repeat count={props.count} from={1}>
                {(panel) => (
                    <button type='button' class={indicatorButton} onClick={() => props.onSelect(panel)}>
                        <svg class={indicatorDot({ active: panel === props.activeIndex })} viewBox='0 0 16 16'>
                            <circle cx='8' cy='8' r='6' />
                        </svg>
                    </button>
                )}
            </Repeat>
        </nav>
    );
};

export default PanelIndicators;
