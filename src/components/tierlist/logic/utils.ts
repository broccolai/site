import type { TierId } from './types.ts';

export function hashToHsl(input: string): string {
    let h = 0;
    for (let i = 0; i < input.length; i++) {
        h = (h * 31 + input.charCodeAt(i)) >>> 0;
    }
    const hue = h % 360;
    const sat = 72;
    const light = 74;
    return `hsl(${hue} ${sat}% ${light}%)`;
}

export function uid(): string {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function parseLine(line: string): string | null {
    const trimmed = line.trim();
    if (!trimmed) return null;
    return trimmed;
}

export function randomPastel(): string {
    // pastel: high lightness, moderate saturation, random hue
    const hue = Math.floor(Math.random() * 360);
    const sat = 60 + Math.floor(Math.random() * 18); // 60–77
    const light = 86 + Math.floor(Math.random() * 8); // 86–93
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

    // F (0° = red) -> S (~140° = green)
    const hue = Math.round(lerp(0, 140, t));
    const sat = 70;
    const light = 88;

    return `hsl(${hue} ${sat}% ${light}%)`;
}
