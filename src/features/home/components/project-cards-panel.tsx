import { styled } from '@panda/jsx';
import { createMemo, createSignal, For, onMount, Show } from 'solid-js';
import { ConstructionGrid, HomePanel } from '@/features/home/components/styles';
import { MONO_FONT_FAMILY, UI_FONT_FAMILY } from '@/shared/ui/primitives';

type ProjectCard = {
    id: keyof typeof LAYOUTS.default;
    code: string;
    name: string;
    blurb: string;
    detail: string;
    meta: string;
    status: string;
    accent: string;
};

type SlotPlacement = {
    col: number;
    row: number;
    span: number;
};

const LAYOUTS = {
    default: {
        tier: { col: 1, row: 1, span: 1 },
        relay: { col: 2, row: 1, span: 2 },
        signal: { col: 4, row: 1, span: 1 },
        archive: { col: 1, row: 2, span: 1 },
        backend: { col: 2, row: 2, span: 1 },
        ops: { col: 3, row: 2, span: 1 },
        stack: { col: 4, row: 2, span: 1 },
    },
    tier: {
        tier: { col: 1, row: 1, span: 2 },
        relay: { col: 3, row: 1, span: 1 },
        signal: { col: 4, row: 1, span: 1 },
        archive: { col: 1, row: 2, span: 1 },
        backend: { col: 2, row: 2, span: 1 },
        ops: { col: 3, row: 2, span: 1 },
        stack: { col: 4, row: 2, span: 1 },
    },
    relay: {
        tier: { col: 1, row: 1, span: 1 },
        relay: { col: 2, row: 1, span: 2 },
        signal: { col: 4, row: 1, span: 1 },
        archive: { col: 1, row: 2, span: 1 },
        backend: { col: 2, row: 2, span: 1 },
        ops: { col: 3, row: 2, span: 1 },
        stack: { col: 4, row: 2, span: 1 },
    },
    signal: {
        tier: { col: 1, row: 1, span: 1 },
        relay: { col: 2, row: 1, span: 1 },
        signal: { col: 3, row: 1, span: 2 },
        archive: { col: 1, row: 2, span: 1 },
        backend: { col: 2, row: 2, span: 1 },
        ops: { col: 3, row: 2, span: 1 },
        stack: { col: 4, row: 2, span: 1 },
    },
    archive: {
        tier: { col: 1, row: 1, span: 1 },
        relay: { col: 2, row: 1, span: 1 },
        signal: { col: 3, row: 1, span: 1 },
        backend: { col: 4, row: 1, span: 1 },
        archive: { col: 1, row: 2, span: 2 },
        ops: { col: 3, row: 2, span: 1 },
        stack: { col: 4, row: 2, span: 1 },
    },
    backend: {
        tier: { col: 1, row: 1, span: 1 },
        relay: { col: 2, row: 1, span: 1 },
        signal: { col: 3, row: 1, span: 1 },
        archive: { col: 4, row: 1, span: 1 },
        backend: { col: 1, row: 2, span: 2 },
        ops: { col: 3, row: 2, span: 1 },
        stack: { col: 4, row: 2, span: 1 },
    },
    ops: {
        tier: { col: 1, row: 1, span: 1 },
        relay: { col: 2, row: 1, span: 1 },
        signal: { col: 3, row: 1, span: 1 },
        archive: { col: 4, row: 1, span: 1 },
        backend: { col: 1, row: 2, span: 1 },
        ops: { col: 2, row: 2, span: 2 },
        stack: { col: 4, row: 2, span: 1 },
    },
    stack: {
        tier: { col: 1, row: 1, span: 1 },
        relay: { col: 2, row: 1, span: 1 },
        signal: { col: 3, row: 1, span: 1 },
        archive: { col: 4, row: 1, span: 1 },
        backend: { col: 1, row: 2, span: 1 },
        ops: { col: 2, row: 2, span: 1 },
        stack: { col: 3, row: 2, span: 2 },
    },
} as const satisfies Record<string, Record<string, SlotPlacement>>;

