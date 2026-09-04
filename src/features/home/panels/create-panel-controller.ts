import { createSignal } from 'solid-js';
import { createPanelModel } from './panel-model';
import type { PanelController } from './types';

export const createPanelController = (count: number, getPanelHeight: () => number): PanelController => {
    const [currentPanel, setCurrentPanel] = createSignal(1);
    const [currentTop, setCurrentTop] = createSignal(0);
    const [isTransitioning, setTransitioning] = createSignal(false);
    const model = createPanelModel({
        count,
        getPanelHeight,
        clock: window,
        onChange: (state) => {
            setCurrentPanel(state.currentPanel);
            setCurrentTop(state.currentTop);
            setTransitioning(state.transitioning);
        },
    });

    return {
        currentPanel,
        currentTop,
        isTransitioning,
        dragBy: model.dragBy,
        dispose: model.dispose,
        goTo: model.goTo,
        realign: model.realign,
        restore: model.restore,
        settle: model.settle,
    };
};
