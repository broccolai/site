export interface PanelModelState {
    currentPanel: number;
    currentTop: number;
    transitioning: boolean;
}

interface PanelClock {
    clearTimeout: (timer: number) => void;
    setTimeout: (callback: () => void, delay: number) => number;
}

interface PanelModelOptions {
    clock: PanelClock;
    count: number;
    getPanelHeight: () => number;
    onChange: (state: PanelModelState) => void;
}

const transitionDuration = 800;
const swipeDistance = 100;
const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

export const createPanelModel = (options: PanelModelOptions) => {
    let currentPanel = 1;
    let currentTop = 0;
    let transitioning = false;
    let disposed = false;
    let transitionTimer: number | undefined;

    const publish = () => options.onChange({ currentPanel, currentTop, transitioning });
    const panelTop = (panel: number) => -options.getPanelHeight() * (panel - 1);

    const clearTransition = () => {
        if (transitionTimer !== undefined) {
            options.clock.clearTimeout(transitionTimer);
            transitionTimer = undefined;
        }
    };

    const restore = () => {
        currentTop = panelTop(currentPanel);
        publish();
    };

    const goTo = (panel: number) => {
        const nextPanel = clamp(panel, 1, options.count);
        if (disposed || transitioning || (nextPanel === currentPanel && currentTop === panelTop(nextPanel))) return;

        clearTransition();
        currentPanel = nextPanel;
        currentTop = panelTop(nextPanel);
        transitioning = true;
        publish();
        transitionTimer = options.clock.setTimeout(() => {
            if (disposed) return;

            transitionTimer = undefined;
            transitioning = false;
            publish();
        }, transitionDuration);
    };

    return {
        dragBy: (delta: number) => {
            if (disposed || transitioning) return;

            currentTop = clamp(currentTop - delta, panelTop(options.count), 0);
            publish();
        },
        dispose: () => {
            disposed = true;
            clearTransition();
        },
        goTo,
        realign: () => {
            if (disposed) return;

            clearTransition();
            transitioning = false;
            restore();
        },
        restore: () => {
            if (!disposed) restore();
        },
        snap: () => {
            if (disposed) return;
            const height = options.getPanelHeight();
            if (height <= 0) return;
            const progress = (panelTop(currentPanel) - currentTop) / height;
            const nextPanel = clamp(currentPanel + Math.sign(progress) * Math.floor(Math.abs(progress) + 0.6), 1, options.count);
            goTo(nextPanel);
        },
        settle: (delta: number) => {
            if (disposed || transitioning) return;

            restore();
            if (delta <= -swipeDistance) goTo(currentPanel + 1);
            else if (delta >= swipeDistance) goTo(currentPanel - 1);
        },
        state: (): PanelModelState => ({ currentPanel, currentTop, transitioning }),
    };
};