const PROJECTS: ProjectCard[] = [
    {
        id: 'tier',
        code: '01',
        name: 'Tier Grid',
        blurb: 'Ranked utility surface.',
        detail: 'Persistent drag-and-drop board with clean state transitions and compact interaction framing.',
        meta: 'SOLID / DND / STATE',
        status: 'ACTIVE',
        accent: '#ff6fa8',
    },
    {
        id: 'relay',
        code: '02',
        name: 'Relay Archive',
        blurb: 'Manual-led interface language.',
        detail: 'Quiet design-system exploration focused on sparse marks, print-like texture, and operational rhythm.',
        meta: 'ASTRO / PANDA / UI',
        status: 'DEFAULT',
        accent: '#7f8cff',
    },
    {
        id: 'signal',
        code: '03',
        name: 'Signal Core',
        blurb: 'Java systems in small surfaces.',
        detail: 'Backend-oriented work translated into compact operational objects instead of dashboard-heavy UI.',
        meta: 'JAVA / SERVICES / TOOLS',
        status: 'FIELD',
        accent: '#ffd86b',
    },
    {
        id: 'archive',
        code: '04',
        name: 'Archive Run',
        blurb: 'Structured content indexing.',
        detail: 'Search, grouping, and retrieval flows tuned for small inputs and fast scanning.',
        meta: 'INDEX / SEARCH / FLOW',
        status: 'DRAFT',
        accent: '#73f09a',
    },
    {
        id: 'backend',
        code: '05',
        name: 'Backend Paths',
        blurb: 'Service-first implementation.',
        detail: 'Pragmatic service work with emphasis on interfaces, tooling discipline, and readable operations.',
        meta: 'JAVA / APIs / RUNTIME',
        status: 'ACTIVE',
        accent: '#be8dff',
    },
    {
        id: 'ops',
        code: '06',
        name: 'Ops Surface',
        blurb: 'Manual-like status views.',
        detail: 'Operational cues distilled into small object states, terse labels, and expandable detail.',
        meta: 'OPS / STATUS / UI',
        status: 'READY',
        accent: '#ff86c8',
    },
    {
        id: 'stack',
        code: '07',
        name: 'Stack Notes',
        blurb: 'Tooling and method fragments.',
        detail: 'Builds, scripts, and implementation notes organized as compact system objects with light animation.',
        meta: 'TOOLS / METHOD / BUILD',
        status: 'LOG',
        accent: '#ffab66',
    },
];

const ProjectPanel = styled(HomePanel, {
    base: {
        position: 'relative',
        background:
            'radial-gradient(circle at 18% 22%, rgba(9, 11, 16, 0.05), transparent 24%), radial-gradient(circle at 78% 68%, rgba(9, 11, 16, 0.04), transparent 28%), #f4f1e9',
        overflow: 'hidden',
    },
});

const FieldTexture = styled('div', {
    base: {
        position: 'absolute',
        inset: '0',
        backgroundImage:
            'radial-gradient(rgba(9, 11, 16, 0.05) 0.6px, transparent 0.8px), radial-gradient(rgba(9, 11, 16, 0.03) 0.6px, transparent 0.8px)',
        backgroundSize: '11px 11px, 17px 17px',
        backgroundPosition: '0 0, 5px 6px',
        opacity: '0.18',
        pointerEvents: 'none',
    },
});

const AmbientLabel = styled('div', {
    base: {
        position: 'absolute',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.58rem',
        lineHeight: '1.2',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.48)',
        zIndex: '1',
        userSelect: 'none',
    },
});

const ProjectField = styled('div', {
    base: {
        position: 'relative',
        zIndex: '2',
        width: '100%',
        height: '100%',
        paddingInline: 'clamp(1.25rem, 3vw, 2.5rem)',
        paddingBlock: 'max(calc(var(--home-panel-vertical-inset) + 1rem), 5rem) 4rem',
        display: 'grid',
        alignItems: 'center',
        '@media (max-width: 900px)': {
            paddingInline: '1.25rem',
            paddingBlock: 'max(calc(var(--home-panel-vertical-inset) + 0.75rem), 4rem) 2rem',
        },
    },
});

const ProjectStage = styled('div', {
    base: {
        position: 'relative',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gridTemplateRows: 'repeat(2, minmax(9rem, 12.5rem))',
        gap: '1rem',
        '@media (max-width: 900px)': {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'none',
            gridAutoRows: 'minmax(8.5rem, auto)',
        },
    },
});

