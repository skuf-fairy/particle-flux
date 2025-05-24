import {LifeTimeStaticBehaviorConfig} from './core/behaviors/life-time-behavior/life-time-behavior.types';
import {DirectionConfig} from './core/direction/direction.types';
import {Point2d} from './types';

export const DEFAULT_LIFE_TIME_CONFIG: LifeTimeStaticBehaviorConfig = {value: Number.POSITIVE_INFINITY};
export const DEFAULT_DIRECTION_CONFIG: DirectionConfig = {minAngle: 0, maxAngle: 360};
export const DEFAULT_SPAWN_POSITION: Point2d = {x: 0, y: 0};

export const GRAVITY_DEFAULT_MULTIPLIER = 100;

export const START_SCRIPT_TIME = 0;
export const END_SCRIPT_TIME = 100;

export const MIN_SPAWN_CHANCE = 0;
export const MAX_SPAWN_CHANCE = 100;
