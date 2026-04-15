import type { Draggable } from '@thisbeyond/solid-dnd';
import { CardView } from '@/features/tier-list/components/card';
import { OverlayWrap } from '@/features/tier-list/components/styles';
import type { Entry } from '@/features/tier-list/model/types';

export interface TierListDragOverlayProps {
    findEntry: (overlay: Draggable) => Entry | undefined;
}

export const TierListDragOverlay = (props: TierListDragOverlayProps) => (overlay: Draggable | null) => {
    if (!overlay) {
        return null;
    }

    const entry = props.findEntry(overlay);

    if (!entry) {
        return null;
    }

    return (
        <OverlayWrap style={{ width: `${overlay.layout.width}px`, height: `${overlay.layout.height}px` }}>
            <CardView entry={entry} grabbing />
        </OverlayWrap>
    );
};
