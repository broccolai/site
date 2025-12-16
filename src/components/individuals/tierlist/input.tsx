import { Component } from 'solid-js';
import { TextArea } from './styles';

export const TierListInput: Component<{
    value: string;
    onInput: (next: string) => void;
}> = (props) => {
    return <TextArea value={props.value} onInput={(e) => props.onInput(e.currentTarget.value)} placeholder={'Artist'} />;
};
