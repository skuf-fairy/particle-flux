import {NumberUtils} from '../../utils/NumberUtils';
import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';

export class MovementComponent extends ParticleBaseComponent {
  public init(): void {}

  // Updating the position of the game object in the appropriate direction at a given speed
  public update(elapsedDelta: number): void {
    const speed = this.particle.speed * elapsedDelta;
    const direction = this.particle.direction;

    this.particle.view.position = {
      x: NumberUtils.roundWith2Precision(this.particle.view.position.x + direction.x * speed),
      y: NumberUtils.roundWith2Precision(this.particle.view.position.y + direction.y * speed),
    };
  }
}
