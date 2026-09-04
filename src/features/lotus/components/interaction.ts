import type { LotusApp } from './types';

export function filterApps(apps: readonly LotusApp[], query: string): readonly LotusApp[] {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return terms.length ? apps.filter((app) => terms.every((term) => app.name.toLowerCase().includes(term))) : apps;
}

export function moveSelection(apps: readonly LotusApp[], selectedId: string | undefined, direction: -1 | 1) {
    if (!apps.length) return undefined;
    const index = apps.findIndex((app) => app.id === selectedId);
    const next = index < 0 ? (direction === 1 ? 0 : apps.length - 1) : (index + direction + apps.length) % apps.length;
    return apps[next]?.id;
}
