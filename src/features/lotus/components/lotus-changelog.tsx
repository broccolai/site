import { For, Show } from 'solid-js';
import type { Release } from '@/shared/lotus-release';
import {
    changelogBadge,
    changelogContent,
    changelogDate,
    changelogFallback,
    changelogItem,
    changelogItemUnprefixed,
    changelogParagraph,
    changelogRelease,
    changelogReleaseHeader,
    changelogReleaseTitle,
    changelogSurface,
    changelogTitle,
} from './lotus-changelog.styles';
import { lotusSurface } from './surface.styles';

const prefixes = new Set(['new', 'improved', 'fix']);

interface ChangelogParagraph {
    readonly kind: 'paragraph';
    readonly text: string;
}
interface ChangelogItem {
    readonly kind: 'item';
    readonly text: string;
    readonly prefix?: string;
}
type ChangelogBlock = ChangelogParagraph | ChangelogItem;

function renderBlock(block: ChangelogBlock) {
    if (block.kind === 'paragraph') return <p class={changelogParagraph}>{block.text}</p>;
    return (
        <p class={[changelogItem, !block.prefix && changelogItemUnprefixed]}>
            <Show when={block.prefix}>{(prefix) => <span class={changelogBadge}>{prefix()}</span>}</Show>
            <span>{block.text}</span>
        </p>
    );
}

function parseChangelog(body: string): readonly ChangelogBlock[] {
    const blocks: ChangelogBlock[] = [];
    let paragraph: string[] = [];
    let item: ChangelogItem | undefined;
    const flushParagraph = () => {
        if (paragraph.length) blocks.push({ kind: 'paragraph', text: paragraph.join('\n') });
        paragraph = [];
    };
    const flushItem = () => {
        if (item) blocks.push(item);
        item = undefined;
    };
    for (const line of body.replaceAll('\r\n', '\n').split('\n')) {
        if (!line.trim()) {
            flushItem();
            flushParagraph();
            continue;
        }
        const bullet = line.match(/^\s*-\s+(.*)$/);
        if (bullet) {
            flushParagraph();
            flushItem();
            const text = bullet[1];
            const match = text.match(/^([a-z]+):\s*(.*)$/i);
            const prefix = match && prefixes.has(match[1].toLowerCase()) ? match[1].toLowerCase() : undefined;
            item = { kind: 'item', text: match && prefix ? match[2] : text, ...(prefix ? { prefix } : {}) };
        } else if (item) {
            item = { ...item, text: `${item.text}\n${line.trimEnd()}` };
        } else {
            paragraph.push(line);
        }
    }
    flushItem();
    flushParagraph();
    return blocks;
}

function formatDate(value: string) {
    if (!value) return '';
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? '' : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date);
}

export interface LotusChangelogProps {
    readonly releases: readonly Release[];
    readonly status: 'loading' | 'ready' | 'error';
}

export function LotusChangelog(props: LotusChangelogProps) {
    return (
        <section class={[lotusSurface, changelogSurface]}>
            <h2 class={changelogTitle}>changelog</h2>
            <div class={changelogContent}>
                <Show when={props.status === 'loading'}>
                    <p class={changelogFallback}>loading release notes…</p>
                </Show>
                <Show when={props.status === 'error'}>
                    <p class={changelogFallback}>release notes are unavailable right now.</p>
                </Show>
                <Show when={!props.releases.length && props.status === 'ready'}>
                    <p class={changelogFallback}>no release notes are available.</p>
                </Show>
                <For each={props.releases}>
                    {(release) => {
                        const blocks = parseChangelog(release.body);
                        return (
                            <article class={changelogRelease}>
                                <header class={changelogReleaseHeader}>
                                    <h3 class={changelogReleaseTitle}>{release.version}</h3>
                                    <Show when={formatDate(release.publishedAt)}>
                                        {(date) => <time class={changelogDate}>{date()}</time>}
                                    </Show>
                                </header>
                                <Show when={blocks.length} fallback={<p class={changelogFallback}>no release notes for this version.</p>}>
                                    <For each={blocks}>{(block) => renderBlock(block)}</For>
                                </Show>
                            </article>
                        );
                    }}
                </For>
            </div>
        </section>
    );
}
