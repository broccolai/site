import { createDroppable } from '@thisbeyond/solid-dnd';
import { For } from 'solid-js';
import { beforeId, tierEndId } from '../logic/dnd.tsx';
import { Pool } from '../logic/styles.ts';
import type { Entry } from '../logic/types.ts';
import { TierCard } from './card.tsx';
import { PoolAddCard } from './pool-add-card.tsx';

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
        </Pool>
    );
};
