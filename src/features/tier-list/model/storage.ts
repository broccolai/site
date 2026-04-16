import { parseTierListDocument } from '@/features/tier-list/model/document';
import type { TierListDocument } from '@/features/tier-list/model/types';

const STORAGE_KEY = 'tierlist:v2';
const LEGACY_STORAGE_KEY = 'tierlist:v1';

const getStoredRaw = (): string | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
};

export const loadTierListDocument = (): TierListDocument | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const raw = getStoredRaw();

        if (!raw) {
            return null;
        }

        return parseTierListDocument(JSON.parse(raw));
    } catch {
        return null;
    }
};

export const saveTierListDocument = (document: TierListDocument): void => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(document));
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
};

export const clearSavedTierList = (): void => {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
};