const ProjectShell = styled('button', {
    base: {
        '--accent-fill': '0.5',
        '--accent-line': '0.38',
        '--accent-soft': '0.16',
        appearance: 'none',
        position: 'relative',
        border: 'none',
        padding: '0',
        width: '100%',
        minHeight: '100%',
        background: 'transparent',
        borderRadius: '0.55rem',
        boxShadow: 'inset 0 0 0 1px rgba(9, 11, 16, 0.12)',
        textAlign: 'left',
        cursor: 'pointer',
        overflow: 'hidden',
        gridColumn: 'var(--slot-col) / span var(--slot-span)',
        gridRow: 'var(--slot-row)',
        transition: 'grid-column 220ms cubic-bezier(0.2, 0, 0, 1), opacity 180ms linear, box-shadow 180ms linear, filter 180ms linear',
        _hover: {
            '--accent-fill': '0.76',
            '--accent-line': '0.54',
            '--accent-soft': '0.3',
            boxShadow: 'inset 0 0 0 1px rgba(9, 11, 16, 0.18)',
        },
        _focusVisible: {
            outline: '2px solid rgba(9, 11, 16, 0.22)',
            outlineOffset: '2px',
        },
        '@media (max-width: 900px)': {
            gridColumn: '1 / -1',
            gridRow: 'auto',
        },
    },
    variants: {
        expanded: {
            true: {
                '--accent-fill': '1',
                '--accent-line': '0.72',
                '--accent-soft': '0.42',
            },
            false: {},
        },
        muted: {
            true: {
                '--accent-fill': '0.26',
                '--accent-line': '0.18',
                '--accent-soft': '0.08',
                opacity: '0.84',
                filter: 'saturate(0.86)',
            },
            false: {
                opacity: '1',
                filter: 'none',
            },
        },
    },
});

const CardFrame = styled('div', {
    base: {
        display: 'grid',
        height: '100%',
        gridTemplateColumns: 'minmax(0, 1fr)',
        transition: 'grid-template-columns 220ms cubic-bezier(0.2, 0, 0, 1)',
        '@media (max-width: 900px)': {
            gridTemplateColumns: '1fr',
        },
    },
    variants: {
        expanded: {
            true: {
                gridTemplateColumns: 'minmax(0, 0.92fr) minmax(0, 1.08fr)',
                '@media (max-width: 900px)': {
                    gridTemplateColumns: '1fr',
                },
            },
            false: {},
        },
    },
});

const FacePane = styled('div', {
    base: {
        position: 'relative',
        minWidth: '0',
        height: '100%',
        display: 'grid',
        alignContent: 'space-between',
        gap: '0.9rem',
        padding: '1.05rem',
        background: '#111318',
        color: '#f3f2ef',
    },
});

const RevealPane = styled('div', {
    base: {
        display: 'grid',
        minWidth: '0',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.94)',
        opacity: '0',
        transform: 'translateX(-10px)',
        transition: 'opacity 140ms linear, transform 180ms cubic-bezier(0.2, 0, 0, 1)',
        borderLeft: '1px solid rgba(9, 11, 16, 0.12)',
        '@media (max-width: 900px)': {
            borderLeft: 'none',
            borderTop: '1px solid rgba(9, 11, 16, 0.12)',
        },
    },
    variants: {
        expanded: {
            true: {
                opacity: '1',
                transform: 'translateX(0)',
            },
            false: {},
        },
    },
});

const RevealInner = styled('div', {
    base: {
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: '0.75rem',
        padding: '1rem 1.05rem',
    },
});

const FaceTop = styled('div', {
    base: {
        display: 'grid',
        gap: '0.8rem',
        alignContent: 'start',
    },
});

const FaceBody = styled('div', {
    base: {
        display: 'grid',
        gap: '0.55rem',
        alignSelf: 'center',
    },
});

const CodeText = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.48rem',
        lineHeight: '1',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255, 255, 255, 0.78)',
    },
});

const FaceTitle = styled('div', {
    base: {
        fontFamily: UI_FONT_FAMILY,
        fontWeight: '700',
        fontSize: 'clamp(0.92rem, 1.35vw, 1.08rem)',
        lineHeight: '0.92',
        letterSpacing: '-0.05em',
        textTransform: 'uppercase',
        color: '#f7f7fb',
        maxWidth: '14ch',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'clip',
    },
});

