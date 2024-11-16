import {NumberUtils} from '../NumberUtils';
import {AbstractRandom} from './Random';

// реализация метода Park-Miller-Carta
export class PseudoRandom extends AbstractRandom {
  private prevValue!: number;
  private callsCounter!: number;
  public randomSeed!: number;

  public init(randomSeed: number, callsCounter: number = 0): void {
    this.reset();
    this.randomSeed = Math.abs(Math.trunc(randomSeed));
    this.callsCounter = callsCounter;
    this.prevValue = this.randomSeed;
    this.initByCallsCounter();
  }

  public setRandomSeed(randomSeed: number): void {
    this.randomSeed = randomSeed;
    this.reset();
  }

  public setCallsCounter(callsCounter: number): void {
    this.reset();
    this.callsCounter = callsCounter;
    this.initByCallsCounter();
  }

  public reset(): void {
    this.callsCounter = 0;
    this.prevValue = this.randomSeed;
  }

  /**
   * Возвращает количество совершенных вызовов псевдорандомайзера
   */
  public getCallsCounter(): number {
    return this.callsCounter;
  }

  public generateIntegerNumber(minValue: number, maxValue: number): number {
    const [min, max] = NumberUtils.getOrderedMinMax(minValue, maxValue);

    return Math.floor(this.generateFloatNumber(min, max));
  }

  public generateFloatNumber(minValue: number, maxValue: number): number {
    const [min, max] = NumberUtils.getOrderedMinMax(minValue, maxValue);

    if (min >= 0 && min < 1 && max >= 0 && max < 1) {
      return (this.random() / 2147483646) * (max - min + 1) + min;
    }

    return (this.random() / 2147483646) * (max - min + 1) + min;
  }

  // возвращает псевдорадомное целое число от 1 до 2^32
  private random(): number {
    this.prevValue = (this.prevValue * 16807) % 2147483647;
    this.callsCounter++;
    return this.prevValue;
  }

  private initByCallsCounter(): void {
    for (let i = 0; i < this.callsCounter; i++) {
      this.random();
    }
  }
}
