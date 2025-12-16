import { styled } from '@panda/jsx';
import { Draggable, DragOverlay as DragOverlayType } from '@thisbeyond/solid-dnd';
import { DragDropProvider, DragDropSensors, DragOverlay } from '@thisbeyond/solid-dnd';
import { For } from 'solid-js';
import { CardView } from './card';
import { TierListPool } from './pool';
import { useTierDnd } from './tier-dnd';
import { TierListTierRow } from './tier-row';
import { useTierStore } from './tier-store';
import { TrashDrop } from './trash-drop';
import { TIERS } from './types';

const Page = styled('div', {
    base: {
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '1rem',
        paddingTop: '10rem',
        display: 'grid',
        gap: '1rem',
    },
});

const Grid = styled('div', {
    base: {
        display: 'grid',
        gap: '0.6rem',
    },
});

const PoolRow = styled('div', {
    base: {
        display: 'grid',
        gridTemplateColumns: '1fr 140px',
        gap: '0.75rem',
        alignItems: 'stretch',
    },
});

export default () => {
    const store = useTierStore();
    const dnd = useTierDnd(store.setByTier);

    const renderOverlay = (overlay: Draggable | null) => {
        if (!overlay) {
            return null;
        }

        const entry = store.actions.entryFromOverlay(overlay);
        if (!overlay || !entry) {
            return null;
        }

        return (
            <div style={{ width: `${overlay.layout.width}px`, height: `${overlay.layout.height}px` }}>
                <CardView entry={entry} grabbing />
            </div>
        );
    };

    return (
        <Page>
            <DragDropProvider onDragEnd={dnd.onDragEnd}>
                <DragDropSensors />

                <Grid>
                    <For each={TIERS}>{(tier) => <TierListTierRow tier={tier} entries={store.byTier()[tier]} />}</For>

                    <PoolRow>
                        <TierListPool entries={store.byTier().POOL} onAddOne={store.actions.addOne} />
                        <TrashDrop />
                    </PoolRow>
                </Grid>

                <DragOverlay>{renderOverlay}</DragOverlay>
            </DragDropProvider>
        </Page>
    );
};
