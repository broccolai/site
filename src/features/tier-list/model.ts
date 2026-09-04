export type tier = 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'POOL';
export type rankedTier = Exclude<tier, 'POOL'>;

export const tiers: rankedTier[] = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
export const buckets: tier[] = [...tiers, 'POOL'];

export type entry = { id: string; name: string };
export type byTier = Record<tier, entry[]>;
export type document = { v: 2; byTier: byTier; updatedAt: number };
export type dropTarget = { kind: 'end'; tier: tier } | { kind: 'before'; tier: tier; id: string } | { kind: 'void' };

export const emptyBuckets = (): byTier => ({ S: [], A: [], B: [], C: [], D: [], E: [], F: [], POOL: [] });
export const copyBuckets = (value: byTier): byTier => ({
    S: [...value.S],
    A: [...value.A],
    B: [...value.B],
    C: [...value.C],
    D: [...value.D],
    E: [...value.E],
    F: [...value.F],
    POOL: [...value.POOL],
});

const isEntry = (value: unknown): value is entry =>
    !!value &&
    typeof value === 'object' &&
    typeof (value as entry).id === 'string' &&
    (value as entry).id.trim().length > 0 &&
    typeof (value as entry).name === 'string' &&
    (value as entry).name.trim().length > 0;

const isBuckets = (value: unknown, validate: (entry: unknown) => boolean): value is byTier =>
    !!value &&
    typeof value === 'object' &&
    buckets.every(
        (bucket) =>
            Array.isArray((value as Record<string, unknown>)[bucket]) && (value as Record<string, unknown[]>)[bucket].every(validate),
    );

export const parseDocument = (value: unknown): document | undefined => {
    if (!value || typeof value !== 'object') return undefined;
    const candidate = value as { v?: number; byTier?: unknown };
    const uniqueBuckets = (byTier: byTier) => {
        const ids = new Set<string>();
        return buckets.every((bucket) => byTier[bucket].every((item) => !ids.has(item.id) && ids.add(item.id)));
    };
    if (candidate.v === 2 && isBuckets(candidate.byTier, isEntry) && uniqueBuckets(candidate.byTier))
        return { v: 2, byTier: copyBuckets(candidate.byTier), updatedAt: Date.now() };
    const isLegacyEntry = (entry: unknown): entry is entry & { bg: string } =>
        isEntry(entry) && typeof (entry as { bg?: unknown }).bg === 'string';
    if (candidate.v === 1 && isBuckets(candidate.byTier, isLegacyEntry)) {
        const legacyBuckets = candidate.byTier as Record<tier, (entry & { bg: string })[]>;
        const byTier = Object.fromEntries(
            buckets.map((bucket) => [bucket, legacyBuckets[bucket].map(({ id, name }) => ({ id, name }))]),
        ) as byTier;
        if (uniqueBuckets(byTier)) return { v: 2, byTier, updatedAt: Date.now() };
    }
    return undefined;
};

export const moveEntry = (state: byTier, id: string, target: dropTarget): byTier => {
    let source: { tier: tier; index: number } | undefined;
    for (const bucket of buckets) {
        const index = state[bucket].findIndex((entry) => entry.id === id);
        if (index >= 0) source = { tier: bucket, index };
    }
    if (!source) return state;
    if (target.kind === 'before' && target.id === id) return state;
    const next = copyBuckets(state);
    const [moved] = next[source.tier].splice(source.index, 1);
    if (!moved || target.kind === 'void') return next;
    const destination = next[target.tier];
    const index = target.kind === 'end' ? destination.length : destination.findIndex((entry) => entry.id === target.id);
    destination.splice(index < 0 ? destination.length : index, 0, moved);
    return next;
};

export const totalEntries = (state: byTier): number => buckets.reduce((total, bucket) => total + state[bucket].length, 0);
