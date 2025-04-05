import {isRangeValue} from '../typeguards';
import {Multiplier} from '../types';
import {realRandom} from './random/RealRandom';

export function getMultiplierValue(multiplier: Multiplier): number {
  if (isRangeValue(multiplier)) {
    return realRandom.generateFloatNumber(multiplier.min, multiplier.max);
  }
  return multiplier;
}
