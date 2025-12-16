import type { Id } from '@thisbeyond/solid-dnd';
import type { ByTier, Entry, TierId } from './types';
import { ALL_BUCKETS } from './types';

const SEP = '::';
const TIER_END = 'tier';
const BEFORE = 'before';
const TRASH = 'trash';

export const tierEndId = (tier: TierId): Id => `${TIER_END}${SEP}${tier}`;
export const beforeId = (tier: TierId, beforeEntryId: string): Id => `${BEFORE}${SEP}${tier}${SEP}${beforeEntryId}`;
export const trashId = (): Id => TRASH;

export type DropTarget = { kind: 'tierEnd'; tier: TierId } | { kind: 'before'; tier: TierId; beforeEntryId: string } | { kind: 'trash' };

export const parseDropTarget = (droppableId: Id): DropTarget | null => {
    if (typeof droppableId !== 'string') {
        return null;
    }

    if (droppableId === TRASH) {
        return { kind: 'trash' };
    }

    const parts = droppableId.split(SEP);

    if (parts[0] === TIER_END && parts[1]) {
        return { kind: 'tierEnd', tier: parts[1] as TierId };
    }

    if (parts[0] === BEFORE && parts[1] && parts[2]) {
        return { kind: 'before', tier: parts[1] as TierId, beforeEntryId: parts[2] };
    }

    return null;
};

const findEntryLocation = (byTier: ByTier, entryId: string): { tier: TierId; index: number; entry: Entry } | null => {
    for (const tier of ALL_BUCKETS) {
        const index = byTier[tier].findIndex((e) => e.id === entryId);
        if (index !== -1) {
            return { tier, index, entry: byTier[tier][index]! };
        }
    }
    return null;
};

export const moveEntry = (byTier: ByTier, entryId: string, target: DropTarget): ByTier => {
    const from = findEntryLocation(byTier, entryId);
    if (!from) {
        return byTier;
    }

    const next: ByTier = { ...byTier };
    const fromList = [...next[from.tier]];
    const [moved] = fromList.splice(from.index, 1);

    if (!moved) {
        return byTier;
    }

    // ✅ delete behaviour
    if (target.kind === 'trash') {
        next[from.tier] = fromList;
        return next;
    }

    const toTier = target.tier;
    const toList = toTier === from.tier ? fromList : [...next[toTier]];

    let insertAt: number;

    if (target.kind === 'tierEnd') {
        insertAt = toList.length;
    } else {
        const rawIndex = toList.findIndex((e) => e.id === target.beforeEntryId);
        if (rawIndex === -1) {
            insertAt = toList.length;
        } else {
            insertAt = toTier === from.tier && from.index < rawIndex ? Math.max(0, rawIndex - 1) : rawIndex;
        }
    }

    toList.splice(Math.max(0, Math.min(toList.length, insertAt)), 0, moved);

    next[from.tier] = fromList;
    next[toTier] = toList;
    return next;
};
