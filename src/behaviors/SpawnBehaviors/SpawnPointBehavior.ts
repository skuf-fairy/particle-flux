import {SpawnPointShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {SpawnPositionBehavior} from '../SpawnPositionBehavior/SpawnPositionBehavior';

export class SpawnPointBehavior extends ParticleBaseComponent {
  private spawnPositionBehavior?: SpawnPositionBehavior;

  constructor(private readonly config: SpawnPointShape) {
    super();
  }

  public init(): void {
    this.spawnPositionBehavior = this.particle.getComponent(SpawnPositionBehavior);

    this.particle.view.position = {
      x: this.config.x + (this.spawnPositionBehavior?.position.x || 0),
      y: this.config.y + (this.spawnPositionBehavior?.position.y || 0),
    };
  }
}
