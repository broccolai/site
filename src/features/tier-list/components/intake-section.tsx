import type { JSX } from 'solid-js';
import {
    FillGrid,
    FullWidthActionButton,
    IntakeBody,
    IntakeField,
    SectionForm,
    SectionHeader,
    SectionTitle,
} from '@/features/tier-list/components/styles';

export interface TierListIntakeSectionProps {
    value: string;
    onInput: JSX.EventHandlerUnion<HTMLTextAreaElement, InputEvent>;
    onSubmit: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent>;
}

const TierListIntakeSection = (props: TierListIntakeSectionProps) => (
    <SectionForm onSubmit={props.onSubmit}>
        <SectionHeader>
            <SectionTitle>INTAKE / FIELD</SectionTitle>
        </SectionHeader>

        <IntakeBody>
            <IntakeField value={props.value} onInput={props.onInput} placeholder='one per line' spellcheck={false} />

            <FillGrid>
                <FullWidthActionButton type='submit' tone='primary'>
                    Add To Pool
                </FullWidthActionButton>
            </FillGrid>
        </IntakeBody>
    </SectionForm>
);

export default TierListIntakeSection;
