import { styled } from '@panda/jsx';

export const Card = styled('article', {
    base: {
        borderRadius: '1rem',
        display: 'flex',
        backgroundColor: 'smoke',
        flexDirection: 'column',
        margin: '0.5rem',
        position: 'relative',
        transition: 'transform 1s ease',
        width: '20rem',
    },

    //   :hover {
    //     transform: translateY(-8px);
    //   }
});

export const CardHeader = styled('div', {
    base: {
        alignItems: 'center',
        backgroundSize: 'cover',
        borderRadius: '1rem 1rem 0 0',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 1rem 2rem',
        textAlign: 'center',
    },
});

export const CardBody = styled('div', {
    base: {
        padding: '0.4rem 1rem',
    },
});

export const CardBottomBody = styled('div', {
    base: {
        marginTop: 'auto',
        padding: '1rem 1rem',
    },
});
