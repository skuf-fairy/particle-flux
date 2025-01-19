import {ITicker} from '../types';
import {TickerCallback} from '../utils/Ticker';

export class TestTicker implements ITicker {
  public started: boolean;
  private cb: TickerCallback;

  constructor() {
    this.started = false;
    this.cb = () => {};
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

  // public update(): void {
  //   this.cb(1, 1);
  // }
}
