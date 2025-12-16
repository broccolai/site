import { createDroppable } from '@thisbeyond/solid-dnd';
import { For, Show } from 'solid-js';

import type { Entry, TierId } from './types';
import { beforeId, tierEndId } from './dnd';
import { TierCard, TierCardPlaceholder } from './card';
import { TierDrop, TierLabel, TierRow } from './styles';
import { tierPastel } from './utils';

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
