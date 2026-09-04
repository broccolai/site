import type { JSX } from '@solidjs/web';
import { HydrationScript } from '@solidjs/web';

export default function Document(props: { children: JSX.Element }) {
    return (
        <html lang='en'>
            <head>
                <meta charset='UTF-8' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <meta name='description' content="broccolai's personal page" />
                <title>broccol.ai</title>
                <HydrationScript />
            </head>
            <body>{props.children}</body>
        </html>
    );
}
