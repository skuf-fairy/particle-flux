import {RandomRange} from '../types';
import {realRandom} from './random/Random';

export function getRandomValue(range: RandomRange): number {
  return realRandom.randomFloat(range.min, range.max);
}
