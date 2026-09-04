import { For } from 'solid-js';
import { AppIcon } from './app-icon';
import { moveSelection } from './interaction';
import {
    clock,
    emptyResults,
    footerLabel,
    iconColumn,
    inputStyle,
    resultList,
    resultName,
    resultRow,
    searchFooter,
    searchGlyph,
    searchPanel,
    searchQuery,
} from './lotus-search.styles';
import { lotusSurface } from './surface.styles';
import type { LotusApp } from './types';
export interface LotusSearchProps {
    readonly apps: readonly LotusApp[];
    readonly query: string;
    readonly selectedId?: string;
    readonly onQueryChange: (query: string) => void;
    readonly onSelect: (id: string) => void;
    readonly onActivate: (app: LotusApp) => void;
    readonly inputRef?: (input: HTMLInputElement) => void;
    readonly time?: string;
}
export function LotusSearch(props: LotusSearchProps) {
    const selectedIndex = () => props.apps.findIndex((app) => app.id === props.selectedId);
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const next = moveSelection(props.apps, props.selectedId, event.key === 'ArrowDown' ? 1 : -1);
            if (next) props.onSelect(next);
        } else if (event.key === 'Enter') {
            event.preventDefault();
            const app = props.apps[selectedIndex()];
            if (app) props.onActivate(app);
        } else if (event.key === 'Escape' && props.query) {
            event.preventDefault();
            props.onQueryChange('');
        }
    };
    return (
        <section class={[lotusSurface, searchPanel]}>
            <div class={searchQuery}>
                <span class={searchGlyph} />
                <input
                    class={inputStyle}
                    ref={props.inputRef}
                    type='text'
                    placeholder='Search apps'
                    value={props.query}
                    autocomplete='off'
                    spellcheck={false}
                    onInput={(event) => props.onQueryChange(event.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div class={resultList}>
                <For each={props.apps} keyed={(app) => app.id} fallback={<div class={emptyResults}>No applications found</div>}>
                    {(app) => (
                        <button
                            type='button'
                            tabindex={-1}
                            class={resultRow}
                            data-selected={app().id === props.selectedId ? 'true' : 'false'}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => {
                                props.onSelect(app().id);
                                props.onActivate(app());
                            }}
                        >
                            <span class={iconColumn}>
                                <AppIcon name={app().name} src={app().icon} size={26} />
                            </span>
                            <span class={resultName}>{app().name}</span>
                        </button>
                    )}
                </For>
            </div>
            <footer class={searchFooter}>
                <span class={footerLabel}>lotus</span>
                <time class={clock}>{props.time}</time>
            </footer>
        </section>
    );
}
