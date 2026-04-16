import { createMemo, For } from 'solid-js';
import { BoardRows, BoardSection, SectionHeader, SectionTitle } from '@/features/tier-list/components/styles';
import { TierListTierRow } from '@/features/tier-list/components/tier-row';
import { type ByTier, rankedEntryCount, TIERS } from '@/features/tier-list/model/types';

export interface TierListBoardProps {
    byTier: ByTier;
}

export const TierListBoard = (props: TierListBoardProps) => {
    const showEmptyPlaceholder = createMemo(() => rankedEntryCount(props.byTier) === 0);

    return (
        <BoardSection>
            <SectionHeader>
                <SectionTitle>Rank Field</SectionTitle>
            </SectionHeader>

            <BoardRows>
                <For each={TIERS}>
                    {(tier) => <TierListTierRow tier={tier} entries={props.byTier[tier]} showEmptyPlaceholder={showEmptyPlaceholder()} />}
                </For>
            </BoardRows>
        </BoardSection>
    );
};
