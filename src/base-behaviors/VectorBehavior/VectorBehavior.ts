import {Vector2} from '../../utils/Vector2';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {LifeTimeBehavior} from '../../behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {NumberUtils} from '../../utils/NumberUtils';
import {EASING_FUNCTIONS} from '../../utils/easing/easing-functions';
import {EasingFunction, EasingName} from '../../utils/easing/easing.types';
import {isScalarStaticBehavior, isScalarDynamicBehavior} from '../ScalarBehavior/ScalarBehaviorConfig.typeguards';
import {VectorBehaviorConfig} from './VectorBehavior.types';
import {RealRandom} from '../../utils/random/RealRandom';

export abstract class VectorBehavior extends ParticleBaseComponent {
  protected startValue: Vector2;
  protected endValue: Vector2;
  protected value: Vector2;
  protected easingX: EasingFunction;
  protected easingY: EasingFunction;
  protected multiplicatorX: number;
  protected multiplicatorY: number;
  protected lifeTimeBehavior?: LifeTimeBehavior;

  constructor(protected readonly config: VectorBehaviorConfig) {
    super();
  }

  protected abstract updateValue(value: Vector2): void;

  public init(): void {
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

    const random = new RealRandom();

    this.multiplicatorX = 1;

    if (config.x.mult && typeof config.x.mult === 'number') {
      this.multiplicatorX = config.x.mult;
    }

    if (config.x.mult && typeof config.x.mult === 'object') {
      this.multiplicatorX = random.generateFloatNumber(config.x.mult.min, config.x.mult.max);
    }

    this.multiplicatorY = 1;

    if (config.y.mult && typeof config.y.mult === 'number') {
      this.multiplicatorX = config.y.mult;
    }

    if (config.y.mult && typeof config.y.mult === 'object') {
      this.multiplicatorY = random.generateFloatNumber(config.y.mult.min, config.y.mult.max);
    }

    this.lifeTimeBehavior = this.particle.getComponent(LifeTimeBehavior);

    this.updateValue(this.getValue(this.getTimeProgress()));
  }

  public onUpdate(): void {
    this.updateValue(this.getValue(this.getTimeProgress()));
  }

  protected getValue(progress: number): Vector2 {
    this.value.x = NumberUtils.lerp(this.startValue.x, this.endValue.x, this.easingX(progress)) * this.multiplicatorX;
    this.value.y = NumberUtils.lerp(this.startValue.y, this.endValue.y, this.easingY(progress)) * this.multiplicatorY;

    return this.value;
  }

  private getTimeProgress(): number {
    return this.lifeTimeBehavior?.lifeTimeNormalizedProgress || 0;
  }
}
