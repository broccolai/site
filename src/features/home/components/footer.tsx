import { cx } from '@panda/css';
import { createSignal, onSettled } from 'solid-js';
import { footer, footerText } from './footer.styles';
import { banner, bannerContent } from './home-header.styles';

const timeFormatter = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/London',
    timeStyle: 'short',
    hour12: true,
});

const Footer = () => {
    const [time, setTime] = createSignal('');
    let timer: number | undefined;

    const updateTime = () => setTime(timeFormatter.format(Date.now()));

    onSettled(() => {
        updateTime();
        timer = window.setInterval(updateTime, 1000);

        return () => {
            if (timer !== undefined) window.clearInterval(timer);
        };
    });

    return (
        <footer class={cx(banner, footer)}>
            <div class={bannerContent}>
                <p class={footerText}>England | {time()}</p>
                <p class={footerText}>Github</p>
            </div>
        </footer>
    );
};

export default Footer;
