import { styled } from '@panda/jsx';
import type { JSX } from 'solid-js';
import { createEffect, createMemo, createSignal, onCleanup, onMount } from 'solid-js';
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
import { getCurrentPanel } from '@/shared/ui/panel-system/store';

const SCRAMBLE_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/-+.';

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

const LOAD_IN_TARGETS = [
    'top-site',
    'top-relay',
    'top-status',
    'code-bridge',
    'code-rotary',
    'code-slashes',
    'code-relay',
    'code-dash-a',
    'code-dash-b',
    'footer-version',
    'footer-status',
    'footer-date',
] as const;

const createScrambledText = (text: string, revealProgress: number): string => {
    const chars = Array.from(text);
    const revealedCount = Math.floor(chars.length * revealProgress);

    return chars
        .map((char, index) => {
            if (char === ' ' || index < revealedCount) {
                return char;
            }

            return SCRAMBLE_CHARSET[Math.floor(Math.random() * SCRAMBLE_CHARSET.length)] ?? char;
        })
        .join('');
};

const createLoadInText = (text: () => string, enabled: () => boolean, delayMs: () => number, runKey: () => number) => {
    const [displayedText, setDisplayedText] = createSignal(text());
    const [isResolving, setIsResolving] = createSignal(false);

    createEffect(() => {
        setDisplayedText(text());
    });

    createEffect(() => {
        const currentRun = runKey();

        if (!enabled() || currentRun === 0) {
            setDisplayedText(text());
            setIsResolving(false);
            return;
        }

        setDisplayedText(createScrambledText(text(), 0));
        setIsResolving(true);

        const startTimer = window.setTimeout(() => {
            let step = 0;
            const totalSteps = 14;

            const resolveTimer = window.setInterval(() => {
                step += 1;
                const progress = Math.min(step / totalSteps, 1);
                setDisplayedText(createScrambledText(text(), progress));

                if (progress >= 1) {
                    window.clearInterval(resolveTimer);
                    setDisplayedText(text());
                    setIsResolving(false);
                }
            }, 72);

            onCleanup(() => {
                window.clearInterval(resolveTimer);
            });
        }, delayMs());

        onCleanup(() => {
            window.clearTimeout(startTimer);
            setDisplayedText(text());
            setIsResolving(false);
        });
    });

    return {
        displayedText,
        isResolving,
    };
};

interface AnimatedInlineTextProps {
    text: string;
    enabled: boolean;
    delayMs: number;
    runKey: number;
    style?: JSX.CSSProperties;
}

const AnimatedInlineText = (props: AnimatedInlineTextProps) => {
    const { displayedText, isResolving } = createLoadInText(
        () => props.text,
        () => props.enabled,
        () => props.delayMs,
        () => props.runKey,
    );

    return (
        <span
            style={{
                transition: 'opacity 90ms linear, transform 90ms linear',
                opacity: isResolving() ? '0.78' : '1',
                transform: isResolving() ? 'translateX(1px)' : 'none',
                ...props.style,
            }}
        >
            {displayedText()}
        </span>
    );
};

interface AnimatedMicroCodeProps {
    text: string;
    enabled: boolean;
    delayMs: number;
    runKey: number;
    style?: JSX.CSSProperties;
}

const AnimatedMicroCode = (props: AnimatedMicroCodeProps) => {
    const { displayedText, isResolving } = createLoadInText(
        () => props.text,
        () => props.enabled,
        () => props.delayMs,
        () => props.runKey,
    );

    return (
        <ManualMicroCode
            style={{
                transition: 'opacity 90ms linear, transform 90ms linear',
                opacity: isResolving() ? '0.74' : '1',
                transform: isResolving() ? 'translateX(1px)' : 'none',
                ...props.style,
            }}
        >
            {displayedText()}
        </ManualMicroCode>
    );
};

