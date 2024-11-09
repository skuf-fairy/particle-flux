import {Vector2} from 'src/utils/Vector2';
import {SpawnPointShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from 'src/core/ParticleBaseComponent';

export class SpawnPointBehavior extends ParticleBaseComponent {
  constructor(private readonly config: SpawnPointShape) {
    super();
  }

  public init(): void {
    this.particle.view.position = new Vector2(this.config.x, this.config.y);
  }
}