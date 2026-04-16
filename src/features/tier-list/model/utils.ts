import type { TierId } from '@/features/tier-list/model/types';

export function uid(): string {
    if (globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
    }

    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export const TIER_THEME: Record<Exclude<TierId, 'POOL'>, { label: string; accent: string; surface: string }> = {
    S: { label: 'S', accent: '#f5a5a5', surface: '#f9e5e5' },
    A: { label: 'A', accent: '#f5a5a5', surface: '#f9e5e5' },
    B: { label: 'B', accent: '#f5a5a5', surface: '#f9e5e5' },
    C: { label: 'C', accent: '#f5a5a5', surface: '#f9e5e5' },
    D: { label: 'D', accent: '#f5a5a5', surface: '#f9e5e5' },
    E: { label: 'E', accent: '#f5a5a5', surface: '#f9e5e5' },
    F: { label: 'F', accent: '#f5a5a5', surface: '#f9e5e5' },
};
