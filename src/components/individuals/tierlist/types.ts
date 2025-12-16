export type TierId = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'POOL';

export const TIERS: TierId[] = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
export const ALL_BUCKETS: TierId[] = [...TIERS, 'POOL'];

export interface Entry {
    id: string;
    name: string;
    bg: string;
}

export type ByTier = Record<TierId, Entry[]>;

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
