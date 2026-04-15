import { styled } from '@panda/jsx';
import {
    ManualCornerMark,
    ManualDiagonalMark,
    ManualField,
    ManualFooterStrip,
    ManualGlyph,
    ManualGrid,
    ManualHeroName,
    ManualMicroCode,
    ManualPanel,
    ManualReadableLine,
    ManualSurface,
    ManualTextureField,
    ManualTinyRule,
    ManualTopStrip,
} from '@/features/home/components/manual-language';

const MainLockup = styled('div', {
    base: {
        gridColumn: '3 / 11',
        gridRow: '7 / 10',
        display: 'grid',
        gap: '0.45rem',
        justifyItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
});

const SplashSection = () => (
    <ManualPanel>
        <ManualGrid style={{ opacity: '0.05' }} />

        <ManualSurface>
            <ManualTextureField />

            <ManualTopStrip>
                <span>SITE.APP</span>
                <span>PUBLIC RELAY</span>
                <span style={{ 'text-align': 'right' }}>CLOSED</span>
            </ManualTopStrip>

            <ManualField>
                <ManualMicroCode style={{ 'grid-column': '2 / 5', 'grid-row': '1', 'align-self': 'start' }}>
                    {'BR-01 RELAY // SYSTEMS'}
                </ManualMicroCode>
                <ManualTinyRule style={{ 'grid-column': '2 / 5', 'grid-row': '2', width: '100%' }} />

                <ManualMicroCode style={{ 'grid-column': '2', 'grid-row': '5', transform: 'rotate(-90deg)' }}>180810</ManualMicroCode>
                <ManualGlyph style={{ 'grid-column': '3', 'grid-row': '6' }}>R</ManualGlyph>
                <ManualDiagonalMark style={{ 'grid-column': '5 / 8', 'grid-row': '5 / 7', 'justify-self': 'center' }} />

                <ManualCornerMark style={{ 'grid-column': '2', 'grid-row': '10', 'align-self': 'center' }} />
                <ManualCornerMark
                    style={{
                        'grid-column': '10',
                        'grid-row': '10',
                        'justify-self': 'end',
                        'align-self': 'center',
                        transform: 'rotate(180deg)',
                    }}
                />

                <ManualMicroCode style={{ 'grid-column': '9', 'grid-row': '3', 'justify-self': 'center' }}>{'///////'}</ManualMicroCode>
                <ManualMicroCode style={{ 'grid-column': '10', 'grid-row': '3', 'justify-self': 'start' }}>RELAY</ManualMicroCode>
                <ManualMicroCode style={{ 'grid-column': '11', 'grid-row': '6', 'justify-self': 'end' }}>-</ManualMicroCode>
                <ManualMicroCode style={{ 'grid-column': '11', 'grid-row': '7', 'justify-self': 'end' }}>-</ManualMicroCode>
                <ManualMicroCode style={{ 'grid-column': '7', 'grid-row': '10', 'justify-self': 'center' }}>+</ManualMicroCode>

                <MainLockup>
                    <ManualHeroName>Josh Taylor</ManualHeroName>
                    <ManualReadableLine>Java systems and manual-grade operations.</ManualReadableLine>
                </MainLockup>
            </ManualField>

            <ManualFooterStrip>
                <span>V3.0</span>
                <span style={{ 'text-align': 'center' }}>UNAVAILABLE</span>
                <span style={{ 'text-align': 'right' }}>17.10.11</span>
            </ManualFooterStrip>
        </ManualSurface>
    </ManualPanel>
);

export default SplashSection;
