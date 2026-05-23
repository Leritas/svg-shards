import { basicsLesson } from './01-basics';
import { queryLesson } from './02-query';
import { manipulateLesson } from './03-manipulate';
import { transformsLesson } from './04-transforms';
import { syncLesson } from './05-sync';
import { reactiveLesson } from './06-reactive';
import { groupsLesson } from './07-groups';
import { highlightLesson } from './08-highlight';
import type { Lesson } from '../types';

export const lessons: Lesson[] = [
    basicsLesson,
    queryLesson,
    manipulateLesson,
    transformsLesson,
    syncLesson,
    reactiveLesson,
    groupsLesson,
    highlightLesson,
];

export const defaultLessonId = 'basics';
