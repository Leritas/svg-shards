import { createLessonContext, initAppState, resetScene } from './app-state';
import { clearLog, initLogPanel, logApi } from './log';
import { defaultLessonId, highlighterLessons } from './lessons';
import type { Lesson } from './types';

let activeCleanup: (() => void) | null = null;
let activeLesson: Lesson | null = null;

const navEl = document.getElementById('lesson-nav')!;
const titleEl = document.getElementById('lesson-title')!;
const descEl = document.getElementById('lesson-description')!;
const apiRefsEl = document.getElementById('lesson-api-refs')!;
const controlsEl = document.getElementById('lesson-controls')!;
const snippetEl = document.getElementById('lesson-snippet')!;
const canvasHost = document.getElementById('canvas-host')!;

function setSnippet(code: string): void {
    snippetEl.textContent = code;
}

function getLessonFromHash(): Lesson {
    const id = location.hash.replace(/^#/, '') || defaultLessonId;
    return highlighterLessons.find((lesson) => lesson.id === id) ?? highlighterLessons[0];
}

function updateNav(activeId: string): void {
    navEl.replaceChildren();
    for (const lesson of highlighterLessons) {
        const link = document.createElement('a');
        link.href = `#${lesson.id}`;
        link.textContent = lesson.title.split(' — ')[0] || lesson.title;
        if (lesson.id === activeId) {
            link.classList.add('active');
        }
        navEl.appendChild(link);
    }
}

function mountLesson(lesson: Lesson): void {
    if (activeCleanup) {
        activeCleanup();
        activeCleanup = null;
    }

    if (activeLesson) {
        activeLesson.reset(createLessonContext(setSnippet));
    }

    resetScene();
    logApi(`Lesson: ${lesson.title}`);

    titleEl.textContent = lesson.title;
    descEl.textContent = lesson.description;
    apiRefsEl.replaceChildren();
    for (const ref of lesson.apiRefs) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = ref;
        apiRefsEl.appendChild(tag);
    }

    snippetEl.textContent = lesson.snippet;
    controlsEl.replaceChildren();

    const ctx = createLessonContext(setSnippet);
    activeCleanup = lesson.mount(controlsEl, ctx);
    activeLesson = lesson;
    updateNav(lesson.id);
}

function initRouter(): void {
    const navigate = (): void => {
        const lesson = getLessonFromHash();
        if (activeLesson?.id !== lesson.id) {
            mountLesson(lesson);
        } else {
            updateNav(lesson.id);
        }
    };

    window.addEventListener('hashchange', navigate);
    navigate();
}

function remountActiveLessonControls(): void {
    if (!activeLesson) {
        return;
    }

    if (activeCleanup) {
        activeCleanup();
        activeCleanup = null;
    }

    controlsEl.replaceChildren();
    const ctx = createLessonContext(setSnippet);
    activeCleanup = activeLesson.mount(controlsEl, ctx);
}

function init(): void {
    initLogPanel(document.getElementById('log-output')!);
    initAppState(canvasHost);

    document.getElementById('btn-clear-log')!.addEventListener('click', clearLog);
    document.getElementById('btn-reset-scene')!.addEventListener('click', () => {
        if (activeLesson) {
            activeLesson.reset(createLessonContext(setSnippet));
            remountActiveLessonControls();
        } else {
            resetScene();
        }
        logApi('Scene reset');
    });

    initRouter();
    logApi('Highlighter playground ready', `${highlighterLessons.length} lessons loaded`);
}

init();
