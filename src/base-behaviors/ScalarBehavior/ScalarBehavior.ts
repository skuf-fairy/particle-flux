import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {LifeTimeBehavior} from '../../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {NumberUtils} from '../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../utils/easing/easing-functions';
import {EasingFunction, EasingName} from '../../utils/easing/easing.types';
import {isScalarDynamicBehavior, isScalarStaticBehavior} from './ScalarBehavior.typeguards';
import {ScalarBehaviorConfig} from './ScalarBehavior.types';
import {RealRandom} from '../../utils/random/RealRandom';
import {isRangeValue} from '../../typeguards';

export abstract class ScalarBehavior extends ParticleBaseComponent {
  protected startValue: number;
  protected endValue: number;
  protected easing: EasingFunction;
  protected multiplier: number;

  protected lifeTimeBehavior?: LifeTimeBehavior;

  constructor(protected readonly config: ScalarBehaviorConfig) {
    super();
  }

  protected abstract updateValue(value: number): void;

  public init(): void {
    this.startValue = 0;
    this.endValue = 0;
    this.easing = EASING_FUNCTIONS[this.config.easing || EasingName.linear];

    this.multiplier = this.getInitialMultiplier();

    this.lifeTimeBehavior = this.particle.getComponent(LifeTimeBehavior);

    if (isScalarStaticBehavior(this.config)) {
      this.startValue = this.config.value;
      this.endValue = this.config.value;
    }

    if (isScalarDynamicBehavior(this.config)) {
      this.startValue = this.config.start;
      this.endValue = this.config.end;
    }

    this.update();
  }

  public update(): void {
    this.updateValue(this.getValue(this.getTimeProgress()));
  }

  protected getValue(progress: number): number {
    return NumberUtils.lerp(this.startValue, this.endValue, this.easing(progress)) * this.multiplier;
  }

  private getTimeProgress(): number {
    return this.lifeTimeBehavior?.lifeTimeNormalizedProgress || 0;
  }

  private getInitialMultiplier(): number {
    if (this.config.mult) {
      if (isRangeValue(this.config.mult)) {
        return new RealRandom().generateFloatNumber(this.config.mult.min, this.config.mult.max);
      } else {
        return this.config.mult;
      }
    }

    return 1;
  }
}
