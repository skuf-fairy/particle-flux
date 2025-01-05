import {Vector2} from '../../utils/Vector2';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {LifeTimeBehavior} from '../../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {NumberUtils} from '../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../utils/easing/easing-functions';
import {EasingFunction, EasingName} from '../../utils/easing/easing.types';
import {isScalarStaticBehavior, isScalarDynamicBehavior} from '../ScalarBehavior/ScalarBehaviorConfig.typeguards';
import {VectorBehaviorConfig} from './VectorBehavior.types';
import {RealRandom} from '../../utils/random/RealRandom';
import {ScalarDynamicBehaviorConfig, ScalarStaticBehaviorConfig} from '../ScalarBehavior/ScalarBehaviorConfig.types';
import {isRangeValue} from '../../typeguards';

export abstract class VectorBehavior extends ParticleBaseComponent {
  protected startValue: Vector2;
  protected endValue: Vector2;
  protected value: Vector2;
  protected easingX: EasingFunction;
  protected easingY: EasingFunction;
  protected multiplierX: number;
  protected multiplierY: number;
  protected lifeTimeBehavior?: LifeTimeBehavior;
  private random: RealRandom;

  constructor(protected readonly config: VectorBehaviorConfig) {
    super();
  }

  protected abstract updateValue(value: Vector2): void;

  public init(): void {
    this.random = new RealRandom();

    this.startValue = new Vector2();
    this.endValue = new Vector2();

    const config = this.config;

    if (isScalarStaticBehavior(config.x) && isScalarStaticBehavior(config.y)) {
      this.startValue = new Vector2(config.x.value, config.y.value);
      this.endValue = new Vector2(config.x.value, config.y.value);
    } else if (isScalarDynamicBehavior(config.x) && isScalarDynamicBehavior(config.y)) {
      this.startValue = new Vector2(config.x.start, config.y.start);
      this.endValue = new Vector2(config.x.end, config.y.end);
    } else if (isScalarStaticBehavior(config.x) && isScalarDynamicBehavior(config.y)) {
      this.startValue = new Vector2(config.x.value, config.y.start);
      this.endValue = new Vector2(config.x.value, config.y.end);
    } else if (isScalarDynamicBehavior(config.x) && isScalarStaticBehavior(config.y)) {
      this.startValue = new Vector2(config.x.start, config.y.value);
      this.endValue = new Vector2(config.x.end, config.y.value);
    }

    this.value = this.startValue.clone();

    this.easingX = EASING_FUNCTIONS[config.x.easing || EasingName.linear];
    this.easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];

    this.multiplierX = this.getInitialMultiplier(this.config.x);
    this.multiplierY = this.getInitialMultiplier(this.config.y);

    this.lifeTimeBehavior = this.particle.getComponent(LifeTimeBehavior);

    this.onUpdate();
  }

  public onUpdate(): void {
    this.updateValue(this.getValue(this.getTimeProgress()));
  }

  protected getValue(progress: number): Vector2 {
    this.value.x = NumberUtils.lerp(this.startValue.x, this.endValue.x, this.easingX(progress)) * this.multiplierX;
    this.value.y = NumberUtils.lerp(this.startValue.y, this.endValue.y, this.easingY(progress)) * this.multiplierY;

    return this.value;
  }

  private getTimeProgress(): number {
    return this.lifeTimeBehavior?.lifeTimeNormalizedProgress || 0;
  }

  private getInitialMultiplier(config: ScalarDynamicBehaviorConfig | ScalarStaticBehaviorConfig): number {
    if (config.mult) {
      if (isRangeValue(config.mult)) {
        return this.random.generateFloatNumber(config.mult.min, config.mult.max);
      } else {
        return config.mult;
      }
    }

    return 1;
  }
}
