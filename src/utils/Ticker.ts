import {globalWindow} from '../globalWindow';

export type TickerCallback = (elapsedDelta: number, deltaMS: number) => void;

// за стандарт взято 60 FPS
const STANDARD_DELTA_MS = 1 / 0.06;

export class Ticker {
  private rafID: number | null;
  private lastTime: number | null;
  private isStarted: boolean;
  private deltaBetweenFrames: number;

  constructor(private readonly callback: TickerCallback) {
    this.rafID = null;
    this.lastTime = null;
    this.isStarted = false;
    this.deltaBetweenFrames = 0;
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

  public start(): void {
    if (this.rafID !== null) return;

    this.isStarted = true;

    const update = (): void => {
      this.deltaBetweenFrames = this.getDeltaBetweenFrames();
      if (!this.isWrongDeltaBetweenFrames()) {
        this.callback(this.elapsedDelta, this.deltaBetweenFrames);
      }
      this.requestAnimationFrame(update);
    };

    this.requestAnimationFrame(update);
  }

  public stop(): void {
    if (this.rafID === null) return;

    globalWindow?.cancelAnimationFrame(this.rafID);
    this.rafID = null;
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

  private requestAnimationFrame(update: VoidFunction): void {
    this.rafID = globalWindow?.requestAnimationFrame(update) || null;
  }

  private isWrongDeltaBetweenFrames(): boolean {
    return this.deltaBetweenFrames <= 0;
  }
}
