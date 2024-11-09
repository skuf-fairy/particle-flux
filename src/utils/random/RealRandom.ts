import {AbstractRandom} from './Random';

export class RealRandom extends AbstractRandom {
  public generateIntegerNumber(min: number, max: number): number {
    return Math.floor(this.generateFloatNumber(min, max));
  }

  public generateFloatNumber(min: number, max: number): number {
    if (min >= 0 && min < 1 && max >= 0 && max < 1) {
      return Math.random() * (max - min) + min;
    }

    return Math.random() * (max - min + 1) + min;
  }
}
