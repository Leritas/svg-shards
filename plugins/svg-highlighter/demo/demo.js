import { SvgHighlighter } from './vendor/highlighter.bundle.js';

function showError(message) {
    const panel = document.getElementById('error-panel');
    panel.textContent = message;
    panel.classList.remove('hidden');
}

function loadSvg() {
    const template = document.getElementById('sample-svg-template');
    return template.content.querySelector('svg').cloneNode(true);
}

function renderList(entries, onSelect, activeIndex) {
    const list = document.getElementById('element-list');
    list.innerHTML = '';

    entries.forEach((entry, index) => {
        const li = document.createElement('li');
        li.className = 'element-item' + (index === activeIndex ? ' active' : '');
        li.innerHTML = `
      <span class="element-type">${entry.type}</span>
      <span class="element-label">${entry.label}</span>
    `;
        li.addEventListener('click', () => onSelect(index));
        list.appendChild(li);
    });
}

async function main() {
    const svg = loadSvg();
    const viewport = document.getElementById('viewport');

    const highlighter = SvgHighlighter.create(svg, {
        highlightColor: '#ff6600',
        strokeWidthBoost: 3,
        container: viewport,
    });

    if (!highlighter) {
        throw new Error('Failed to initialize highlighter — SVG not found');
    }

    function refreshList() {
        renderList(highlighter.getElementList(), selectIndex, highlighter.getCurrentIndex());
    }

    function selectIndex(index) {
        highlighter.highlightByIndex(index);
        refreshList();
    }

    refreshList();

    document.getElementById('btn-next').addEventListener('click', () => {
        highlighter.highlightNext();
        refreshList();
    });

    document.getElementById('btn-prev').addEventListener('click', () => {
        highlighter.highlightPrev();
        refreshList();
    });

    const vp = highlighter.getViewport();
    document.getElementById('btn-zoom-in').addEventListener('click', () => vp?.zoomIn());
    document.getElementById('btn-zoom-out').addEventListener('click', () => vp?.zoomOut());
    document.getElementById('btn-rotate').addEventListener('click', () => vp?.rotate());
    document.getElementById('btn-reset').addEventListener('click', () => vp?.reset());

    document.querySelectorAll('input[name="highlight-mode"]').forEach((input) => {
        input.addEventListener('change', (event) => {
            if (event.target.checked) {
                highlighter.setHighlightMode(event.target.value);
                refreshList();
            }
        });
    });
}

main().catch((error) => {
    showError(
        error instanceof Error ? `${error.message}\n\nRun "npm run demo" to build and prepare assets.` : String(error),
    );
    console.error(error);
});
