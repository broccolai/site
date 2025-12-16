import { createDroppable, useDragDropContext } from '@thisbeyond/solid-dnd';
import { styled } from '@panda/jsx';
import { createMemo } from 'solid-js';
import { trashId } from '../logic/dnd.tsx';

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
    const [state] = useDragDropContext()!;

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
