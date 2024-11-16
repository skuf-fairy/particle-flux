import {ScalarBehavior} from '../../../base-behaviors/ScalarBehavior/ScalarBehavior';

export class ScalarRotationBehavior extends ScalarBehavior {
  protected updateValue(value: number): void {
    this.particle.view.angle = value;
  }
}
