import { ALL_BUCKETS, type ByTier, cloneByTier, type Entry, emptyBuckets, type TierListDocument } from '@/features/tier-list/model/types';

type LegacyEntry = Entry & {
    bg: string;
};

type LegacyStored = Readonly<{
    v: 1;
    byTier: Record<(typeof ALL_BUCKETS)[number], LegacyEntry[]>;
}>;

const isEntry = (value: unknown): value is Entry => {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const entry = value as Entry;
    return typeof entry.id === 'string' && typeof entry.name === 'string';
};

const isLegacyEntry = (value: unknown): value is LegacyEntry => {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const entry = value as LegacyEntry;
    return typeof entry.id === 'string' && typeof entry.name === 'string' && typeof entry.bg === 'string';
};

const isByTier = (value: unknown, validateEntry: (entry: unknown) => boolean): value is ByTier => {
    if (!value || typeof value !== 'object') {
        return false;
    }

    const object = value as Record<string, unknown>;

    for (const bucket of ALL_BUCKETS) {
        const list = object[bucket];

        if (!Array.isArray(list) || !list.every(validateEntry)) {
            return false;
        }
    }

    return true;
};

const fromLegacyByTier = (byTier: LegacyStored['byTier']): ByTier => ({
    S: byTier.S.map(({ id, name }) => ({ id, name })),
    A: byTier.A.map(({ id, name }) => ({ id, name })),
    B: byTier.B.map(({ id, name }) => ({ id, name })),
    C: byTier.C.map(({ id, name }) => ({ id, name })),
    D: byTier.D.map(({ id, name }) => ({ id, name })),
    E: byTier.E.map(({ id, name }) => ({ id, name })),
    F: byTier.F.map(({ id, name }) => ({ id, name })),
    POOL: byTier.POOL.map(({ id, name }) => ({ id, name })),
});

export const createTierListDocument = (byTier: ByTier): TierListDocument => ({
    v: 2,
    byTier: cloneByTier(byTier),
    updatedAt: Date.now(),
});

export const emptyTierListDocument = (): TierListDocument => createTierListDocument(emptyBuckets());

export const parseTierListDocument = (value: unknown): TierListDocument | null => {
    if (!value || typeof value !== 'object') {
        return null;
    }

    const payload = value as Partial<TierListDocument>;

    if (payload.v === 2 && isByTier(payload.byTier, isEntry)) {
        return createTierListDocument(payload.byTier);
    }

    const legacy = value as Partial<LegacyStored>;

    if (legacy.v === 1 && isByTier(legacy.byTier, isLegacyEntry)) {
        return createTierListDocument(fromLegacyByTier(legacy.byTier));
    }

    return null;
};

export const parseTierListJson = (raw: string): { document: TierListDocument | null; error: string | null } => {
    try {
        const parsed = JSON.parse(raw);
        const document = parseTierListDocument(parsed);

        if (!document) {
            return { document: null, error: 'Invalid tier list file.' };
        }

        return { document, error: null };
    } catch {
        return { document: null, error: 'Import file is not valid JSON.' };
    }
};

export const serializeTierListDocument = (document: TierListDocument): string => JSON.stringify(document, null, 2);
