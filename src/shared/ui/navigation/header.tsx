import { styled } from '@panda/jsx';
import { createMemo } from 'solid-js';
import { PageBanner, PageBannerContent } from '@/shared/ui/layout/containers';
import { shouldShowPanelHeaderTitle } from '@/shared/ui/panel-system';

const Icon = styled('div', {
    base: {
        transition: 'opacity 0s ease-out 100ms',
    },
});

interface HeaderProps {
    alwaysShow: boolean;
    title: string;
}

const Header = (props: HeaderProps) => {
    const show = createMemo(() => shouldShowPanelHeaderTitle(props.alwaysShow));

    return (
        <PageBanner top={0}>
            <PageBannerContent>
                <Icon style={{ opacity: show() ? 1 : 0 }}>{props.title}</Icon>
                <div />
            </PageBannerContent>
        </PageBanner>
    );
};

export default Header;
