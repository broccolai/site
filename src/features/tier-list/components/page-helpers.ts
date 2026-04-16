import type { AddEntriesResult, ImportTierListResult } from '@/features/tier-list/model/actions';

export type FeedbackTone = 'neutral' | 'success' | 'error';

export interface FeedbackState {
    tone: FeedbackTone;
    text: string;
}

export const EMPTY_FEEDBACK_STATE: FeedbackState = {
    tone: 'neutral',
    text: '',
};

const pluralizeEntries = (count: number): string => `${count} ${count === 1 ? 'entry' : 'entries'}`;

export const downloadTierListDocument = (raw: string): void => {
    const blob = new Blob([raw], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `tierlist-${stamp}.json`;
    link.click();

    window.setTimeout(() => window.URL.revokeObjectURL(url), 0);
};

export const createAddFeedback = (result: AddEntriesResult): FeedbackState => {
    if (result.added === 0) {
        return {
            tone: 'error',
            text: result.skipped > 0 ? 'No new entries added / duplicates or blanks skipped' : 'Nothing to add',
        };
    }

    if (result.skipped === 0) {
        return {
            tone: 'success',
            text: `${pluralizeEntries(result.added)} added to pool`,
        };
    }

    return {
        tone: 'success',
        text: `${result.added} added / ${result.skipped} skipped`,
    };
};

export const createImportFeedback = (result: ImportTierListResult): FeedbackState => {
    if (!result.ok) {
        return {
            tone: 'error',
            text: result.message,
        };
    }

    return {
        tone: 'success',
        text: `${result.message} / ${result.total ?? 0} entries loaded`,
    };
};

export const createExportFeedback = (): FeedbackState => ({
    tone: 'success',
    text: 'JSON exported',
});

export const createResetFeedback = (moved: number): FeedbackState => ({
    tone: moved > 0 ? 'success' : 'neutral',
    text: moved > 0 ? `${pluralizeEntries(moved)} returned to pool` : 'Nothing ranked to reset',
});

export const createClearFeedback = (): FeedbackState => ({
    tone: 'success',
    text: 'Board cleared',
});

export const formatFooterCounts = (pool: number, total: number): string =>
    `${String(pool).padStart(2, '0')} pool / ${String(total).padStart(2, '0')} total`;

export const tierListDragOverlayStyle = {
    'z-index': '2147483647',
    'pointer-events': 'none',
} as const;
