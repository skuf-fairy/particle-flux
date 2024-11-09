import {Ticker} from 'src/utils/Ticker/Ticker';
import {BaseComponent} from 'src/core/BaseComponent';

export class TimeComponent extends BaseComponent {
  private readonly ticker: Ticker;

  constructor() {
    super();

    this.ticker = new Ticker();
    this.ticker.autoStart = false;
  }

  public init(): void {}

  public start(): void {
    this.ticker.start();
  }

  get delta(): number {
    return this.ticker.deltaMS;
  }

  public onPause(): void {
    this.ticker.stop();
  }

  public onResume(): void {
    this.ticker.start();
  }
}
