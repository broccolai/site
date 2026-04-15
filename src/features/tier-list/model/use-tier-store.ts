import { createSignal } from 'solid-js';
import { createTierListStoreActions, type TierListStoreActions } from '@/features/tier-list/model/actions';
import { useHydratedTierList, usePersistedTierList } from '@/features/tier-list/model/persistence';
import type { ByTier } from '@/features/tier-list/model/types';
import { emptyBuckets } from '@/features/tier-list/model/types';

export interface TierListStore {
    byTier: () => ByTier;
    actions: TierListStoreActions;
}

export const useTierStore = (): TierListStore => {
    const [byTier, setByTier] = createSignal<ByTier>(emptyBuckets());
    const replaceByTier = (value: ByTier) => setByTier(value);

    useHydratedTierList(replaceByTier);
    usePersistedTierList(byTier);

    const actions = createTierListStoreActions({
        getByTier: byTier,
        setByTier,
    });

    return {
        byTier,
        actions,
    };
};
