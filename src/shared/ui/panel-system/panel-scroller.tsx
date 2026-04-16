import { styled } from '@panda/jsx';
import { WindowEventListener } from '@solid-primitives/event-listener';
import { createWindowSize } from '@solid-primitives/resize-observer';
import type { JSXElement } from 'solid-js';
import { createSignal, onCleanup } from 'solid-js';
import PanelIndicators from '@/shared/ui/panel-system/panel-indicators';
import { createPanelSystemApi, finishPanelTransition, resetPanelState } from '@/shared/ui/panel-system/store';

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

const isTypingTarget = (target: EventTarget | null): boolean => {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    const tagName = target.tagName;

    return tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || target.isContentEditable;
};

const PanelScroller = (props: { count: number; children: JSXElement }) => {
    const panelsCount = props.count;
    const windowSize = createWindowSize();
    const resetTimers = new Set<number>();

    const [, setCurrentPointer] = createSignal(0);

    const scheduleReset = (delay: number) => {
        const timer = window.setTimeout(() => {
            finishPanelTransition();
            resetTimers.delete(timer);
        }, delay);

        resetTimers.add(timer);
    };

    const panel = createPanelSystemApi(panelsCount, () => windowSize.height, scheduleReset);

    onCleanup(() => {
        for (const timer of resetTimers) {
            window.clearTimeout(timer);
        }

        resetTimers.clear();
        resetPanelState();
    });

    const handleScroll = (event: WheelEvent) => {
        if (event.deltaY > 40) {
            panel.changePanel(1);
        } else if (event.deltaY < -40) {
            panel.changePanel(-1);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (isTypingTarget(event.target)) {
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            panel.changePanel(1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            panel.changePanel(-1);
        }
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

        panel.dragBy(difference);
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
            panel.changePanel(-1);
        } else if (touchDifference > 100) {
            panel.changePanel(1);
        } else {
            panel.restorePanel();
        }

        touchStartY = 0;
        setCurrentPointer(0);
    };

    return (
        <>
            <WindowEventListener
                onKeydown={handleKeyDown}
                onWheel={handleScroll}
                onTouchstart={(event) => handleSwipe(event.changedTouches[0]?.screenY, true)}
                onTouchend={(event) => handleSwipe(event.changedTouches[0]?.screenY, false)}
                onPointerdown={(event) => handleSwipe(event.screenY, true)}
                onPointerup={(event) => handleSwipe(event.screenY, false)}
                onPointermove={(event) => handleDrag(event.screenY)}
                onTouchmove={(event) => handleDrag(event.changedTouches[0]?.screenY)}
            />

            <Pane>
                <Container style={{ top: `${panel.currentTop()}px` }}>
                    {props.children}
                    <PanelIndicators count={panelsCount} activeIndex={panel.currentPanel()} onSelect={panel.setPanel} />
                </Container>
            </Pane>
        </>
    );
};

export default PanelScroller;
