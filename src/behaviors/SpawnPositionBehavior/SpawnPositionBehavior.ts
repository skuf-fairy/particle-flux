import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {Point2d} from '../../types';
import {SpawnPositionBehaviorConfig} from './SpawnPositionBehavior.types';

export class SpawnPositionBehavior extends ParticleBaseComponent {
  public position: Point2d;

  constructor(private readonly config: SpawnPositionBehaviorConfig) {
    super();

    this.position = this.config.position;
  }

  public init(): void {}
}
