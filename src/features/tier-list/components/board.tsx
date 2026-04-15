import { For } from 'solid-js';
import { TierListPool } from '@/features/tier-list/components/pool';
import { Grid, PoolRow } from '@/features/tier-list/components/styles';
import { TierListTierRow } from '@/features/tier-list/components/tier-row';
import { TrashDrop } from '@/features/tier-list/components/trash-drop';
import type { ByTier } from '@/features/tier-list/model/types';
import { TIERS } from '@/features/tier-list/model/types';

export interface TierListBoardProps {
    byTier: ByTier;
    onAddEntry: (name: string) => void;
}

export const TierListBoard = (props: TierListBoardProps) => (
    <Grid>
        <For each={TIERS}>{(tier) => <TierListTierRow tier={tier} entries={props.byTier[tier]} />}</For>

        <PoolRow>
            <TierListPool entries={props.byTier.POOL} onAddEntry={props.onAddEntry} />
            <TrashDrop />
        </PoolRow>
    </Grid>
);
