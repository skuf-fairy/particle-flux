import {SpawnRectangleShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {RealRandom} from '../../utils/random/RealRandom';
import {Point2d} from '../../types';
import {SpawnPositionBehavior} from '../SpawnPositionBehavior/SpawnPositionBehavior';

export class SpawnRectangleBehavior extends ParticleBaseComponent {
  private readonly random: RealRandom;
  private spawnPositionBehavior?: SpawnPositionBehavior;

  constructor(private readonly config: SpawnRectangleShape) {
    super();

    this.random = new RealRandom();
  }

  public init(): void {
    this.spawnPositionBehavior = this.particle.getComponent(SpawnPositionBehavior);

    const position = this.generateSpawnPoint();

    this.particle.view.position.x = position.x + (this.spawnPositionBehavior?.position.x || 0);
    this.particle.view.position.y = position.y + (this.spawnPositionBehavior?.position.y || 0);
  }

  private generateSpawnPoint(): Point2d {
    const {x, y, width, height} = this.config;
    return {
      x: this.random.generateFloatNumber(x, x + width),
      y: this.random.generateFloatNumber(y, y + height),
    };
  }
}
