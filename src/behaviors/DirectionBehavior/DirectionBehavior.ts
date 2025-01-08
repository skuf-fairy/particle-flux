import {DirectionBehaviorConfig} from './DirectionBehavior.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {GravityBehavior} from '../../behaviors/GravityBehavior/GravityBehavior';
import {NumberUtils} from '../../utils/NumberUtils';
import {RealRandom} from '../../utils/random/RealRandom';
import {Point2d} from '../../types';
import {isStaticDirectionBehaviorConfig} from './DirectionBehavior.typeguards';

export class DirectionBehavior extends ParticleBaseComponent {
  private gravityBehavior?: GravityBehavior;

  constructor(private readonly config: DirectionBehaviorConfig) {
    super();
  }

  public init(): void {
    const angle = isStaticDirectionBehaviorConfig(this.config)
      ? this.config.angle
      : new RealRandom().generateFloatNumber(this.config.minAngle, this.config.maxAngle);

    this.particle.direction = this.angleToPoint(NumberUtils.degreesToRadians(angle));

    this.gravityBehavior = this.particle.getComponent(GravityBehavior);
  }

  public update(): void {
    this.particle.direction.y += this.gravityBehavior?.gravity || 0;
  }

  private angleToPoint(angleInRad: number): Point2d {
    return {
      x: Math.cos(angleInRad),
      y: Math.sin(angleInRad),
    };
  }
}
