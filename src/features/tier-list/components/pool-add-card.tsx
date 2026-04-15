import { styled } from '@panda/jsx';
import { createSignal, Show } from 'solid-js';

import { CardShell } from '@/features/tier-list/components/card';

const AddShell = styled(CardShell, {
    base: {
        position: 'relative',
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
    },
});

const Hint = styled('div', {
    base: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        fontFamily: 'PT Mono, ui-monospace, monospace',
        letterSpacing: '1px',
        fontSize: '0.95rem',
        color: 'rgba(0,0,0,0.35)',
    },
});

export type PoolAddCardProps = {
    onSubmit: (name: string) => void;
    placeholder?: string;
};

const submitIfNonEmpty = (raw: string, submit: (name: string) => void): boolean => {
    const name = raw.trim();
    if (!name) {
        return false;
    }

    submit(name);
    return true;
};

export const PoolAddCard = (props: PoolAddCardProps) => {
    const [value, setValue] = createSignal('');
    const [focused, setFocused] = createSignal(false);

    const clear = () => setValue('');

    const submit = () => {
        const didSubmit = submitIfNonEmpty(value(), props.onSubmit);
        if (didSubmit) {
            clear();
        }
    };

    const onKeyDown = (e: KeyboardEvent & { currentTarget: HTMLInputElement }) => {
        switch (e.key) {
            case 'Enter': {
                e.preventDefault();
                submit();
                return;
            }
            case 'Escape': {
                e.preventDefault();
                clear();
                return;
            }
        }
    };

    const showHint = () => !focused() && value().length === 0;

    return (
        <AddShell>
            <Show when={showHint()}>
                <Hint>{props.placeholder ?? 'type an artist…'}</Hint>
            </Show>

            <AddInput
                value={value()}
                onInput={(e) => setValue(e.currentTarget.value)}
                onKeyDown={onKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder=''
                autocomplete='off'
                spellcheck={false}
            />
        </AddShell>
    );
};
