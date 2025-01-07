import {globalWindow} from '../globalWindow';

type TickerCallback = (deltaMS: number) => void;

export class Ticker {
  private rafID: number | null;
  private lastTime: number | null;
  private callbackList: TickerCallback[];

  private isStarted: boolean;

  constructor(autostart: boolean = false) {
    this.rafID = null;
    this.lastTime = null;
    this.isStarted = false;
    this.callbackList = [];

    if (autostart) {
      this.start();
    }
  }

  // 144 = 1 / 6.94 * 1000
  get FPS(): number {
    return (1 / this.getDeltaBetweenFrames()) * 1000;
  }

  get started(): boolean {
    return this.isStarted;
  }

  public add(callback: TickerCallback): void {
    this.callbackList.push(callback);
  }

  public remove(removeCallback: TickerCallback): void {
    this.callbackList = this.callbackList.filter((cb) => cb !== removeCallback);
  }

  public start(): void {
    if (this.rafID !== null) return;

    this.isStarted = true;

    const update = (): void => {
      const delta = this.getDeltaBetweenFrames();
      this.callbackList.forEach((cb) => cb(delta));
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
  }

  private getDeltaBetweenFrames(): number {
    if (globalWindow === null) return 0;

    if (this.lastTime === null) {
      this.lastTime = performance.now();

      return 0;
    }

    const now = globalWindow.performance.now();

    if (now === undefined) return 0;

    const delta = now - this.lastTime;
    this.lastTime = now;

    return delta;
  }

  private requestAnimationFrame(update: TickerCallback): void {
    this.rafID = globalWindow?.requestAnimationFrame(update) || null;
  }
}
