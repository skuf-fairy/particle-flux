import {NumberUtils} from '../NumberUtils';
import {AbstractRandom} from './Random';

export class RealRandom extends AbstractRandom {
  public generateIntegerNumber(minValue: number, maxValue: number): number {
    const [min, max] = NumberUtils.getOrderedMinMax(minValue, maxValue);

    return Math.floor(this.generateFloatNumber(min, max));
  }

  public generateFloatNumber(minValue: number, maxValue: number): number {
    const [min, max] = NumberUtils.getOrderedMinMax(minValue, maxValue);

    if (min >= 0 && min < 1 && max >= 0 && max < 1) {
      return Math.random() * (max - min) + min;
    }

    return Math.random() * (max - min + 1) + min;
  }
}
