import { css } from '@panda/css';
import { styled } from '@panda/jsx';
import circle from 'src/assets/circle.svg';

const navigationStyle = css({
    position: 'fixed',
    right: '20px',
    top: '50vh',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const Indicator = styled('img', {
    base: {
        display: 'block',
        height: '1rem',
        width: '1rem',
        padding: '0.3rem 0',
        fontSize: '0.4rem',
        transition: 'all 200ms ease',
        cursor: 'pointer',
        color: 'black',
    },
    variants: {
        state: {
            true: {
                width: '1.25rem',
                height: '1.25rem',
                padding: '0.35rem 0',
            },
        },
    },
});

const Indicators = (props: { count: number; activeIndex: number; setIndicator: (section: number) => void }) => {
    const indicatorHtml = Array.from({ length: props.count }, (_, i) => {
        // const indicatorStyles = [indicator, i === props.activeIndex - 1 && active];
        return <Indicator src={circle.src} state={i + 1 === props.activeIndex} onClick={() => props.setIndicator(i + 1)} />;
    });

    return <div class={navigationStyle}>{indicatorHtml}</div>;
};

export default Indicators;
