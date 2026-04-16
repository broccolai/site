import { formatFooterCounts } from '@/features/tier-list/components/page-helpers';
import { FooterCenteredText, FooterRightText, SheetFooterStrip } from '@/features/tier-list/components/styles';

export interface TierListPageFooterProps {
    poolCount: number;
    totalCount: number;
}

const TierListPageFooter = (props: TierListPageFooterProps) => (
    <SheetFooterStrip>
        <span>ARC-02</span>
        <FooterCenteredText>AUTOSAVE ACTIVE</FooterCenteredText>
        <FooterRightText>{formatFooterCounts(props.poolCount, props.totalCount)}</FooterRightText>
    </SheetFooterStrip>
);

export default TierListPageFooter;
