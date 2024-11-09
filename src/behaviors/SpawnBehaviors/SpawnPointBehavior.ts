import {Vector2} from 'src/utils/Vector2';
import {SpawnPointShape} from './SpawnBehaviors.types';
import {BaseComponent} from 'src/core/BaseComponent';

export class SpawnPointBehavior extends BaseComponent {
  constructor(private readonly config: SpawnPointShape) {
    super();
  }

  public init(): void {
    this.particle.view.position = new Vector2(this.config.x, this.config.y);
  }
}
