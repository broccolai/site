import { css } from '@panda/css';
import { styled } from '@panda/jsx';
import { createVariable } from '../utilities/functions.ts';
import { ComponentProps, JSX } from 'solid-js';

const iconSize = createVariable('icon-size');

const iconStyle = css({
    height: iconSize.wrapped,
    width: iconSize.wrapped,
});

const Link = styled('a', {
    base: {
        backgroundColor: 'grey',
        borderRadius: '50%',
        color: 'soft',
        display: 'inline-block',
        height: iconSize.wrapped,
        marginRight: '0.6rem',
        padding: '0.6rem',
        transition: 'color 0.4s ease',
        width: iconSize.wrapped,

        //    ':hover': {
        //      color: 'black',
        //    },
    },
});

interface IconProps {
    href: string;
    Glyph: (props: ComponentProps<'svg'>) => JSX.Element;
    basis: string;
    backing?: string;
    aria: string;
}

const Icon = (props: IconProps) => {
    return (
        <Link
            href={props.href}
            aria-label={props.aria}
            style={{
                [iconSize.identifier]: props.basis,
            }}
        >
            <props.Glyph class={iconStyle} />
        </Link>
    );
};

export default Icon;
