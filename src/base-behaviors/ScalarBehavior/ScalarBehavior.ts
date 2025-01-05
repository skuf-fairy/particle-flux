import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {LifeTimeBehavior} from '../../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {NumberUtils} from '../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../utils/easing/easing-functions';
import {EasingFunction, EasingName} from '../../utils/easing/easing.types';
import {
  isScalarDeltaBehaviorConfig,
  isScalarDynamicBehavior,
  isScalarStaticBehavior,
} from './ScalarBehaviorConfig.typeguards';
import {ScalarBehaviorConfig} from './ScalarBehaviorConfig.types';
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

    if (isScalarStaticBehavior(this.config)) {
      this.startValue = this.config.value;
      this.endValue = this.config.value;
      this.easing = EASING_FUNCTIONS[this.config.easing || EasingName.linear];
    }

    if (isScalarDeltaBehaviorConfig(this.config)) {
      this.startValue = this.config.value;
      this.endValue = this.config.value;
      this.easing = EASING_FUNCTIONS[EasingName.linear];
    }

    if (isScalarDynamicBehavior(this.config)) {
      this.startValue = this.config.start;
      this.endValue = this.config.end;
      this.easing = EASING_FUNCTIONS[this.config.easing || EasingName.linear];
    }

    this.multiplier = this.getInitialMultiplier();

    this.lifeTimeBehavior = this.particle.getComponent(LifeTimeBehavior);

    this.onUpdate(0);
  }

  public onUpdate(delta: number): void {
    if (isScalarDeltaBehaviorConfig(this.config)) {
      this.startValue += this.config.delta * delta;
      this.endValue += this.config.delta * delta;
      this.updateValue(this.startValue);
    } else {
      this.updateValue(this.getValue(this.getTimeProgress()));
    }
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
