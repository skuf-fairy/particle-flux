import {ParticleBaseComponent} from '../../core/ParticleBaseComponent';

export class MovementComponent extends ParticleBaseComponent {
  public init(): void {}

  /**
   * Обновление позиции игрового объекта в соответствующем направлении с заданной скоростью
   * @param delta время между кадрами
   */
  public onUpdate(delta: number): void {
    const speed = this.particle.speed * delta;
    const direction = this.particle.direction;

    this.particle.view.position = {
      x: this.particle.view.position.x + direction.x * speed,
      y: this.particle.view.position.y + direction.y * speed,
    };
  }
}
