import { styled } from '@panda/jsx';

export const StyledInput = styled('input', {
    base: {
        border: '2px solid black',
        padding: '0.5rem',
        width: '100%',

        _focus: {
            outline: 'none',
            borderColor: 'purple',
        },
    },
});
