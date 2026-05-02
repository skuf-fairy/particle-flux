import {isRangeValue} from '../typeguards';
import {Multiplier} from '../types';
import {realRandom} from './random/Random';

export function getMultiplierValue(multiplier: Multiplier): number {
  if (isRangeValue(multiplier)) {
    return realRandom.randomFloat(multiplier.min, multiplier.max);
  }
  return multiplier;
}
