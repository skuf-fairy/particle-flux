import {SpawnRectangleShape} from './SpawnBehaviors.types';
import {BaseComponent} from 'src/core/BaseComponent';
import {RealRandom} from 'src/utils/random/RealRandom';
import {Vector2} from 'src/utils/Vector2';

export class SpawnRectangleBehavior extends BaseComponent {
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
