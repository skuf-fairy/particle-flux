import {DeltaBehavior} from '../../../base-behaviors/DeltaBehavior/DeltaBehavior';

export class DeltaRotationBehavior extends DeltaBehavior {
  protected updateValue(value: number): void {
    this.particle.view.angle = value;
  }
}
