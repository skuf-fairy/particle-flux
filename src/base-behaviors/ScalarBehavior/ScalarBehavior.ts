import {ParticleBaseComponent} from 'src/core/ParticleBaseComponent';
import {LifeTimeBehavior} from 'src/behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {NumberUtils} from 'src/utils/NumberUtils';
import {EASING_FUNCTIONS} from 'src/utils/easing/easing-functions';
import {EasingFunction, EasingName} from 'src/utils/easing/easing.types';
import {isScalarDynamicBehavior, isScalarStaticBehavior} from './ScalarBehaviorConfig.typeguards';
import {ScalarBehaviorConfig} from './ScalarBehaviorConfig.types';
import {RealRandom} from 'src/utils/random/RealRandom';

export abstract class ScalarBehavior extends ParticleBaseComponent {
  protected startValue: number;
  protected endValue: number;
  protected easing: EasingFunction;
  protected multiplicator: number;

  protected lifeTimeBehavior?: LifeTimeBehavior;

  constructor(protected readonly config: ScalarBehaviorConfig) {
    super();
  }

  protected abstract updateValue(value: number): void;

  public init(): void {
    this.startValue = 0;
    this.endValue = 0;

    if (isScalarStaticBehavior(this.config)) {
      this.startValue = this.config.value;
      this.endValue = this.config.value;
    }

    if (isScalarDynamicBehavior(this.config)) {
      this.startValue = this.config.start;
      this.endValue = this.config.end;
    }

    this.multiplicator = 1;

    if (this.config.mult && typeof this.config.mult === 'number') {
      this.multiplicator = this.config.mult;
    }

    if (this.config.mult && typeof this.config.mult === 'object') {
      const random = new RealRandom();
      this.multiplicator = random.generateFloatNumber(this.config.mult.min, this.config.mult.max);
    }

    this.easing = EASING_FUNCTIONS[this.config.easing || EasingName.linear];

    this.lifeTimeBehavior = this.particle.getComponent(LifeTimeBehavior);

    this.updateValue(this.getValue(this.getTimeProgress()));
  }

  public onUpdate(): void {
    this.updateValue(this.getValue(this.getTimeProgress()));
  }

  protected getValue(progress: number): number {
    return NumberUtils.lerp(this.startValue, this.endValue, this.easing(progress)) * this.multiplicator;
  }

  private getTimeProgress(): number {
    return this.lifeTimeBehavior?.lifeTimeNormalizedProgress || 0;
  }
}
