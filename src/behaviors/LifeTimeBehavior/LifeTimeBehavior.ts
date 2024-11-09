import {isLifeTimeStaticBehaviorConfig, LifeTimeBehaviorConfig} from './LifeTimeBehavior.types';
import {BaseComponent} from 'src/core/BaseComponent';
import {TimeComponent} from 'src/components/TimeComponent/TimeComponent';
import {RealRandom} from 'src/utils/random/RealRandom';

export class LifeTimeBehavior extends BaseComponent {
  public lifeTimeNormalizedProgress: number;
  public lifeTimeCurrent: number;
  public lifeTime: number;

  private timeComponent?: TimeComponent;

  constructor(private readonly config: LifeTimeBehaviorConfig) {
    super();
  }

  public init(): void {
    if (isLifeTimeStaticBehaviorConfig(this.config)) {
      this.lifeTime = this.config.value;
    } else {
      this.lifeTime = new RealRandom().generateIntegerNumber(this.config.min, this.config.max);
    }

    this.lifeTimeNormalizedProgress = 0;
    this.lifeTimeCurrent = this.lifeTime;

    this.timeComponent = this.particle.getComponent(TimeComponent);
  }

  public onUpdate(): void {
    this.lifeTimeCurrent = Math.max(0, this.lifeTimeCurrent - (this.timeComponent?.delta || 0));
    this.lifeTimeNormalizedProgress = 1 - this.lifeTimeCurrent / this.lifeTime;

    if (this.lifeTimeCurrent === 0) {
      this.particle.shouldDestroy = true;
    }
  }
}
