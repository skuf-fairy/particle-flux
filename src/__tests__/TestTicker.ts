import {ITicker} from '../types';
import {TickerCallback} from '../utils/Ticker';

export class TestTicker implements ITicker {
  public started: boolean;
  private cb: TickerCallback;
  private ticks: number;

  constructor() {
    this.started = false;
    this.cb = () => {};
    this.ticks = 0;
  }

  get FPS(): number {
    return 1;
  }

  get deltaMS(): number {
    return 1;
  }

  get elapsedDelta(): number {
    return 1;
  }

  public start(): void {
    this.started = true;
  }

  public stop(): void {
    this.started = false;
  }

  public setCallback(cb: TickerCallback): void {
    this.cb = cb;
  }

  // public tick(): void {
  //   this.ticks++;
  // }

  public update(): void {
    this.ticks++;
    this.cb(1, this.ticks);
  }
}
