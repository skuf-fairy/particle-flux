import {SpawnRectangleShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {realRandom} from '../../utils/random/RealRandom';
import {Point2d} from '../../types';
import {SpawnPositionBehavior} from '../SpawnPositionBehavior/SpawnPositionBehavior';
import {NumberUtils} from '../../utils/NumberUtils';

export class SpawnRectangleBehavior extends ParticleBaseComponent {
  private spawnPositionBehavior?: SpawnPositionBehavior;

  constructor(private readonly config: SpawnRectangleShape) {
    super();
  }

  public init(): void {
    this.spawnPositionBehavior = this.particle.getComponent(SpawnPositionBehavior);

    const position = this.generateSpawnPoint();
    this.particle.view.position = {
      x: NumberUtils.roundWith2Precision(position.x + (this.spawnPositionBehavior?.position.x || 0)),
      y: NumberUtils.roundWith2Precision(position.y + (this.spawnPositionBehavior?.position.y || 0)),
    };
  }

  private generateSpawnPoint(): Point2d {
    const {x, y, width, height} = this.config;
    return {
      x: realRandom.generateFloatNumber(x, x + width),
      y: realRandom.generateFloatNumber(y, y + height),
    };
  }
}
