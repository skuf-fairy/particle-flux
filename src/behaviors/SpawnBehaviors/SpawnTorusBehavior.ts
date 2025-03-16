import {SpawnTorusShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {Point2d} from '../../types';
import {realRandom} from '../../utils/random/RealRandom';
import {SpawnPositionBehavior} from '../SpawnPositionBehavior/SpawnPositionBehavior';
import {NumberUtils} from '../../utils/NumberUtils';

export class SpawnTorusBehavior extends ParticleBaseComponent {
  private spawnPositionBehavior?: SpawnPositionBehavior;

  constructor(private readonly config: SpawnTorusShape) {
    super();
  }

  public init(): void {
    this.spawnPositionBehavior = this.particle.getComponent(SpawnPositionBehavior);

    const position = this.getRandomPointFromTorus(
      this.config.x,
      this.config.y,
      this.config.innerRadius || 0,
      this.config.outerRadius,
      NumberUtils.degreesToRadians(this.config.startAngle || 0),
      NumberUtils.degreesToRadians(this.config.endAngle || 360),
    );

    this.particle.view.position = {
      x: NumberUtils.roundWith2Precision(position.x + (this.spawnPositionBehavior?.position.x || 0)),
      y: NumberUtils.roundWith2Precision(position.y + (this.spawnPositionBehavior?.position.y || 0)),
    };
  }

  private getRandomPointFromTorus(
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number,
  ): Point2d {
    // Generating a random angle in radians
    const angle = realRandom.generateFloatNumber(startAngle, endAngle);

    // Generating a random radius value ranging from the inner to the outer radius
    const r = realRandom.generateFloatNumber(innerRadius, outerRadius);

    // Calculating the coordinates of a point
    const pointX = x + r * Math.cos(angle);
    const pointY = y + r * Math.sin(angle);

    return {x: pointX, y: pointY};
  }
}
