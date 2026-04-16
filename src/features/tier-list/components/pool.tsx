import { createDroppable, useDragDropContext } from '@thisbeyond/solid-dnd';
import { createMemo, For, Show } from 'solid-js';
import { TierCard } from '@/features/tier-list/components/card';
import { PoolCards, PoolHint, SectionBlock, SectionHeader, SectionTitle } from '@/features/tier-list/components/styles';
import { beforeId, parseDropTarget, tierEndId } from '@/features/tier-list/model/dnd';
import type { Entry } from '@/features/tier-list/model/types';

export type TierListPoolProps = {
    entries: Entry[];
};

export const TierListPool = (props: TierListPoolProps) => {
    const dropZone = createDroppable(tierEndId('POOL'));
    const dnd = useDragDropContext();

    if (!dnd) {
        throw new Error('TierListPool must be rendered within DragDropProvider');
    }

    const [state] = dnd;

    const isOver = createMemo(() => {
        const active = state.active.droppable;

        if (!active) {
            return false;
        }

        const target = parseDropTarget(active.id);
        return target?.kind !== 'trash' && target?.tier === 'POOL';
    });

    return (
        <SectionBlock>
            <SectionHeader>
                <SectionTitle>Pool</SectionTitle>
            </SectionHeader>

            <PoolCards
                ref={dropZone}
                style={
                    isOver()
                        ? {
                              'border-color': '#f5a5a5',
                              'background-color': '#f9e5e5',
                          }
                        : undefined
                }
            >
                <For each={props.entries}>
                    {(entry) => <TierCard entry={entry} draggableId={entry.id} beforeDroppableId={beforeId('POOL', entry.id)} />}
                </For>

                <Show when={props.entries.length === 0}>
                    <PoolHint>standby</PoolHint>
                </Show>
            </PoolCards>
        </SectionBlock>
    );
};
