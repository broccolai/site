import { styled } from '@panda/jsx';
import { WindowEventListener } from '@solid-primitives/event-listener';
import { createWindowSize } from '@solid-primitives/resize-observer';
// this is adapter from Github/FaisalST32's project 'fullpage-react-fs'
// source: https://github.com/FaisalST32/fullpage-react-fs/blob/master/src/index.js
import { JSXElement, createSignal } from 'solid-js';
import Indicators from './indicators';

export const [panelState, setPanelState] = createSignal({
    currentPanel: 1,
    transitioning: false,
    currentTop: 0,
});

const Container = styled('div', {
    base: {
        position: 'relative',
        userSelect: 'none',
        transition: 'all 800ms ease',
    },
});

const Pane = styled('div', {
    base: {
        overflow: 'hidden',
        height: '100vh',
    },
});

const PanelContainer = (props: { count: number; children: JSXElement }) => {
    const panelsCount = props.count;
    const windowSize = createWindowSize();

    const [, setCurrentPointer] = createSignal(0);

    const changePanel = (delta: number) => {
        setPanelState((prev) => {
            if (prev.transitioning || prev.currentPanel + delta < 1 || prev.currentPanel + delta > panelsCount) {
                return prev;
            }

            setTimeout(() => {
                setPanelState((prevNext) => ({ ...prevNext, transitioning: false }));
            }, 800);

            return {
                transitioning: true,
                currentPanel: prev.currentPanel + delta,
                currentTop: -windowSize.height * (prev.currentPanel + delta - 1),
            };
        });
    };

    const restoreSection = () => {
        setPanelState((prev) => ({
            ...prev,
            currentTop: -windowSize.height * (prev.currentPanel - 1),
        }));
    };

    const handleScroll = (e: WheelEvent) => {
        if (e.deltaY > 40) {
            changePanel(1);
        } else if (e.deltaY < -40) {
            changePanel(-1);
        }
    };

    const onSetSection = (section: number) => {
        setPanelState(() => {
            setTimeout(() => {
                setPanelState((prev) => ({ ...prev, transitioning: false }));
            }, 1000);
            return {
                transitioning: true,
                currentPanel: section,
                currentTop: -windowSize.height * (section - 1),
            };
        });
    };

    let touchStartY = 0;

    const handleDrag = (screenY: number | undefined) => {
        if (!screenY || touchStartY === 0) {
            return;
        }

        let initialSet = false;
        let difference = 0;
        setCurrentPointer((prev) => {
            if (prev === 0) {
                initialSet = true;
                return screenY;
            }

            difference = prev - screenY;

            if ((difference < 0 && difference > -2) || (difference > 0 && difference < 2)) {
                initialSet = true;
                return prev;
            }
            return screenY;
        });
        if (initialSet) {
            return;
        }

        setPanelState((prev) => {
            if (prev.transitioning) {
                return prev;
            }
            return { ...prev, currentTop: prev.currentTop - difference };
        });
    };

    const handleSwipe = (screenY: number | undefined, isStart: boolean) => {
        if (!screenY) {
            return;
        }

        if (isStart) {
            touchStartY = screenY;
            return;
        }

        const touchDifference = touchStartY - screenY;

        if (touchDifference < -100) {
            changePanel(-1);
        } else if (touchDifference > 100) {
            changePanel(1);
        } else {
            restoreSection();
        }

        touchStartY = 0;
        setCurrentPointer(0);
    };

    return (
        <>
            <WindowEventListener
                onWheel={handleScroll}
                onTouchstart={(e) => handleSwipe(e.changedTouches[0]?.screenY, true)}
                onTouchend={(e) => handleSwipe(e.changedTouches[0]?.screenY, false)}
                onPointerdown={(e) => handleSwipe(e.screenY, true)}
                onPointerup={(e) => handleSwipe(e.screenY, false)}
                onPointermove={(e) => handleDrag(e.screenY)}
                onTouchmove={(e) => handleDrag(e.changedTouches[0]?.screenY)}
            />

            <Pane>
                <Container style={{ top: `${panelState().currentTop}px` }}>
                    {props.children}
                    <Indicators count={panelsCount} activeIndex={panelState().currentPanel} setIndicator={onSetSection} />
                </Container>
            </Pane>
        </>
    );
};

export default PanelContainer;
