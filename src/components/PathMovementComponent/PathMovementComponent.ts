import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';
import {PathBehavior} from '../../behaviors/PathBehavior/PathBehavior';
import {IVector2, Point2d} from '../../types';
import {Vector2} from '../../utils/Vector2';
import {Vector2Utils} from '../../utils/Vector2Utils';

export class PathMovementComponent extends ParticleBaseComponent {
  private pathBehavior?: PathBehavior;
  private delta: IVector2;
  private initPosition: Point2d;

  public init(): void {
    this.pathBehavior = this.particle.getComponent(PathBehavior);
    this.initPosition = {x: this.particle.view.position.x, y: this.particle.view.position.y};
    this.delta = new Vector2();
  }

  /**
   * Обновление позиции игрового объекта в соответствующем направлении с заданной скоростью
   * @param delta время между кадрами
   */
  public onUpdate(timeDelta: number): void {
    if (this.pathBehavior) {
      const speed = this.particle.speed * timeDelta;
      this.delta.x = this.delta.x + speed;
      this.delta.y = this.pathBehavior.pathFunc(this.delta.x);
      const delta = Vector2Utils.rotate(this.delta, -Math.PI / 2);

      this.particle.view.position.x = this.initPosition.x + delta.x;
      this.particle.view.position.y = this.initPosition.y + delta.y;
    }
  }
}
