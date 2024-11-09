import {ArrayUtils} from '../ArrayUtils';
import {IRandomGenerator} from './IRandom';

export abstract class AbstractRandom implements IRandomGenerator {
  public getArrayFromValues<T>(valuesArray: T[], length: number): T[] {
    return ArrayUtils.range(0, length).map(() => this.choice(valuesArray));
  }

  /**
   * Возвращает рандомный элемент массива
   * @param valuesArray Массив, элемент из которого, будет выбран рандомно
   */
  public choice<T>(valuesArray: T[]): T {
    if (valuesArray.length === 0) {
      throw new Error('Пустой массив был передан в метод Random.choice');
    }

    return valuesArray[this.getRandomArrayIndex(valuesArray)];
  }

  public choiceList<T>(valuesArray: T[], length: number): T[] {
    return ArrayUtils.range(0, length - 1).map(() => this.choice(valuesArray));
  }

  public generateNumberArray(length: number, minValue: number, maxValue: number, isInteger: boolean = true): number[] {
    return ArrayUtils.range(0, length).map(() =>
      isInteger ? this.generateIntegerNumber(minValue, maxValue) : this.generateFloatNumber(minValue, maxValue),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getRandomArrayIndex(array: Array<any>): number {
    return this.generateIntegerNumber(0, array.length - 1);
  }

  public generateRandomHexColor(): string {
    return `#${Math.floor(this.generateFloatNumber(0, 1) * 0xffffff)
      .toString(16)
      .padEnd(6, '0')}`;
  }

  public abstract generateIntegerNumber(min: number, max: number): number;
  public abstract generateFloatNumber(min: number, max: number): number;
}
