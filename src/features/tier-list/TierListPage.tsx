import { DragDropProvider, DragDropSensors, DragOverlay } from '@thisbeyond/solid-dnd';
import { createMemo, createSignal } from 'solid-js';
import { ConstructionGrid } from '@/features/home/components/styles';
import { TierListBoard } from '@/features/tier-list/components/board';
import { TierListDragOverlay } from '@/features/tier-list/components/drag-overlay';
import TierListIntakeSection from '@/features/tier-list/components/intake-section';
import TierListPageFooter from '@/features/tier-list/components/page-footer';
import TierListPageHeader from '@/features/tier-list/components/page-header';
import {
    createAddFeedback,
    createClearFeedback,
    createExportFeedback,
    createImportFeedback,
    createResetFeedback,
    downloadTierListDocument,
    EMPTY_FEEDBACK_STATE,
    tierListDragOverlayStyle,
} from '@/features/tier-list/components/page-helpers';
import { TierListPool } from '@/features/tier-list/components/pool';
import {
    AppShell,
    HiddenInput,
    ManualSheet,
    ManualSheetTexture,
    Page,
    PageTexture,
    SheetBody,
    SideColumn,
} from '@/features/tier-list/components/styles';
import TierListUtilitySection from '@/features/tier-list/components/utility-section';
import { totalEntryCount } from '@/features/tier-list/model/types';
import { useTierDnd } from '@/features/tier-list/model/use-tier-dnd';
import { useTierStore } from '@/features/tier-list/model/use-tier-store';

const TierListPage = () => {
    const store = useTierStore();
    const dnd = useTierDnd(store.actions.moveEntry);
    const renderOverlay = TierListDragOverlay({ findEntry: store.actions.findOverlayEntry });

    const [intakeValue, setIntakeValue] = createSignal('');
    const [feedback, setFeedback] = createSignal(EMPTY_FEEDBACK_STATE);

    let importInputRef: HTMLInputElement | undefined;

    const counts = createMemo(() => {
        const byTier = store.byTier();

        return {
            total: totalEntryCount(byTier),
            pool: byTier.POOL.length,
        };
    });

    const submitEntries = (raw: string) => {
        const lines = raw.split('\n');
        const result = store.actions.addEntries(lines);
        setFeedback(createAddFeedback(result));

        if (result.added > 0) {
            setIntakeValue('');
        }
    };

    const handleIntakeSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        submitEntries(intakeValue());
    };

    const handleExport = () => {
        downloadTierListDocument(store.actions.exportDocument());
        setFeedback(createExportFeedback());
    };

    const handleOpenImport = () => importInputRef?.click();

    const handleImport = async (event: Event & { currentTarget: HTMLInputElement }) => {
        const file = event.currentTarget.files?.[0];

        if (!file) {
            return;
        }

        const raw = await file.text();
        const result = store.actions.importDocument(raw);
        event.currentTarget.value = '';
        setFeedback(createImportFeedback(result));
    };

    const handleResetRanks = () => {
        const moved = store.actions.resetRanks();
        setFeedback(createResetFeedback(moved));
    };

    const handleClearAll = () => {
        if (!window.confirm('Delete every entry from this local tier list?')) {
            return;
        }

        store.actions.clearAll();
        setFeedback(createClearFeedback());
    };

    return (
        <Page>
            <ConstructionGrid style={{ opacity: '0.06' }} />
            <PageTexture />

            <DragDropProvider onDragEnd={dnd.onDragEnd}>
                <DragDropSensors />

                <AppShell>
                    <ManualSheet>
                        <ManualSheetTexture />
                        <TierListPageHeader />

                        <SheetBody>
                            <TierListBoard byTier={store.byTier()} />

                            <SideColumn>
                                <TierListIntakeSection
                                    value={intakeValue()}
                                    onInput={(event) => setIntakeValue(event.currentTarget.value)}
                                    onSubmit={handleIntakeSubmit}
                                />

                                <TierListPool entries={store.byTier().POOL} />

                                <TierListUtilitySection
                                    feedback={feedback()}
                                    onExport={handleExport}
                                    onOpenImport={handleOpenImport}
                                    onResetRanks={handleResetRanks}
                                    onClearAll={handleClearAll}
                                />
                            </SideColumn>
                        </SheetBody>

                        <TierListPageFooter poolCount={counts().pool} totalCount={counts().total} />

                        <HiddenInput ref={importInputRef} type='file' accept='application/json,.json' onChange={handleImport} />
                    </ManualSheet>
                </AppShell>

                <DragOverlay style={tierListDragOverlayStyle}>{renderOverlay}</DragOverlay>
            </DragDropProvider>
        </Page>
    );
};

export default TierListPage;
