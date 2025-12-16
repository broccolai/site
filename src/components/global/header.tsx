import LucideSunMedium from '~icons/lucide/sun-medium';
import { styled } from '@panda/jsx';
import { createEffect, createSignal } from 'solid-js';
import { panelState } from '../panels/container.tsx';
import { createVariable } from '../utilities/functions.ts';
import { PageBanner, PageBannerContent } from './containers.tsx';

const showIcon = createVariable('header-show-icon');

const Icon = styled('div', {
    base: {
        opacity: 'var(--header-show-icon)',
        transition: 'opacity 0s ease-out 100ms',
    },
});

const Right = styled('p', {
    base: {
        textAlign: 'right',
        display: 'none',
    },
});

const FIRST_PANEL = 1;

interface HeaderProps {
    alwaysShow: boolean;
    title: string | undefined;
}

const Header = (props: HeaderProps) => {
    let previousState = panelState();
    const [show, setShow] = createSignal(false);

    createEffect(() => {
        if (props.alwaysShow) {
            setShow(true);
        }

        const currentState = panelState();
        const storedPanel = previousState.currentPanel;

        previousState = currentState;

        if (storedPanel > FIRST_PANEL && currentState.currentPanel === FIRST_PANEL && currentState.transitioning) {
            setShow(false);
            return;
        }

        if (currentState.currentPanel > FIRST_PANEL && !currentState.transitioning) {
            setShow(true);
        }
    });

    return (
        <PageBanner top={0}>
            <PageBannerContent>
                <Icon style={{ [showIcon.identifier]: show() ? '1' : '0' }}>{props.title ?? 'josh'}</Icon>
                <Right>
                    <LucideSunMedium />
                </Right>
            </PageBannerContent>
        </PageBanner>
    );
};

export default Header;
