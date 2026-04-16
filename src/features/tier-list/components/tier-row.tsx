import { createDroppable, useDragDropContext } from '@thisbeyond/solid-dnd';
import { createMemo, For, Show } from 'solid-js';
import { TierCard, TierCardPlaceholder } from '@/features/tier-list/components/card';
import { TierDrop, TierLabel, TierLabelLetter, TierLabelRule, TierRowShell } from '@/features/tier-list/components/styles';
import { beforeId, parseDropTarget, tierEndId } from '@/features/tier-list/model/dnd';
import type { Entry, TierId } from '@/features/tier-list/model/types';
import { TIER_THEME } from '@/features/tier-list/model/utils';

export type TierRowProps = {
    tier: Exclude<TierId, 'POOL'>;
    entries: Entry[];
    showEmptyPlaceholder: boolean;
};

export const TierListTierRow = (props: TierRowProps) => {
    const dropZone = createDroppable(tierEndId(props.tier));
    const dnd = useDragDropContext();

    if (!dnd) {
        throw new Error('TierListTierRow must be rendered within DragDropProvider');
    }

    const [state] = dnd;
    const theme = TIER_THEME[props.tier];

    const isOver = createMemo(() => {
        const active = state.active.droppable;

        if (!active) {
            return false;
        }

        const target = parseDropTarget(active.id);
        return target?.kind !== 'trash' && target?.tier === props.tier;
    });

    return (
        <TierRowShell>
            <TierLabel>
                <TierLabelRule style={{ background: theme.accent }} />
                <TierLabelLetter>{theme.label}</TierLabelLetter>
            </TierLabel>

            <TierDrop
                ref={dropZone}
                style={
                    isOver()
                        ? {
                              'border-color': theme.accent,
                              'background-color': `${theme.surface}`,
                          }
                        : undefined
                }
            >
                <For each={props.entries}>
                    {(entry) => <TierCard entry={entry} draggableId={entry.id} beforeDroppableId={beforeId(props.tier, entry.id)} />}
                </For>

                <Show when={props.showEmptyPlaceholder && props.entries.length === 0}>
                    <TierCardPlaceholder text='drop here' />
                </Show>
            </TierDrop>
        </TierRowShell>
    );
};
