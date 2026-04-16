import type { Id } from '@thisbeyond/solid-dnd';
import { createDraggable, createDroppable, useDragDropContext } from '@thisbeyond/solid-dnd';
import type { JSXElement } from 'solid-js';
import { CardBody, CardShell, CardText, PlaceholderShell, PlaceholderText } from '@/features/tier-list/components/styles';
import type { Entry } from '@/features/tier-list/model/types';

type CardViewProps = {
    entry: Entry;
    grabbing?: boolean;
};

export const CardView = (props: CardViewProps) => (
    <CardShell style={{ cursor: props.grabbing ? 'grabbing' : undefined }}>
        <CardBody>
            <CardText>{props.entry.name}</CardText>
        </CardBody>
    </CardShell>
);

type TierCardPlaceholderProps = {
    text?: string;
};

export const TierCardPlaceholder = (props: TierCardPlaceholderProps) => (
    <PlaceholderShell>
        <CardBody>
            <PlaceholderText>{props.text ?? 'drop here'}</PlaceholderText>
        </CardBody>
    </PlaceholderShell>
);

const DragWrap = (props: { children: JSXElement; dragging: boolean }) => (
    <div
        style={{
            'touch-action': 'none',
            transition: 'transform 120ms ease, filter 120ms ease',
            opacity: props.dragging ? 0 : 1,
            'pointer-events': props.dragging ? 'none' : undefined,
        }}
    >
        {props.children}
    </div>
);

type TierCardProps = {
    entry: Entry;
    draggableId: Id;
    beforeDroppableId: Id;
};

export const TierCard = (props: TierCardProps) => {
    const droppable = createDroppable(props.beforeDroppableId);
    const draggable = createDraggable(props.draggableId);
    const dnd = useDragDropContext();

    if (!dnd) {
        throw new Error('TierCard must be rendered within DragDropProvider');
    }

    const isDraggingThis = () => draggable.isActiveDraggable;

    return (
        <div ref={(el) => droppable(el)}>
            <DragWrap dragging={isDraggingThis()}>
                <div ref={(el) => draggable(el, () => ({ skipTransform: true }))}>
                    <CardView entry={props.entry} />
                </div>
            </DragWrap>
        </div>
    );
};
