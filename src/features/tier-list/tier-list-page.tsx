import { cx } from '@panda/css';
import { createMemo, createSignal, For, onSettled, Show } from 'solid-js';
import { buckets, type dropTarget, type entry, type tier, tiers, totalEntries } from './model';
import { useTierStore } from './store';
import * as styles from './tier-list-page.styles';

type drag = { pointerId: number; id: string; name: string; x: number; y: number; offsetX: number; offsetY: number; width: number };
type targetHit = { target: dropTarget };
const overlayRect = (active: drag) => {
    const viewportMargin = 12;
    const maxWidth = Math.max(0, window.innerWidth - viewportMargin * 2);
    const width = Math.min(active.width, maxWidth);
    const maxLeft = Math.max(viewportMargin, window.innerWidth - viewportMargin - width);

    return {
        width,
        left: Math.min(Math.max(active.x - active.offsetX, viewportMargin), maxLeft),
    };
};
const asTier = (value: string | undefined): tier | undefined => buckets.find((bucket) => bucket === value);

const targetAt = (x: number, y: number): targetHit | undefined => {
    const element = document.elementsFromPoint(x, y).find((candidate) => candidate instanceof HTMLElement && candidate.dataset.dropKind);
    if (!(element instanceof HTMLElement)) return undefined;
    if (element.dataset.dropKind === 'void') return { target: { kind: 'void' } };
    const bucket = asTier(element.dataset.dropTier);
    if (!bucket) return undefined;
    if (element.dataset.dropKind === 'end') return { target: { kind: 'end', tier: bucket } };
    if (element.dataset.dropKind === 'before' && element.dataset.dropEntry)
        return { target: { kind: 'before', tier: bucket, id: element.dataset.dropEntry } };
    return undefined;
};

