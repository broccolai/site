import type { ByTier, Entry, TierId } from './types';
import { ALL_BUCKETS, emptyBuckets } from './types';

const STORAGE_KEY = 'tierlist:v1';

type Stored = Readonly<{
    v: 1;
    byTier: ByTier;
}>;

const isEntry = (x: unknown): x is Entry => {
    if (!x || typeof x !== 'object') return false;
    const e = x as Entry;
    return typeof e.id === 'string' && typeof e.name === 'string' && typeof e.bg === 'string';
};

const isTierId = (x: unknown): x is TierId => typeof x === 'string' && (ALL_BUCKETS as readonly string[]).includes(x);

const isByTier = (x: unknown): x is ByTier => {
    if (!x || typeof x !== 'object') return false;
    const obj = x as Record<string, unknown>;
    for (const t of ALL_BUCKETS) {
        const list = obj[t];
        if (!Array.isArray(list)) return false;
        if (!list.every(isEntry)) return false;
    }
    return true;
};

export const loadTierList = (): ByTier | null => {
    if (typeof window === 'undefined') return null;

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as Partial<Stored>;
        if (parsed.v !== 1) return null;
        if (!isByTier(parsed.byTier)) return null;

        return parsed.byTier;
    } catch {
        return null;
    }
};

export const saveTierList = (byTier: ByTier): void => {
    if (typeof window === 'undefined') return;

    const payload: Stored = { v: 1, byTier };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const clearSavedTierList = (): void => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
};

export const withDefaults = (maybe: ByTier | null): ByTier => maybe ?? emptyBuckets();
