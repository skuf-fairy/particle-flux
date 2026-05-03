import {DEFAULT_SEED} from '../../constants';
import {cloneArray} from '../array/cloneArray';
import {range} from '../array/range';
import {IRandomGenerator} from './IRandom';
import {PseudoRandomGenerator} from './generators/PseudoRandomGenerator';
import {RealRandom} from './generators/RealRandomGenerator';

export class Random {
  constructor(private readonly randomGenerator: IRandomGenerator) {}

  public randomInt(min: number, max: number): number {
    return this.randomGenerator.generateIntegerNumber(min, max);
  }

  public randomFloat(min: number, max: number): number {
    return this.randomGenerator.generateFloatNumber(min, max);
  }

  public reset(): void {
    this.randomGenerator.reset();
  }

  public getArrayFromValues<T>(valuesArray: T[], length: number): T[] {
    if (length === 0) return [];

    return range(0, length - 1).map(() => this.choice(valuesArray));
  }

  /**
   * Returns a random element of the array
   * @param valuesArray The array from which the element will be randomly selected
   */
  public choice<T>(valuesArray: T[]): T {
    if (valuesArray.length === 0) {
      throw new Error();
    }

    return valuesArray[this.getRandomArrayIndex(valuesArray)];
  }

  public choiceList<T>(valuesArray: T[], length: number): T[] {
    return range(0, length - 1).map(() => this.choice(valuesArray));
  }

  public generateNumberArray(length: number, minValue: number, maxValue: number, isInteger: boolean = true): number[] {
    return range(0, length - 1).map(() =>
      isInteger
        ? this.randomGenerator.generateIntegerNumber(minValue, maxValue)
        : this.randomGenerator.generateFloatNumber(minValue, maxValue),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getRandomArrayIndex(array: Array<any>): number {
    return this.randomGenerator.generateIntegerNumber(0, array.length - 1);
  }

  public generateRandomHexColor(): string {
    return `#${Math.floor(this.randomGenerator.generateFloatNumber(0, 1) * 0xffffff)
      .toString(16)
      .padEnd(6, '0')}`;
  }

  public shuffle<T>(array: T[]): T[] {
    const result = cloneArray(array);

    for (let i = result.length - 1; i > 0; i--) {
      const j = this.randomGenerator.generateIntegerNumber(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }
}

export const realRandom = new Random(new RealRandom());
export const pseudoRandom = new Random(new PseudoRandomGenerator(DEFAULT_SEED));
