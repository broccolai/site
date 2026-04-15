import type { Id } from '@thisbeyond/solid-dnd';
import type { ByTier, Entry } from '@/features/tier-list/model/types';
import { ALL_BUCKETS } from '@/features/tier-list/model/types';
import { randomPastel, uid } from '@/features/tier-list/model/utils';

export const findEntryById = (state: ByTier, entryId: string): Entry | undefined => {
    for (const tier of ALL_BUCKETS) {
        const hit = state[tier].find((entry) => entry.id === entryId);

        if (hit) {
            return hit;
        }
    }

    return undefined;
};

export const asEntryId = (id: Id): string | undefined => {
    if (typeof id !== 'string') {
        return undefined;
    }

    return id;
};

export const createEntry = (rawName: string): Entry | undefined => {
    const name = rawName.trim();

    if (!name) {
        return undefined;
    }

    return {
        id: uid(),
        name,
        bg: randomPastel(),
    };
};
