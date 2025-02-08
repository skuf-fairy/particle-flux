import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {PathBehavior} from '../../behaviors/PathBehavior/PathBehavior';
import {Point2d} from '../../types';
import {Vector2Utils} from '../../utils/Vector2Utils';

export class PathMovementComponent extends ParticleBaseComponent {
  private pathBehavior?: PathBehavior;
  private delta: Point2d;
  private initPosition: Point2d;

  public init(): void {
    this.pathBehavior = this.particle.getComponent(PathBehavior);
    this.initPosition = {x: this.particle.view.position.x, y: this.particle.view.position.y};
    this.delta = {x: 0, y: 0};
  }

  // Updating the position of the game object in the appropriate direction at a given speed
  public update(elapsedDelta: number): void {
    if (this.pathBehavior) {
      const speed = this.particle.speed * elapsedDelta;
      this.delta.x = this.delta.x + speed;
      this.delta.y = this.pathBehavior.pathFunc(this.delta.x);
      const delta = Vector2Utils.rotate(this.delta, -Math.PI / 2);

      this.particle.view.position = {
        x: this.initPosition.x + delta.x,
        y: this.initPosition.y + delta.y,
      };
    }
  }
}
