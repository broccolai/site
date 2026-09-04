import type { Accessor } from 'solid-js';

export interface PanelController {
    currentPanel: Accessor<number>;
    currentTop: Accessor<number>;
    dispose: () => void;
    dragBy: (delta: number) => void;
    goTo: (panel: number) => void;
    isTransitioning: Accessor<boolean>;
    realign: () => void;
    restore: () => void;
    settle: (delta: number) => void;
}
