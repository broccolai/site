import { For, Show } from 'solid-js';
import { AppIcon } from './app-icon';
import { dock, dockApps, dockButton, dockDivider, dockItem, runningIndicator } from './lotus-dock.styles';
import { lotusSurface } from './surface.styles';
import type { LotusApp } from './types';
export interface LotusDockProps {
    readonly apps: readonly LotusApp[];
    readonly onActivate: (app: LotusApp) => void;
    readonly onOpenSearch: () => void;
}
export function LotusDock(props: LotusDockProps) {
    return (
        <section class={[lotusSurface, dock]}>
            <span class={dockItem}>
                <button class={dockButton} type='button' onClick={props.onOpenSearch}>
                    <AppIcon name='Lotus' src='/lotus/app-icons/lotus.svg' size={38} />
                </button>
            </span>
            <span class={dockDivider} />
            <ul class={dockApps}>
                <For each={props.apps} keyed={(app) => app.id}>
                    {(app) => (
                        <li class={dockItem}>
                            <button class={dockButton} type='button' onClick={() => props.onActivate(app())}>
                                <AppIcon name={app().name} src={app().icon} size={38} />
                            </button>
                            <Show when={app().running}>
                                <span class={runningIndicator} />
                            </Show>
                        </li>
                    )}
                </For>
            </ul>
        </section>
    );
}
