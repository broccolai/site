import { cx } from '@panda/css';
import { onSettled } from 'solid-js';
import Footer from './components/footer';
import HomeHeader from './components/home-header';
import PanelIndicators from './components/panel-indicators';
import {
    mintPanel,
    panel,
    panelContainer,
    scrollIndicator,
    separator,
    splash,
    splashContent,
    splashTitle,
    viewport,
    yellowPanel,
} from './home-page.styles';
import { createPanelController } from './panels/create-panel-controller';

const panelCount = 3;

const isInteractiveTarget = (target: EventTarget | null): boolean =>
    target instanceof Element && Boolean(target.closest('a, button, input, select, textarea, [contenteditable="true"]'));

const HomePage = () => {
    const controller = createPanelController(panelCount, () => window.innerHeight);
    let activePointer: { id: number; startY: number; lastY: number } | undefined;

    const movePanel = (delta: number) => controller.goTo(controller.currentPanel() + delta);

    const onWheel = (event: WheelEvent) => {
        if (isInteractiveTarget(event.target)) return;

        if (event.deltaY > 40) movePanel(1);
        else if (event.deltaY < -40) movePanel(-1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
        if (isInteractiveTarget(event.target)) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            movePanel(1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            movePanel(-1);
        }
    };

    const onPointerDown = (event: PointerEvent) => {
        if (
            !event.isPrimary ||
            (event.pointerType === 'mouse' && event.button !== 0) ||
            isInteractiveTarget(event.target) ||
            controller.isTransitioning()
        )
            return;

        activePointer = { id: event.pointerId, startY: event.screenY, lastY: event.screenY };
        if (event.currentTarget instanceof HTMLElement) {
            event.currentTarget.setPointerCapture(event.pointerId);
        }
    };

    const onPointerMove = (event: PointerEvent) => {
        if (!activePointer || activePointer.id !== event.pointerId) return;

        const delta = activePointer.lastY - event.screenY;
        activePointer.lastY = event.screenY;
        controller.dragBy(delta);
    };

    const endPointer = (event: PointerEvent) => {
        if (!activePointer || activePointer.id !== event.pointerId) return;

        controller.settle(event.screenY - activePointer.startY);
        activePointer = undefined;
    };

    const cancelPointer = (event: PointerEvent) => {
        if (!activePointer || activePointer.id !== event.pointerId) return;

        controller.restore();
        activePointer = undefined;
    };

    onSettled(() => {
        const onResize = () => controller.realign();

        window.addEventListener('wheel', onWheel, { passive: true });
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', onResize);
            controller.dispose();
        };
    });

    return (
        <main
            class={viewport}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endPointer}
            onPointerCancel={cancelPointer}
        >
            <div class={panelContainer} style={{ transform: `translateY(${controller.currentTop()}px)` }}>
                <section class={cx(panel, splash)}>
                    <div class={splashContent}>
                        <h1 class={splashTitle}>josh taylor</h1>
                        <span class={separator}>...</span>
                        <p>java &amp; web development</p>
                    </div>
                    <svg class={scrollIndicator} viewBox='0 0 24 24'>
                        <path d='m7 7 5 5 5-5M7 13l5 5 5-5' />
                    </svg>
                </section>
                <section class={cx(panel, mintPanel)} />
                <section class={cx(panel, yellowPanel)} />
            </div>
            <HomeHeader controller={controller} />
            <Footer />
            <PanelIndicators count={panelCount} activeIndex={controller.currentPanel()} onSelect={controller.goTo} />
        </main>
    );
};

export default HomePage;
