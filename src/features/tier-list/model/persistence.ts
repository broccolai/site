import { createEffect, onCleanup, onMount } from 'solid-js';
import { loadTierList, saveTierList } from '@/features/tier-list/model/storage';
import type { ByTier } from '@/features/tier-list/model/types';

const debounce = (fn: () => void, ms: number) => {
    if (typeof window === 'undefined') {
        return () => {};
    }

    const handle = window.setTimeout(fn, ms);
    return () => window.clearTimeout(handle);
};

export const useHydratedTierList = (setByTier: (value: ByTier) => void): void => {
    onMount(() => {
        const saved = loadTierList();

        if (saved) {
            setByTier(saved);
        }
    });
};

export const usePersistedTierList = (byTier: () => ByTier): void => {
    createEffect(() => {
        const snapshot = byTier();
        const cancel = debounce(() => saveTierList(snapshot), 140);
        onCleanup(cancel);
    });
};
