import {ScalarBehavior} from '../../../base-behaviors/ScalarBehavior/ScalarBehavior';

export class SpeedScalarBehavior extends ScalarBehavior {
  protected updateValue(value: number): void {
    this.particle.speed = value;
  }
}
