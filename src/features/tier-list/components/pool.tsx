import { createDroppable } from '@thisbeyond/solid-dnd';
import { For } from 'solid-js';
import { TierCard } from '@/features/tier-list/components/card';
import { PoolAddCard } from '@/features/tier-list/components/pool-add-card';
import { Pool } from '@/features/tier-list/components/styles';
import { beforeId, tierEndId } from '@/features/tier-list/model/dnd';
import type { Entry } from '@/features/tier-list/model/types';

export type TierListPoolProps = {
    entries: Entry[];
    onAddEntry: (name: string) => void;
};

export const TierListPool = (props: TierListPoolProps) => {
    const dropZone = createDroppable(tierEndId('POOL'));

    return (
        <Pool ref={dropZone}>
            <PoolAddCard onSubmit={props.onAddEntry} placeholder='type an artist...' />

            <For each={props.entries}>
                {(entry) => <TierCard entry={entry} draggableId={entry.id} beforeDroppableId={beforeId('POOL', entry.id)} />}
            </For>
        </Pool>
    );
};
