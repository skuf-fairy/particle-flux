import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {LifeTimeBehavior} from '../../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {NumberUtils} from '../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../utils/easing/easing-functions';
import {EasingFunction, EasingName} from '../../utils/easing/easing.types';
import {isScalarStaticBehavior, isScalarDynamicBehavior} from '../ScalarBehavior/ScalarBehavior.typeguards';
import {VectorBehaviorConfig} from './VectorBehavior.types';
import {realRandom} from '../../utils/random/RealRandom';
import {ScalarBehaviorConfig} from '../ScalarBehavior/ScalarBehavior.types';
import {isRangeValue} from '../../typeguards';
import {Point2d} from '../../types';

export abstract class VectorBehavior extends ParticleBaseComponent {
  protected startValue: Point2d;
  protected endValue: Point2d;
  protected value: Point2d;
  protected easingX: EasingFunction;
  protected easingY: EasingFunction;
  protected multiplierX: number;
  protected multiplierY: number;
  protected lifeTimeBehavior?: LifeTimeBehavior;

  constructor(protected readonly config: VectorBehaviorConfig) {
    super();
  }

  protected abstract updateValue(value: Point2d): void;

  public init(): void {
    this.startValue = {x: 0, y: 0};
    this.endValue = {x: 0, y: 0};

    this.easingX = EASING_FUNCTIONS[EasingName.linear];
    this.easingY = EASING_FUNCTIONS[EasingName.linear];

    const config = this.config;

    if (isScalarStaticBehavior(config.x) && isScalarStaticBehavior(config.y)) {
      this.startValue = {x: config.x.value, y: config.y.value};
      this.endValue = {x: config.x.value, y: config.y.value};
    } else if (isScalarDynamicBehavior(config.x) && isScalarDynamicBehavior(config.y)) {
      this.startValue = {x: config.x.start, y: config.y.start};
      this.endValue = {x: config.x.end, y: config.y.end};

      this.easingX = EASING_FUNCTIONS[config.x.easing || EasingName.linear];
      this.easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];
    } else if (isScalarStaticBehavior(config.x) && isScalarDynamicBehavior(config.y)) {
      this.startValue = {x: config.x.value, y: config.y.start};
      this.endValue = {x: config.x.value, y: config.y.end};

      this.easingY = EASING_FUNCTIONS[config.y.easing || EasingName.linear];
    } else if (isScalarDynamicBehavior(config.x) && isScalarStaticBehavior(config.y)) {
      this.startValue = {x: config.x.start, y: config.y.value};
      this.endValue = {x: config.x.end, y: config.y.value};

      this.easingX = EASING_FUNCTIONS[config.x.easing || EasingName.linear];
    }

    this.value.x = this.startValue.x;
    this.value.y = this.startValue.y;

    this.multiplierX = this.getInitialMultiplier(this.config.x);
    this.multiplierY = this.getInitialMultiplier(this.config.y);

    this.lifeTimeBehavior = this.particle.getComponent(LifeTimeBehavior);

    this.update();
  }

  public update(): void {
    this.updateValue(this.getValue(this.getTimeProgress()));
  }

  protected getValue(progress: number): Point2d {
    this.value.x = NumberUtils.lerp(this.startValue.x, this.endValue.x, this.easingX(progress)) * this.multiplierX;
    this.value.y = NumberUtils.lerp(this.startValue.y, this.endValue.y, this.easingY(progress)) * this.multiplierY;

    return this.value;
  }

  private getTimeProgress(): number {
    return this.lifeTimeBehavior?.lifeTimeNormalizedProgress || 0;
  }

  private getInitialMultiplier(config: ScalarBehaviorConfig): number {
    if (config.multiplier) {
      if (isRangeValue(config.multiplier)) {
        return realRandom.generateFloatNumber(config.multiplier.min, config.multiplier.max);
      } else {
        return config.multiplier;
      }
    }

    return 1;
  }
}
