import { createDroppable } from '@thisbeyond/solid-dnd';
import { For, Show } from 'solid-js';
import { TierCard, TierCardPlaceholder } from '@/features/tier-list/components/card';
import { TierDrop, TierLabel, TierRow } from '@/features/tier-list/components/styles';
import { beforeId, tierEndId } from '@/features/tier-list/model/dnd';
import type { Entry, TierId } from '@/features/tier-list/model/types';
import { tierPastel } from '@/features/tier-list/model/utils';

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
