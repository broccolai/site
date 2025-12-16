import { styled } from '@panda/jsx';
import { createSignal } from 'solid-js';
import { PageBanner, PageBannerContent } from './containers.tsx';

const timeFormatter = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/London',
    timeStyle: 'short',
    hour12: true,
});

const Left = styled('p', {});

const Right = styled('p', {
    base: {
        textAlign: 'right',
    },
});

const Footer = () => {
    const [time, setTime] = createSignal('');

    const updateTime = () => {
        const current = Date.now();
        setTime(timeFormatter.format(current));
    };

    updateTime();
    setInterval(() => updateTime(), 1000);

    return (
        <PageBanner bottom={0}>
            <PageBannerContent>
                <Left>England | {time()}</Left>
                <Right>Github</Right>
            </PageBannerContent>
        </PageBanner>
    );
};

export default Footer;
