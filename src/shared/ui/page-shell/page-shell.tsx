import type { JSX } from '@solidjs/web';

interface PageShellProps {
    children: JSX.Element;
    class?: string;
}

export const PageShell = (props: PageShellProps) => <div class={props.class}>{props.children}</div>;
