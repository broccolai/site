import type { DragEvent } from '@thisbeyond/solid-dnd';
import { type DropTarget, parseDropTarget } from '@/features/tier-list/model/dnd';
import { asEntryId } from '@/features/tier-list/model/entries';

export const useTierDnd = (moveEntry: (entryId: string, target: DropTarget) => void) => {
    const onDragEnd = (ev: DragEvent) => {
        const draggable = ev.draggable;
        const droppable = ev.droppable;

        if (!draggable || !droppable) {
            return;
        }

        const entryId = asEntryId(draggable.id);
        const target = parseDropTarget(droppable.id);

        if (!entryId || !target) {
            return;
        }

        moveEntry(entryId, target);
    };

    return { onDragEnd };
};
