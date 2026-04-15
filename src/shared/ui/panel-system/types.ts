import type { Accessor } from 'solid-js';

export interface PanelState {
    currentPanel: number;
    transitioning: boolean;
    currentTop: number;
}

export interface PanelSystemApi {
    currentPanel: Accessor<number>;
    currentTop: Accessor<number>;
    setPanel: (panel: number) => void;
    changePanel: (delta: number) => void;
    dragBy: (delta: number) => void;
    restorePanel: () => void;
}
