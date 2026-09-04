import { createMemo, createSignal } from 'solid-js';
import { filterApps } from './interaction';
import { createLocalTime } from './local-time';
import { LotusDock } from './lotus-dock';
import { previewLayout, searchSlot } from './lotus-preview.styles';
import { LotusSearch } from './lotus-search';
import { previewApps } from './preview-apps';
import type { LotusApp } from './types';
export function LotusPreview() {
    const time = createLocalTime();
    const [query, setQuery] = createSignal('');
    const [selectedId, setSelectedId] = createSignal<string | undefined>(previewApps[0].id);
    const [running, setRunning] = createSignal<ReadonlySet<string>>(new Set(previewApps.filter((app) => app.running).map((app) => app.id)));
    let searchInput: HTMLInputElement | undefined;
    const apps = createMemo(() => previewApps.map((app) => ({ ...app, running: running().has(app.id) })));
    const results = createMemo(() => filterApps(apps(), query()));
    const changeQuery = (value: string) => {
        setQuery(value);
        setSelectedId(filterApps(apps(), value)[0]?.id);
    };
    const activate = (app: LotusApp) => {
        setRunning((previous) => new Set([...previous, app.id]));
    };
    const activateResult = (app: LotusApp) => {
        activate(app);
        setQuery('');
        setSelectedId(app.id);
    };
    return (
        <div class={previewLayout}>
            <div class={searchSlot} style={{ 'min-height': `${7.25 + previewApps.length * 3.625}rem` }}>
                <LotusSearch
                    apps={results()}
                    query={query()}
                    selectedId={selectedId()}
                    onQueryChange={changeQuery}
                    onSelect={setSelectedId}
                    onActivate={activateResult}
                    inputRef={(input) => {
                        searchInput = input;
                    }}
                    time={time()}
                />
            </div>
            <LotusDock
                apps={apps()}
                onActivate={activate}
                onOpenSearch={() => {
                    changeQuery('');
                    searchInput?.focus();
                }}
            />
        </div>
    );
}
