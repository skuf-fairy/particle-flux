import {ScalarBehavior} from 'src/base-behaviors/ScalarBehavior/ScalarBehavior';

export class RotationSpeedBehavior extends ScalarBehavior {
  protected updateValue(value: number): void {
    this.particle.view.angle += value;
  }
}
