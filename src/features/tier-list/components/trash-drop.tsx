import { createDroppable, useDragDropContext } from '@thisbeyond/solid-dnd';
import { createMemo } from 'solid-js';
import { TrashBox, TrashTitle } from '@/features/tier-list/components/styles';
import { trashId } from '@/features/tier-list/model/dnd';

export const TrashDrop = () => {
    const dropZone = createDroppable(trashId());
    const dnd = useDragDropContext();

    if (!dnd) {
        throw new Error('TrashDrop must be rendered within DragDropProvider');
    }

    const [state] = dnd;

    const isOver = createMemo(() => {
        const active = state.active.droppable;
        return !!active && active.id === trashId();
    });

    return (
        <TrashBox
            ref={dropZone}
            style={
                isOver()
                    ? {
                          background: '#090b10',
                          'border-color': '#090b10',
                      }
                    : undefined
            }
        >
            <TrashTitle>Void</TrashTitle>
        </TrashBox>
    );
};
