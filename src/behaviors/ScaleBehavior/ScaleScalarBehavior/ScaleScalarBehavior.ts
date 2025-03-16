import {ScalarBehavior} from '../../../base-behaviors/ScalarBehavior/ScalarBehavior';

export class ScaleScalarBehavior extends ScalarBehavior {
  protected updateValue(value: number): void {
    this.particle.view.scale = {
      x: value,
      y: value,
    };
  }
}
