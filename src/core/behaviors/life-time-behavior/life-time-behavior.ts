import {LifeTimeBehaviorConfig} from './life-time-behavior.types';
import {realRandom} from '../../../utils/random/RealRandom';
import {isLifeTimeStaticBehaviorConfig} from './life-time-behavior.typeguards';

export const getLifeTimeNormalizedProgress = (age: number, lifeTime: number): number => {
  if (lifeTime === 0 || lifeTime === Infinity || lifeTime === Number.MAX_SAFE_INTEGER) return 0;

  return age / lifeTime;
};

export function getLifeTimeBehavior(config: LifeTimeBehaviorConfig): number {
  let remainingLifeTime: number;

  if (isLifeTimeStaticBehaviorConfig(config)) {
    remainingLifeTime = config.value;
  } else {
    remainingLifeTime = realRandom.generateIntegerNumber(config.min, config.max);
  }

  return remainingLifeTime;
}
