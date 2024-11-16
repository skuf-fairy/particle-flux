import {ScalarBehavior} from '../../../base-behaviors/ScalarBehavior/ScalarBehavior';

export class AlphaScalarBehavior extends ScalarBehavior {
  protected updateValue(value: number): void {
    this.particle.view.alpha = value;
  }
}
