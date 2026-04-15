import { styled } from '@panda/jsx';
import { createDroppable, useDragDropContext } from '@thisbeyond/solid-dnd';
import { createMemo } from 'solid-js';
import { trashId } from '@/features/tier-list/model/dnd';

const TrashBox = styled('div', {
    base: {
        width: '140px',
        height: '100%',
        borderRadius: '16px',
        background: 'rgba(255, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        userSelect: 'none',
        fontFamily: 'PT Mono, ui-monospace, monospace',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        transition: 'background 120ms ease, border-color 120ms ease, color 120ms ease, transform 120ms ease',
    },
});

export const TrashDrop = () => {
    const dropZone = createDroppable(trashId());
    const dnd = useDragDropContext();

    if (!dnd) {
        throw new Error('TrashDrop must be rendered within DragDropProvider');
    }

    const [state] = dnd;

    const isOver = createMemo(() => {
        const active = state.active.droppable;
        if (!active) {
            return false;
        }
        return active.id === trashId();
    });

    return (
        <TrashBox
            ref={dropZone}
            style={
                isOver()
                    ? {
                          background: 'rgba(255, 0, 0, 0.12)',
                          color: 'rgba(150, 0, 0, 0.9)',
                          transform: 'translateY(-1px)',
                      }
                    : undefined
            }
        >
            delete
        </TrashBox>
    );
};
