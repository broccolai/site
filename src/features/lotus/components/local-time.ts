import { createSignal, onSettled } from 'solid-js';

export function formatLocalTime(date: Date): string {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

export function createLocalTime() {
    const [time, setTime] = createSignal('');
    onSettled(() => {
        const refresh = () => setTime(formatLocalTime(new Date()));
        refresh();
        const interval = window.setInterval(refresh, 1000);
        window.addEventListener('focus', refresh);
        document.addEventListener('visibilitychange', refresh);
        return () => {
            window.clearInterval(interval);
            window.removeEventListener('focus', refresh);
            document.removeEventListener('visibilitychange', refresh);
        };
    });
    return time;
}
