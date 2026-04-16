export type TierId = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'POOL';
export type RankedTierId = Exclude<TierId, 'POOL'>;

export const TIERS: RankedTierId[] = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
export const ALL_BUCKETS: TierId[] = [...TIERS, 'POOL'];

export interface Entry {
    id: string;
    name: string;
}

export type ByTier = Record<TierId, Entry[]>;

export interface TierListDocument {
    v: 2;
    byTier: ByTier;
    updatedAt: number;
}

export function emptyBuckets(): ByTier {
    return {
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        POOL: [],
    };
}

export function cloneByTier(byTier: ByTier): ByTier {
    return {
        S: [...byTier.S],
        A: [...byTier.A],
        B: [...byTier.B],
        C: [...byTier.C],
        D: [...byTier.D],
        E: [...byTier.E],
        F: [...byTier.F],
        POOL: [...byTier.POOL],
    };
}

export function totalEntryCount(byTier: ByTier): number {
    return ALL_BUCKETS.reduce((count, tier) => count + byTier[tier].length, 0);
}

export function rankedEntryCount(byTier: ByTier): number {
    return TIERS.reduce((count, tier) => count + byTier[tier].length, 0);
}