const TaglineText = styled('p', {
    base: {
        margin: '0',
        maxWidth: '15ch',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.52rem',
        lineHeight: '1.25',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#ebe7de',
    },
});

const RevealStatus = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.5rem',
        lineHeight: '1',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.58)',
    },
});

const RevealMeta = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.52rem',
        lineHeight: '1.18',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.5)',
    },
});

const RevealDetail = styled('p', {
    base: {
        margin: '0',
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.58rem',
        lineHeight: '1.42',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(9, 11, 16, 0.66)',
    },
});

const RevealAction = styled('div', {
    base: {
        fontFamily: MONO_FONT_FAMILY,
        fontSize: '0.5rem',
        lineHeight: '1',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#f7f7fb',
        background: '#090b10',
        padding: '0.36rem 0.5rem 0.3rem',
        justifySelf: 'start',
    },
});

const RevealMetaRow = styled('div', {
    base: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        justifyContent: 'space-between',
        alignItems: 'start',
        gap: '0.75rem',
    },
});

const BrutalistCard = (props: { expanded: boolean; project: ProjectCard }) => (
    <CardFrame expanded={props.expanded}>
        <FacePane>
            <FaceTop>
                <div
                    style={{
                        width: '1.4rem',
                        height: '1.4rem',
                        background: 'color-mix(in srgb, var(--project-accent) calc(var(--accent-fill) * 100%), #17191f)',
                    }}
                />
                <CodeText>{props.project.code}</CodeText>
            </FaceTop>

            <FaceBody>
                <FaceTitle>{props.project.name}</FaceTitle>
                <TaglineText>{props.project.blurb}</TaglineText>
            </FaceBody>
        </FacePane>

        <Show when={props.expanded}>
            <RevealPane expanded={props.expanded}>
                <RevealInner>
                    <RevealMetaRow>
                        <RevealStatus>{props.project.status}</RevealStatus>
                        <RevealMeta>{props.project.meta}</RevealMeta>
                    </RevealMetaRow>
                    <RevealDetail>{props.project.detail}</RevealDetail>
                    <RevealAction>{props.expanded ? 'COLLAPSE' : 'SELECT'}</RevealAction>
                </RevealInner>
            </RevealPane>
        </Show>
    </CardFrame>
);

const ProjectCardsPanel = () => {
    const [expandedId, setExpandedId] = createSignal<ProjectCard['id']>('relay');
    const [ready, setReady] = createSignal(false);
    const placements = createMemo(() => LAYOUTS[expandedId()] ?? LAYOUTS.default);

    onMount(() => {
        requestAnimationFrame(() => setReady(true));
    });

    return (
        <ProjectPanel>
            <ConstructionGrid style={{ opacity: '0.06' }} />
            <FieldTexture />

            <ProjectField>
                <ProjectStage>
                    <AmbientLabel style={{ top: '-1.05rem', left: '0' }}>SLOT ARRAY</AmbientLabel>
                    <AmbientLabel style={{ bottom: '-1.3rem', right: '0' }}>08 FIELD</AmbientLabel>

                    <For each={PROJECTS}>
                        {(project, index) => {
                            const expanded = () => expandedId() === project.id;
                            const muted = () => expandedId() !== null && !expanded();
                            const placement = () => placements()[project.id];

                            return (
                                <ProjectShell
                                    type='button'
                                    expanded={expanded()}
                                    muted={muted()}
                                    onClick={() => setExpandedId(project.id)}
                                    style={{
                                        '--project-accent': project.accent,
                                        '--slot-col': `${placement().col}`,
                                        '--slot-row': `${placement().row}`,
                                        '--slot-span': `${placement().span}`,
                                        opacity: ready() ? undefined : '0',
                                        transform: ready() ? 'translate3d(0, 0, 0)' : 'translate3d(0, 14px, 0)',
                                        'transition-delay': `${index() * 55}ms`,
                                    }}
                                >
                                    <BrutalistCard project={project} expanded={expanded()} />
                                </ProjectShell>
                            );
                        }}
                    </For>
                </ProjectStage>
            </ProjectField>
        </ProjectPanel>
    );
};

export default ProjectCardsPanel;
