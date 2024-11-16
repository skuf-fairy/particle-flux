import {ScalarBehavior} from '../../base-behaviors/ScalarBehavior/ScalarBehavior';

export class RotationBehavior extends ScalarBehavior {
  protected updateValue(value: number): void {
    this.particle.view.angle = value;
  }
}
