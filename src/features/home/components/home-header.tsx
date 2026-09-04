import { cx } from '@panda/css';
import { createMemo } from 'solid-js';
import type { PanelController } from '@/features/home/panels/types';
import { banner, bannerContent, header, headerTitle } from './home-header.styles';

interface HomeHeaderProps {
    controller: PanelController;
}

const HomeHeader = (props: HomeHeaderProps) => {
    const showTitle = createMemo(() => props.controller.currentPanel() > 1 && !props.controller.isTransitioning());

    return (
        <header class={cx(banner, header)}>
            <div class={bannerContent}>
                <div class={headerTitle} style={{ opacity: showTitle() ? 1 : 0 }}>
                    josh
                </div>
                <div />
            </div>
        </header>
    );
};

export default HomeHeader;
