import { Show } from 'solid-js';
import type { FeedbackState } from '@/features/tier-list/components/page-helpers';
import {
    ActionGrid,
    FullWidthActionButton,
    SectionHeader,
    SectionTitle,
    StatusLine,
    UtilityBody,
    UtilitySectionBlock,
} from '@/features/tier-list/components/styles';
import { TrashDrop } from '@/features/tier-list/components/trash-drop';

export interface TierListUtilitySectionProps {
    feedback: FeedbackState;
    onExport: () => void;
    onOpenImport: () => void;
    onResetRanks: () => void;
    onClearAll: () => void;
}

const TierListUtilitySection = (props: TierListUtilitySectionProps) => (
    <UtilitySectionBlock>
        <SectionHeader>
            <SectionTitle>UTILITY / VOID</SectionTitle>
        </SectionHeader>

        <UtilityBody style={{ 'grid-template-rows': props.feedback.text ? 'minmax(0, 1fr) auto auto' : 'minmax(0, 1fr) auto' }}>
            <TrashDrop />

            <ActionGrid>
                <FullWidthActionButton type='button' tone='primary' onClick={props.onExport}>
                    Export JSON
                </FullWidthActionButton>
                <FullWidthActionButton type='button' onClick={props.onOpenImport}>
                    Import JSON
                </FullWidthActionButton>
                <FullWidthActionButton type='button' onClick={props.onResetRanks}>
                    Reset Ranks
                </FullWidthActionButton>
                <FullWidthActionButton type='button' tone='danger' onClick={props.onClearAll}>
                    Clear All
                </FullWidthActionButton>
            </ActionGrid>

            <Show when={props.feedback.text}>
                <StatusLine tone={props.feedback.tone} style={{ 'text-align': 'left' }}>
                    {props.feedback.text}
                </StatusLine>
            </Show>
        </UtilityBody>
    </UtilitySectionBlock>
);

export default TierListUtilitySection;
