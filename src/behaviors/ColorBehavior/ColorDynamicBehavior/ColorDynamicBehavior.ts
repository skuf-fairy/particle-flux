import {ColorDynamicBehaviorConfig} from '../ColorBehavior.types';
import {BaseComponent} from 'src/core/BaseComponent';
import {LifeTimeBehavior} from 'src/behaviors/LifeTimeBehavior/LifeTimeBehavior';
import {NumberUtils} from 'src/utils/NumberUtils';
import {EASING_FUNCTIONS} from 'src/utils/easing/easing-functions';
import {EasingFunction, EasingName} from 'src/utils/easing/easing.types';

export class ColorDynamicBehavior extends BaseComponent {
  private startColor: string;
  private endColor: string;
  private easing: EasingFunction;

  private lifeTimeBehavior?: LifeTimeBehavior;

  constructor(protected readonly config: ColorDynamicBehaviorConfig) {
    super();
  }

  public init(): void {
    this.startColor = this.config.start;
    this.endColor = this.config.end;
    this.easing = EASING_FUNCTIONS[this.config.easing || EasingName.linear];

    this.lifeTimeBehavior = this.particle.getComponent(LifeTimeBehavior);
  }

  public onUpdate(): void {
    if (!this.lifeTimeBehavior) return;

    this.particle.view.tint = NumberUtils.lerpColor(
      this.startColor,
      this.endColor,
      this.easing(this.lifeTimeBehavior.lifeTimeNormalizedProgress),
    );
  }
}
