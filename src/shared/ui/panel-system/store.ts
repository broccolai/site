import { createSignal } from 'solid-js';
import type { PanelState, PanelSystemApi } from '@/shared/ui/panel-system/types';

const FIRST_PANEL = 1;

const initialPanelState = (): PanelState => ({
    currentPanel: FIRST_PANEL,
    transitioning: false,
    currentTop: 0,
});

const [panelState, setPanelState] = createSignal(initialPanelState());

const clampPanel = (panel: number, panelCount: number): number => Math.max(FIRST_PANEL, Math.min(panelCount, panel));

const setTransitioningPanel = (panel: number, panelHeight: number): void => {
    setPanelState({
        transitioning: true,
        currentPanel: panel,
        currentTop: -panelHeight * (panel - 1),
    });
};

export const shouldShowPanelHeaderTitle = (alwaysShow: boolean): boolean => {
    if (alwaysShow) {
        return true;
    }

    const state = panelState();

    return state.currentPanel > FIRST_PANEL && !state.transitioning;
};

export const getCurrentPanel = (): number => panelState().currentPanel;

export const createPanelSystemApi = (
    panelCount: number,
    getPanelHeight: () => number,
    scheduleReset: (delay: number) => void,
): PanelSystemApi => {
    const setPanel = (panel: number): void => {
        const boundedPanel = clampPanel(panel, panelCount);

        scheduleReset(1000);
        setTransitioningPanel(boundedPanel, getPanelHeight());
    };

    const changePanel = (delta: number): void => {
        setPanelState((prev) => {
            const nextPanel = prev.currentPanel + delta;

            if (prev.transitioning || nextPanel < FIRST_PANEL || nextPanel > panelCount) {
                return prev;
            }

            scheduleReset(800);

            return {
                transitioning: true,
                currentPanel: nextPanel,
                currentTop: -getPanelHeight() * (nextPanel - 1),
            };
        });
    };

    const dragBy = (delta: number): void => {
        setPanelState((prev) => {
            if (prev.transitioning) {
                return prev;
            }

            return { ...prev, currentTop: prev.currentTop - delta };
        });
    };

    const restorePanel = (): void => {
        setPanelState((prev) => ({
            ...prev,
            currentTop: -getPanelHeight() * (prev.currentPanel - 1),
        }));
    };

    return {
        currentPanel: () => panelState().currentPanel,
        currentTop: () => panelState().currentTop,
        setPanel,
        changePanel,
        dragBy,
        restorePanel,
    };
};

export const finishPanelTransition = (): void => {
    setPanelState((prev) => ({ ...prev, transitioning: false }));
};

export const resetPanelState = (): void => {
    setPanelState(initialPanelState());
};
