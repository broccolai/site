import type { TierId } from '@/features/tier-list/model/types';

export function uid(): string {
    if (globalThis.crypto?.randomUUID) {
        return globalThis.crypto.randomUUID();
    }

    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function randomPastel(): string {
    const hue = Math.floor(Math.random() * 360);
    const sat = 60 + Math.floor(Math.random() * 18);
    const light = 86 + Math.floor(Math.random() * 8);
    return `hsl(${hue} ${sat}% ${light}%)`;
}

const TIER_ORDER: TierId[] = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];

function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

export function tierPastel(tier: TierId): string {
    if (tier === 'POOL') return 'rgba(255,255,255,0.04)';

    const idx = TIER_ORDER.indexOf(tier);
    const t = idx <= 0 ? 0 : idx / (TIER_ORDER.length - 1);

    const hue = Math.round(lerp(0, 140, t));
    const sat = 70;
    const light = 88;

    return `hsl(${hue} ${sat}% ${light}%)`;
}
