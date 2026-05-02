import {NumberUtils} from '../../NumberUtils';
import {IRandomGenerator} from '../IRandom';

// implementation of the Park-Miller-Carta method
export class PseudoRandomGenerator implements IRandomGenerator {
  private prevValue!: number;
  private callsCounter!: number;
  public randomSeed!: number;

  constructor(randomSeed: number, callsCounter: number = 0) {
    this.init(randomSeed, callsCounter);
  }

  public init(randomSeed: number, callsCounter: number = 0): void {
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
    this.init(this.randomSeed, 0);
  }

  // Returns the number of completed calls
  public getCallsCounter(): number {
    return this.callsCounter;
  }

  public generateIntegerNumber(minValue: number, maxValue: number): number {
    const [min, max] = NumberUtils.getOrderedMinMax(minValue, maxValue);

    return Math.floor((this.random() / 2147483646) * (max - min + 1) + min);
  }

  public generateFloatNumber(minValue: number, maxValue: number): number {
    const [min, max] = NumberUtils.getOrderedMinMax(minValue, maxValue);

    return (this.random() / 2147483646) * (max - min) + min;
  }

  // returns a pseudo-random integer from 1 to 2^32
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
