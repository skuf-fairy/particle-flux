import {LifeTimeBehaviorConfig} from './LifeTimeBehavior.types';
import {realRandom} from '../../../utils/random/RealRandom';
import {isLifeTimeStaticBehaviorConfig} from './LifeTimeBehavior.typeguards';
import {NumberUtils} from '../../../utils/NumberUtils';

const getRemainingLifeTime = (remainingLifeTime: number, deltaMS: number): number => {
  return Math.max(0, remainingLifeTime - deltaMS);
};

const getLifeTimeNormalizedProgress = (remainingLifeTime: number, lifeTime: number): number => {
  if (lifeTime === 0 || lifeTime === Infinity || lifeTime === Number.MAX_SAFE_INTEGER) return 0;

  return 1 - NumberUtils.roundWith2Precision(remainingLifeTime / lifeTime);
};

export function getLifeTimeBehavior(config: LifeTimeBehaviorConfig): (deltaMS: number) => number {
  // remaining lifetime in milliseconds
  let remainingLifeTime: number;
  // the lifetime of the particle in milliseconds after which it will be destroyed
  let lifeTime: number;

  if (isLifeTimeStaticBehaviorConfig(config)) {
    remainingLifeTime = lifeTime = config.value;
  } else {
    remainingLifeTime = lifeTime = realRandom.generateIntegerNumber(config.min, config.max);
  }

  return (deltaMS: number): number => {
    remainingLifeTime = getRemainingLifeTime(remainingLifeTime, deltaMS);

    return getLifeTimeNormalizedProgress(remainingLifeTime, lifeTime);
  };
}
