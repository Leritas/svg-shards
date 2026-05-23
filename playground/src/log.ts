const MAX_LINES = 80;

let outputEl: HTMLElement | null = null;

export function initLogPanel(element: HTMLElement): void {
    outputEl = element;
}

export function clearLog(): void {
    if (outputEl) {
        outputEl.textContent = '';
    }
}

export function logApi(message: string, detail?: string): void {
    if (!outputEl) {
        return;
    }

    const line = document.createElement('div');
    line.className = 'log-line';

    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = `[${new Date().toLocaleTimeString()}] `;

    const msg = document.createElement('span');
    msg.className = 'msg';
    msg.textContent = message;

    line.appendChild(time);
    line.appendChild(msg);

    if (detail) {
        const detailSpan = document.createElement('span');
        detailSpan.className = 'detail';
        detailSpan.textContent = ` → ${detail}`;
        line.appendChild(detailSpan);
    }

    outputEl.appendChild(line);

    while (outputEl.childElementCount > MAX_LINES) {
        outputEl.firstElementChild?.remove();
    }

    outputEl.scrollTop = outputEl.scrollHeight;
}
