import { createSignal, Show } from 'solid-js';
import { iconFrame, iconImage } from './app-icon.styles';

interface Props {
    readonly name: string;
    readonly src?: string;
    readonly size: number;
}
function LoadedIcon(props: { src: string; initial: string }) {
    const [failed, setFailed] = createSignal(false);
    return (
        <Show when={!failed()} fallback={props.initial}>
            <img class={iconImage} src={props.src} alt='' draggable={false} onError={() => setFailed(true)} />
        </Show>
    );
}
export function AppIcon(props: Props) {
    return (
        <span class={iconFrame} style={{ width: `${props.size}px`, height: `${props.size}px` }}>
            <Show when={props.src} keyed fallback={props.name.slice(0, 1)}>
                {(src) => <LoadedIcon src={src} initial={props.name.slice(0, 1)} />}
            </Show>
        </span>
    );
}
