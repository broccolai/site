import { DragDropProvider, DragDropSensors, DragOverlay } from '@thisbeyond/solid-dnd';
import { TierListBoard } from '@/features/tier-list/components/board';
import { TierListDragOverlay } from '@/features/tier-list/components/drag-overlay';
import { Page } from '@/features/tier-list/components/styles';
import { useTierDnd } from '@/features/tier-list/model/use-tier-dnd';
import { useTierStore } from '@/features/tier-list/model/use-tier-store';

const TierListPage = () => {
    const store = useTierStore();
    const dnd = useTierDnd(store.actions.moveEntry);
    const renderOverlay = TierListDragOverlay({ findEntry: store.actions.findOverlayEntry });

    return (
        <Page>
            <DragDropProvider onDragEnd={dnd.onDragEnd}>
                <DragDropSensors />

                <TierListBoard byTier={store.byTier()} onAddEntry={store.actions.addEntry} />

                <DragOverlay>{renderOverlay}</DragOverlay>
            </DragDropProvider>
        </Page>
    );
};

export default TierListPage;
