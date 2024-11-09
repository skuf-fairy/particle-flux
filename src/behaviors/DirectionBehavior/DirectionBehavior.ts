import {DirectionBehaviorConfig, isSingleDirectionBehaviorConfig} from './DirectionBehavior.types';
import {BaseComponent} from 'src/core/BaseComponent';
import {GravityBehavior} from 'src/behaviors/GravityBehavior/GravityBehavior';
import {NumberUtils} from 'src/utils/NumberUtils';
import {RealRandom} from 'src/utils/random/RealRandom';
import {Vector2} from 'src/utils/Vector2';

export class DirectionBehavior extends BaseComponent {
  private gravityBehavior?: GravityBehavior;

  constructor(private readonly config: DirectionBehaviorConfig) {
    super();
  }

  public init(): void {
    const angle = isSingleDirectionBehaviorConfig(this.config)
      ? this.config.angle
      : new RealRandom().generateFloatNumber(this.config.minAngle, this.config.maxAngle);

    this.particle.direction = this.angleToPoint(NumberUtils.degreesToRadians(angle));

    this.gravityBehavior = this.particle.getComponent(GravityBehavior);
  }

  public onUpdate(): void {
    this.particle.direction.y += this.gravityBehavior?.gravity || 0;
  }

  private angleToPoint(angleInRad: number): Vector2 {
    return new Vector2(Math.cos(angleInRad), Math.sin(angleInRad));
  }
}
