import type { JSX } from '@solidjs/web';
import { HydrationScript } from '@solidjs/web';
import { defaultPageMetadata } from '@/app/site-metadata';

export default function Document(props: { children: JSX.Element }) {
    return (
        <html lang='en'>
            <head>
                <meta charset='UTF-8' />
                <link rel='icon' type='image/svg+xml' href='/lotus/app-icons/lotus.svg' />
                <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
                <meta name='description' content={defaultPageMetadata.description} />
                <title>{defaultPageMetadata.title}</title>
                <HydrationScript />
            </head>
            <body>{props.children}</body>
        </html>
    );
}
