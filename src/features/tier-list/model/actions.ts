import type { Draggable } from '@thisbeyond/solid-dnd';
import { type DropTarget, moveEntry } from '@/features/tier-list/model/dnd';
import { createEntry, findEntryById } from '@/features/tier-list/model/entries';
import { clearSavedTierList } from '@/features/tier-list/model/storage';
import type { ByTier, Entry } from '@/features/tier-list/model/types';
import { emptyBuckets } from '@/features/tier-list/model/types';

export interface TierListStoreActions {
    clearAll: () => void;
    addEntry: (name: string) => void;
    moveEntry: (entryId: string, target: DropTarget) => void;
    findEntryById: (entryId: string) => Entry | undefined;
    findOverlayEntry: (overlay: Draggable) => Entry | undefined;
}

interface CreateTierListStoreActionsOptions {
    getByTier: () => ByTier;
    setByTier: (fn: (prev: ByTier) => ByTier) => void;
}

export const createTierListStoreActions = (options: CreateTierListStoreActionsOptions): TierListStoreActions => {
    const clearAll = () => {
        options.setByTier(() => emptyBuckets());
        clearSavedTierList();
    };

    const addEntry = (name: string) => {
        const next = createEntry(name);

        if (!next) {
            return;
        }

        options.setByTier((prev) => ({
            ...prev,
            POOL: [next, ...prev.POOL],
        }));
    };

    const findById = (entryId: string): Entry | undefined => findEntryById(options.getByTier(), entryId);

    const move = (entryId: string, target: DropTarget) => {
        options.setByTier((prev) => moveEntry(prev, entryId, target));
    };

    const findOverlayEntry = (overlay: Draggable): Entry | undefined => {
        if (typeof overlay.id !== 'string') {
            return undefined;
        }

        return findById(overlay.id);
    };

    return {
        clearAll,
        addEntry,
        moveEntry: move,
        findEntryById: findById,
        findOverlayEntry,
    };
};
