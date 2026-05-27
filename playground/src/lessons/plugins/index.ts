import { highlighterLessons } from '../../../../plugins/svg-highlighter/playground/src/lessons';
import { particlesLessons } from '../../../../plugins/particles/playground/src/lessons';
import type { PluginLessonGroup } from '../../types';
import { lessons as coreLessons, defaultLessonId } from '../index';

export { defaultLessonId };

export const pluginGroups: PluginLessonGroup[] = [
    {
        id: 'highlighter',
        title: '@svg-shards/highlighter',
        lessons: highlighterLessons,
    },
    {
        id: 'particles',
        title: '@svg-shards/particles',
        lessons: particlesLessons,
    },
];

export const allLessons = [...coreLessons, ...pluginGroups.flatMap((group) => group.lessons)];
