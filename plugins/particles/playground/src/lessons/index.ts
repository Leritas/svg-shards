import { bouncingBallsLesson } from './01-bouncing-balls';
import { createShardsLesson } from './02-create-shards';
import { spawnInitLesson } from './03-spawn-init';
import { physicsMechanicsLesson } from './04-physics-mechanics';
import { lifecycleLesson } from './05-lifecycle';
import { snowfallLesson } from './06-snowfall';

export const particlesLessons = [
    bouncingBallsLesson,
    createShardsLesson,
    spawnInitLesson,
    physicsMechanicsLesson,
    lifecycleLesson,
    snowfallLesson,
];

export const defaultLessonId = bouncingBallsLesson.id;
