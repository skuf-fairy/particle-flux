import {LifeTimeBehaviorConfig} from './life-time-behavior.types';
import {isLifeTimeStaticBehaviorConfig} from './life-time-behavior.typeguards';
import {realRandom} from '../../../utils/random/Random';

// вернет от 0 до 1
export const getLifeTimeNormalizedProgress = (age: number, lifeTime: number): number => {
  if (lifeTime === 0 || lifeTime === Infinity || lifeTime === Number.MAX_SAFE_INTEGER) return 0;

  return age / lifeTime;
};

export function getLifeTimeBehavior(config: LifeTimeBehaviorConfig): number {
  let remainingLifeTime: number;

  if (isLifeTimeStaticBehaviorConfig(config)) {
    remainingLifeTime = config.value;
  } else {
    remainingLifeTime = realRandom.randomInt(config.min, config.max);
  }

  return remainingLifeTime;
}
