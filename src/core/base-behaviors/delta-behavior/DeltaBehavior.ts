import {realRandom} from '../../../utils/random/RealRandom';
import {DeltaBehaviorConfig} from './DeltaBehavior.types';
import {isRangeValue} from '../../../typeguards';
import {UpdateFunction} from '../../Particle';

const getInitialMultiplier = (config: DeltaBehaviorConfig): number => {
  const multiplier = config.multiplier;

  if (multiplier) {
    if (isRangeValue(multiplier)) {
      return realRandom.generateFloatNumber(multiplier.min, multiplier.max);
    } else {
      return multiplier;
    }
  }

  return 1;
};

export function getDeltaBehavior(config: DeltaBehaviorConfig): UpdateFunction<number> {
  let value = config.value * getInitialMultiplier(config);

  const update = (_: number, elapsedDelta: number): number => {
    value += config.delta * elapsedDelta;
    return value;
  };

  return update;
}
