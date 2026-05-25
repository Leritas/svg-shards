import { navigationLesson } from './01-navigation';
import { modesLesson } from './02-modes';
import { groupsLesson } from './03-groups';
import type { Lesson } from '../types';

export const highlighterLessons: Lesson[] = [navigationLesson, modesLesson, groupsLesson];

export const defaultLessonId = 'highlighter-nav';
