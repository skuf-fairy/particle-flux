import {Ticker} from '../../utils/Ticker/Ticker';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';

export class TimeComponent extends ParticleBaseComponent {
  private readonly ticker: Ticker;

  constructor() {
    super();

    this.ticker = new Ticker();
    this.ticker.autoStart = false;
  }

  public init(): void {}

  get delta(): number {
    return this.ticker.deltaMS;
  }

  public start(): void {
    this.ticker.start();
  }

  public onPause(): void {
    this.ticker.stop();
  }

  public onResume(): void {
    this.ticker.start();
  }
}
