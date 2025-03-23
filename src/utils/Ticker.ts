import {ITicker} from '../types';
import {globalWindow} from '../globalWindow';

export type TickerCallback = (elapsedDelta: number, deltaMS: number) => void;

// 60 FPS is taken as the standard
const STANDARD_DELTA_MS = 1000 / 60;

export class Ticker implements ITicker {
  private lastTime: number | null;
  private isStarted: boolean;
  private deltaBetweenFrames: number;
  private callback: TickerCallback;

  constructor(cb: TickerCallback) {
    this.lastTime = null;
    this.isStarted = false;
    this.deltaBetweenFrames = 0;
    this.callback = cb;
  }

  // FPS = 1 / deltaMS * 1000
  get FPS(): number {
    if (this.isWrongDeltaBetweenFrames()) return 0;

    return (1 / this.deltaBetweenFrames) * 1000;
  }

  get deltaMS(): number {
    return this.deltaBetweenFrames;
  }

  get elapsedDelta(): number {
    if (this.isWrongDeltaBetweenFrames()) return 0;

    return this.deltaBetweenFrames / STANDARD_DELTA_MS;
  }

  get started(): boolean {
    return this.isStarted;
  }

  public setCallback(cb: TickerCallback): void {
    this.callback = cb;
  }

  public start(): void {
    if (this.isStarted) return;

    this.isStarted = true;

    const update = (): void => {
      if (!this.isStarted) return;

      this.deltaBetweenFrames = this.getDeltaBetweenFrames();
      if (!this.isWrongDeltaBetweenFrames()) {
        this.callback(this.elapsedDelta, this.deltaBetweenFrames);
      }

      globalWindow?.requestAnimationFrame(update);
    };

    globalWindow?.requestAnimationFrame(update);
  }

  public stop(): void {
    if (!this.isStarted) return;

    this.lastTime = null;
    this.isStarted = false;
    this.deltaBetweenFrames = 0;
  }

  private getDeltaBetweenFrames(): number {
    if (globalWindow === null) return 0;
    if (!this.started) return 0;

    if (this.lastTime === null) {
      this.lastTime = globalWindow.performance.now();

      return 0;
    }

    const now = globalWindow.performance.now();

    if (now === undefined) return 0;

    const delta = now - this.lastTime;
    this.lastTime = now;

    return delta;
  }

  private isWrongDeltaBetweenFrames(): boolean {
    return this.deltaBetweenFrames <= 0;
  }
}
