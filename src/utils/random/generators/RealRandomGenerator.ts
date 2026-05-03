import {getOrderedMinMax} from '../../getOrderedMinMax';
import {IRandomGenerator} from '../IRandom';

export class RealRandom implements IRandomGenerator {
  public generateIntegerNumber(minValue: number, maxValue: number): number {
    const [min, max] = getOrderedMinMax(minValue, maxValue);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public generateFloatNumber(minValue: number, maxValue: number): number {
    const [min, max] = getOrderedMinMax(minValue, maxValue);

    return Math.random() * (max - min) + min;
  }

  // метод для совместимости с интерфейсом
  // здесь нет стейта класса, так что метод пустой
  public reset(): void {}
}
