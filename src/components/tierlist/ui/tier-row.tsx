import { createDroppable } from '@thisbeyond/solid-dnd';
import { For, Show } from 'solid-js';

import type { Entry, TierId } from '../logic/types.ts';
import { beforeId, tierEndId } from '../logic/dnd.tsx';
import { TierCard, TierCardPlaceholder } from './card.tsx';
import { TierDrop, TierLabel, TierRow } from '../logic/styles.ts';
import { tierPastel } from '../logic/utils.ts';

export type TierRowProps = {
    tier: TierId;
    entries: Entry[];
};

export const TierListTierRow = (props: TierRowProps) => {
    const dropZone = createDroppable(tierEndId(props.tier));

    return (
        <TierRow>
            <TierLabel style={{ background: tierPastel(props.tier) }}>{props.tier}</TierLabel>

            <TierDrop ref={dropZone}>
                <For each={props.entries}>
                    {(entry) => <TierCard entry={entry} draggableId={entry.id} beforeDroppableId={beforeId(props.tier, entry.id)} />}
                </For>

                <Show when={props.entries.length === 0}>
                    <TierCardPlaceholder />
                </Show>
            </TierDrop>
        </TierRow>
    );
};
