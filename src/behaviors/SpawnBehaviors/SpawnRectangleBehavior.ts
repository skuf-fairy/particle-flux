import {SpawnRectangleShape} from './SpawnBehaviors.types';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {RealRandom} from '../../utils/random/RealRandom';
import {Vector2} from '../../utils/Vector2';

export class SpawnRectangleBehavior extends ParticleBaseComponent {
  constructor(private readonly config: SpawnRectangleShape) {
    super();
  }

  public init(): void {
    const rnd = new RealRandom();
    const {x, y, width, height} = this.config;
    this.particle.view.position = new Vector2(
      rnd.generateFloatNumber(x, x + width),
      rnd.generateFloatNumber(y, y + height),
    );
  }
}
