import { createDroppable } from '@thisbeyond/solid-dnd';
import { For, Show } from 'solid-js';

import type { Entry } from './types';
import { beforeId, tierEndId } from './dnd';
import { TierCard, TierCardPlaceholder } from './card';
import { Pool } from './styles';
import { PoolAddCard } from './pool-add-card';

export type TierListPoolProps = {
    entries: Entry[];
    onAddOne: (name: string) => void;
};

export const TierListPool = (props: TierListPoolProps) => {
    const dropZone = createDroppable(tierEndId('POOL'));

    return (
        <Pool ref={dropZone}>
            <PoolAddCard onSubmit={props.onAddOne} placeholder='type an artist...' />

            <For each={props.entries}>
                {(entry) => <TierCard entry={entry} draggableId={entry.id} beforeDroppableId={beforeId('POOL', entry.id)} />}
            </For>

            <Show when={props.entries.length === 0}>
                <TierCardPlaceholder />
            </Show>
        </Pool>
    );
};
