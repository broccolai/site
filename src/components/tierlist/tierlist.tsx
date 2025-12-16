import { styled } from '@panda/jsx';
import type { Draggable } from '@thisbeyond/solid-dnd';
import { DragDropProvider, DragDropSensors, DragOverlay } from '@thisbeyond/solid-dnd';
import { For } from 'solid-js';
import { useTierDnd } from './logic/tier-dnd.ts';
import { useTierStore } from './logic/tier-store.ts';
import { TrashDrop } from './ui/trash-drop.tsx';
import { TIERS } from './logic/types.ts';
import { CardView } from './ui/card.tsx';
import { TierListPool } from './ui/pool.tsx';
import { TierListTierRow } from './ui/tier-row.tsx';

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

const OverlayWrap = styled('div', {
    base: {
        transform: 'scale(1.015)',
        transition: 'transform 120ms ease, filter 120ms ease',
        filter: 'drop-shadow(0 7px 12px rgba(0,0,0,0.18)) drop-shadow(0 2px 5px rgba(0,0,0,0.12))',
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
            <OverlayWrap style={{ width: `${overlay.layout.width}px`, height: `${overlay.layout.height}px` }}>
                <CardView entry={entry} grabbing />
            </OverlayWrap>
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
