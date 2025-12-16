import { styled } from '@panda/jsx';
import { createSignal } from 'solid-js';

import { CardShell, CardText } from './card.tsx';

const AddShell = styled(CardShell, {
    base: {
        background: 'rgba(255,255,255,0.02)',
        border: '1px dashed rgba(0,0,0,0.18)',
    },
});

const AddInput = styled('input', {
    base: {
        width: '100%',
        border: '0',
        outline: 'none',
        background: 'transparent',
        fontFamily: 'PT Mono, ui-monospace, monospace',
        letterSpacing: '1px',
        fontSize: '0.95rem',
        textAlign: 'center',
        color: 'rgba(0,0,0,0.85)',
        _placeholder: {
            color: 'rgba(0,0,0,0.35)',
        },
    },
});

export type PoolAddCardProps = {
    onSubmit: (name: string) => void;
    placeholder?: string;
};

export const PoolAddCard = (props: PoolAddCardProps) => {
    const [value, setValue] = createSignal('');

    const submit = () => {
        const name = value().trim();
        if (!name) {
            return;
        }

        props.onSubmit(name);
        setValue('');
    };

    const onKeyDown: JSX.EventHandler<HTMLInputElement, KeyboardEvent> = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            submit();
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            setValue('');
            return;
        }
    };

    return (
        <AddShell>
            {/* we use CardText only as a sizing/typography reference, not rendered */}
            <AddInput
                value={value()}
                onInput={(e) => setValue(e.currentTarget.value)}
                onKeyDown={onKeyDown}
                placeholder={props.placeholder ?? 'type an artist…'}
                autocomplete='off'
                spellcheck={false}
            />
        </AddShell>
    );
};
