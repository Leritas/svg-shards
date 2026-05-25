import { highlighterLessons } from '../../../../plugins/svg-highlighter/playground/src/lessons';
import type { PluginLessonGroup } from '../../types';
import { lessons as coreLessons, defaultLessonId } from '../index';

export { defaultLessonId };

export const pluginGroups: PluginLessonGroup[] = [
    {
        id: 'highlighter',
        title: '@svg-shards/highlighter',
        lessons: highlighterLessons,
    },
];

export const allLessons = [...coreLessons, ...pluginGroups.flatMap((group) => group.lessons)];
