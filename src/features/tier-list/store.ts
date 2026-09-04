import { createSignal, onSettled } from 'solid-js';
import {
    buckets,
    type byTier,
    copyBuckets,
    type document,
    type dropTarget,
    emptyBuckets,
    type entry,
    moveEntry,
    parseDocument,
    tiers,
    totalEntries,
} from './model';

const key = 'tierlist:v2';
const legacyKey = 'tierlist:v1';
const makeDocument = (byTier: byTier): document => ({ v: 2, byTier: copyBuckets(byTier), updatedAt: Date.now() });
const newId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

export const useTierStore = () => {
    const [state, setState] = createSignal<byTier>(emptyBuckets());
    const [hydrated, setHydrated] = createSignal(false);
    let timer: number | undefined;
    let pending: document | undefined;

    const flush = () => {
        if (timer) window.clearTimeout(timer);
        timer = undefined;
        if (!pending || !hydrated() || typeof window === 'undefined') return;
        window.localStorage.setItem(key, JSON.stringify(pending));
        window.localStorage.removeItem(legacyKey);
        pending = undefined;
    };

    const save = (value: byTier) => {
        if (!hydrated() || typeof window === 'undefined') return;
        if (timer) window.clearTimeout(timer);
        pending = makeDocument(value);
        timer = window.setTimeout(() => {
            flush();
        }, 140);
    };
    const update = (change: (previous: byTier) => byTier) => {
        let next = state();
        setState((previous) => {
            next = change(previous);
            return next;
        });
        save(next);
    };

    onSettled(() => {
        try {
            const raw = window.localStorage.getItem(key) ?? window.localStorage.getItem(legacyKey);
            const saved = raw ? parseDocument(JSON.parse(raw)) : undefined;
            if (saved) setState(saved.byTier);
        } catch {}
        setHydrated(true);
        window.addEventListener('pagehide', flush);
        return () => {
            window.removeEventListener('pagehide', flush);
            flush();
        };
    });

    const add = (raw: string[]) => {
        const existing = new Set(buckets.flatMap((bucket) => state()[bucket].map((entry) => entry.name)));
        const accepted = raw.reduce<entry[]>((entries, line) => {
            const name = line.trim();
            if (name && !existing.has(name)) {
                existing.add(name);
                entries.push({ id: newId(), name });
            }
            return entries;
        }, []);
        if (accepted.length) update((previous) => ({ ...previous, POOL: [...accepted, ...previous.POOL] }));
        return { added: accepted.length, skipped: raw.length - accepted.length };
    };
    const reset = () => {
        let moved = 0;
        update((previous) => {
            const next = copyBuckets(previous);
            const ranked = tiers.flatMap((tier) => next[tier]);
            moved = ranked.length;
            for (const tier of tiers) next[tier] = [];
            next.POOL = [...ranked, ...next.POOL];
            return next;
        });
        return moved;
    };
    const clear = () => update(() => emptyBuckets());
    const importDocument = (raw: string) => {
        try {
            const parsed = parseDocument(JSON.parse(raw));
            if (!parsed) return { ok: false, message: 'Invalid tier list file.' };
            update(() => parsed.byTier);
            return { ok: true, message: `Tier list imported / ${totalEntries(parsed.byTier)} entries loaded` };
        } catch {
            return { ok: false, message: 'Import file is not valid JSON.' };
        }
    };

    return {
        state,
        add,
        reset,
        clear,
        move: (id: string, target: dropTarget) => update((previous) => moveEntry(previous, id, target)),
        importDocument,
        exportDocument: () => JSON.stringify(makeDocument(state()), null, 2),
    };
};