const download = (raw: string) => {
    const url = URL.createObjectURL(new Blob([raw], { type: 'application/json' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `tierlist-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url));
};

const TierListPage = () => {
    const store = useTierStore();
    const [intake, setIntake] = createSignal('');
    const [feedback, setFeedback] = createSignal('');
    const [dragging, setDragging] = createSignal<drag>();
    const [over, setOver] = createSignal<targetHit>();
    let candidate: drag | undefined;
    let pointer: { x: number; y: number } | undefined;
    let scrollFrame: number | undefined;
    let importInput: HTMLInputElement | undefined;
    const counts = createMemo(() => ({ total: totalEntries(store.state()), pool: store.state().POOL.length }));

    const cleanupDrag = () => {
        candidate = undefined;
        pointer = undefined;
        setDragging();
        setOver();
        if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
        scrollFrame = undefined;
        window.removeEventListener('pointermove', moveDrag);
        window.removeEventListener('pointerup', finishDrag);
        window.removeEventListener('pointercancel', cancelDrag);
    };
    const autoScroll = () => {
        if (!dragging() || !pointer) return;
        const edge = 76;
        const top = Math.max(0, edge - pointer.y);
        const bottom = Math.max(0, pointer.y - (window.innerHeight - edge));
        const amount = Math.min(20, Math.max(top, bottom) * 0.3) * (bottom > 0 ? 1 : -1);
        if (amount) window.scrollBy({ top: amount });
        setOver(targetAt(pointer.x, pointer.y));
        scrollFrame = window.requestAnimationFrame(autoScroll);
    };
    const endDrag = (event: PointerEvent, commit: boolean) => {
        if (!candidate || candidate.pointerId !== event.pointerId) return;
        const active = dragging();
        const target = targetAt(event.clientX, event.clientY);
        if (commit && active && target) store.move(active.id, target.target);
        cleanupDrag();
    };
    const moveDrag = (event: PointerEvent) => {
        if (!candidate || candidate.pointerId !== event.pointerId) return;
        if (!dragging() && Math.hypot(event.clientX - candidate.x, event.clientY - candidate.y) < 6) return;
        event.preventDefault();
        if (!dragging()) scrollFrame = window.requestAnimationFrame(autoScroll);
        pointer = { x: event.clientX, y: event.clientY };
        setDragging({ ...candidate, x: event.clientX, y: event.clientY });
        setOver(targetAt(event.clientX, event.clientY));
    };
    const finishDrag = (event: PointerEvent) => endDrag(event, true);
    const cancelDrag = (event: PointerEvent) => endDrag(event, false);
    onSettled(() => () => cleanupDrag());

    const beginDrag = (event: PointerEvent, item: entry) => {
        if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
        const target = event.currentTarget;
        if (!(target instanceof HTMLElement)) return;
        const box = target.getBoundingClientRect();
        candidate = {
            pointerId: event.pointerId,
            id: item.id,
            name: item.name,
            x: event.clientX,
            y: event.clientY,
            offsetX: event.clientX - box.left,
            offsetY: event.clientY - box.top,
            width: box.width,
        };
        target.setPointerCapture(event.pointerId);
        window.addEventListener('pointermove', moveDrag, { passive: false });
        window.addEventListener('pointerup', finishDrag);
        window.addEventListener('pointercancel', cancelDrag);
    };
    const submit = (event: SubmitEvent) => {
        event.preventDefault();
        const result = store.add(intake().split('\n'));
        setFeedback(result.added ? `${result.added} added / ${result.skipped} skipped` : 'no new entries added');
        if (result.added) setIntake('');
    };
    const handleImport = async (event: Event & { currentTarget: HTMLInputElement }) => {
        const file = event.currentTarget.files?.[0];
        if (!file) return;
        setFeedback(store.importDocument(await file.text()).message.toLowerCase());
        event.currentTarget.value = '';
    };
    const card = (item: entry, bucket: tier) => (
        <div class={styles.entryTarget} data-drop-kind='before' data-drop-tier={bucket} data-drop-entry={item.id}>
            <div class={cx(styles.card, dragging()?.id === item.id && styles.ghost)} onPointerDown={(event) => beginDrag(event, item)}>
                {item.name}
            </div>
        </div>
    );
    const isOver = (bucket: tier) => {
        const target = over()?.target;
        return target?.kind !== 'void' && target?.tier === bucket;
    };
    const bucketBody = (bucket: tier) => {
        return (
            <div
                class={cx(styles.dropzone, bucket === 'POOL' && isOver(bucket) && styles.activeDrop)}
                data-drop-kind='end'
                data-drop-tier={bucket}
            >
                <For each={store.state()[bucket]}>{(item) => card(item, bucket)}</For>
                <Show when={bucket !== 'POOL' && store.state()[bucket].length === 0}>
                    <div class={styles.placeholder}>drop here</div>
                </Show>
                <Show when={bucket === 'POOL' && store.state().POOL.length === 0}>
                    <div class={styles.placeholder}>standby</div>
                </Show>
            </div>
        );
    };
    const lane = (bucket: tier) => (
        <div class={cx(styles.row, isOver(bucket) && styles.activeDrop)} data-drop-kind='end' data-drop-tier={bucket}>
            <div class={styles.label}>{bucket}</div>
            {bucketBody(bucket)}
            <div class={styles.rowMeta}>{String(store.state()[bucket].length).padStart(2, '0')}</div>
        </div>
    );

    return (
        <main class={styles.page}>
            <div class={styles.sheet}>
                <header class={styles.header}>
                    <div class={styles.heroNav}>
                        <span>broccoli</span>
                        <span>tier list</span>
                        <span>
                            local / {String(counts().total).padStart(2, '0')} entries / {String(counts().pool).padStart(2, '0')} pool
                        </span>
                    </div>
                    <h1 class={styles.title}>tier list</h1>
                    <div class={styles.headerMeta}>a small system for ranking what matters</div>
                </header>
                <div class={styles.body}>
                    <section class={styles.ranking}>
                        <div class={styles.rows}>
                            <For each={tiers}>{(bucket) => lane(bucket)}</For>
                        </div>
                    </section>
                    <aside class={styles.sidebar}>
                        <section class={cx(styles.panel, styles.poolPanel)}>
                            <h2 class={styles.sectionHeading}>unranked</h2>
                            <p class={styles.hint}>drag an entry into a tier to place it.</p>
                            <div class={styles.poolContent}>{bucketBody('POOL')}</div>
                        </section>
                        <form class={styles.panel} onSubmit={submit}>
                            <h2 class={styles.sectionHeading}>add entries</h2>
                            <p class={styles.hint}>one entry per line.</p>
                            <div class={styles.intakeContent}>
                                <textarea
                                    class={styles.textarea}
                                    value={intake()}
                                    onInput={(event) => setIntake(event.currentTarget.value)}
                                    placeholder='one per line'
                                    spellcheck={false}
                                />
                                <button class={styles.actionButton} type='submit'>
                                    add to pool
                                </button>
                            </div>
                        </form>
                        <section class={cx(styles.panel, styles.utilityPanel)}>
                            <div class={styles.utilityContent}>
                                <div class={cx(styles.voidBox, over()?.target.kind === 'void' && styles.activeVoid)} data-drop-kind='void'>
                                    <span>drop to void</span>
                                </div>
                                <nav class={styles.actionGrid}>
                                    <button
                                        class={styles.actionButton}
                                        type='button'
                                        onClick={() => {
                                            download(store.exportDocument());
                                            setFeedback('json exported');
                                        }}
                                    >
                                        export
                                    </button>
                                    <button class={styles.actionButton} type='button' onClick={() => importInput?.click()}>
                                        import
                                    </button>
                                    <button
                                        class={styles.actionButton}
                                        type='button'
                                        onClick={() =>
                                            setFeedback(store.reset() ? 'ranked entries returned to pool' : 'nothing ranked to reset')
                                        }
                                    >
                                        reset ranks
                                    </button>
                                    <button
                                        class={styles.actionButton}
                                        type='button'
                                        onClick={() => {
                                            if (window.confirm('delete every entry from this local tier list?')) {
                                                store.clear();
                                                setFeedback('board cleared');
                                            }
                                        }}
                                    >
                                        clear all
                                    </button>
                                </nav>
                                <Show when={feedback()}>{(message) => <div class={styles.status}>{message()}</div>}</Show>
                            </div>
                        </section>
                    </aside>
                </div>
                <footer class={styles.footer}>
                    <span>broccoli / tier list</span>
                    <span class={styles.footerCenter}>autosave active</span>
                    <span class={styles.footerRight}>
                        {String(counts().pool).padStart(2, '0')} pool / {String(counts().total).padStart(2, '0')} total
                    </span>
                </footer>
            </div>
            <input ref={importInput} class={styles.hiddenInput} type='file' accept='application/json,.json' onChange={handleImport} />
            <Show when={dragging()}>
                {(active) => (
                    <div
                        class={cx(styles.card, styles.overlay)}
                        style={{
                            width: `${overlayRect(active()).width}px`,
                            left: `${overlayRect(active()).left}px`,
                            top: `${active().y - active().offsetY}px`,
                        }}
                    >
                        {active().name}
                    </div>
                )}
            </Show>
        </main>
    );
};

export default TierListPage;