const SplashPanel = () => {
    const [motionAllowed, setMotionAllowed] = createSignal(true);
    const [pageVisible, setPageVisible] = createSignal(true);
    const [loadRun, setLoadRun] = createSignal(0);
    const panelIsActive = createMemo(() => getCurrentPanel() === 1);
    const canAnimate = createMemo(() => motionAllowed() && pageVisible() && panelIsActive());

    onMount(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleMotionChange = () => setMotionAllowed(!mediaQuery.matches);
        const handleVisibilityChange = () => setPageVisible(document.visibilityState === 'visible');

        handleMotionChange();
        handleVisibilityChange();

        mediaQuery.addEventListener('change', handleMotionChange);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        onCleanup(() => {
            mediaQuery.removeEventListener('change', handleMotionChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        });
    });

    createEffect((wasActive) => {
        const isActive = canAnimate();

        if (isActive && !wasActive) {
            setLoadRun((prev) => prev + 1);
        }

        return isActive;
    }, false);

    const targetDelay = (targetId: (typeof LOAD_IN_TARGETS)[number]) => LOAD_IN_TARGETS.indexOf(targetId) * 180;

    return (
        <ManualPanel>
            <ManualGrid style={{ opacity: '0.05' }} />

            <ManualSurface>
                <ManualTextureField />

                <ManualTopStrip>
                    <AnimatedInlineText text='SITE.APP' enabled={canAnimate()} delayMs={targetDelay('top-site')} runKey={loadRun()} />
                    <AnimatedInlineText text='PUBLIC RELAY' enabled={canAnimate()} delayMs={targetDelay('top-relay')} runKey={loadRun()} />
                    <AnimatedInlineText
                        text='CLOSED'
                        enabled={canAnimate()}
                        delayMs={targetDelay('top-status')}
                        runKey={loadRun()}
                        style={{ 'text-align': 'right' }}
                    />
                </ManualTopStrip>

                <ManualField>
                    <AnimatedMicroCode
                        text='BR-01 RELAY // SYSTEMS'
                        enabled={canAnimate()}
                        delayMs={targetDelay('code-bridge')}
                        runKey={loadRun()}
                        style={{ 'grid-column': '2 / 5', 'grid-row': '1', 'align-self': 'start' }}
                    />
                    <ManualTinyRule style={{ 'grid-column': '2 / 5', 'grid-row': '2', width: '100%' }} />

                    <AnimatedMicroCode
                        text='180810'
                        enabled={canAnimate()}
                        delayMs={targetDelay('code-rotary')}
                        runKey={loadRun()}
                        style={{ 'grid-column': '2', 'grid-row': '5', transform: 'rotate(-90deg)' }}
                    />
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

                    <AnimatedMicroCode
                        text='///////'
                        enabled={canAnimate()}
                        delayMs={targetDelay('code-slashes')}
                        runKey={loadRun()}
                        style={{ 'grid-column': '9', 'grid-row': '3', 'justify-self': 'center' }}
                    />
                    <AnimatedMicroCode
                        text='RELAY'
                        enabled={canAnimate()}
                        delayMs={targetDelay('code-relay')}
                        runKey={loadRun()}
                        style={{ 'grid-column': '10', 'grid-row': '3', 'justify-self': 'start' }}
                    />
                    <AnimatedMicroCode
                        text='-'
                        enabled={canAnimate()}
                        delayMs={targetDelay('code-dash-a')}
                        runKey={loadRun()}
                        style={{ 'grid-column': '11', 'grid-row': '6', 'justify-self': 'end' }}
                    />
                    <AnimatedMicroCode
                        text='-'
                        enabled={canAnimate()}
                        delayMs={targetDelay('code-dash-b')}
                        runKey={loadRun()}
                        style={{ 'grid-column': '11', 'grid-row': '7', 'justify-self': 'end' }}
                    />
                    <ManualMicroCode style={{ 'grid-column': '7', 'grid-row': '10', 'justify-self': 'center' }}>+</ManualMicroCode>

                    <MainLockup>
                        <ManualHeroName>Josh Taylor</ManualHeroName>
                        <ManualReadableLine>Java systems and manual-grade operations.</ManualReadableLine>
                    </MainLockup>
                </ManualField>

                <ManualFooterStrip>
                    <AnimatedInlineText text='V3.0' enabled={canAnimate()} delayMs={targetDelay('footer-version')} runKey={loadRun()} />
                    <AnimatedInlineText
                        text='UNAVAILABLE'
                        enabled={canAnimate()}
                        delayMs={targetDelay('footer-status')}
                        runKey={loadRun()}
                        style={{ 'text-align': 'center' }}
                    />
                    <AnimatedInlineText
                        text='17.10.11'
                        enabled={canAnimate()}
                        delayMs={targetDelay('footer-date')}
                        runKey={loadRun()}
                        style={{ 'text-align': 'right' }}
                    />
                </ManualFooterStrip>
            </ManualSurface>
        </ManualPanel>
    );
};

export default SplashPanel;
