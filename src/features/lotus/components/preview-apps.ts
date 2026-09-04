import type { LotusApp } from './types';

export const previewApps: readonly LotusApp[] = [
    { id: 'zen', name: 'Zen', icon: '/lotus/app-icons/zen.png', running: true },
    { id: 'steam', name: 'Steam', icon: '/lotus/app-icons/steam.png', running: true },
    { id: 'obs', name: 'OBS Studio', icon: '/lotus/app-icons/obs.png' },
    { id: 'explorer', name: 'File Explorer', icon: '/lotus/app-icons/explorer.png', running: true },
    { id: 'discord', name: 'Discord', icon: '/lotus/app-icons/discord.png', running: true },
] as const satisfies readonly LotusApp[];
