import type { DragEvent, Id } from '@thisbeyond/solid-dnd';

import type { ByTier } from './types';
import { moveEntry, parseDropTarget } from './dnd';

const asEntryId = (id: Id): string | undefined => {
    if (typeof id !== 'string') {
        return undefined;
    }
    return id;
};

export const useTierDnd = (setByTier: (fn: (prev: ByTier) => ByTier) => void) => {
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

        setByTier((prev) => moveEntry(prev, entryId, target));
    };

    return { onDragEnd };
};
