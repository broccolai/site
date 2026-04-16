import type { Draggable } from '@thisbeyond/solid-dnd';
import { type DropTarget, moveEntry } from '@/features/tier-list/model/dnd';
import { createTierListDocument, parseTierListJson, serializeTierListDocument } from '@/features/tier-list/model/document';
import { createEntry, findEntryById } from '@/features/tier-list/model/entries';
import { clearSavedTierList } from '@/features/tier-list/model/storage';
import type { ByTier, Entry } from '@/features/tier-list/model/types';
import { cloneByTier, emptyBuckets, TIERS, totalEntryCount } from '@/features/tier-list/model/types';

export interface AddEntriesResult {
    added: number;
    skipped: number;
}

export interface ImportTierListResult {
    ok: boolean;
    message: string;
    total?: number;
}

export interface TierListStoreActions {
    clearAll: () => void;
    resetRanks: () => number;
    addEntries: (rawNames: string[]) => AddEntriesResult;
    moveEntry: (entryId: string, target: DropTarget) => void;
    importDocument: (raw: string) => ImportTierListResult;
    exportDocument: () => string;
    findEntryById: (entryId: string) => Entry | undefined;
    findOverlayEntry: (overlay: Draggable) => Entry | undefined;
}

interface CreateTierListStoreActionsOptions {
    getByTier: () => ByTier;
    setByTier: (fn: (prev: ByTier) => ByTier) => void;
}

const trimmedUniqueNames = (rawNames: string[], byTier: ByTier): string[] => {
    const existing = new Set<string>();

    for (const tier of [...TIERS, 'POOL'] as const) {
        for (const entry of byTier[tier]) {
            existing.add(entry.name);
        }
    }

    const accepted: string[] = [];

    for (const rawName of rawNames) {
        const name = rawName.trim();

        if (!name || existing.has(name)) {
            continue;
        }

        existing.add(name);
        accepted.push(name);
    }

    return accepted;
};

export const createTierListStoreActions = (options: CreateTierListStoreActionsOptions): TierListStoreActions => {
    const clearAll = () => {
        options.setByTier(() => emptyBuckets());
        clearSavedTierList();
    };

    const resetRanks = (): number => {
        let moved = 0;

        options.setByTier((prev) => {
            const next = cloneByTier(prev);
            const ranked: Entry[] = [];

            for (const tier of TIERS) {
                moved += next[tier].length;
                ranked.push(...next[tier]);
                next[tier] = [];
            }

            next.POOL = [...ranked, ...next.POOL];
            return next;
        });

        return moved;
    };

    const addEntries = (rawNames: string[]): AddEntriesResult => {
        const acceptedNames = trimmedUniqueNames(rawNames, options.getByTier());

        if (acceptedNames.length === 0) {
            return { added: 0, skipped: rawNames.length };
        }

        const additions = acceptedNames.map((name) => createEntry(name)).filter((entry): entry is Entry => entry !== undefined);

        options.setByTier((prev) => ({
            ...prev,
            POOL: [...additions, ...prev.POOL],
        }));

        return {
            added: additions.length,
            skipped: rawNames.length - additions.length,
        };
    };

    const findById = (entryId: string): Entry | undefined => findEntryById(options.getByTier(), entryId);

    const move = (entryId: string, target: DropTarget) => {
        options.setByTier((prev) => moveEntry(prev, entryId, target));
    };

    const importDocument = (raw: string): ImportTierListResult => {
        const result = parseTierListJson(raw);

        if (!result.document) {
            return {
                ok: false,
                message: result.error ?? 'Import failed.',
            };
        }

        const document = result.document;

        options.setByTier(() => cloneByTier(document.byTier));

        return {
            ok: true,
            message: 'Tier list imported.',
            total: totalEntryCount(document.byTier),
        };
    };

    const exportDocument = () => serializeTierListDocument(createTierListDocument(options.getByTier()));

    const findOverlayEntry = (overlay: Draggable): Entry | undefined => {
        if (typeof overlay.id !== 'string') {
            return undefined;
        }

        return findById(overlay.id);
    };

    return {
        clearAll,
        resetRanks,
        addEntries,
        moveEntry: move,
        importDocument,
        exportDocument,
        findEntryById: findById,
        findOverlayEntry,
    };
};
