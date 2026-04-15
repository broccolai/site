import { styled } from '@panda/jsx';
import { ManualGrid, ManualPanel, ManualSurface, ManualTextureField } from '@/features/home/components/manual-language';

const EmptyRow = styled('div', {
    base: {
        minHeight: '0',
    },
});

const BlankPanel = () => (
    <ManualPanel>
        <ManualGrid style={{ opacity: '0.05' }} />

        <ManualSurface>
            <ManualTextureField />
            <EmptyRow />
            <EmptyRow />
            <EmptyRow />
        </ManualSurface>
    </ManualPanel>
);

export default BlankPanel;
