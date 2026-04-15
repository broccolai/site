import { styled } from '@panda/jsx';
import type { Id } from '@thisbeyond/solid-dnd';
import { createDraggable, createDroppable, useDragDropContext } from '@thisbeyond/solid-dnd';
import type { Entry } from '@/features/tier-list/model/types';

export const CardShell = styled('div', {
    base: {
        borderRadius: '14px',
        minWidth: '160px',
        minHeight: '64px',
        padding: '0.75rem 0.85rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        userSelect: 'none',
    },
});

export const CardText = styled('div', {
    base: {
        fontFamily: 'PT Mono, ui-monospace, monospace',
        letterSpacing: '1px',
        fontSize: '0.95rem',
        lineHeight: 1.15,
        maxWidth: '260px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        color: 'rgba(0,0,0,0.90)',
    },
});

type CardViewProps = {
    entry: Entry;
    grabbing?: boolean;
};

export const CardView = (props: CardViewProps) => (
    <CardShell style={{ background: props.entry.bg, cursor: props.grabbing ? 'grabbing' : undefined }}>
        <CardText>{props.entry.name}</CardText>
    </CardShell>
);

const PlaceholderShell = styled(CardShell, {
    base: {
        backgroundColor: 'rgba(155,155,155,0.10)',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
    },
});

const PlaceholderText = styled(CardText, {
    base: {
        color: 'rgba(60,60,60,0.70)',
        fontSize: '0.85rem',
    },
});

type TierCardPlaceholderProps = {
    text?: string;
};

export const TierCardPlaceholder = (props: TierCardPlaceholderProps) => (
    <PlaceholderShell>
        <PlaceholderText>{props.text ?? 'drop here'}</PlaceholderText>
    </PlaceholderShell>
);

const DragWrap = styled('div', {
    base: {
        touchAction: 'none',
        transition: 'transform 120ms ease, filter 120ms ease',
    },
});

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

    const [state] = dnd;

    const isDraggingThis = () => draggable.isActiveDraggable;

    return (
        <div ref={(el) => droppable(el)}>
            <DragWrap
                ref={(el) => draggable(el, () => ({ skipTransform: true }))}
                style={isDraggingThis() ? { opacity: 0, 'pointer-events': 'none' } : undefined}
                classList={{
                    'transition-transform': !!state.active.draggable,
                }}
            >
                <CardView entry={props.entry} />
            </DragWrap>
        </div>
    );
};
