import type { Draggable } from '@thisbeyond/solid-dnd';
import { createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { clearSavedTierList, loadTierList, saveTierList } from './storage';
import type { ByTier, Entry } from './types';
import { ALL_BUCKETS, emptyBuckets } from './types';
import { randomPastel, uid } from './utils';

const findEntry = (state: ByTier, entryId: string): Entry | undefined => {
    for (const tier of ALL_BUCKETS) {
        const hit = state[tier].find((e) => e.id === entryId);

        if (hit) {
            return hit;
        }
    }

    return undefined;
};

const removeEntry = (state: ByTier, entryId: string): ByTier => {
    for (const tier of ALL_BUCKETS) {
        const list = state[tier];
        const idx = list.findIndex((e) => e.id === entryId);

        if (idx === -1) {
            continue;
        }

        return {
            ...state,
            [tier]: list.toSpliced ? list.toSpliced(idx, 1) : [...list.slice(0, idx), ...list.slice(idx + 1)],
        };
    }

    return state;
};

const debounce = (fn: () => void, ms: number) => {
    if (typeof window === 'undefined') {
        return () => {};
    }

    const handle = window.setTimeout(fn, ms);
    return () => window.clearTimeout(handle);
};

export const useTierStore = () => {
    const [byTier, setByTier] = createSignal<ByTier>(emptyBuckets());

    onMount(() => {
        const saved = loadTierList();
        if (saved) setByTier(saved);
    });

    createEffect(() => {
        const snapshot = byTier();
        const cancel = debounce(() => saveTierList(snapshot), 140);
        onCleanup(cancel);
    });

    const clearAll = () => {
        setByTier(emptyBuckets());
        clearSavedTierList();
    };

    const addOne = (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) {
            return;
        }

        const next: Entry = {
            id: uid(),
            name: trimmed,
            bg: randomPastel(),
        };

        setByTier((prev) => ({
            ...prev,
            POOL: [next, ...prev.POOL],
        }));
    };

    const deleteById = (entryId: string) => {
        setByTier((prev) => removeEntry(prev, entryId));
    };

    const entryFromOverlay = (overlay: Draggable): Entry | undefined => {
        const entryId = overlay.id as string;

        return findEntry(byTier(), entryId);
    };

    return {
        byTier,
        setByTier,
        actions: {
            clearAll,
            addOne,
            deleteById,
            entryFromOverlay,
        },
    };
};
